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

  return <LandingPage onGetStarted={handleGetStarted} />;
};

export default Index;
