import toptracks from '$lib/data/toptracks.json'
import { env } from '$env/dynamic/private'
import type { PageServerLoad } from './$types'

const lastFmApiKey = env.LAST_FM_API_KEY ?? ''

type LastFmRecentTrack = {
	name: string
	album: { '#text': string }
	artist: { '#text': string }
	'@attr'?: Record<string, string>
}

type LastFmRecentTracksResponse = {
	recenttracks?: {
		track?: LastFmRecentTrack[]
	}
}

type LastFmTopTrack = {
	name: string
	playcount: string
	artist: { name: string }
}

type LastFmTopTracksResponse = {
	toptracks: {
		track: LastFmTopTrack[]
	}
}

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

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const fallbackRecentTracks: LastFmRecentTracksResponse = { recenttracks: { track: [] } }

		const lastTrackData = await fetchAPI<LastFmRecentTracksResponse>(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=KrishSkywalker&api_key=${lastFmApiKey}&format=json&limit=1`, fallbackRecentTracks, fetch)

		const topTracks = toptracks as LastFmTopTracksResponse

		return {
			track: lastTrackData,
			topTracks
		}
	} catch (error) {
		console.error(`Failed to fetch data. Error generated at +page.server.ts:`, error)
	}
}
