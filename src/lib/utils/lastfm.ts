import type { LastFmImage, LastFmImageSize, LastFmTrackWithImages } from '$lib/types/lastfm'

export function getTrackImageUrl(
	track: LastFmTrackWithImages,
	preferredSize: LastFmImageSize = 'large'
): string | null {
	const images: LastFmImage[] | undefined = track.image
	if (!images?.length) {
		return null
	}

	const preferredImageUrl = images.find((image) => image.size === preferredSize)?.['#text']
	if (preferredImageUrl) {
		return preferredImageUrl
	}

	const largestImageUrl = images.at(-1)?.['#text']
	return largestImageUrl ?? null
}
