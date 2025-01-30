"use client"

import { Metadata } from "next"
import KNNDemo from "@/components/knn-demo"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-24">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            K-Nearest Neighbors Classification Algorithm
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            An interactive demonstration of the K-Nearest Neighbors (KNN) classification algorithm.
            Create your own dataset and see how KNN makes predictions in real-time.
          </p>
        </div>

        <div className="flex justify-center">
          <KNNDemo />
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-semibold">How to Use</h2>
          <div className="text-muted-foreground space-y-2">
            <p>
              1. Select a class (A or B) using the buttons above the canvas
            </p>
            <p>
              2. Click anywhere on the canvas to add training points of the selected class
            </p>
            <p>
              3. Use the slider to adjust the number of neighbors (K) considered for classification
            </p>
            <p>
              4. Hold Shift and click to place a prediction point - it will be classified based on its K nearest neighbors
            </p>
            <p>
              5. Use the Clear All button to reset the demonstration
            </p>
            
            <p>
             &copy; 2025 Adrian Statescu  
            </p>

          </div>
        </div>
      </div>
    </main>
  )
}
