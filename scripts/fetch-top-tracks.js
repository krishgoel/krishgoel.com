import fs from 'node:fs'
import path from 'node:path'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

async function fetchTopTracks() {
	const lastFmUrl = 'https://ws.audioscrobbler.com/2.0/'
	const method = 'user.gettoptracks'
	const period = '7day'
	const user = 'KrishSkywalker'
	const lastFmApiKey = process.env.LAST_FM_API_KEY
	const format = 'json'
	const maximumTrackCount = 10

	if (!lastFmApiKey) {
		throw new Error('LAST_FM_API_KEY is required to fetch top tracks.')
	}

	const queryParams = new URLSearchParams({
		method,
		period,
		user,
		api_key: lastFmApiKey,
		format,
		limit: String(maximumTrackCount)
	})

	try {
		const response = await axios.get(`${lastFmUrl}?${queryParams.toString()}`)
		const topTracksData = response.data

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
