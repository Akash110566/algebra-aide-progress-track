
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { AlertCircle, CheckCircle, HelpCircle, ArrowRight } from "lucide-react";
import { toast } from "../components/ui/use-toast";

interface Question {
  id: number;
  difficulty: 'easy' | 'medium' | 'hard';
  text: string;
  equation: {
    a: number;
    b: number;
    c: number;
  };
  answers: {
    roots?: number[];
    vertex?: { x: number; y: number };
    other?: number | string;
  };
  answerType: 'roots' | 'vertex' | 'other';
  hints: string[];
}

export function QuadraticQuiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{[key: string]: string}>({});
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Generate questions based on difficulty
  useEffect(() => {
    const generateQuestions = () => {
      const easyQuestions: Question[] = [
        {
          id: 1,
          difficulty: 'easy',
          text: "Find the roots of the quadratic equation:",
          equation: { a: 1, b: 0, c: -4 },
          answers: { roots: [2, -2] },
          answerType: 'roots',
          hints: [
            "When c is negative and b is 0, the roots are symmetric around the origin.",
            "Try using the quadratic formula: x = (-b ± √(b² - 4ac)) / (2a)",
            "Since b=0, the formula simplifies to x = ±√(-c/a)"
          ]
        },
        {
          id: 2,
          difficulty: 'easy',
          text: "Find the vertex of the quadratic function:",
          equation: { a: 1, b: -6, c: 8 },
          answers: { vertex: { x: 3, y: -1 } },
          answerType: 'vertex',
          hints: [
            "The x-coordinate of the vertex is x = -b/(2a)",
            "After finding x, calculate y by substituting back into the equation",
            "For this equation, x = -(-6)/(2*1) = 3"
          ]
        }
      ];
      
      const mediumQuestions: Question[] = [
        {
          id: 3,
          difficulty: 'medium',
          text: "Find the roots of the quadratic equation:",
          equation: { a: 2, b: -7, c: 3 },
          answers: { roots: [3, 0.5] },
          answerType: 'roots',
          hints: [
            "Use the quadratic formula: x = (-b ± √(b² - 4ac)) / (2a)",
            "Calculate the discriminant first: b² - 4ac = (-7)² - 4*2*3",
            "After finding the discriminant, substitute into the formula to find the two roots"
          ]
        },
        {
          id: 4,
          difficulty: 'medium',
          text: "Find the y-intercept of the quadratic function:",
          equation: { a: -2, b: 4, c: 1 },
          answers: { other: 1 },
          answerType: 'other',
          hints: [
            "The y-intercept is where the function crosses the y-axis (x = 0)",
            "To find the y-intercept, substitute x = 0 into the function",
            "For f(x) = ax² + bx + c, the y-intercept is simply c"
          ]
        }
      ];
      
      const hardQuestions: Question[] = [
        {
          id: 5,
          difficulty: 'hard',
          text: "If f(x) = ax² + bx + c has roots at x = -3 and x = 2, and f(1) = 8, find the value of a:",
          equation: { a: 2, b: 2, c: -12 },
          answers: { other: 2 },
          answerType: 'other',
          hints: [
            "If the roots are -3 and 2, then f(x) = a(x+3)(x-2)",
            "Expand this expression to get f(x) = a(x² + x - 6)",
            "Since f(1) = 8, substitute x = 1 to get a(1 + 1 - 6) = 8, which gives a(−4) = 8"
          ]
        },
        {
          id: 6,
          difficulty: 'hard',
          text: "For what value of k will the equation x² - kx + 4 = 0 have exactly one solution?",
          equation: { a: 1, b: -4, c: 4 },
          answers: { other: 4 },
          answerType: 'other',
          hints: [
            "A quadratic equation has exactly one solution when its discriminant equals zero",
            "For ax² + bx + c, the discriminant is b² - 4ac",
            "Substitute a=1, c=4 and set b² - 4ac = 0 to find k"
          ]
        }
      ];
      
      let allQuestions: Question[] = [];
      
      switch (difficulty) {
        case 'easy':
          allQuestions = [...easyQuestions];
          break;
        case 'medium':
          allQuestions = [...easyQuestions, ...mediumQuestions];
          break;
        case 'hard':
          allQuestions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];
          break;
      }
      
      // Shuffle the questions
      return allQuestions.sort(() => Math.random() - 0.5).slice(0, 3);
    };
    
    setQuestions(generateQuestions());
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowHint(false);
    setHintIndex(0);
    setIsAnswerCorrect(null);
    setQuizCompleted(false);
  }, [difficulty]);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const checkAnswer = () => {
    if (!currentQuestion) return;
    
    setTotalAttempts(totalAttempts + 1);
    
    const userAnswer = userAnswers[`question-${currentQuestion.id}`] || '';
    let correct = false;
    
    if (currentQuestion.answerType === 'roots') {
      // For roots, we'll accept either order and check if both values are correct
      const answerRoots = currentQuestion.answers.roots || [];
      const userRoots = userAnswer.split(',').map(val => parseFloat(val.trim()));
      
      if (userRoots.length === answerRoots.length) {
        // Check if all roots match (in any order)
        const sortedUserRoots = [...userRoots].sort((a, b) => a - b);
        const sortedAnswerRoots = [...answerRoots].sort((a, b) => a - b);
        
        correct = sortedUserRoots.every((val, idx) => 
          Math.abs(val - sortedAnswerRoots[idx]) < 0.1
        );
      }
    } else if (currentQuestion.answerType === 'vertex') {
      // For vertex, check if both x and y are correct
      const answerVertex = currentQuestion.answers.vertex;
      const userVertex = userAnswer.split(',').map(val => parseFloat(val.trim()));
      
      if (userVertex.length === 2 && answerVertex) {
        correct = 
          Math.abs(userVertex[0] - answerVertex.x) < 0.1 && 
          Math.abs(userVertex[1] - answerVertex.y) < 0.1;
      }
    } else if (currentQuestion.answerType === 'other') {
      // For other types, just check if the answer matches
      const answerValue = currentQuestion.answers.other;
      const userValue = parseFloat(userAnswer);
      
      if (!isNaN(userValue) && answerValue !== undefined) {
        if (typeof answerValue === 'number') {
          correct = Math.abs(userValue - answerValue) < 0.1;
        } else {
          correct = userValue.toString() === answerValue.toString();
        }
      }
    }
    
    setIsAnswerCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "Great job, you got it right!",
        variant: "default",
      });
    } else {
      // Show hint if incorrect
      setShowHint(true);
      toast({
        title: "Not quite right",
        description: "Check the hint for help",
        variant: "destructive",
      });
    }
  };
  
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowHint(false);
      setHintIndex(0);
      setIsAnswerCorrect(null);
    } else {
      setQuizCompleted(true);
      
      // Determine next difficulty level based on score
      const successRate = score / totalAttempts;
      if (successRate > 0.8 && difficulty !== 'hard') {
        // Increase difficulty
        setDifficulty(difficulty === 'easy' ? 'medium' : 'hard');
        toast({
          title: "Level up!",
          description: `You've mastered this level. Moving you to ${difficulty === 'easy' ? 'medium' : 'hard'} difficulty!`,
          variant: "default",
        });
      } else if (successRate < 0.4 && difficulty !== 'easy') {
        // Decrease difficulty
        setDifficulty(difficulty === 'hard' ? 'medium' : 'easy');
        toast({
          title: "Adjusting difficulty",
          description: `Let's practice with some ${difficulty === 'hard' ? 'medium' : 'easy'} problems next.`,
          variant: "default",
        });
      }
    }
  };
  
  const showNextHint = () => {
    if (currentQuestion && hintIndex < currentQuestion.hints.length - 1) {
      setHintIndex(hintIndex + 1);
    }
  };
  
  const getPlaceholder = () => {
    if (!currentQuestion) return '';
    
    switch (currentQuestion.answerType) {
      case 'roots':
        return 'Enter roots separated by comma, e.g.: 2, -2';
      case 'vertex':
        return 'Enter vertex as x,y, e.g.: 3, -1';
      case 'other':
        return 'Enter your answer';
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowHint(false);
    setHintIndex(0);
    setIsAnswerCorrect(null);
    setQuizCompleted(false);
    setScore(0);
    setTotalAttempts(0);
  };
  
  if (!currentQuestion && !quizCompleted) {
    return <div>Loading questions...</div>;
  }
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-algebra-700 to-algebra-500 text-white">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl">Quadratic Equations Quiz</CardTitle>
            <CardDescription className="text-white/80">
              {quizCompleted ? "Quiz Results" : `Question ${currentQuestionIndex + 1} of ${questions.length}`}
            </CardDescription>
          </div>
          <Badge className={`${
            difficulty === 'easy' ? 'bg-green-600' : 
            difficulty === 'medium' ? 'bg-yellow-600' : 'bg-red-600'
          } text-white`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {!quizCompleted ? (
          <>
            <Progress value={(currentQuestionIndex / questions.length) * 100} className="h-2 bg-algebra-100" />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{currentQuestion.text}</h3>
              <p className="text-xl font-bold">
                f(x) = {currentQuestion.equation.a}x² 
                {currentQuestion.equation.b >= 0 ? ' + ' : ' '}
                {currentQuestion.equation.b}x 
                {currentQuestion.equation.c >= 0 ? ' + ' : ' '}
                {currentQuestion.equation.c}
              </p>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Answer:
                </label>
                <Input
                  placeholder={getPlaceholder()}
                  value={userAnswers[`question-${currentQuestion.id}`] || ''}
                  onChange={(e) => setUserAnswers({
                    ...userAnswers,
                    [`question-${currentQuestion.id}`]: e.target.value
                  })}
                  className={isAnswerCorrect === null ? '' : isAnswerCorrect ? 'border-green-500' : 'border-red-500'}
                />
              </div>
            </div>
            
            {showHint && (
              <div className="bg-algebra-50 p-4 rounded-lg border border-algebra-200">
                <div className="flex items-start space-x-2">
                  <div className="mt-1">
                    <HelpCircle size={20} className="text-algebra-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-algebra-800">Hint:</h4>
                    <p>{currentQuestion.hints[hintIndex]}</p>
                    
                    {hintIndex < currentQuestion.hints.length - 1 && (
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="p-0 h-auto text-algebra-600 mt-2"
                        onClick={showNextHint}
                      >
                        Need another hint?
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-6">
            <div className="text-center py-4">
              <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
              <p className="text-lg">
                You scored <span className="font-bold text-algebra-600">{score}</span> out of <span className="font-bold">{questions.length}</span>
              </p>
              
              <div className="mt-4">
                <Progress 
                  value={(score / questions.length) * 100} 
                  className="h-3 bg-algebra-100"
                />
              </div>
              
              <p className="mt-6 text-muted-foreground">
                {score === questions.length 
                  ? "Perfect score! You've mastered these concepts!" 
                  : score >= questions.length / 2
                    ? "Good job! Keep practicing to improve further."
                    : "Keep practicing! You'll get better with time."}
              </p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={resetQuiz}
                className="bg-algebra-600 hover:bg-algebra-700"
              >
                Take Another Quiz
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      
      {!quizCompleted && (
        <CardFooter className="border-t p-6 flex justify-between">
          <div>
            {!showHint && !isAnswerCorrect && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowHint(true)}
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                Show Hint
              </Button>
            )}
          </div>
          
          <div className="flex space-x-2">
            {isAnswerCorrect === null ? (
              <Button 
                onClick={checkAnswer}
                className="bg-algebra-600 hover:bg-algebra-700"
              >
                Check Answer
              </Button>
            ) : (
              <Button 
                onClick={nextQuestion}
                className="bg-algebra-600 hover:bg-algebra-700"
              >
                {currentQuestionIndex < questions.length - 1 ? (
                  <>
                    Next Question
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  "Finish Quiz"
                )}
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
