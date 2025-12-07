import type { Match, Player, Point, Shot } from './types'

const PLAYERS: Player[] = [
    { id: 'p1', name: 'Roger F.', handedness: 'right', rank: 3 },
    { id: 'p2', name: 'Rafael N.', handedness: 'left', rank: 2 },
]

function randomFloat(min: number, max: number) {
    return Math.random() * (max - min) + min
}

// Exported to be safe, or just used internally
export function generateShot(playerId: string): Shot {
    const isServe = Math.random() > 0.8
    const speed = isServe ? randomFloat(150, 220) : randomFloat(80, 140)

    // Court dimensions approx: width 10.97m, length 23.77m. 
    const x = randomFloat(-5.5, 5.5)
    const y = randomFloat(-12, 12)

    return {
        id: Math.random().toString(36).slice(2),
        player_id: playerId,
        type: isServe ? 'serve' : (Math.random() > 0.5 ? 'forehand' : 'backhand'),
        speed_kmh: Math.round(speed),
        landing_x: x,
        landing_y: y,
        result: Math.random() > 0.9 ? 'winner' : (Math.random() > 0.8 ? 'out' : 'in'),
        timestamp: Date.now(),
    }
}

export function generatePoint(server: Player, receiver: Player): Point {
    const shots: Shot[] = []
    const rallyLength = Math.floor(randomFloat(1, 10))
    let currentHitter = server

    for (let i = 0; i < rallyLength; i++) {
        shots.push(generateShot(currentHitter.id))
        currentHitter = currentHitter.id === server.id ? receiver : server
    }

    return {
        id: Math.random().toString(36).slice(2),
        server_id: server.id,
        receiver_id: receiver.id,
        winner_id: Math.random() > 0.5 ? server.id : receiver.id,
        score_after: '15-0', // Simplified
        rally_length: rallyLength,
        shots,
    }
}

export function generateMatch(): Match {
    // Simplified match generation
    return {
        id: 'match_001',
        date: new Date().toISOString(),
        players: [PLAYERS[0], PLAYERS[1]],
        sets: [],
        duration_seconds: 7200,
        court_name: 'Center Court',
    }
}

export const MOCK_MATCH = generateMatch()
