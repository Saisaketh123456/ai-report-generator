import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download, Edit, ArrowLeft, Save, RefreshCw, Loader2, Network } from "lucide-react";
import { toast } from "sonner";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";

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
        `## Introduction

This project addresses a critical gap in current solutions by introducing innovative approaches and methodologies. The rapidly evolving technological landscape demands sophisticated solutions that can adapt to changing requirements while maintaining high performance and reliability.

### Background
Current state-of-the-art solutions face several limitations in addressing modern challenges. These limitations create opportunities for innovation and improvement through the application of advanced technologies and methodologies.

### Problem Statement
The primary challenge lies in developing efficient, scalable, and maintainable solutions that can handle increasing complexity while ensuring optimal performance and user experience.

### Objectives
The key objectives include:
- Developing innovative solutions using modern technologies
- Implementing scalable and efficient algorithms
- Ensuring optimal performance and reliability
- Providing comprehensive evaluation and validation

### Scope
This project encompasses the complete development lifecycle from design through implementation and evaluation, with focus on practical applicability and future extensibility.`,
        `## Introduction

The digital transformation era presents unique challenges that require innovative solutions and advanced methodologies. This project emerges from the need to address these challenges through systematic research and development.

### Background
Traditional approaches often fall short in meeting the demands of modern applications. The complexity of current systems requires new paradigms and methodologies that can deliver superior performance and user experience.

### Problem Statement
Organizations face increasing pressure to develop solutions that are not only efficient but also scalable, secure, and maintainable in the long term.

### Objectives
This project aims to:
- Develop cutting-edge solutions using best practices
- Implement robust architectures and designs
- Achieve measurable improvements in key metrics
- Establish frameworks for future development

### Scope
The project covers comprehensive analysis, design, implementation, and evaluation phases, ensuring thorough validation of proposed solutions.`
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
                {activeSection === 'diagrams' ? (
                  <div className="space-y-6">
                    <Textarea
                      value={editableReport[activeSection]}
                      onChange={(e) => updateSection(activeSection, e.target.value)}
                      className="min-h-96 resize-none font-mono text-sm leading-relaxed"
                      placeholder="Enter Mermaid diagram code..."
                    />
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-3">Diagram Preview:</h4>
                      <div className="bg-background rounded border p-4">
                        {editableReport[activeSection] && editableReport[activeSection].includes('```mermaid') ? (
                          <div className="prose prose-slate max-w-none">
                            <div dangerouslySetInnerHTML={{ 
                              __html: editableReport[activeSection]
                                .replace(/```mermaid\n/g, '<div class="mermaid">')
                                .replace(/\n```/g, '</div>')
                            }} />
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-sm">
                            Add Mermaid diagram code to see preview. Start with ```mermaid and end with ```
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Textarea
                    value={editableReport[activeSection]}
                    onChange={(e) => updateSection(activeSection, e.target.value)}
                    className="min-h-96 resize-none font-mono text-sm leading-relaxed"
                    placeholder={`Enter ${sections.find(s => s.id === activeSection)?.title.toLowerCase()} content...`}
                  />
                )}
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
            <CardTitle>Report Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-slate max-w-none">
              <h1 className="text-3xl font-bold mb-6">{editableReport.title}</h1>
              {activeSection === 'diagrams' && editableReport[activeSection] && editableReport[activeSection].includes('```mermaid') ? (
                <div className="space-y-4">
                  {editableReport[activeSection].split('### ').map((section, index) => {
                    if (index === 0) return null; // Skip first empty section
                    const [title, ...content] = section.split('\n');
                    const contentText = content.join('\n');
                    
                    return (
                      <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-3">{title}</h3>
                        {contentText.includes('```mermaid') ? (
                          <div className="bg-background rounded border p-4">
                            <div className="mermaid-preview bg-white p-4 rounded border-2 border-dashed border-gray-300 min-h-32 flex items-center justify-center">
                              <span className="text-muted-foreground">📊 Mermaid Diagram Rendered Here</span>
                            </div>
                          </div>
                        ) : (
                          <div className="whitespace-pre-wrap text-sm leading-relaxed bg-muted/30 rounded-lg p-4">
                            {contentText}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="whitespace-pre-wrap text-sm leading-relaxed bg-muted/30 rounded-lg p-4">
                  {editableReport[activeSection]}
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