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
        <section className="bg-gradient-to-r from-algebra-600 to-algebra-400 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Unlock Your Math Potential with Visual Learning
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Master algebra through interactive visualizations, adaptive quizzes, and personalized progress tracking.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="bg-white text-algebra-800 hover:bg-gray-100 animate-fade-in"
                  onClick={() => document.getElementById('learn')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/10 animate-fade-in"
                  onClick={() => document.getElementById('practice')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Take a Quiz
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How AlgebraAide Helps You Excel</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="bg-algebra-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-10 w-10 text-algebra-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Visual Learning</h3>
                <p className="text-gray-600">
                  See algebra concepts come to life with interactive visualizations that make complex ideas clear and intuitive.
                </p>
              </div>
              
              <div className="text-center p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="bg-algebra-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PenTool className="h-10 w-10 text-algebra-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Adaptive Practice</h3>
                <p className="text-gray-600">
                  Take quizzes that adjust to your skill level, providing the right challenge at the right time.
                </p>
              </div>
              
              <div className="text-center p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="bg-algebra-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <LineChart className="h-10 w-10 text-algebra-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Progress Tracking</h3>
                <p className="text-gray-600">
                  Monitor your improvement over time with detailed progress reports that show where to focus your efforts.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section id="learn" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Learn Quadratic Equations</h2>
            <div className="max-w-4xl mx-auto">
              <QuadraticExplainer />
            </div>
          </div>
        </section>
        
        <section id="practice" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Test Your Knowledge</h2>
            <div className="max-w-4xl mx-auto">
              <QuadraticQuiz />
            </div>
          </div>
        </section>
        
        <section id="progress" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Your Learning Progress</h2>
            <div className="max-w-4xl mx-auto">
              <ProgressTracker />
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-algebra-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <div className="font-bold text-2xl mb-2">AlgebraAide</div>
              <div className="text-white/70">Your personalized math tutor</div>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#learn" className="block text-white/70 hover:text-white">Learn</a>
                <a href="#practice" className="block text-white/70 hover:text-white">Practice</a>
                <a href="#progress" className="block text-white/70 hover:text-white">Progress</a>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="text-white/70">
                Need help? Email us at<br />
                <a href="mailto:support@algebraaide.com" className="text-white hover:underline">
                  support@algebraaide.com
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/70">
            © {new Date().getFullYear()} AlgebraAide. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
