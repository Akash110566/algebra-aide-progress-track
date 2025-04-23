
import React, { useState } from "react";
import { AlgebraVisualization } from "./AlgebraVisualization";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { ArrowRight } from "lucide-react";

export function QuadraticExplainer() {
  const [currentStep, setCurrentStep] = useState(1);
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(-4);
  
  const totalSteps = 4;
  
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-algebra-600 to-algebra-400 text-white">
        <CardTitle className="text-2xl">Understanding Quadratic Equations</CardTitle>
        <CardDescription className="text-white/80">
          A visual guide to the equation f(x) = ax² + bx + c
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-center">
          <AlgebraVisualization a={a} b={b} c={c} width={600} height={400} />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              a = {a}
            </label>
            <Slider 
              value={[a]} 
              min={-3} 
              max={3} 
              step={0.1} 
              onValueChange={(value) => setA(value[0])} 
              className="py-4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              b = {b}
            </label>
            <Slider 
              value={[b]} 
              min={-10} 
              max={10} 
              step={0.5} 
              onValueChange={(value) => setB(value[0])} 
              className="py-4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              c = {c}
            </label>
            <Slider 
              value={[c]} 
              min={-10} 
              max={10} 
              step={0.5} 
              onValueChange={(value) => setC(value[0])} 
              className="py-4"
            />
          </div>
        </div>
        
        <div className="bg-algebra-50 p-4 rounded-lg border border-algebra-200">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-algebra-800">Step 1: The Basic Structure</h3>
              <p>A quadratic equation has the form <strong>f(x) = ax² + bx + c</strong>, where:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>a</strong> determines if the parabola opens up (a &gt; 0) or down (a &lt; 0)</li>
                <li><strong>b</strong> affects how the parabola is positioned horizontally</li>
                <li><strong>c</strong> is the y-intercept (where the parabola crosses the y-axis)</li>
              </ul>
              <p>Try adjusting the sliders above to see how each coefficient affects the graph!</p>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-algebra-800">Step 2: Finding the Roots</h3>
              <p>The <strong>roots</strong> (or x-intercepts) are where the parabola crosses the x-axis (where y = 0).</p>
              <p>We can find these by solving <strong>ax² + bx + c = 0</strong> using the quadratic formula:</p>
              <div className="bg-white p-3 rounded flex justify-center">
                <span className="text-lg">x = (-b ± √(b² - 4ac)) / (2a)</span>
              </div>
              <p>The term <strong>b² - 4ac</strong> is called the discriminant:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>If it's positive, there are two real roots</li>
                <li>If it's zero, there is exactly one root (the parabola touches the x-axis)</li>
                <li>If it's negative, there are no real roots (the parabola doesn't cross the x-axis)</li>
              </ul>
              <p>Try setting a = 1, b = 0, c = -4 to see a parabola with two roots at x = -2 and x = 2.</p>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-algebra-800">Step 3: The Vertex</h3>
              <p>The <strong>vertex</strong> is the highest or lowest point of the parabola.</p>
              <p>We can find the x-coordinate of the vertex using the formula:</p>
              <div className="bg-white p-3 rounded flex justify-center">
                <span className="text-lg">x = -b / (2a)</span>
              </div>
              <p>To find the y-coordinate, we substitute this x-value back into the original equation.</p>
              <p>The vertex gives us important information:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>If a &gt; 0, the vertex is the minimum point</li>
                <li>If a &lt; 0, the vertex is the maximum point</li>
              </ul>
              <p>Try setting a = -1, b = 0, c = 4 to see a parabola with its vertex as a maximum point.</p>
            </div>
          )}
          
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-algebra-800">Step 4: Applications</h3>
              <p>Quadratic equations appear in many real-world scenarios:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Physics:</strong> The path of a projectile is a parabola</li>
                <li><strong>Economics:</strong> Finding optimal price points</li>
                <li><strong>Engineering:</strong> Building structures like arches</li>
                <li><strong>Optimization:</strong> Finding maximum or minimum values</li>
              </ul>
              <p>For example, if you throw a ball upward, its height can be modeled as h(t) = -4.9t² + v₀t + h₀, where v₀ is the initial velocity and h₀ is the initial height.</p>
              <p>Now that you understand the basics, you're ready to try some practice problems!</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </div>
          <Button 
            onClick={nextStep}
            disabled={currentStep === totalSteps}
            className="bg-algebra-600 hover:bg-algebra-700"
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
