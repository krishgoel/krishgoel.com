import { env } from '$env/dynamic/private'
import topTracksCache from '$lib/data/toptracks.json'
import {
	fetchRecentTrack,
	fetchTopTracksWithPeriodFallback,
	topTracksFromCachedPayload
} from '$lib/server/lastfm'
import type { LastFmTopTracksResponse, ListeningRecentTrack, ListeningTopTracksPayload } from '$lib/types'
import type { PageServerLoad } from './$types'

const lastFmApiKey = env.LAST_FM_API_KEY ?? ''

type ListeningPageData = {
	recentTrack: ListeningRecentTrack | null
	topTracks: ListeningTopTracksPayload
}

export const load: PageServerLoad = async ({ fetch }): Promise<ListeningPageData> => {
	const cachedTopTracks = topTracksFromCachedPayload(topTracksCache as LastFmTopTracksResponse)

	try {
		const [recentTrack, topTracks] = await Promise.all([
			fetchRecentTrack(lastFmApiKey, fetch),
			fetchTopTracksWithPeriodFallback(lastFmApiKey, fetch, cachedTopTracks)
		])

		return {
			recentTrack,
			topTracks
		}
	} catch (error) {
		console.error('Failed to fetch listening page data:', error)
		return {
			recentTrack: null,
			topTracks: {
				tracks: cachedTopTracks,
				period: null,
				periodLabel: 'lately'
			}
		}
	}
}
