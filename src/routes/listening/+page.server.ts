import { env } from '$env/dynamic/private'
import toptracks from '$lib/data/toptracks.json'
import type { LastFmRecentTracksResponse, LastFmTopTracksResponse } from '$lib/types/lastfm'
import { enrichTopTracksWithArtwork } from '$lib/utils/lastfm'

const lastFmApiKey = env.LAST_FM_API_KEY ?? ''

async function fetchAPI<T>(url: string, fallback: T, fetchFn: typeof fetch): Promise<T> {
	try {
		const response = await fetchFn(url)
		if (!response.ok) {
			throw new Error(`Failed to fetch from ${url}`)
		}
		return response.json()
	} catch (error) {
		console.error(`Error fetching ${url}:`, error)
		return fallback
	}
}

export async function load({ fetch }) {
	try {
		const lastTrackData = await fetchAPI<LastFmRecentTracksResponse>(
			`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=KrishSkywalker&api_key=${lastFmApiKey}&format=json&limit=1`,
			{},
			fetch
		)

		const cachedTopTracks = toptracks as LastFmTopTracksResponse
		const topTracks = lastFmApiKey
			? await enrichTopTracksWithArtwork(cachedTopTracks, lastFmApiKey, fetch)
			: cachedTopTracks

		return {
			track: lastTrackData,
			topTracks
		}
	} catch (error) {
		console.error(`Failed to fetch data. Error generated at +page.server.ts:`, error)
	}
}
