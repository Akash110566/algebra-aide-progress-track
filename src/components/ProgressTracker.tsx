
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { CheckCircle, BookOpen, AlertTriangle, Clock } from "lucide-react";

interface ProgressData {
  topic: string;
  accuracy: number;
  questionsAttempted: number;
  lastPracticed: string;
  mastery: "beginner" | "intermediate" | "advanced";
}

export function ProgressTracker() {
  // Mock progress data - in a real app, this would come from user state/database
  const progressData: ProgressData[] = [
    {
      topic: "Quadratic Equations",
      accuracy: 85,
      questionsAttempted: 12,
      lastPracticed: "Today",
      mastery: "intermediate"
    },
    {
      topic: "Linear Equations",
      accuracy: 92,
      questionsAttempted: 25,
      lastPracticed: "Yesterday",
      mastery: "advanced"
    },
    {
      topic: "Factoring",
      accuracy: 68,
      questionsAttempted: 8,
      lastPracticed: "Last week",
      mastery: "beginner"
    }
  ];
  
  const getMasteryColor = (mastery: string) => {
    switch (mastery) {
      case "beginner": return "bg-yellow-600";
      case "intermediate": return "bg-blue-600";
      case "advanced": return "bg-green-600";
      default: return "bg-gray-600";
    }
  };
  
  const getRecommendedTopic = () => {
    // Simple logic to recommend the least mastered topic
    if (progressData.length === 0) return null;
    
    const sortedByMastery = [...progressData].sort((a, b) => {
      if (a.mastery === "beginner" && b.mastery !== "beginner") return -1;
      if (a.mastery === "intermediate" && b.mastery === "advanced") return -1;
      if (a.mastery === b.mastery) return a.accuracy - b.accuracy;
      return 1;
    });
    
    return sortedByMastery[0];
  };
  
  const recommendedTopic = getRecommendedTopic();
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-algebra-800 to-algebra-600 text-white">
        <CardTitle className="text-2xl">Your Learning Progress</CardTitle>
        <CardDescription className="text-white/80">
          Track your algebra learning journey
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Summary section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100 flex flex-col items-center justify-center">
            <div className="bg-algebra-100 p-3 rounded-full mb-3">
              <CheckCircle size={24} className="text-algebra-700" />
            </div>
            <h3 className="text-lg font-semibold">Topics Mastered</h3>
            <p className="text-3xl font-bold text-algebra-700">
              {progressData.filter(p => p.mastery === "advanced").length}/{progressData.length}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100 flex flex-col items-center justify-center">
            <div className="bg-algebra-100 p-3 rounded-full mb-3">
              <BookOpen size={24} className="text-algebra-700" />
            </div>
            <h3 className="text-lg font-semibold">Questions Solved</h3>
            <p className="text-3xl font-bold text-algebra-700">
              {progressData.reduce((sum, item) => sum + item.questionsAttempted, 0)}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100 flex flex-col items-center justify-center">
            <div className="bg-algebra-100 p-3 rounded-full mb-3">
              <AlertTriangle size={24} className="text-algebra-700" />
            </div>
            <h3 className="text-lg font-semibold">Overall Accuracy</h3>
            <p className="text-3xl font-bold text-algebra-700">
              {Math.round(progressData.reduce((sum, item) => sum + item.accuracy, 0) / progressData.length)}%
            </p>
          </div>
        </div>
        
        {/* Recommended next topic */}
        {recommendedTopic && (
          <div className="bg-algebra-50 p-4 rounded-lg border border-algebra-200">
            <h3 className="font-semibold text-lg mb-2">Recommended Next Topic</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-algebra-800">{recommendedTopic.topic}</p>
                <p className="text-sm text-muted-foreground">
                  This topic needs your attention based on your current progress
                </p>
              </div>
              <Badge className={`${getMasteryColor(recommendedTopic.mastery)} text-white`}>
                {recommendedTopic.mastery.charAt(0).toUpperCase() + recommendedTopic.mastery.slice(1)}
              </Badge>
            </div>
          </div>
        )}
        
        {/* Detailed topic progress */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg">Topic Progress</h3>
          
          {progressData.map((topic, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{topic.topic}</h4>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    Last practiced: {topic.lastPracticed}
                  </div>
                </div>
                <Badge className={`${getMasteryColor(topic.mastery)} text-white`}>
                  {topic.mastery.charAt(0).toUpperCase() + topic.mastery.slice(1)}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <Progress value={topic.accuracy} className="h-2" />
                </div>
                <span className="text-sm font-medium">{topic.accuracy}%</span>
              </div>
              
              <div className="text-sm text-muted-foreground">
                {topic.questionsAttempted} questions attempted
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
