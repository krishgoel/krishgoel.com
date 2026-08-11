import fs from 'fs'
import path from 'path'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const LAST_FM_API_BASE = 'https://ws.audioscrobbler.com/2.0/'
const LAST_FM_USER = 'KrishSkywalker'
const PERIOD_FALLBACKS = ['7day', '1month', '3month', '12month', 'overall']
const TRACK_LIMIT = 5
const OUTPUT_PATH = path.join('src', 'lib', 'data', 'toptracks.json')

/**
 * @typedef {{ error: number, message: string }} LastFmApiErrorResponse
 * @typedef {{ toptracks?: { track?: unknown } }} LastFmTopTracksResponse
 */

/**
 * @param {unknown} payload
 * @returns {payload is LastFmApiErrorResponse}
 */
function isLastFmApiError(payload) {
	return (
		typeof payload === 'object' &&
		payload !== null &&
		'error' in payload &&
		typeof /** @type {{ error: unknown }} */ (payload).error === 'number'
	)
}

/**
 * @param {unknown} trackOrTracks
 * @returns {unknown[]}
 */
function asTrackArray(trackOrTracks) {
	if (trackOrTracks === undefined || trackOrTracks === null) {
		return []
	}
	return Array.isArray(trackOrTracks) ? trackOrTracks : [trackOrTracks]
}

/**
 * @param {string} apiKey
 * @param {string} period
 * @returns {Promise<LastFmTopTracksResponse>}
 */
async function fetchTopTracksForPeriod(apiKey, period) {
	const queryParams = new URLSearchParams({
		method: 'user.gettoptracks',
		period,
		user: LAST_FM_USER,
		api_key: apiKey,
		format: 'json',
		limit: String(TRACK_LIMIT)
	})

	const response = await axios.get(`${LAST_FM_API_BASE}?${queryParams.toString()}`, {
		validateStatus: () => true
	})
	const payload = response.data

	if (isLastFmApiError(payload)) {
		throw new Error(`Last.fm error ${payload.error}: ${payload.message}`)
	}

	if (response.status < 200 || response.status >= 300) {
		throw new Error(`Last.fm HTTP ${response.status}`)
	}

	return /** @type {LastFmTopTracksResponse} */ (payload)
}

/**
 * @param {LastFmTopTracksResponse} payload
 * @returns {unknown[]}
 */
function tracksFromPayload(payload) {
	return asTrackArray(payload.toptracks?.track)
}

/**
 * @returns {LastFmTopTracksResponse | null}
 */
function readExistingTopTracks() {
	if (!fs.existsSync(OUTPUT_PATH)) {
		return null
	}

	try {
		return /** @type {LastFmTopTracksResponse} */ (
			JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf8'))
		)
	} catch (error) {
		console.warn('Could not parse existing toptracks.json; it will be replaced if fresh data is available.')
		return null
	}
}

async function fetchTopTracks() {
	const apiKey = process.env.LAST_FM_API_KEY
	if (!apiKey) {
		console.error('LAST_FM_API_KEY is not set.')
		process.exit(1)
	}

	const existingPayload = readExistingTopTracks()
	const existingTracks = existingPayload ? tracksFromPayload(existingPayload) : []

	/** @type {LastFmTopTracksResponse | null} */
	let selectedPayload = null
	/** @type {string | null} */
	let selectedPeriod = null

	for (const period of PERIOD_FALLBACKS) {
		try {
			const payload = await fetchTopTracksForPeriod(apiKey, period)
			const tracks = tracksFromPayload(payload)

			console.log(`Fetched ${tracks.length} top track(s) for period=${period}.`)

			if (tracks.length > 0) {
				selectedPayload = payload
				selectedPeriod = period
				break
			}
		} catch (error) {
			const axiosPayload = /** @type {{ response?: { data?: LastFmApiErrorResponse } }} */ (
				error
			).response?.data
			const message =
				axiosPayload && isLastFmApiError(axiosPayload)
					? `Last.fm error ${axiosPayload.error}: ${axiosPayload.message}`
					: error instanceof Error
						? error.message
						: String(error)
			console.error(`Failed fetching period=${period}: ${message}`)
		}
	}

	if (selectedPayload === null) {
		if (existingTracks.length > 0) {
			console.log(
				'No scrobbles found across Last.fm periods; keeping the existing toptracks.json cache.'
			)
			return
		}

		selectedPayload = {
			toptracks: {
				track: [],
				'@attr': {
					user: LAST_FM_USER,
					totalPages: '0',
					page: '1',
					perPage: String(TRACK_LIMIT),
					total: '0'
				}
			}
		}
		console.log('No scrobbles found and no existing cache; writing an empty toptracks.json.')
	} else {
		console.log(`Using period=${selectedPeriod} for toptracks.json.`)
	}

	const dataDirectory = path.dirname(OUTPUT_PATH)
	if (!fs.existsSync(dataDirectory)) {
		fs.mkdirSync(dataDirectory, { recursive: true })
	}

	const nextContents = `${JSON.stringify(selectedPayload, null, 2)}\n`
	const previousContents = fs.existsSync(OUTPUT_PATH) ? fs.readFileSync(OUTPUT_PATH, 'utf8') : ''

	if (previousContents === nextContents) {
		console.log('Top tracks data is unchanged; skipping write.')
		return
	}

	fs.writeFileSync(OUTPUT_PATH, nextContents)
	console.log('Top tracks data fetched and saved successfully.')
}

fetchTopTracks().catch((error) => {
	console.error('An error occurred:', error)
	process.exit(1)
})
