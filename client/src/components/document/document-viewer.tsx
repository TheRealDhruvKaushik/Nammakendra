import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Printer, Copy, Check, ArrowUp, Download } from "lucide-react"; // Added Download import
import { useToast } from "@/hooks/use-toast";

interface DocumentViewerProps {
  simplifiedText: string;
  keyPoints?: string[];
  onReset: () => void;
}

const DocumentViewer = ({ simplifiedText, keyPoints: providedKeyPoints, onReset }: DocumentViewerProps) => {
  const [activeTab, setActiveTab] = useState("simplified");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Parse out sections from the simplified text
  const sections = simplifiedText.split('\n\n').filter(Boolean);

  // Get summary and key points
  const summary = sections[0] || "No summary available";
  
  // Check if we have valid key points
  let keyPoints: string[] = [];
  
  // First attempt to use provided key points if they exist and have content
  if (providedKeyPoints && providedKeyPoints.length > 0) {
    keyPoints = providedKeyPoints;
  } else {
    // Look for a "Key Points" section in the text
    const keyPointsIndex = sections.findIndex(section => 
      section.toLowerCase().includes('key points') || 
      section.toLowerCase().includes('important points')
    );
    
    if (keyPointsIndex >= 0 && keyPointsIndex < sections.length - 1) {
      // Take everything after the "Key Points" header section
      keyPoints = sections.slice(keyPointsIndex + 1);
    } else {
      // Extract bullet points or numbered points from the text
      const bulletPointPattern = /[•\-*]\s+(.+)/g;
      const numberedPointPattern = /\d+\.\s+(.+)/g;
      
      const extractedPoints = [];
      
      // Search for bullet points in the text
      let match;
      const combinedText = simplifiedText;
      
      while ((match = bulletPointPattern.exec(combinedText)) !== null) {
        extractedPoints.push(match[1]);
      }
      
      // If no bullet points, search for numbered points
      if (extractedPoints.length === 0) {
        while ((match = numberedPointPattern.exec(combinedText)) !== null) {
          extractedPoints.push(match[1]);
        }
      }
      
      // If we found some points, use them
      if (extractedPoints.length > 0) {
        keyPoints = extractedPoints;
      } else {
        // Otherwise, use sections from the text as a last resort
        // Skip the first section which we're using as summary
        keyPoints = sections.slice(1);
      }
    }
  }
  
  // Ensure we have at least one key point
  if (keyPoints.length === 0) {
    keyPoints = ["No key points could be extracted from this document."]
  }

  // Function to copy text to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(simplifiedText);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Text has been copied to your clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually",
        variant: "destructive"
      });
    }
  };

  // Function to print document
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Simplified Legal Document</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
              h1 { color: #1a4f8a; }
              .section { margin-bottom: 20px; }
              .key-point { background-color: #f8f9fa; padding: 10px; border-left: 4px solid #1a4f8a; margin-bottom: 10px; }
            </style>
          </head>
          <body>
            <h1>Simplified Legal Document</h1>
            <div class="section">
              <h2>Summary</h2>
              <p>${summary}</p>
            </div>
            <div class="section">
              <h2>Key Points</h2>
              ${keyPoints.map(point => `<div class="key-point">${point}</div>`).join('')}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    } else {
      toast({
        title: "Failed to open print window",
        description: "Your browser may be blocking pop-ups",
        variant: "destructive"
      });
    }
  };

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Placeholder for zip download functionality
  const handleDownloadZip = () => {
    // Implement zip download logic here.  This is a placeholder.
    console.log("Download ZIP functionality not yet implemented.");
    toast({
      title: "Download ZIP",
      description: "This feature is not yet implemented",
      variant: "destructive"
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Simplified Document</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-1" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadZip}>
              <Download className="h-4 w-4 mr-1" />
              Download ZIP
            </Button>
          </div>
        </div>

        <Tabs defaultValue="simplified" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="simplified">Simplified Version</TabsTrigger>
            <TabsTrigger value="keyPoints">Key Points</TabsTrigger>
          </TabsList>

          <TabsContent value="simplified" className="text-lg leading-relaxed space-y-4">
            {sections.map((section, index) => (
              <p key={index}>{section}</p>
            ))}
          </TabsContent>

          <TabsContent value="keyPoints">
            <div className="bg-gray-50 p-4 mb-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-2">Summary</h3>
              <p>{summary}</p>
            </div>

            <h3 className="text-xl font-bold mb-4">Important Points</h3>
            <div className="space-y-4">
              {keyPoints.map((point, index) => (
                <div 
                  key={index} 
                  className="p-4 border-l-4 border-primary rounded-r-lg bg-primary/5"
                >
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-between">
          <Button 
            variant="outline" 
            onClick={onReset}
          >
            Upload Another Document
          </Button>

          <Button 
            variant="secondary" 
            size="icon"
            onClick={scrollToTop}
            className="rounded-full h-10 w-10"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentViewer;