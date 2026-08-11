import type {
	LastFmApiErrorResponse,
	LastFmPeriod,
	LastFmRecentTrack,
	LastFmRecentTracksResponse,
	LastFmTopTrack,
	LastFmTopTracksResponse,
	ListeningRecentTrack,
	ListeningTopTracksPayload
} from '$lib/types'

const LAST_FM_API_BASE = 'https://ws.audioscrobbler.com/2.0/'
const LAST_FM_USER = 'KrishSkywalker'

export const LAST_FM_PERIOD_FALLBACKS: readonly LastFmPeriod[] = [
	'7day',
	'1month',
	'3month',
	'12month',
	'overall'
] as const

const PERIOD_LABELS: Record<LastFmPeriod, string> = {
	'7day': 'this week',
	'1month': 'this month',
	'3month': 'the last 3 months',
	'12month': 'the last year',
	overall: 'all time'
}

function isLastFmApiError(payload: unknown): payload is LastFmApiErrorResponse {
	return (
		typeof payload === 'object' &&
		payload !== null &&
		'error' in payload &&
		typeof (payload as LastFmApiErrorResponse).error === 'number'
	)
}

function asTrackArray<T>(trackOrTracks: T | T[] | undefined): T[] {
	if (trackOrTracks === undefined) {
		return []
	}
	return Array.isArray(trackOrTracks) ? trackOrTracks : [trackOrTracks]
}

async function fetchLastFmJson<T>(
	searchParameters: URLSearchParams,
	fetchFn: typeof fetch
): Promise<T | null> {
	const response = await fetchFn(`${LAST_FM_API_BASE}?${searchParameters.toString()}`)
	if (!response.ok) {
		throw new Error(`Last.fm HTTP ${response.status}`)
	}

	const payload: unknown = await response.json()
	if (isLastFmApiError(payload)) {
		throw new Error(`Last.fm error ${payload.error}: ${payload.message}`)
	}

	return payload as T
}

export function periodLabelFor(period: LastFmPeriod | null): string {
	if (period === null) {
		return 'lately'
	}
	return PERIOD_LABELS[period]
}

export function normalizeRecentTrack(
	payload: LastFmRecentTracksResponse | Record<string, never>
): ListeningRecentTrack | null {
	if (!('recenttracks' in payload) || payload.recenttracks === undefined) {
		return null
	}

	const [mostRecentTrack] = asTrackArray<LastFmRecentTrack>(payload.recenttracks.track)
	if (!mostRecentTrack) {
		return null
	}

	return {
		name: mostRecentTrack.name,
		album: mostRecentTrack.album['#text'],
		artist: mostRecentTrack.artist['#text'],
		isNowPlaying: mostRecentTrack['@attr']?.nowplaying === 'true'
	}
}

export async function fetchRecentTrack(
	apiKey: string,
	fetchFn: typeof fetch
): Promise<ListeningRecentTrack | null> {
	if (apiKey.length === 0) {
		return null
	}

	const searchParameters = new URLSearchParams({
		method: 'user.getrecenttracks',
		user: LAST_FM_USER,
		api_key: apiKey,
		format: 'json',
		limit: '1'
	})

	try {
		const payload = await fetchLastFmJson<LastFmRecentTracksResponse>(searchParameters, fetchFn)
		if (payload === null) {
			return null
		}
		return normalizeRecentTrack(payload)
	} catch (error) {
		console.error('Failed to fetch Last.fm recent track:', error)
		return null
	}
}

export async function fetchTopTracksForPeriod(
	apiKey: string,
	period: LastFmPeriod,
	fetchFn: typeof fetch,
	limit: number = 5
): Promise<LastFmTopTrack[]> {
	const searchParameters = new URLSearchParams({
		method: 'user.gettoptracks',
		user: LAST_FM_USER,
		api_key: apiKey,
		format: 'json',
		period,
		limit: String(limit)
	})

	const payload = await fetchLastFmJson<LastFmTopTracksResponse>(searchParameters, fetchFn)
	if (payload === null) {
		return []
	}

	return asTrackArray<LastFmTopTrack>(payload.toptracks.track)
}

export async function fetchTopTracksWithPeriodFallback(
	apiKey: string,
	fetchFn: typeof fetch,
	fallbackTracks: LastFmTopTrack[] = []
): Promise<ListeningTopTracksPayload> {
	if (apiKey.length === 0) {
		return {
			tracks: fallbackTracks,
			period: null,
			periodLabel: periodLabelFor(null)
		}
	}

	for (const period of LAST_FM_PERIOD_FALLBACKS) {
		try {
			const tracks = await fetchTopTracksForPeriod(apiKey, period, fetchFn)
			if (tracks.length > 0) {
				return {
					tracks,
					period,
					periodLabel: periodLabelFor(period)
				}
			}
		} catch (error) {
			console.error(`Failed to fetch Last.fm top tracks for period ${period}:`, error)
		}
	}

	return {
		tracks: fallbackTracks,
		period: null,
		periodLabel: periodLabelFor(null)
	}
}

export function topTracksFromCachedPayload(payload: LastFmTopTracksResponse): LastFmTopTrack[] {
	return asTrackArray<LastFmTopTrack>(payload.toptracks?.track)
}
