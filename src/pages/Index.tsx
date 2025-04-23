
import React from "react";
import { Header } from "@/components/Header";
import { QuadraticExplainer } from "@/components/QuadraticExplainer";
import { QuadraticQuiz } from "@/components/QuadraticQuiz";
import { ProgressTracker } from "@/components/ProgressTracker";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, PenTool, LineChart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-algebra-600 to-algebra-400 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Master Algebra with Visual Learning</h1>
              <p className="text-xl mb-8">
                Visualize equations, practice with adaptive quizzes, and track your progress to ace your exams.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="bg-white text-algebra-800 hover:bg-gray-100"
                  onClick={() => document.getElementById('learn')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => document.getElementById('practice')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Take a Quiz
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How AlgebraAide Helps You Excel</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-algebra-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-algebra-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Visual Learning</h3>
                <p className="text-gray-600">
                  See algebra concepts come to life with interactive visualizations that make complex ideas clear and intuitive.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-algebra-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PenTool className="h-8 w-8 text-algebra-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Adaptive Practice</h3>
                <p className="text-gray-600">
                  Take quizzes that adjust to your skill level, providing the right challenge at the right time to maximize learning.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-algebra-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LineChart className="h-8 w-8 text-algebra-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                <p className="text-gray-600">
                  Monitor your improvement over time with detailed progress reports that show where to focus your efforts.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Learning section */}
        <section id="learn" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Learn Quadratic Equations</h2>
            <div className="max-w-4xl mx-auto">
              <QuadraticExplainer />
            </div>
          </div>
        </section>
        
        {/* Quiz section */}
        <section id="practice" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Test Your Knowledge</h2>
            <div className="max-w-4xl mx-auto">
              <QuadraticQuiz />
            </div>
          </div>
        </section>
        
        {/* Progress section */}
        <section id="progress" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Your Learning Progress</h2>
            <div className="max-w-4xl mx-auto">
              <ProgressTracker />
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-algebra-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <div className="font-bold text-xl">AlgebraAide</div>
              <div className="text-sm text-white/70">Your personalized math tutor</div>
            </div>
            
            <div className="text-sm text-white/70">
              © {new Date().getFullYear()} AlgebraAide. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
