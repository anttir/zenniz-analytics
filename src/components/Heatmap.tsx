import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell } from 'recharts'
import type { Shot } from '../utils/types'

interface HeatmapProps {
    shots: Shot[]
}

export function Heatmap({ shots }: HeatmapProps) {
    const data = shots.map(shot => ({
        x: shot.landing_x,
        y: shot.landing_y,
        type: shot.type,
        result: shot.result,
        speed: shot.speed_kmh
    }))

    return (
        <div className="h-96 w-full bg-green-800 rounded-lg relative overflow-hidden border-2 border-white">
            {/* Court Lines (Simplified CSS overlay) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                <div className="w-[80%] h-[90%] border-2 border-white grid grid-rows-2">
                    <div className="border-b-2 border-white"></div>
                </div>
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <XAxis type="number" dataKey="x" domain={[-6, 6]} hide />
                    <YAxis type="number" dataKey="y" domain={[-13, 13]} hide />
                    <ZAxis type="number" dataKey="speed" range={[50, 400]} name="speed" unit="km/h" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Shots" data={data} fill="#8884d8">
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.result === 'winner' ? '#10b981' : entry.result === 'out' ? '#ef4444' : '#fbbf24'}
                            />
                        ))}
                    </Scatter>
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    )
}
