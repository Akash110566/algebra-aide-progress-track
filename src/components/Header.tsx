
import React from "react";
import { Button } from "./ui/button";
import { UserIcon, BookOpen, BarChart3 } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-algebra-800 font-bold text-2xl mr-2">AlgebraAide</div>
          <div className="hidden sm:block text-sm text-muted-foreground">Your personalized math tutor</div>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <a href="#learn" className="flex items-center text-sm font-medium hover:text-algebra-700 transition-colors">
            <BookOpen className="h-4 w-4 mr-1" />
            Learn
          </a>
          <a href="#practice" className="flex items-center text-sm font-medium hover:text-algebra-700 transition-colors">
            <BarChart3 className="h-4 w-4 mr-1" />
            Practice
          </a>
        </div>
        
        <div>
          <Button variant="outline" size="sm" className="flex items-center">
            <UserIcon className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Your Progress</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
