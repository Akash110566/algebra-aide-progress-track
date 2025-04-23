
import React from "react";
import { Button } from "./ui/button";
import { UserIcon, BookOpen, BarChart3 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  if (isAuthPage) return null;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-algebra-800 font-bold text-2xl mr-2">AlgebraAide</Link>
          <div className="hidden sm:block text-sm text-muted-foreground">Your personalized math tutor</div>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/#learn" className="flex items-center text-sm font-medium hover:text-algebra-700 transition-colors">
            <BookOpen className="h-4 w-4 mr-1" />
            Learn
          </Link>
          <Link to="/#practice" className="flex items-center text-sm font-medium hover:text-algebra-700 transition-colors">
            <BarChart3 className="h-4 w-4 mr-1" />
            Practice
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="outline" size="sm">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button variant="default" size="sm">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
