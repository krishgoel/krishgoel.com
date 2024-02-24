import { getAllSpeaking } from '$lib'
import type { SpeakingAPIResponse } from '$lib/types'
import { json } from '@sveltejs/kit'

export const GET = async () => {
	try {
		const allSpeaking = await getAllSpeaking()

		const filteredSpeaking = allSpeaking.filter((speaking): speaking is SpeakingAPIResponse => {
			if (speaking === undefined) {
				console.log('Undefined speaking post removed during filtering:', speaking)
			}
			return speaking !== undefined
		})

		const sortedSpeaking = filteredSpeaking.sort((a: SpeakingAPIResponse, b: SpeakingAPIResponse) => {
			return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
		})

		return json(sortedSpeaking)
	} catch (error) {
		console.error('Error in api/speaking/+server.js:', error)
	}
}