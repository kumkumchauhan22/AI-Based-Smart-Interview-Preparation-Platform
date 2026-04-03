"use client";

import { useAppStore } from "@/lib/store";
import { ResumeUpload } from "@/components/resume-upload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, MessageSquare, TrendingUp, Award, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { resumeUploaded, skills, performanceData } = useAppStore();
  
  const selectedSkillsCount = skills.filter(s => s.selected).length;
  const averageScore = performanceData.length > 0 
    ? Math.round(performanceData.reduce((acc, p) => acc + p.score, 0) / performanceData.length)
    : 0;

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Welcome back! 
          </h1>
          <p className="text-muted-foreground">
            {resumeUploaded 
              ? "Ready to continue your interview preparation journey?"
              : "Let's get started with your interview preparation journey."}
          </p>
        </div>

        {/* Resume Upload */}
        <div className="mb-8">
          <ResumeUpload />
        </div>

        {/* Quick Stats */}
        {resumeUploaded && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">{selectedSkillsCount}</p>
                    <p className="text-sm text-muted-foreground">Skills Detected</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">
                      {performanceData.reduce((acc, p) => acc + p.questionsAttempted, 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">Questions Answered</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">{averageScore}%</p>
                    <p className="text-sm text-muted-foreground">Average Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">
                      {performanceData.filter(p => p.score >= 80).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Skills Mastered</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        {resumeUploaded && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card border-border group hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-card-foreground">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  Review Your Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  View and select the skills you want to practice for your interview.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard/skills">
                    View Skills
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border group hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-card-foreground">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-5 h-5 text-secondary" />
                  </div>
                  Start Interview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Practice with AI-generated interview questions based on your skills.
                </p>
                <Button asChild className="w-full">
                  <Link href="/dashboard/interview">
                    Start Practice
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border group hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-card-foreground">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  View Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Check your performance analytics and identify areas for improvement.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard/results">
                    View Analytics
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Motivational Message */}
        {!resumeUploaded && (
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                Ready to ace your next interview?
              </h3>
              <p className="text-muted-foreground mb-4">
                Upload your resume above to get personalized interview questions 
                based on your unique skills and experience.
              </p>
              <p className="text-sm text-primary font-medium">
                You&apos;re doing great by taking this step!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
