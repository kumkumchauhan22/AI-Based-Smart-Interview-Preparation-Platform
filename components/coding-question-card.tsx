"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { CodingQuestion } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface CodingQuestionCardProps {
  question: CodingQuestion;
  onSubmit: (code: string, language: string) => void;
  isSubmitting?: boolean;
}

export function CodingQuestionCard({ question, onSubmit, isSubmitting }: CodingQuestionCardProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(question.languages[0]);
  const [code, setCode] = useState(question.starterCode[selectedLanguage] || "");
  const [testResults, setTestResults] = useState<{ passed: boolean; output: string; expected: string }[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setCode(question.starterCode[language] || "");
    setTestResults([]);
  };

  const handleRunTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    // Simulate running tests
    const results = question.testCases.map((testCase, index) => {
      // Simple simulation - in a real app, this would call an API
      const passed = Math.random() > 0.3; // 70% pass rate for demo
      return {
        passed,
        output: passed ? testCase.expectedOutput : "Wrong output",
        expected: testCase.expectedOutput
      };
    });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    setTestResults(results);
    setIsRunning(false);
  };

  const handleSubmit = () => {
    onSubmit(code, selectedLanguage);
  };

  const handleReset = () => {
    setCode(question.starterCode[selectedLanguage] || "");
    setTestResults([]);
  };

  const allTestsPassed = testResults.length > 0 && testResults.every(result => result.passed);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-card-foreground mb-2">
              Coding Challenge
            </CardTitle>
            <CardDescription className="text-muted-foreground mb-4">
              {question.description}
            </CardDescription>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="capitalize">
                {question.difficulty}
              </Badge>
              <Badge variant="outline">
                {question.skillName}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Language Selector */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-card-foreground">Language:</label>
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {question.languages.map((lang) => (
                <SelectItem key={lang} value={lang} className="capitalize">
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Code Editor */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-card-foreground">Code:</label>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your code here..."
            className="min-h-64 font-mono text-sm"
            disabled={isSubmitting}
          />
        </div>

        {/* Test Cases */}
        {question.testCases.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-card-foreground">Test Cases:</h4>
            <div className="space-y-2">
              {question.testCases.map((testCase, index) => (
                <div key={index} className="p-3 bg-muted/30 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Test Case {index + 1}</span>
                    {testResults[index] && (
                      <div className="flex items-center gap-1">
                        {testResults[index].passed ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div><strong>Input:</strong> {testCase.input}</div>
                    <div><strong>Expected:</strong> {testCase.expectedOutput}</div>
                    {testResults[index] && (
                      <div className={cn(
                        "font-medium",
                        testResults[index].passed ? "text-green-600" : "text-red-600"
                      )}>
                        <strong>Your Output:</strong> {testResults[index].output}
                      </div>
                    )}
                    {testCase.explanation && (
                      <div className="text-muted-foreground italic">
                        {testCase.explanation}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            onClick={handleRunTests}
            disabled={isRunning || isSubmitting}
            variant="outline"
            size="sm"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Running Tests...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Run Tests
              </>
            )}
          </Button>

          <Button
            onClick={handleReset}
            disabled={isRunning || isSubmitting}
            variant="outline"
            size="sm"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Code
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting || !allTestsPassed}
            size="sm"
            className="ml-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Solution"
            )}
          </Button>
        </div>

        {!allTestsPassed && testResults.length > 0 && (
          <p className="text-sm text-muted-foreground">
            All tests must pass before you can submit your solution.
          </p>
        )}
      </CardContent>
    </Card>
  );
        }
