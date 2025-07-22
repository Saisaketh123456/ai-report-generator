import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Brain, Download, Edit, Zap, Clock } from "lucide-react";
import heroImage from "@/assets/hero-report.jpg";

interface LandingPageProps {
  onGetStarted?: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps = {}) => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">ReportGen AI</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost">Sign In</Button>
            <Button variant="hero" onClick={onGetStarted}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Generate Professional 
                <span className="text-primary"> Project Reports</span> 
                in Minutes
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Transform your project ideas into comprehensive technical documentation 
                with AI-powered report generation. From abstract to implementation, 
                create publication-ready reports effortlessly.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg" onClick={onGetStarted}>
                <Zap className="mr-2 h-5 w-5" />
                Start Generating
              </Button>
              <Button variant="outline" size="lg" className="text-lg">
                <FileText className="mr-2 h-5 w-5" />
                View Sample Report
              </Button>
            </div>
            <div className="flex items-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Generate in 2 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                <span>Export to Word</span>
              </div>
            </div>
          </div>
          <div className="relative animate-slide-up">
            <div className="absolute inset-0 bg-gradient-hero rounded-lg blur-2xl opacity-20"></div>
            <img 
              src={heroImage} 
              alt="AI Report Generation" 
              className="relative rounded-lg shadow-elegant w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-academic-light/30 rounded-3xl mx-4 mb-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered system generates comprehensive project reports following 
            academic and professional standards.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">1. Input Your Project</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Simply enter your project title and problem statement. Our AI understands 
                your requirements and project scope.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">2. AI Generation</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Advanced NLP algorithms generate structured content including methodology, 
                implementation details, and relevant diagrams.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">3. Edit & Export</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Review and customize generated content, then export your 
                professional report as a Word document.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
            Ready to Create Your First Report?
          </h3>
          <p className="text-xl text-muted-foreground">
            Join thousands of students and professionals who save hours on documentation.
          </p>
          <Button variant="hero" size="lg" className="text-lg animate-glow" onClick={onGetStarted}>
            <Brain className="mr-2 h-5 w-5" />
            Start Generating Reports
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">ReportGen AI</span>
          </div>
          <p className="text-muted-foreground">
            Transforming project documentation with artificial intelligence
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;