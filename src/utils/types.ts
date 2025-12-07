export type Player = {
    id: string
    name: string
    rank?: number
    handedness?: 'left' | 'right'
}

export type ShotType = 'serve' | 'forehand' | 'backhand' | 'volley' | 'smash'

export type Shot = {
    id: string
    player_id: string
    type: ShotType
    speed_kmh: number
    spin_rpm?: number
    landing_x: number // Coordinate relative to court (e.g., -10 to 10 width, -15 to 15 length)
    landing_y: number
    result: 'in' | 'out' | 'net' | 'winner'
    timestamp: number
}

export type Point = {
    id: string
    server_id: string
    receiver_id: string
    winner_id?: string
    score_after: string // e.g., "15-0"
    rally_length: number
    shots: Shot[]
}

export type Game = {
    id: string
    winner_id?: string
    points: Point[]
    score_after: string // e.g., "1-0"
}

export type Set = {
    id: string
    winner_id?: string
    games: Game[]
    score_after: string // e.g., "6-4"
}

export type Match = {
    id: string
    date: string
    players: [Player, Player]
    sets: Set[]
    winner_id?: string
    duration_seconds: number
    court_name: string
}
