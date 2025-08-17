import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import SignInPage from "@/components/SignInPage";
import ReportCreator from "@/components/ReportCreator";
import ReportEditor from "@/components/ReportEditor";

type AppState = "landing" | "auth" | "creator" | "editor";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("landing");
  const [reportData, setReportData] = useState(null);
  const [userEmail, setUserEmail] = useState<string>("");

  const handleGetStarted = () => {
    setCurrentState("auth");
  };

  const handleSignIn = (email: string) => {
    setUserEmail(email);
    setCurrentState("creator");
  };

  const handleBackToLanding = () => {
    setCurrentState("landing");
    setReportData(null);
    setUserEmail("");
  };

  const handleSignOut = () => {
    setCurrentState("landing");
    setReportData(null);
    setUserEmail("");
  };

  const handleReportGenerated = (data: any) => {
    setReportData(data);
    setCurrentState("editor");
  };

  const handleBackToCreator = () => {
    setCurrentState("creator");
  };

  const handleViewSample = () => {
    const sampleReport = {
      title: "AI-Powered Smart Traffic Management System",
      problemStatement: "Modern urban areas face increasing traffic congestion, leading to economic losses, environmental pollution, and reduced quality of life.",
      projectType: "Machine Learning",
      sections: {
        abstract: "This project presents an innovative AI-powered smart traffic management system that utilizes machine learning algorithms to optimize traffic flow in urban environments. The system employs real-time data analysis, predictive modeling, and adaptive signal control to reduce congestion by an average of 30% while minimizing environmental impact.",
        introduction: `## Introduction

Traffic congestion is one of the most pressing challenges facing modern cities. With urbanization continuing to accelerate globally, traditional traffic management systems are becoming increasingly inadequate.

### Background
Traditional traffic management systems rely on fixed timing patterns that cannot adapt to changing traffic conditions. This project proposes a comprehensive solution that leverages artificial intelligence and machine learning to create a responsive, efficient traffic management ecosystem.

### Objectives
- Reduce traffic congestion through intelligent signal optimization
- Minimize environmental impact through improved traffic flow
- Enhance emergency vehicle response times
- Provide real-time traffic insights and recommendations`,
        methodology: `## Methodology

Our approach combines multiple data sources including traffic cameras, sensors, GPS data, and weather information.

### Machine Learning Models
We employ a hybrid machine learning model consisting of:
- **Convolutional Neural Networks** for image processing
- **Recurrent Neural Networks** for temporal pattern recognition  
- **Reinforcement Learning** for optimal decision making

### Data Collection
- Real-time traffic camera feeds
- IoT sensor networks at intersections
- GPS data from mobile devices
- Weather and environmental conditions`,
        implementation: `## Implementation

The system architecture consists of three main components:

### 1. Data Collection Layer
- IoT sensors and cameras deployed at key intersections
- Real-time data aggregation and preprocessing
- Quality assurance and data validation

### 2. Processing Layer  
- Cloud-based ML pipeline for real-time analysis
- Predictive modeling for traffic patterns
- Decision engine for signal optimization

### 3. Control Layer
- Adaptive traffic signal controllers
- Dynamic routing recommendations
- Emergency vehicle priority systems`,
        results: `## Results and Evaluation

Initial deployment in a pilot area showed remarkable improvements:

### Performance Metrics
- **30% reduction** in average travel time
- **25% decrease** in fuel consumption  
- **40% reduction** in emissions
- **90% improvement** in emergency vehicle response times

### System Performance
The system demonstrated excellent scalability and reliability with:
- 99.8% uptime during the testing period
- Real-time processing of over 10,000 data points per second
- Successful handling of peak traffic conditions`,
        conclusion: `## Conclusion

The AI-powered smart traffic management system represents a significant advancement in urban infrastructure. The project successfully demonstrates that machine learning can effectively address complex traffic optimization challenges while providing measurable benefits to both citizens and the environment.`,
        diagrams: "System Architecture, Data Flow Analysis, Network Topology",
        references: "Academic and industry references supporting the methodology and implementation approach."
      }
    };
    setReportData(sampleReport);
    setCurrentState("editor");
  };

  if (currentState === "auth") {
    return (
      <SignInPage 
        onBack={handleBackToLanding}
        onSignIn={handleSignIn}
      />
    );
  }

  if (currentState === "creator") {
    return (
      <ReportCreator 
        onBack={handleBackToLanding}
        onReportGenerated={handleReportGenerated}
        userEmail={userEmail}
        onSignOut={handleSignOut}
      />
    );
  }

  if (currentState === "editor" && reportData) {
    return (
      <ReportEditor 
        reportData={reportData}
        onBack={handleBackToCreator}
      />
    );
  }

  return <LandingPage onGetStarted={handleGetStarted} onViewSample={handleViewSample} />;
};

export default Index;
