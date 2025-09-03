'use client'

import { useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, Trophy, ListChecks, RefreshCw } from 'lucide-react'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface QuizResult {
  id: string
  name: string
  date: string // ISO date
  score: number // 0 - 100
}

const quizResults: QuizResult[] = [
  { id: 'q1', name: 'Java Basics', date: '2025-08-01', score: 62 },
  { id: 'q2', name: 'React Hooks', date: '2025-08-05', score: 74 },
  { id: 'q3', name: 'TypeScript Types', date: '2025-08-11', score: 81 },
  { id: 'q4', name: 'Data Structures', date: '2025-08-16', score: 68 },
  { id: 'q5', name: 'HTTP & REST', date: '2025-08-22', score: 90 },
  { id: 'q6', name: 'Async JS', date: '2025-08-28', score: 84 },
  { id: 'q7', name: 'Design Patterns', date: '2025-09-02', score: 93 }
]

const formatDate = (iso: string) => new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })

const ProgressPage = () => {
  const stats = useMemo(() => {
    if (!quizResults.length) {
      return { total: 0, average: 0, best: 0 }
    }
    const total = quizResults.length
    const sum = quizResults.reduce((acc, q) => acc + q.score, 0)
    const average = Number((sum / total).toFixed(1))
    const best = Math.max(...quizResults.map((q) => q.score))
    return { total, average, best }
  }, [])

  const chartPath = useMemo(() => {
    if (quizResults.length < 2) return ''
    const width = 100
    const height = 50
    const maxScore = 100
    const stepX = width / (quizResults.length - 1)
    return quizResults
      .map((q, i) => {
        const x = i * stepX
        const y = height - (q.score / maxScore) * height
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`
      })
      .join(' ')
  }, [])

  const recent = [...quizResults].slice(-5).reverse()

  const chartData = {
    labels: quizResults.map((q) => formatDate(q.date)),
    datasets: [
      {
        label: 'Score',
        data: quizResults.map((q) => q.score),
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37,99,235,0.1)',
        pointBackgroundColor: '#2563eb',
        pointBorderColor: '#fff',
        tension: 0.3,
        fill: true
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: { callbacks: { label: (ctx: any) => `Score: ${ctx.parsed.y}%` } }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: { stepSize: 25 },
        grid: { color: '#e5e7eb' }
      },
      x: {
        grid: { color: '#e5e7eb' }
      }
    }
  }

  return (
    <div className='w-full min-h-screen bg-gray-50'>
      <div className='w-full flex flex-col gap-8 px-6 py-5'>
        {/* Header */}
        <div className='bg-white mb-2 flex flex-col gap-2'>
          <h2 className='text-2xl font-bold text-gray-900'>Progress Overview</h2>
          <p className='text-sm text-gray-600'>Track your quiz performance and study improvement over time.</p>
        </div>

        {/* Stats */}
        <div className='grid gap-6 grid-cols-1 sm:grid-cols-3'>
          <Card className='shadow-lg rounded-xl transition hover:shadow-xl'>
            <CardContent className='p-6 flex flex-col gap-3'>
              <div className='flex items-center gap-2 text-gray-500 text-sm uppercase tracking-wide'>
                <ListChecks className='w-4 h-4' />
                Total Quizzes
              </div>
              <div className='text-3xl font-bold text-blue-700'>{stats.total}</div>
              <p className='text-xs text-gray-500'>Completed quizzes across all topics.</p>
            </CardContent>
          </Card>
          <Card className='shadow-lg rounded-xl transition hover:shadow-xl'>
            <CardContent className='p-6 flex flex-col gap-3'>
              <div className='flex items-center gap-2 text-gray-500 text-sm uppercase tracking-wide'>
                <TrendingUp className='w-4 h-4' />
                Average Score
              </div>
              <div className='text-3xl font-bold text-green-700'>{stats.average}%</div>
              <p className='text-xs text-gray-500'>Mean performance across attempts.</p>
            </CardContent>
          </Card>
          <Card className='shadow-lg rounded-xl transition hover:shadow-xl'>
            <CardContent className='p-6 flex flex-col gap-3'>
              <div className='flex items-center gap-2 text-gray-500 text-sm uppercase tracking-wide'>
                <Trophy className='w-4 h-4' />
                Best Score
              </div>
              <div className='text-3xl font-bold text-yellow-700'>{stats.best}%</div>
              <p className='text-xs text-gray-500'>Highest score achieved.</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Trend */}
        <Card className='shadow-lg rounded-xl'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-2'>
                <TrendingUp className='w-6 h-6 text-blue-600' />
                <h3 className='text-lg font-semibold text-gray-900'>Performance Trend</h3>
              </div>
              <Button variant='outline' size='sm'>
                <RefreshCw className='w-4 h-4 mr-1' /> Refresh
              </Button>
            </div>
            {quizResults.length === 0 ? (
              <div className='text-gray-400 text-sm py-8 text-center'>
                No quiz data yet. Complete quizzes to see your trend.
              </div>
            ) : (
              <div className='relative'>
                {/* Score summary above chart */}
                <div className='flex justify-between items-center mb-2 px-2'>
                  <span className='text-xs text-gray-500'>
                    Latest Score:{' '}
                    <span className='font-bold text-blue-700'>{quizResults[quizResults.length - 1].score}%</span>
                  </span>
                  <span className='text-xs text-gray-500'>
                    Average: <span className='font-bold text-green-700'>{stats.average}%</span>
                  </span>
                  <span className='text-xs text-gray-500'>
                    Best: <span className='font-bold text-yellow-700'>{stats.best}%</span>
                  </span>
                </div>
                {/* Chart container with gradient and shadow */}
                <div className='h-64 bg-gradient-to-br from-blue-50 via-white to-gray-100 rounded-xl border shadow flex items-center justify-center px-4'>
                  <Line data={chartData} options={chartOptions} />
                </div>
                {/* Legend below chart */}
                <div className='flex items-center gap-2 mt-2 px-2'>
                  <span className='inline-block w-3 h-3 rounded-full bg-blue-600 mr-1'></span>
                  <span className='text-xs text-gray-600'>Quiz Score</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Quiz History */}
        <Card className='shadow-lg rounded-xl'>
          <CardContent className='p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>Recent Quiz History</h3>
            {recent.length === 0 ? (
              <div className='text-gray-400 text-sm py-6 text-center'>No recent quizzes yet.</div>
            ) : (
              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead>
                    <tr className='text-left text-gray-500 border-b'>
                      <th className='py-2 font-medium'>Quiz</th>
                      <th className='py-2 font-medium'>Date</th>
                      <th className='py-2 font-medium'>Score</th>
                      <th className='py-2 font-medium'>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.map((r, idx) => {
                      const status =
                        r.score >= 85
                          ? 'Excellent'
                          : r.score >= 70
                            ? 'Good'
                            : r.score >= 50
                              ? 'Average'
                              : 'Needs Review'
                      const statusColor =
                        status === 'Excellent'
                          ? 'bg-emerald-100 text-emerald-700'
                          : status === 'Good'
                            ? 'bg-blue-100 text-blue-700'
                            : status === 'Average'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-rose-100 text-rose-700'
                      return (
                        <tr
                          key={r.id}
                          className={`border-b last:border-none ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                        >
                          <td className='py-2 pr-4 font-medium text-gray-800'>{r.name}</td>
                          <td className='py-2 pr-4 text-gray-600'>{formatDate(r.date)}</td>
                          <td className='py-2 pr-4 text-gray-800'>{r.score}%</td>
                          <td className='py-2'>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor}`}>{status}</span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProgressPage
