import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download, Edit, ArrowLeft, Save, RefreshCw, Loader2, Network } from "lucide-react";
import { toast } from "sonner";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { renderMarkdown } from "@/lib/markdownRenderer";
import Mermaid from "@/components/ui/mermaid";

interface ReportEditorProps {
  reportData: any;
  onBack: () => void;
}

const ReportEditor = ({ reportData, onBack }: ReportEditorProps) => {
  const [editableReport, setEditableReport] = useState(reportData);
  const [activeSection, setActiveSection] = useState("abstract");
  const [isRegenerating, setIsRegenerating] = useState(false);

  const sections = [
    { id: "abstract", title: "Abstract", icon: FileText },
    { id: "introduction", title: "Introduction", icon: FileText },
    { id: "methodology", title: "Methodology", icon: FileText },
    { id: "implementation", title: "Implementation", icon: FileText },
    { id: "results", title: "Results", icon: FileText },
    { id: "conclusion", title: "Conclusion", icon: FileText },
    { id: "diagrams", title: "Diagrams", icon: Network },
    { id: "references", title: "References", icon: FileText },
  ];

  const updateSection = (sectionId: string, content: string) => {
    setEditableReport(prev => ({
      ...prev,
      [sectionId]: content
    }));
  };

  const handleSave = () => {
    toast.success("Report saved successfully!");
  };

  const handleExport = () => {
    // In a real app, this would generate and download a Word document
    toast.success("Report exported as Word document!");
  };

  const handleRegenerateSection = async () => {
    if (!activeSection) return;
    
    setIsRegenerating(true);
    toast.info(`Regenerating ${sections.find(s => s.id === activeSection)?.title}...`);
    
    // Simulate AI regeneration
    setTimeout(() => {
      const newContent = generateSectionContent(activeSection);
      updateSection(activeSection, newContent);
      setIsRegenerating(false);
      toast.success(`${sections.find(s => s.id === activeSection)?.title} regenerated successfully!`);
    }, 2000);
  };

  const generateSectionContent = (sectionId: string) => {
    const contentVariations = {
      abstract: [
        `This project presents an innovative approach to address modern challenges in the field. The research leverages cutting-edge technologies and methodologies to develop a comprehensive solution. Through rigorous testing and evaluation, the implementation demonstrates remarkable improvements in efficiency and performance. The findings provide valuable insights and establish a foundation for future advancements in the domain.`,
        `This study introduces a novel methodology for solving complex problems through systematic analysis and implementation. The project utilizes advanced algorithms and modern frameworks to create a robust solution. Extensive evaluation demonstrates significant performance enhancements and practical applicability. The results contribute meaningfully to the existing body of knowledge and offer promising directions for future research.`
      ],
      introduction: [
        `**Introduction**

This project addresses a critical gap in current solutions by introducing innovative approaches and methodologies. The rapidly evolving technological landscape demands sophisticated solutions that can adapt to changing requirements while maintaining high performance and reliability.

**Background**
Current state-of-the-art solutions face several limitations in addressing modern challenges. These limitations create opportunities for innovation and improvement through the application of advanced technologies and methodologies.

**Problem Statement**
The primary challenge lies in developing efficient, scalable, and maintainable solutions that can handle increasing complexity while ensuring optimal performance and user experience.

**Objectives**
The key objectives include:
- Developing innovative solutions using modern technologies
- Implementing scalable and efficient algorithms
- Ensuring optimal performance and reliability
- Providing comprehensive evaluation and validation

**Scope**
This project encompasses the complete development lifecycle from design through implementation and evaluation, with focus on practical applicability and future extensibility.`,
        `**Introduction**

The digital transformation era presents unique challenges that require innovative solutions and advanced methodologies. This project emerges from the need to address these challenges through systematic research and development.

**Background**
Traditional approaches often fall short in meeting the demands of modern applications. The complexity of current systems requires new paradigms and methodologies that can deliver superior performance and user experience.

**Problem Statement**
Organizations face increasing pressure to develop solutions that are not only efficient but also scalable, secure, and maintainable in the long term.

**Objectives**
This project aims to:
- Develop cutting-edge solutions using best practices
- Implement robust architectures and designs
- Achieve measurable improvements in key metrics
- Establish frameworks for future development

**Scope**
The project covers comprehensive analysis, design, implementation, and evaluation phases, ensuring thorough validation of proposed solutions.`
      ],
      methodology: [
        `**Methodology**

This section outlines the systematic approach adopted for the development and implementation of the proposed solution.

**Research Approach**
A comprehensive research methodology was employed, combining theoretical analysis with practical implementation to ensure robust and reliable results.

**Development Framework**
The development process follows industry best practices and modern software engineering principles to deliver high-quality solutions.

**Testing Strategy**
A multi-layered testing approach ensures thorough validation of all system components and functionalities.`
      ],
      implementation: [
        `**Implementation**

This section describes the technical implementation details and architectural decisions made during the development process.

**System Architecture**
The system follows a modular architecture that promotes scalability, maintainability, and extensibility.

**Technology Stack**
Modern technologies and frameworks were carefully selected to ensure optimal performance and future compatibility.

**Development Process**
An iterative development approach was adopted to enable continuous improvement and validation throughout the implementation phase.`
      ],
      results: [
        `**Results**

This section presents the outcomes and findings from the implementation and evaluation of the proposed solution.

**Performance Metrics**
Comprehensive testing revealed significant improvements across all key performance indicators.

**Evaluation Results**
The solution demonstrates superior performance compared to existing alternatives, with measurable improvements in efficiency and reliability.

**Validation Outcomes**
Extensive validation confirms the effectiveness of the proposed approach in addressing the identified challenges.`
      ],
      conclusion: [
        `**Key Achievements**
- Successfully developed and implemented innovative solutions using cutting-edge technologies
- Achieved significant performance improvements across all key metrics
- Established robust frameworks for future development and scalability
- Demonstrated practical applicability through comprehensive testing and validation

**Future Work**
- Enhanced integration with emerging technologies and platforms
- Extension of the solution to address broader application domains
- Development of advanced features based on user feedback and requirements
- Implementation of machine learning capabilities for predictive analytics

**Conclusion**
This project successfully addresses the identified challenges through innovative approaches and comprehensive implementation. The developed solution demonstrates significant improvements in performance, reliability, and user experience. The robust architecture and modern technology stack ensure long-term viability and scalability. The findings contribute valuable insights to the field and establish a solid foundation for future research and development initiatives.`
      ],
      diagrams: [
        `## System Diagrams

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
    
    D --> J[Template Engine]
    D --> K[Content Generator]
    
    E --> L[PDF Export]
    E --> M[Word Export]
\`\`\``,
        `## Technical Diagrams

### System Architecture
\`\`\`mermaid
graph TD
    Client[Client Application] --> LB[Load Balancer]
    LB --> Web1[Web Server 1]
    LB --> Web2[Web Server 2]
    
    Web1 --> App[Application Server]
    Web2 --> App
    
    App --> Cache[Redis Cache]
    App --> DB[(Database)]
    App --> Queue[Message Queue]
    
    Queue --> Worker[Background Worker]
    Worker --> DB
    
    style Client fill:#e3f2fd
    style App fill:#f3e5f5
    style DB fill:#e8f5e8
\`\`\`

### Data Processing Flow
\`\`\`mermaid
flowchart LR
    Input[Input Data] --> Validation{Validation}
    Validation -->|Valid| Processing[Data Processing]
    Validation -->|Invalid| Error[Error Handler]
    
    Processing --> Transform[Data Transformation]
    Transform --> Storage[(Data Storage)]
    Storage --> Output[Output Generation]
    
    Error --> Log[Error Logging]
    Log --> Notification[User Notification]
\`\`\`

### Entity Relationship
\`\`\`mermaid
erDiagram
    USER ||--o{ REPORT : creates
    USER {
        int id
        string name
        string email
        datetime created_at
    }
    REPORT ||--o{ SECTION : contains
    REPORT {
        int id
        string title
        string type
        datetime created_at
        int user_id
    }
    SECTION {
        int id
        string title
        text content
        int report_id
        int order_index
    }
\`\`\``,
      ],
      references: [
        `**References**

[1] Smith, J. et al. (2023). "Modern Approaches to System Architecture." Journal of Software Engineering, 45(3), 123-145.

[2] Johnson, A. (2023). "Performance Optimization in Distributed Systems." ACM Computing Surveys, 55(2), 1-28.

[3] Brown, M. & Davis, K. (2022). "Scalable Solutions for Enterprise Applications." IEEE Transactions on Software Engineering, 48(7), 2456-2471.

[4] Wilson, R. (2023). "Best Practices in Modern Software Development." International Conference on Software Engineering, pp. 89-102.`
      ]
    };

    const variations = contentVariations[sectionId] || [editableReport[sectionId]];
    const randomIndex = Math.floor(Math.random() * variations.length);
    return variations[randomIndex];
  };

  const generateWordDocument = async () => {
    try {
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: editableReport.title,
                  bold: true,
                  size: 32,
                }),
              ],
              heading: HeadingLevel.TITLE,
            }),
            new Paragraph({
              text: "",
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "ABSTRACT",
                  bold: true,
                  size: 24,
                }),
              ],
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: editableReport.abstract,
                }),
              ],
            }),
            new Paragraph({
              text: "",
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "INTRODUCTION",
                  bold: true,
                  size: 24,
                }),
              ],
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: editableReport.introduction,
                }),
              ],
            }),
            new Paragraph({
              text: "",
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "METHODOLOGY",
                  bold: true,
                  size: 24,
                }),
              ],
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: editableReport.methodology,
                }),
              ],
            }),
            new Paragraph({
              text: "",
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "IMPLEMENTATION",
                  bold: true,
                  size: 24,
                }),
              ],
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: editableReport.implementation,
                }),
              ],
            }),
            new Paragraph({
              text: "",
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "RESULTS",
                  bold: true,
                  size: 24,
                }),
              ],
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: editableReport.results,
                }),
              ],
            }),
            new Paragraph({
              text: "",
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "CONCLUSION",
                  bold: true,
                  size: 24,
                }),
              ],
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: editableReport.conclusion,
                }),
              ],
            }),
            new Paragraph({
              text: "",
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "REFERENCES",
                  bold: true,
                  size: 24,
                }),
              ],
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: editableReport.references,
                }),
              ],
            }),
          ],
        }],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${editableReport.title.replace(/\s+/g, '_')}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success("Report exported as Word document!");
    } catch (error) {
      toast.error("Failed to export document");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto p-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">{editableReport.title}</h1>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSave} variant="outline" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button 
              onClick={handleRegenerateSection} 
              disabled={isRegenerating}
              variant="secondary" 
              className="flex items-center gap-2"
            >
              {isRegenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Regenerate Section
            </Button>
            <Button onClick={generateWordDocument} variant="hero" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export (.docx)
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-card sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Report Sections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <Button
                      key={section.id}
                      variant={activeSection === section.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveSection(section.id)}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {section.title}
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Main Editor */}
          <div className="lg:col-span-3">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit className="h-5 w-5 text-primary" />
                  {sections.find(s => s.id === activeSection)?.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={editableReport[activeSection]}
                  onChange={(e) => updateSection(activeSection, e.target.value)}
                  className="min-h-96 resize-none font-mono text-sm leading-relaxed"
                  placeholder={`Enter ${sections.find(s => s.id === activeSection)?.title.toLowerCase()} content...`}
                />
                <div className="mt-4 text-sm text-muted-foreground">
                  {activeSection === 'diagrams' ? (
                    <p>Tip: Use Mermaid syntax for diagrams. Supported types: graph, sequenceDiagram, classDiagram, etc.</p>
                  ) : (
                    <p>Tip: Use Markdown formatting for better structure (## for headings, **bold**, *italic*)</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Preview Card */}
        <Card className="mt-6 shadow-card">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-primary">Report Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
              <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white border-b-2 border-primary pb-4">
                {editableReport.title}
              </h1>
              {activeSection === 'diagrams' && editableReport[activeSection] && editableReport[activeSection].includes('```mermaid') ? (
                <div className="space-y-6">
                  {editableReport[activeSection].split('### ').map((section, index) => {
                    if (index === 0) return null; // Skip first empty section
                    const [title, ...content] = section.split('\n');
                    const contentText = content.join('\n');
                    
                    return (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6 shadow-sm">
                        <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600 pb-2">
                          {title}
                        </h3>
                        {contentText.includes('```mermaid') ? (
                          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                            <Mermaid 
                              chart={contentText.match(/```mermaid\n([\s\S]*?)\n```/)?.[1] || ''} 
                              className="w-full"
                            />
                          </div>
                        ) : (
                          <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-7 bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                            {contentText}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                  <div 
                    className="text-gray-800 dark:text-gray-200 leading-8 space-y-6"
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.75',
                      fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}
                    dangerouslySetInnerHTML={{ 
                      __html: renderMarkdown(editableReport[activeSection] || '').replace(
                        /<h1/g, '<h1 class="text-2xl font-bold mb-4 mt-6 text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600 pb-2"'
                      ).replace(
                        /<h2/g, '<h2 class="text-xl font-bold mb-3 mt-5 text-gray-900 dark:text-white"'
                      ).replace(
                        /<h3/g, '<h3 class="text-lg font-bold mb-3 mt-4 text-gray-900 dark:text-white"'
                      ).replace(
                        /<p/g, '<p class="mb-4 text-gray-700 dark:text-gray-300"'
                      ).replace(
                        /<ul/g, '<ul class="mb-4 space-y-2 pl-6"'
                      ).replace(
                        /<li/g, '<li class="text-gray-700 dark:text-gray-300 list-disc"'
                      ).replace(
                        /<strong/g, '<strong class="font-bold text-gray-900 dark:text-white"'
                      ).replace(
                        /<em/g, '<em class="italic text-gray-800 dark:text-gray-200"'
                      )
                    }}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportEditor;