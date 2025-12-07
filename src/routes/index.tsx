import { createFileRoute } from '@tanstack/react-router'
import { MOCK_MATCH } from '../utils/mockData'
import { Heatmap } from '../components/Heatmap'
import type { Shot } from '../utils/types'
import { useMemo } from 'react'

export const Route = createFileRoute('/')({
    component: Index,
})

function StatCard({ label, value, subtext }: { label: string, value: string | number, subtext?: string }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h4 className="text-sm font-medium text-gray-500">{label}</h4>
            <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">{value}</span>
                {subtext && <span className="text-xs text-gray-400">{subtext}</span>}
            </div>
        </div>
    )
}

function Index() {
    const match = MOCK_MATCH

    // Flatten all shots from the match
    const allShots = useMemo(() => {
        // Generate dummy shots for display
        const shots: Shot[] = []
        for (let i = 0; i < 50; i++) {
            shots.push({
                id: i.toString(),
                player_id: match.players[0].id,
                type: 'forehand',
                speed_kmh: 120,
                landing_x: (Math.random() * 10) - 5,
                landing_y: (Math.random() * 20) - 10,
                result: Math.random() > 0.8 ? 'winner' : 'in',
                timestamp: Date.now()
            })
        }
        return shots
    }, [match])

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Match Analytics</h1>
                <p className="text-gray-500 mt-1">
                    {match.players[0].name} vs {match.players[1].name} • {new Date(match.date).toLocaleDateString()}
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard label="Duration" value="2h 14m" />
                <StatCard label="Aces" value="12" subtext="Player 1" />
                <StatCard label="Double Faults" value="3" subtext="Player 2" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4">Shot Placement</h3>
                    <Heatmap shots={allShots} />
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4">Match Momentum</h3>
                    <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">
                        Momentum Chart Placeholder
                    </div>
                </div>
            </div>
        </div>
    )
}
