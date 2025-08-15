import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Brain, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { pipeline } from "@huggingface/transformers";

interface ReportCreatorProps {
  onBack: () => void;
  onReportGenerated: (reportData: any) => void;
  userEmail: string;
  onSignOut: () => void;
}

const ReportCreator = ({ onBack, onReportGenerated, userEmail, onSignOut }: ReportCreatorProps) => {
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
    
    try {
      // Initialize ML model for text generation using the updated model name
      const generator = await pipeline('text-generation', 'onnx-community/gpt2', {
        device: (navigator as any).gpu ? 'webgpu' : 'cpu',
        dtype: 'fp32'
      });

      const generatedReport = {
        title: formData.title,
        abstract: await generateAbstractML(formData.problemStatement, formData.projectType, generator),
        introduction: await generateIntroductionML(formData.title, formData.problemStatement, formData.projectType, generator),
        methodology: await generateMethodologyML(formData.title, formData.projectType, generator),
        implementation: await generateImplementationML(formData.title, formData.projectType, generator),
        results: await generateResultsML(formData.title, formData.projectType, generator),
        conclusion: await generateConclusionML(formData.title, formData.problemStatement, formData.projectType, generator),
        diagrams: generateDiagrams(),
        references: generateReferences()
      };
      
      onReportGenerated(generatedReport);
      setIsGenerating(false);
      toast.success("Report generated successfully with AI!");
    } catch (error) {
      console.error('ML Generation error:', error);
      toast.error("ML generation failed, using fallback templates");
      
      // Fallback to template generation
      const generatedReport = {
        title: formData.title,
        abstract: generateAbstract(formData.problemStatement),
        introduction: generateIntroduction(formData.title, formData.problemStatement),
        methodology: generateMethodology(),
        implementation: generateImplementation(),
        results: generateResults(),
        conclusion: generateConclusion(),
        diagrams: generateDiagrams(),
        references: generateReferences()
      };
      
      onReportGenerated(generatedReport);
      setIsGenerating(false);
      toast.success("Report generated successfully!");
    }
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

`;
  };

  const generateDiagrams = () => {
    return `## System Diagrams

### Architecture Diagram
\`\`\`mermaid
graph TB
    A[User Interface] --> B[Application Layer]
    B --> C[Business Logic]
    C --> D[Data Access Layer]
    D --> E[Database]
    
    F[Authentication Service] --> B
    G[External APIs] --> C
    H[Cache Layer] --> C
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style C fill:#e8f5e8
    style D fill:#fff3e0
    style E fill:#fce4ec
\`\`\`

### Data Flow Diagram
\`\`\`mermaid
sequenceDiagram
    participant U as User
    participant UI as Frontend
    participant API as Backend API
    participant DB as Database
    
    U->>UI: Input Data
    UI->>API: Send Request
    API->>DB: Query Data
    DB->>API: Return Results
    API->>UI: Send Response
    UI->>U: Display Results
\`\`\`

### Component Structure
\`\`\`mermaid
graph LR
    A[Main Application] --> B[Authentication Module]
    A --> C[Dashboard Module]
    A --> D[Report Generator]
    A --> E[Export Module]
    
    B --> F[Login Component]
    B --> G[Registration Component]
    
    C --> H[Statistics View]
    C --> I[User Profile]
    
    D --> J[Content Generator]
    D --> K[Template Engine]
    
    E --> L[PDF Export]
    E --> M[Word Export]
    
    style A fill:#bbdefb
    style D fill:#c8e6c9
    style E fill:#ffcdd2
\`\`\``;
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

  // ML-powered generation functions
  const generateAbstractML = async (problem: string, projectType: string, generator: any) => {
    try {
      const prompt = `Write a professional abstract for a ${projectType.toLowerCase()} that addresses: ${problem}. Abstract:`;
      const result = await generator(prompt, {
        max_new_tokens: 150,
        temperature: 0.7,
        do_sample: true,
      });
      
      // Extract and clean the generated text
      let generated = result[0].generated_text.replace(prompt, '').trim();
      if (generated.length < 50) {
        return generateAbstract(problem); // Fallback to template
      }
      return generated;
    } catch (error) {
      console.error('ML Abstract generation failed:', error);
      return generateAbstract(problem);
    }
  };

  const generateIntroductionML = async (title: string, problem: string, projectType: string, generator: any) => {
    try {
      const prompt = `Write a detailed introduction for a ${projectType.toLowerCase()} titled "${title}" that addresses: ${problem}. Include background, objectives, and scope. Introduction:`;
      const result = await generator(prompt, {
        max_new_tokens: 200,
        temperature: 0.7,
        do_sample: true,
      });
      
      let generated = result[0].generated_text.replace(prompt, '').trim();
      if (generated.length < 100) {
        return generateIntroduction(title, problem); // Fallback to template
      }
      return `## Introduction\n\n${generated}`;
    } catch (error) {
      console.error('ML Introduction generation failed:', error);
      return generateIntroduction(title, problem);
    }
  };

  const generateMethodologyML = async (title: string, projectType: string, generator: any) => {
    try {
      const prompt = `Write a methodology section for a ${projectType.toLowerCase()} titled "${title}". Include research approach, system design, and implementation strategy. Methodology:`;
      const result = await generator(prompt, {
        max_new_tokens: 200,
        temperature: 0.7,
        do_sample: true,
      });
      
      let generated = result[0].generated_text.replace(prompt, '').trim();
      if (generated.length < 100) {
        return generateMethodology(); // Fallback to template
      }
      return `## Methodology\n\n${generated}`;
    } catch (error) {
      console.error('ML Methodology generation failed:', error);
      return generateMethodology();
    }
  };

  const generateImplementationML = async (title: string, projectType: string, generator: any) => {
    try {
      const prompt = `Write an implementation section for a ${projectType.toLowerCase()} titled "${title}". Include system architecture, key features, and challenges. Implementation:`;
      const result = await generator(prompt, {
        max_new_tokens: 200,
        temperature: 0.7,
        do_sample: true,
      });
      
      let generated = result[0].generated_text.replace(prompt, '').trim();
      if (generated.length < 100) {
        return generateImplementation(); // Fallback to template
      }
      return `## Implementation\n\n${generated}`;
    } catch (error) {
      console.error('ML Implementation generation failed:', error);
      return generateImplementation();
    }
  };

  const generateResultsML = async (title: string, projectType: string, generator: any) => {
    try {
      const prompt = `Write a results section for a ${projectType.toLowerCase()} titled "${title}". Include performance metrics, testing results, and evaluation. Results:`;
      const result = await generator(prompt, {
        max_new_tokens: 200,
        temperature: 0.7,
        do_sample: true,
      });
      
      let generated = result[0].generated_text.replace(prompt, '').trim();
      if (generated.length < 100) {
        return generateResults(); // Fallback to template
      }
      return `## Results\n\n${generated}`;
    } catch (error) {
      console.error('ML Results generation failed:', error);
      return generateResults();
    }
  };

  const generateConclusionML = async (title: string, problem: string, projectType: string, generator: any) => {
    try {
      const prompt = `Write a comprehensive conclusion for a ${projectType.toLowerCase()} titled "${title}" that solved: ${problem}. Include key achievements and future work in exactly 5 sentences. Conclusion:`;
      const result = await generator(prompt, {
        max_new_tokens: 180,
        temperature: 0.7,
        do_sample: true,
      });
      
      let generated = result[0].generated_text.replace(prompt, '').trim();
      if (generated.length < 80) {
        return `This AI-powered technical report generation platform successfully addresses the challenges of traditional manual report writing through innovative automation. The system leverages cutting-edge technologies including Hugging Face Transformers and GPT-2 to deliver intelligent content generation with user-controlled editing capabilities. The implementation demonstrates significant improvements in efficiency, consistency, and quality while reducing the time required for professional documentation. The platform's modern architecture built with React, TypeScript, and Tailwind CSS ensures scalability and maintainability for diverse organizational needs. The project establishes a solid foundation for future AI-assisted content creation and contributes meaningfully to the transformation of technical communication workflows.`; // Fallback to 5-line conclusion
      }
      return generated;
    } catch (error) {
      console.error('ML Conclusion generation failed:', error);
      return `This AI-powered technical report generation platform successfully addresses the challenges of traditional manual report writing through innovative automation. The system leverages cutting-edge technologies including Hugging Face Transformers and GPT-2 to deliver intelligent content generation with user-controlled editing capabilities. The implementation demonstrates significant improvements in efficiency, consistency, and quality while reducing the time required for professional documentation. The platform's modern architecture built with React, TypeScript, and Tailwind CSS ensures scalability and maintainability for diverse organizational needs. The project establishes a solid foundation for future AI-assisted content creation and contributes meaningfully to the transformation of technical communication workflows.`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Create New Report</h1>
            </div>
          </div>
          
          {/* User Info */}
          <div className="flex flex-col items-end gap-1">
            <p className="text-sm font-medium">{userEmail}</p>
            <Button variant="ghost" size="sm" onClick={onSignOut} className="text-sm text-muted-foreground hover:text-destructive">
              Sign Out
            </Button>
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
                  <p>• Loading GPT-2 language model...</p>
                  <p>• Generating AI-powered content sections</p>
                  <p>• Processing with Hugging Face Transformers</p>
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