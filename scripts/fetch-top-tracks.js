import fs from 'fs'
import path from 'path'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const LAST_FM_PLACEHOLDER_IMAGE_HASH = '2a96cbd8b46e442fc41c2b86b821562f'
const LAST_FM_API_BASE_URL = 'https://ws.audioscrobbler.com/2.0/'
const ITUNES_SEARCH_API_BASE_URL = 'https://itunes.apple.com/search'

function isPlaceholderImage(imageUrl) {
	return imageUrl.includes(LAST_FM_PLACEHOLDER_IMAGE_HASH)
}

function buildTrackImagesFromUrl(imageUrl) {
	return [
		{ size: 'small', '#text': imageUrl },
		{ size: 'medium', '#text': imageUrl },
		{ size: 'large', '#text': imageUrl },
		{ size: 'extralarge', '#text': imageUrl }
	]
}

function getPreferredImageUrl(images) {
	if (!images?.length) {
		return null
	}

	const largeImageUrl = images.find((image) => image.size === 'large')?.['#text']
	if (largeImageUrl && !isPlaceholderImage(largeImageUrl)) {
		return largeImageUrl
	}

	const largestImageUrl = images.at(-1)?.['#text']
	if (largestImageUrl && !isPlaceholderImage(largestImageUrl)) {
		return largestImageUrl
	}

	return null
}

async function fetchTrackInfoImages(artistName, trackName, apiKey) {
	const queryParameters = new URLSearchParams({
		method: 'track.getInfo',
		api_key: apiKey,
		artist: artistName,
		track: trackName,
		format: 'json'
	})

	try {
		const response = await axios.get(`${LAST_FM_API_BASE_URL}?${queryParameters.toString()}`)
		const trackInfo = response.data?.track
		const albumImages = trackInfo?.album?.image
		const trackImages = trackInfo?.image

		if (albumImages?.length) {
			const albumImageUrl = albumImages.find((image) => image.size === 'extralarge')?.['#text']
			if (albumImageUrl && !isPlaceholderImage(albumImageUrl)) {
				return albumImages
			}
		}

		if (trackImages?.length) {
			const trackImageUrl = trackImages.find((image) => image.size === 'extralarge')?.['#text']
			if (trackImageUrl && !isPlaceholderImage(trackImageUrl)) {
				return trackImages
			}
		}

		return null
	} catch (error) {
		console.error(`Failed to fetch track info for "${trackName}" by "${artistName}":`, error)
		return null
	}
}

async function fetchItunesArtworkUrl(artistName, trackName) {
	const queryParameters = new URLSearchParams({
		term: `${artistName} ${trackName}`,
		entity: 'song',
		limit: '1'
	})

	try {
		const response = await axios.get(`${ITUNES_SEARCH_API_BASE_URL}?${queryParameters.toString()}`)
		const artworkUrl100 = response.data?.results?.[0]?.artworkUrl100
		if (!artworkUrl100) {
			return null
		}

		return artworkUrl100.replace('100x100bb', '600x600bb')
	} catch (error) {
		console.error(`Failed to fetch iTunes artwork for "${trackName}" by "${artistName}":`, error)
		return null
	}
}

async function resolveTrackArtworkImages(artistName, trackName, apiKey) {
	const lastFmImages = await fetchTrackInfoImages(artistName, trackName, apiKey)
	if (lastFmImages) {
		return lastFmImages
	}

	const itunesArtworkUrl = await fetchItunesArtworkUrl(artistName, trackName)
	if (!itunesArtworkUrl) {
		return null
	}

	return buildTrackImagesFromUrl(itunesArtworkUrl)
}

async function enrichTopTracksWithArtwork(topTracksData, apiKey) {
	const enrichedTracks = await Promise.all(
		topTracksData.toptracks.track.map(async (track) => {
			if (getPreferredImageUrl(track.image)) {
				return track
			}

			const enrichedImages = await resolveTrackArtworkImages(
				track.artist.name,
				track.name,
				apiKey
			)
			if (!enrichedImages) {
				return track
			}

			return {
				...track,
				image: enrichedImages
			}
		})
	)

	return {
		...topTracksData,
		toptracks: {
			...topTracksData.toptracks,
			track: enrichedTracks
		}
	}
}

async function fetchTopTracks() {
	const lastFmUrl = 'https://ws.audioscrobbler.com/2.0/'
	const method = 'user.gettoptracks'
	const period = '7day'
	const user = 'KrishSkywalker'
	const apiKey = process.env.LAST_FM_API_KEY
	const format = 'json'
	const limit = 5

	const queryParams = new URLSearchParams({
		method,
		period,
		user,
		api_key: apiKey,
		format,
		limit
	})

	try {
		const response = await axios.get(`${lastFmUrl}?${queryParams.toString()}`)
		const topTracksData = await enrichTopTracksWithArtwork(response.data, apiKey)

		const dataDirectory = 'src/lib/data'
		if (!fs.existsSync(dataDirectory)) {
			fs.mkdirSync(dataDirectory, { recursive: true })
		}

		const filePath = path.join(dataDirectory, 'toptracks.json')
		fs.writeFileSync(filePath, JSON.stringify(topTracksData, null, 2))

		console.log('Top tracks data fetched and saved successfully.')
	} catch (error) {
		console.error('An error occurred:', error)
		process.exit(1)
	}
}

fetchTopTracks()
