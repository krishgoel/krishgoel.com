export type LastFmImageSize = 'small' | 'medium' | 'large' | 'extralarge'

export type LastFmImage = {
	size: LastFmImageSize
	'#text': string
}

export type LastFmTrackWithImages = {
	image?: LastFmImage[]
}

export type LastFmTopTrack = LastFmTrackWithImages & {
	name: string
	artist: {
		name: string
		url: string
		mbid: string
	}
	playcount: string
	url: string
	duration: string
	mbid: string
	streamable: {
		fulltrack: string
		'#text': string
	}
	'@attr': {
		rank: string
	}
}

export type LastFmRecentTrack = LastFmTrackWithImages & {
	name: string
	artist: {
		'#text': string
	}
	album: {
		'#text': string
	}
	'@attr'?: Record<string, string>
}

export type LastFmRecentTracksResponse = {
	recenttracks?: {
		track: LastFmRecentTrack[]
	}
}

export type LastFmTopTracksResponse = {
	toptracks: {
		track: LastFmTopTrack[]
	}
}
