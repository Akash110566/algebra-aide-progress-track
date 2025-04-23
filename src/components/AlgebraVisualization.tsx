
import React, { useState, useEffect } from "react";

interface Point {
  x: number;
  y: number;
}

interface AlgebraVisualizationProps {
  a: number;
  b: number;
  c: number;
  width: number;
  height: number;
}

export function AlgebraVisualization({ a, b, c, width = 600, height = 400 }: AlgebraVisualizationProps) {
  const [points, setPoints] = useState<Point[]>([]);
  const [roots, setRoots] = useState<number[]>([]);
  const [vertex, setVertex] = useState<Point>({ x: 0, y: 0 });
  
  // Calculate the function points and important markers
  useEffect(() => {
    // Calculate the quadratic formula roots
    const discriminant = b * b - 4 * a * c;
    let rootsArr: number[] = [];
    
    if (discriminant >= 0) {
      const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      rootsArr = [root1, root2];
    }
    
    // Calculate vertex
    const vertexX = -b / (2 * a);
    const vertexY = a * vertexX * vertexX + b * vertexX + c;
    setVertex({ x: vertexX, y: vertexY });
    
    setRoots(rootsArr);
    
    // Generate points for the parabola
    const newPoints: Point[] = [];
    const xRange = 10; // Range on either side of vertex
    const step = xRange / 50;
    
    for (let x = vertexX - xRange; x <= vertexX + xRange; x += step) {
      const y = a * x * x + b * x + c;
      newPoints.push({ x, y });
    }
    
    setPoints(newPoints);
  }, [a, b, c]);
  
  // Find scaling factors to fit the graph in our view
  const xValues = points.map(p => p.x);
  const yValues = points.map(p => p.y);
  const minX = Math.min(...xValues, ...roots);
  const maxX = Math.max(...xValues, ...roots);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);
  
  const xRange = maxX - minX || 20;
  const yRange = maxY - minY || 20;
  const xPadding = xRange * 0.1;
  const yPadding = yRange * 0.1;
  
  const xScale = width / (xRange + 2 * xPadding);
  const yScale = height / (yRange + 2 * yPadding);
  
  // Transform coordinates to SVG viewport
  const transformX = (x: number) => (x - minX + xPadding) * xScale;
  const transformY = (y: number) => height - (y - minY + yPadding) * yScale;
  
  // Create the SVG path for the parabola
  const pathData = points.length
    ? `M ${transformX(points[0].x)} ${transformY(points[0].y)} ` +
      points.slice(1).map(p => `L ${transformX(p.x)} ${transformY(p.y)}`).join(" ")
    : "";

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <svg width={width} height={height} className="border border-gray-200 bg-white">
        {/* X and Y axes */}
        <line
          x1="0"
          y1={transformY(0)}
          x2={width}
          y2={transformY(0)}
          stroke="#ccc"
          strokeWidth="1"
        />
        <line
          x1={transformX(0)}
          y1="0"
          x2={transformX(0)}
          y2={height}
          stroke="#ccc"
          strokeWidth="1"
        />
        
        {/* Parabola path */}
        <path d={pathData} fill="none" stroke="rgba(139, 92, 246, 0.8)" strokeWidth="2" />
        
        {/* Roots markers */}
        {roots.map((root, i) => (
          <circle
            key={`root-${i}`}
            cx={transformX(root)}
            cy={transformY(0)}
            r="5"
            fill="rgba(139, 92, 246, 0.8)"
            stroke="white"
            strokeWidth="1"
          />
        ))}
        
        {/* Vertex marker */}
        <circle
          cx={transformX(vertex.x)}
          cy={transformY(vertex.y)}
          r="5"
          fill="rgba(220, 38, 38, 0.8)"
          stroke="white"
          strokeWidth="1"
        />
        
        {/* Add vertex label */}
        <text
          x={transformX(vertex.x) + 10}
          y={transformY(vertex.y) - 10}
          fontSize="12"
          fill="#333"
        >
          Vertex ({vertex.x.toFixed(2)}, {vertex.y.toFixed(2)})
        </text>
        
        {/* Label the roots */}
        {roots.map((root, i) => (
          <text
            key={`root-text-${i}`}
            x={transformX(root)}
            y={transformY(0) + 20}
            fontSize="12"
            fill="#333"
            textAnchor="middle"
          >
            x={root.toFixed(2)}
          </text>
        ))}

        {/* Function label */}
        <text
          x={10}
          y={20}
          fontSize="14"
          fontWeight="bold"
          fill="#333"
        >
          f(x) = {a}x² {b >= 0 ? '+' : ''} {b}x {c >= 0 ? '+' : ''} {c}
        </text>
      </svg>
    </div>
  );
}
