
import React from "react";
import { Button } from "./ui/button";
import { UserIcon, BookOpen, BarChart3, LogIn, UserPlus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Header() {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  if (isAuthPage) return null;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-algebra-800 font-bold text-2xl flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              AlgebraAide
            </Link>

            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li className="row-span-3">
                        <Link to="/#learn" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-algebra-500 to-algebra-700 p-6 no-underline outline-none focus:shadow-md">
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            Interactive Learning
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Master algebra concepts through visual demonstrations and step-by-step guidance
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Practice</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li className="row-span-3">
                        <Link to="/#practice" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-algebra-500 to-algebra-700 p-6 no-underline outline-none focus:shadow-md">
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            Adaptive Quizzes
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Test your knowledge with quizzes that adapt to your skill level
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <LogIn className="mr-2 h-4 w-4" />
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="default" size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
