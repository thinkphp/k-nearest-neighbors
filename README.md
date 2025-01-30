# K-Nearest-Neighbors Classification

An interactive React component that demonstrates K-Nearest Neighbors (KNN) classification algorithm through a visual interface. Users can create a classification dataset and see real-time predictions based on the KNN algorithm.

## Features

- Interactive point placement for two different classes
- Adjustable K value (number of neighbors) using a slider
- Real-time prediction visualization
- Clear all functionality to reset the demo
- Shift-click functionality for prediction points
- Visual feedback with color-coded classes

## Installation

1. Ensure you have the required dependencies:
   ```bash
   npm install @/components/ui/card @/components/ui/button @/components/ui/slider
   ```

2. Import the component into your React application:
   ```jsx
   import KNNDemo from './path/to/KNNDemo';
   ```

## Usage

```jsx
function App() {
  return (
    <div>
      <KNNDemo />
    </div>
  );
}
```

## How it Works

### Core Features

1. **Training Points**
   - Click anywhere on the canvas to add training points
   - Toggle between Class A (red) and Class B (green) using the buttons
   - Points are stored with their x, y coordinates and class label

2. **Prediction**
   - Hold Shift and click to place a prediction point
   - The algorithm finds K nearest neighbors
   - Classification is determined by majority vote among neighbors

3. **K Value Adjustment**
   - Use the slider to adjust the number of neighbors (K)
   - K values are restricted to odd numbers (1-9) to avoid ties

### Algorithm Implementation

The KNN algorithm is implemented through these key functions:

1. **Distance Calculation**
   ```javascript
   const distance = (p1, p2) => {
     return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
   };
   ```

2. **Prediction Logic**
   ```javascript
   const predict = (point) => {
     // Get K nearest neighbors
     const neighbors = points
       .map(p => ({...p, distance: distance(p, point)}))
       .sort((a, b) => a.distance - b.distance)
       .slice(0, k);

     // Count votes and return majority class
     const votes = neighbors.reduce((acc, p) => {
       acc[p.class] = (acc[p.class] || 0) + 1;
       return acc;
     }, {});

     return Object.entries(votes).reduce((a, b) =>
       (votes[a] > votes[b]) ? a : b
     )[0];
   };
   ```

## Styling

The component uses Tailwind CSS classes and custom styling for visual elements:
- Card layout for clean presentation
- Color-coded points (red for Class A, green for Class B)
- White prediction point with colored border based on classification
- Responsive canvas size (600x400 pixels)

## Props

The component currently doesn't accept any props but could be extended to support:
- Custom canvas dimensions
- Different color schemes
- Custom number of classes
- Initial dataset

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT
