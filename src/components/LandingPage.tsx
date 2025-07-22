import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Brain, Download, Edit, Zap, Clock } from "lucide-react";
import heroImage from "@/assets/hero-workspace.jpg";
import teamImage from "@/assets/team-collaboration.jpg";
import typingImage from "@/assets/typing-reports.jpg";

interface LandingPageProps {
  onGetStarted?: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps = {}) => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">ReportGen AI</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost">Sign In</Button>
            <Button variant="hero" onClick={onGetStarted}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Zap className="h-4 w-4" />
                AI-Powered Report Generation
              </div>
              <h2 className="text-5xl lg:text-7xl font-display font-bold text-foreground leading-tight">
                Generate Professional 
                <span className="text-primary block mt-2"> Project Reports</span> 
                in Minutes
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Transform your project ideas into comprehensive, publication-ready technical documentation. 
                Our AI analyzes your requirements and generates structured reports with methodology, 
                implementation details, and visual diagrams—all formatted to academic standards.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4 font-semibold" onClick={onGetStarted}>
                <Zap className="mr-3 h-5 w-5" />
                Start Generating Reports
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 font-semibold border-2">
                <FileText className="mr-3 h-5 w-5" />
                View Sample Report
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-4">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">2min</div>
                <p className="text-sm text-muted-foreground">Average Generation Time</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">98%</div>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">10k+</div>
                <p className="text-sm text-muted-foreground">Reports Generated</p>
              </div>
            </div>
          </div>
          
          <div className="relative animate-slide-up">
            <div className="absolute -inset-4 bg-gradient-hero rounded-2xl blur-3xl opacity-20"></div>
            <div className="relative bg-white rounded-2xl shadow-elegant p-1">
              <img 
                src={heroImage} 
                alt="Professional workspace with laptop showing technical reports" 
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center space-y-8">
          <p className="text-muted-foreground font-medium">Trusted by professionals from leading institutions</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-muted-foreground">MIT</div>
            <div className="text-2xl font-bold text-muted-foreground">Stanford</div>
            <div className="text-2xl font-bold text-muted-foreground">Google</div>
            <div className="text-2xl font-bold text-muted-foreground">Microsoft</div>
            <div className="text-2xl font-bold text-muted-foreground">IBM</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-br from-academic-light/30 to-primary/5 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              How It Works
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our advanced AI system analyzes your project requirements and generates 
              comprehensive reports following academic and professional standards in just minutes.
            </p>
          </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="shadow-elegant hover:shadow-glow transition-all duration-500 hover:scale-105 bg-white/70 backdrop-blur-sm border-0">
            <CardHeader className="text-center pb-6">
              <div className="relative mx-auto mb-6">
                <div className="w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center">
                  <Edit className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
              </div>
              <CardTitle className="text-2xl font-display font-semibold">Input Your Project</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <img src={typingImage} alt="Professional typing" className="w-full h-32 object-cover rounded-lg mb-4" />
              <p className="text-muted-foreground leading-relaxed">
                Simply enter your project title and problem statement. Our advanced AI 
                understands complex requirements and technical scope across multiple domains.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-glow transition-all duration-500 hover:scale-105 bg-white/70 backdrop-blur-sm border-0">
            <CardHeader className="text-center pb-6">
              <div className="relative mx-auto mb-6">
                <div className="w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center">
                  <Brain className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
              </div>
              <CardTitle className="text-2xl font-display font-semibold">AI Generation</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="w-full h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Advanced NLP algorithms analyze requirements and generate structured content 
                including methodology, implementation details, and relevant technical diagrams.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-glow transition-all duration-500 hover:scale-105 bg-white/70 backdrop-blur-sm border-0">
            <CardHeader className="text-center pb-6">
              <div className="relative mx-auto mb-6">
                <div className="w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center">
                  <Download className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
              </div>
              <CardTitle className="text-2xl font-display font-semibold">Edit & Export</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <img src={teamImage} alt="Team collaboration" className="w-full h-32 object-cover rounded-lg mb-4" />
              <p className="text-muted-foreground leading-relaxed">
                Review, customize, and refine the generated content with our intuitive editor. 
                Export your professional report as Word document, PDF, or LaTeX.
              </p>
            </CardContent>
          </Card>
        </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            What Our Users Say
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-card bg-white/50 backdrop-blur-sm border-0">
            <CardContent className="p-8 text-center space-y-4">
              <div className="flex justify-center space-x-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-2xl">★</span>
                ))}
              </div>
              <p className="text-muted-foreground italic leading-relaxed">
                "ReportGen AI saved me weeks of work. The generated methodology section 
                was so comprehensive, I barely needed to edit it."
              </p>
              <div>
                <p className="font-semibold text-foreground">Dr. Sarah Chen</p>
                <p className="text-sm text-muted-foreground">Research Director, MIT</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card bg-white/50 backdrop-blur-sm border-0">
            <CardContent className="p-8 text-center space-y-4">
              <div className="flex justify-center space-x-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-2xl">★</span>
                ))}
              </div>
              <p className="text-muted-foreground italic leading-relaxed">
                "The quality of technical diagrams generated is exceptional. 
                It understands complex system architectures perfectly."
              </p>
              <div>
                <p className="font-semibold text-foreground">Marcus Rodriguez</p>
                <p className="text-sm text-muted-foreground">Senior Engineer, Google</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card bg-white/50 backdrop-blur-sm border-0">
            <CardContent className="p-8 text-center space-y-4">
              <div className="flex justify-center space-x-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-2xl">★</span>
                ))}
              </div>
              <p className="text-muted-foreground italic leading-relaxed">
                "As a graduate student, this tool has been invaluable for my thesis. 
                The academic formatting is spot-on."
              </p>
              <div>
                <p className="font-semibold text-foreground">Emma Thompson</p>
                <p className="text-sm text-muted-foreground">PhD Student, Stanford</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-hero rounded-3xl p-12 lg:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
          <div className="relative max-w-4xl mx-auto space-y-8">
            <h3 className="text-4xl lg:text-6xl font-display font-bold leading-tight">
              Ready to Transform Your 
              <span className="block mt-2">Report Writing?</span>
            </h3>
            <p className="text-xl lg:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
              Join over 10,000 students, researchers, and professionals who save hours 
              on documentation with our AI-powered report generation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                variant="secondary" 
                size="lg" 
                className="text-lg px-8 py-4 font-semibold bg-white text-primary hover:bg-gray-50" 
                onClick={onGetStarted}
              >
                <Brain className="mr-3 h-6 w-6" />
                Start Generating Reports
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 font-semibold border-2 border-white text-white hover:bg-white hover:text-primary"
              >
                <Clock className="mr-3 h-6 w-6" />
                Watch Demo (2 min)
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <span>✓</span> No credit card required
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span> Free trial included
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span> 24/7 support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-12">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-display font-bold">ReportGen AI</span>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Transforming project documentation with artificial intelligence. 
                Generate professional reports that meet academic and industry standards.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-academic-light rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-academic-light rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
                  <span className="text-sm font-bold">𝕏</span>
                </div>
                <div className="w-10 h-10 bg-academic-light rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Product</h4>
              <div className="space-y-3 text-muted-foreground">
                <p className="hover:text-primary cursor-pointer transition-colors">Features</p>
                <p className="hover:text-primary cursor-pointer transition-colors">Pricing</p>
                <p className="hover:text-primary cursor-pointer transition-colors">Templates</p>
                <p className="hover:text-primary cursor-pointer transition-colors">Integrations</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Support</h4>
              <div className="space-y-3 text-muted-foreground">
                <p className="hover:text-primary cursor-pointer transition-colors">Help Center</p>
                <p className="hover:text-primary cursor-pointer transition-colors">Contact Us</p>
                <p className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</p>
                <p className="hover:text-primary cursor-pointer transition-colors">Terms of Service</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 ReportGen AI. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm mt-4 md:mt-0">
              Made with ❤️ for researchers and professionals worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;