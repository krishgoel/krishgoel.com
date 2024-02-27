import { env } from '$env/dynamic/private'
const LAST_FM_API_KEY = env.LAST_FM_API_KEY

import toptracks from '$lib/data/toptracks.json'

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
		const lastTrackData = await fetchAPI<any>(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=KrishSkywalker&api_key=${LAST_FM_API_KEY}&format=json&limit=1`, {}, fetch)

        const topTracks = toptracks

		return {
			track: lastTrackData,
            topTracks
		}
	} catch (error) {
		console.error(`Failed to fetch data. Error generated at +page.server.ts:`, error)
	}
}
