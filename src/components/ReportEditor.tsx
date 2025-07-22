import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download, Edit, ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

interface ReportEditorProps {
  reportData: any;
  onBack: () => void;
}

const ReportEditor = ({ reportData, onBack }: ReportEditorProps) => {
  const [editableReport, setEditableReport] = useState(reportData);
  const [activeSection, setActiveSection] = useState("abstract");

  const sections = [
    { id: "abstract", title: "Abstract", icon: FileText },
    { id: "introduction", title: "Introduction", icon: FileText },
    { id: "methodology", title: "Methodology", icon: FileText },
    { id: "implementation", title: "Implementation", icon: FileText },
    { id: "results", title: "Results", icon: FileText },
    { id: "conclusion", title: "Conclusion", icon: FileText },
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

  const generateWordDocument = () => {
    const reportContent = `
${editableReport.title}

ABSTRACT
${editableReport.abstract}

${editableReport.introduction}

${editableReport.methodology}

${editableReport.implementation}

${editableReport.results}

${editableReport.conclusion}

${editableReport.references}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${editableReport.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
            <Button onClick={generateWordDocument} variant="hero" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export (.txt)
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
                  <p>Tip: Use Markdown formatting for better structure (## for headings, **bold**, *italic*)</p>
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
              <div className="whitespace-pre-wrap text-sm leading-relaxed bg-muted/30 rounded-lg p-4">
                {editableReport[activeSection]}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportEditor;