export const load = async () => {
	try {
		const track = await fetch('https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=KrishSkywalker&api_key=faa73d570313176a337af4dea9827765&format=json&limit=1')
		const data = await track.json()

		return {
			data
		}
	} catch (error) {
        console.error(`Failed to fetch last listened to track. Error generated at +page.server.ts`)
	}
}
