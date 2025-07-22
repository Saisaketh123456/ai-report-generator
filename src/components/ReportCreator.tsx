import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Brain, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ReportCreatorProps {
  onBack: () => void;
  onReportGenerated: (reportData: any) => void;
}

const ReportCreator = ({ onBack, onReportGenerated }: ReportCreatorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    problemStatement: "",
    projectType: "Technical Project"
  });

  const handleGenerate = async () => {
    if (!formData.title.trim() || !formData.problemStatement.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation process
    setTimeout(() => {
      const generatedReport = {
        title: formData.title,
        abstract: generateAbstract(formData.problemStatement),
        introduction: generateIntroduction(formData.title, formData.problemStatement),
        methodology: generateMethodology(),
        implementation: generateImplementation(),
        results: generateResults(),
        conclusion: generateConclusion(),
        references: generateReferences()
      };
      
      onReportGenerated(generatedReport);
      setIsGenerating(false);
      toast.success("Report generated successfully!");
    }, 3000);
  };

  const generateAbstract = (problem: string) => {
    return `This project addresses ${problem.toLowerCase()}. The research presents a comprehensive solution utilizing modern technologies and methodologies. The implementation demonstrates effective results with significant improvements in efficiency and performance. The findings contribute to the advancement of the field and provide practical applications for real-world scenarios.`;
  };

  const generateIntroduction = (title: string, problem: string) => {
    return `## Introduction

The ${title} project emerges from the critical need to address ${problem.toLowerCase()}. In today's rapidly evolving technological landscape, this challenge has become increasingly significant for organizations and researchers alike.

### Background
The current state of the field presents several limitations and opportunities for improvement. Existing solutions often fall short in addressing the complex requirements of modern applications.

### Problem Statement
${problem}

### Objectives
The primary objectives of this project include:
- Developing an innovative solution to address the identified problem
- Implementing efficient algorithms and methodologies
- Evaluating performance and effectiveness
- Providing practical recommendations for future work

### Scope
This project encompasses the design, development, and evaluation of a comprehensive solution, focusing on scalability, reliability, and user experience.`;
  };

  const generateMethodology = () => {
    return `## Methodology

### Research Approach
This project follows a systematic approach combining theoretical research with practical implementation. The methodology encompasses several key phases:

### System Design
The system architecture follows modern design principles:
- **Modular Architecture**: Ensuring scalability and maintainability
- **User-Centered Design**: Focusing on usability and accessibility
- **Security by Design**: Implementing robust security measures

### Implementation Strategy
The development process includes:
1. **Requirements Analysis**: Comprehensive gathering and analysis of functional and non-functional requirements
2. **Technology Selection**: Evaluation and selection of appropriate technologies and frameworks
3. **Iterative Development**: Agile development approach with continuous integration
4. **Testing and Validation**: Comprehensive testing strategy including unit, integration, and user acceptance testing

### Tools and Technologies
The project utilizes modern tools and technologies including:
- Development frameworks and libraries
- Database management systems
- Cloud computing platforms
- Testing and deployment tools`;
  };

  const generateImplementation = () => {
    return `## Implementation

### System Architecture
The implementation follows a layered architecture approach with clear separation of concerns:

#### Frontend Layer
- User interface components
- State management
- API integration
- Responsive design implementation

#### Backend Layer
- Business logic implementation
- Data processing algorithms
- API endpoints and services
- Authentication and authorization

#### Data Layer
- Database design and optimization
- Data models and relationships
- Backup and recovery mechanisms

### Key Features
The implemented solution includes:

1. **Core Functionality**
   - Primary feature implementation
   - Advanced algorithms and processing
   - Real-time data handling

2. **User Interface**
   - Intuitive and responsive design
   - Accessibility compliance
   - Cross-platform compatibility

3. **Performance Optimization**
   - Efficient algorithms
   - Caching mechanisms
   - Load balancing and scaling

### Challenges and Solutions
During implementation, several challenges were identified and addressed:
- Performance bottlenecks resolved through optimization
- Security vulnerabilities addressed through comprehensive testing
- Scalability issues managed through architectural improvements`;
  };

  const generateResults = () => {
    return `## Results and Evaluation

### Performance Metrics
The implemented solution demonstrates significant improvements:

#### Efficiency Metrics
- Processing time: 75% improvement over baseline
- Resource utilization: 40% reduction in memory usage
- Throughput: 200% increase in concurrent operations

#### User Experience Metrics
- User satisfaction: 92% positive feedback
- Task completion rate: 98% success rate
- Learning curve: 60% reduction in onboarding time

### Testing Results
Comprehensive testing validates the solution's effectiveness:

#### Functional Testing
- All core features tested and validated
- Edge cases handled appropriately
- Error handling mechanisms verified

#### Performance Testing
- Load testing demonstrates scalability
- Stress testing confirms system stability
- Security testing validates protection mechanisms

### Comparative Analysis
Comparison with existing solutions shows:
- Superior performance characteristics
- Enhanced user experience
- Improved security and reliability
- Cost-effective implementation`;
  };

  const generateConclusion = () => {
    return `## Conclusion

This project successfully addresses the identified challenges through innovative implementation and comprehensive evaluation. The results demonstrate significant improvements in performance, usability, and reliability.

### Key Achievements
- Successful implementation of core objectives
- Demonstrated performance improvements
- Positive user feedback and adoption
- Scalable and maintainable solution

### Future Work
Potential areas for future enhancement include:
- Advanced machine learning integration
- Extended platform support
- Enhanced analytics and reporting
- Community-driven feature development

### Final Remarks
The project contributes valuable insights to the field and provides a solid foundation for future research and development. The implemented solution offers practical benefits for users while advancing the state of the art in the domain.`;
  };

  const generateReferences = () => {
    return `## References

1. Smith, J., & Johnson, A. (2023). Modern Approaches to System Design. *Journal of Computer Science*, 45(3), 123-145.

2. Brown, M. (2022). Scalable Web Applications: Best Practices and Patterns. Tech Publishing.

3. Davis, R., et al. (2023). Performance Optimization in Distributed Systems. *Proceedings of the International Conference on Software Engineering*, 234-245.

4. Wilson, K. (2022). User Experience Design Principles. UX Design Press.

5. Thompson, L. (2023). Security in Modern Web Applications. *Security Journal*, 12(4), 67-89.

6. Garcia, P., & Lee, S. (2022). Database Design and Optimization Techniques. Database Systems Quarterly, 8(2), 45-62.

7. Anderson, C. (2023). Cloud Computing Architectures for Enterprise Applications. Cloud Computing Review, 15(1), 12-28.

8. Martinez, D. (2022). Agile Development Methodologies in Practice. Software Engineering Today, 9(3), 78-92.`;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Create New Report</h1>
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Project Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                placeholder="Enter your project title..."
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="problemStatement">Problem Statement / Abstract *</Label>
              <Textarea
                id="problemStatement"
                placeholder="Describe the problem your project solves or provide an initial abstract..."
                value={formData.problemStatement}
                onChange={(e) => setFormData(prev => ({ ...prev, problemStatement: e.target.value }))}
                className="min-h-32 resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectType">Project Type</Label>
              <select
                id="projectType"
                value={formData.projectType}
                onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
                className="w-full p-2 border border-input rounded-md bg-background"
              >
                <option value="Technical Project">Technical Project</option>
                <option value="Research Paper">Research Paper</option>
                <option value="Business Report">Business Report</option>
                <option value="Academic Thesis">Academic Thesis</option>
              </select>
            </div>

            <div className="pt-4">
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                variant="hero"
                size="lg"
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Report...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-5 w-5" />
                    Generate Report
                  </>
                )}
              </Button>
            </div>

            {isGenerating && (
              <div className="bg-academic-light/50 rounded-lg p-4 mt-4">
                <div className="flex items-center gap-3 mb-3">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span className="font-medium">AI is generating your report...</span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Analyzing your project requirements</p>
                  <p>• Generating structured content sections</p>
                  <p>• Creating methodology and implementation details</p>
                  <p>• Finalizing report structure</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportCreator;