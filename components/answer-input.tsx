"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Send, Loader2 } from "lucide-react";

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  isSubmitting?: boolean;
  disabled?: boolean;
}

export function AnswerInput({ onSubmit, isSubmitting = false, disabled = false }: AnswerInputProps) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    if (answer.trim() && !isSubmitting) {
      onSubmit(answer.trim());
      setAnswer("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="relative">
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer here... (Ctrl+Enter to submit)"
              className="min-h-[150px] resize-none pr-12 bg-background"
              disabled={disabled || isSubmitting}
            />
            <button
              type="button"
              className="absolute right-3 top-3 p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
              title="Voice input (coming soon)"
              disabled
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Tip: Be specific and include relevant technical details
            </p>
            <Button
              onClick={handleSubmit}
              disabled={!answer.trim() || isSubmitting || disabled}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Evaluating...
                </>
              ) : (
                <>
                  Submit Answer
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
