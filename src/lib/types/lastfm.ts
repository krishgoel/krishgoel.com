export type LastFmPeriod = '7day' | '1month' | '3month' | '12month' | 'overall'

export type LastFmImage = {
	size: string
	'#text': string
}

export type LastFmRecentTrack = {
	name: string
	url: string
	mbid: string
	streamable: string
	artist: {
		mbid: string
		'#text': string
	}
	album: {
		mbid: string
		'#text': string
	}
	image: LastFmImage[]
	date?: {
		uts: string
		'#text': string
	}
	'@attr'?: {
		nowplaying?: string
	}
}

export type LastFmRecentTracksResponse = {
	recenttracks: {
		track: LastFmRecentTrack | LastFmRecentTrack[]
		'@attr': {
			user: string
			totalPages: string
			page: string
			perPage: string
			total: string
		}
	}
}

export type LastFmTopTrack = {
	name: string
	url: string
	mbid: string
	duration: string
	playcount: string
	artist: {
		url: string
		name: string
		mbid: string
	}
	image: LastFmImage[]
	streamable: {
		fulltrack: string
		'#text': string
	}
	'@attr': {
		rank: string
	}
}

export type LastFmTopTracksResponse = {
	toptracks: {
		track: LastFmTopTrack | LastFmTopTrack[]
		'@attr': {
			user: string
			totalPages: string
			page: string
			perPage: string
			total: string
		}
	}
}

export type LastFmApiErrorResponse = {
	error: number
	message: string
}

export type ListeningRecentTrack = {
	name: string
	album: string
	artist: string
	isNowPlaying: boolean
}

export type ListeningTopTracksPayload = {
	tracks: LastFmTopTrack[]
	period: LastFmPeriod | null
	periodLabel: string
}
