import type {
	LastFmImage,
	LastFmImageSize,
	LastFmTopTrack,
	LastFmTopTracksResponse,
	LastFmTrackInfoResponse,
	LastFmTrackWithImages
} from '$lib/types/lastfm'

const LAST_FM_PLACEHOLDER_IMAGE_HASH = '2a96cbd8b46e442fc41c2b86b821562f'
const LAST_FM_API_BASE_URL = 'https://ws.audioscrobbler.com/2.0/'
const ITUNES_SEARCH_API_BASE_URL = 'https://itunes.apple.com/search'

type ItunesSearchResponse = {
	results?: {
		artworkUrl100?: string
	}[]
}

export function isLastFmPlaceholderImage(imageUrl: string): boolean {
	return imageUrl.includes(LAST_FM_PLACEHOLDER_IMAGE_HASH)
}

export function buildTrackImagesFromUrl(imageUrl: string): LastFmImage[] {
	return [
		{ size: 'small', '#text': imageUrl },
		{ size: 'medium', '#text': imageUrl },
		{ size: 'large', '#text': imageUrl },
		{ size: 'extralarge', '#text': imageUrl }
	]
}

export function getTrackImageUrl(
	track: LastFmTrackWithImages,
	preferredSize: LastFmImageSize = 'large'
): string | null {
	const images: LastFmImage[] | undefined = track.image
	if (!images?.length) {
		return null
	}

	const preferredImageUrl = images.find((image) => image.size === preferredSize)?.['#text']
	if (preferredImageUrl && !isLastFmPlaceholderImage(preferredImageUrl)) {
		return preferredImageUrl
	}

	const largestImageUrl = images.at(-1)?.['#text']
	if (largestImageUrl && !isLastFmPlaceholderImage(largestImageUrl)) {
		return largestImageUrl
	}

	return null
}

function extractTrackInfoImages(trackInfo: LastFmTrackInfoResponse['track']): LastFmImage[] | null {
	const albumImages = trackInfo?.album?.image
	if (albumImages?.length) {
		const albumImageUrl = albumImages.find((image) => image.size === 'extralarge')?.['#text']
		if (albumImageUrl && !isLastFmPlaceholderImage(albumImageUrl)) {
			return albumImages
		}
	}

	const trackImages = trackInfo?.image
	if (trackImages?.length) {
		const trackImageUrl = trackImages.find((image) => image.size === 'extralarge')?.['#text']
		if (trackImageUrl && !isLastFmPlaceholderImage(trackImageUrl)) {
			return trackImages
		}
	}

	return null
}

export async function fetchTrackInfoImages(
	artistName: string,
	trackName: string,
	apiKey: string,
	fetchFn: typeof fetch
): Promise<LastFmImage[] | null> {
	const queryParameters = new URLSearchParams({
		method: 'track.getInfo',
		api_key: apiKey,
		artist: artistName,
		track: trackName,
		format: 'json'
	})

	try {
		const response = await fetchFn(`${LAST_FM_API_BASE_URL}?${queryParameters.toString()}`)
		if (!response.ok) {
			return null
		}

		const trackInfoResponse = (await response.json()) as LastFmTrackInfoResponse
		return extractTrackInfoImages(trackInfoResponse.track)
	} catch (error) {
		console.error(`Failed to fetch track info for "${trackName}" by "${artistName}":`, error)
		return null
	}
}

export async function fetchItunesArtworkUrl(
	artistName: string,
	trackName: string,
	fetchFn: typeof fetch
): Promise<string | null> {
	const queryParameters = new URLSearchParams({
		term: `${artistName} ${trackName}`,
		entity: 'song',
		limit: '1'
	})

	try {
		const response = await fetchFn(`${ITUNES_SEARCH_API_BASE_URL}?${queryParameters.toString()}`)
		if (!response.ok) {
			return null
		}

		const searchResponse = (await response.json()) as ItunesSearchResponse
		const artworkUrl100 = searchResponse.results?.[0]?.artworkUrl100
		if (!artworkUrl100) {
			return null
		}

		return artworkUrl100.replace('100x100bb', '600x600bb')
	} catch (error) {
		console.error(`Failed to fetch iTunes artwork for "${trackName}" by "${artistName}":`, error)
		return null
	}
}

export async function resolveTrackArtworkImages(
	artistName: string,
	trackName: string,
	apiKey: string,
	fetchFn: typeof fetch
): Promise<LastFmImage[] | null> {
	const lastFmImages = await fetchTrackInfoImages(artistName, trackName, apiKey, fetchFn)
	if (lastFmImages) {
		return lastFmImages
	}

	const itunesArtworkUrl = await fetchItunesArtworkUrl(artistName, trackName, fetchFn)
	if (!itunesArtworkUrl) {
		return null
	}

	return buildTrackImagesFromUrl(itunesArtworkUrl)
}

export async function enrichTopTrackWithArtwork(
	track: LastFmTopTrack,
	apiKey: string,
	fetchFn: typeof fetch
): Promise<LastFmTopTrack> {
	const existingImageUrl = getTrackImageUrl(track, 'large')
	if (existingImageUrl) {
		return track
	}

	const enrichedImages = await resolveTrackArtworkImages(
		track.artist.name,
		track.name,
		apiKey,
		fetchFn
	)
	if (!enrichedImages) {
		return track
	}

	return {
		...track,
		image: enrichedImages
	}
}

export async function enrichTopTracksWithArtwork(
	topTracksResponse: LastFmTopTracksResponse,
	apiKey: string,
	fetchFn: typeof fetch
): Promise<LastFmTopTracksResponse> {
	const enrichedTracks = await Promise.all(
		topTracksResponse.toptracks.track.map((track) =>
			enrichTopTrackWithArtwork(track, apiKey, fetchFn)
		)
	)

	return {
		toptracks: {
			...topTracksResponse.toptracks,
			track: enrichedTracks
		}
	}
}
