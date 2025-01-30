"use client"

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

interface Point {
  x: number
  y: number
  class: 'A' | 'B'
}

interface PredictionPoint {
  x: number
  y: number
}

const KNNDemo = () => {
  const [points, setPoints] = useState<Point[]>([])
  const [k, setK] = useState(3)
  const [currentClass, setCurrentClass] = useState<'A' | 'B'>('A')
  const [predictPoint, setPredictPoint] = useState<PredictionPoint | null>(null)

  // Calculate distance between two points
  const distance = (p1: { x: number; y: number }, p2: { x: number; y: number }): number => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
  }

  // Make prediction for a point
  const predict = (point: PredictionPoint): 'A' | 'B' | null => {
    if (points.length === 0) return null
    
    // Get K nearest neighbors
    const neighbors = points
      .map(p => ({
        ...p,
        distance: distance(p, point)
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, k)

    // Count votes
    const votes = neighbors.reduce((acc: Record<string, number>, p) => {
      acc[p.class] = (acc[p.class] || 0) + 1
      return acc
    }, {})

    // Return majority class
    const voteCounts = Object.entries(votes) as ['A' | 'B', number][]
    return voteCounts.reduce((a, b) => 
      votes[a[0]] > votes[b[0]] ? a : b
    )[0]
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (e.shiftKey) {
      // Set prediction point
      setPredictPoint({ x, y })
    } else {
      // Add training point
      setPoints([...points, { x, y, class: currentClass }])
    }
  }

  const classColors = {
    'A': 'rgb(239 68 68)', // red
    'B': 'rgb(34 197 94)', // green
  } as const

  const getBorderColor = (predictPoint: PredictionPoint): string => {
    const prediction = predict(predictPoint)
    return prediction ? classColors[prediction] : 'gray'
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>K-Nearest Neighbors Classification</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setCurrentClass('A')}
              className={`${
                currentClass === 'A' ? 'bg-red-500' : 'bg-gray-500'
              }`}
            >
              Class A
            </Button>
            <Button
              onClick={() => setCurrentClass('B')}
              className={`${
                currentClass === 'B' ? 'bg-green-500' : 'bg-gray-500'
              }`}
            >
              Class B
            </Button>
            <Button
              onClick={() => {
                setPoints([])
                setPredictPoint(null)
              }}
              className="bg-gray-500"
            >
              Clear All
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">K neighbors:</span>
            <div className="w-48">
              <Slider
                value={[k]}
                onValueChange={(value) => setK(value[0])}
                min={1}
                max={9}
                step={2}
              />
            </div>
            <span className="text-sm">{k}</span>
          </div>
          <div
            className="border rounded-lg"
            style={{
              width: '600px',
              height: '400px',
              position: 'relative',
              cursor: 'crosshair',
            }}
            onClick={handleCanvasClick}
          >
            {/* Training points */}
            {points.map((point, idx) => (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  left: point.x - 6,
                  top: point.y - 6,
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: classColors[point.class],
                }}
              />
            ))}
            {/* Prediction point */}
            {predictPoint && (
              <div
                style={{
                  position: 'absolute',
                  left: predictPoint.x - 8,
                  top: predictPoint.y - 8,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  border: `3px solid ${getBorderColor(predictPoint)}`,
                  backgroundColor: 'white',
                }}
              />
            )}
          </div>
          <div className="text-sm text-gray-600">
            Click to add training points. Hold Shift and click to add a point to predict.
            The prediction point will be classified based on its K nearest neighbors.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default KNNDemo
