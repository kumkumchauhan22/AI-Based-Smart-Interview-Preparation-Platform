"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Question } from "@/lib/mock-data";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
}

const difficultyColors = {
  easy: { bg: "bg-secondary/10", text: "text-secondary", border: "border-secondary/30" },
  medium: { bg: "bg-warning/10", text: "text-warning", border: "border-warning/30" },
  hard: { bg: "bg-destructive/10", text: "text-destructive", border: "border-destructive/30" },
};

const difficultyLabels = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export function QuestionCard({ question, questionNumber, totalQuestions }: QuestionCardProps) {
  const colors = difficultyColors[question.difficulty];

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">
              Question {questionNumber} of {totalQuestions}
            </span>
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium border",
                colors.bg,
                colors.text,
                colors.border
              )}
            >
              {difficultyLabels[question.difficulty]}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            {question.skillName}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-lg lg:text-xl font-medium text-card-foreground leading-relaxed">
          {question.text}
        </p>
      </CardContent>
    </Card>
  );
}
