import fs from 'fs'
import path from 'path'
import axios from 'axios'

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
