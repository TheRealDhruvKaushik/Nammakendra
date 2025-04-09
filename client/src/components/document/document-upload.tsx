import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const DocumentUpload = ({ onDocumentProcessed }: { onDocumentProcessed: (text: string) => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Check file type (PDF, DOCX, TXT)
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOCX, or TXT file.",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive"
      });
      return;
    }

    setFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('document', file);

      // Use fetch directly since we're sending FormData
      const response = await fetch('/api/documents/analyze', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to process document');
      }

      const data = await response.json();
      
      // Call the callback with processed text
      onDocumentProcessed(data.simplifiedText);
      
      toast({
        title: "Document processed successfully",
        description: "Your document has been simplified.",
      });
    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        title: "Error processing document",
        description: "There was a problem analyzing your document. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      setFile(null);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-primary">Upload Legal Document</h2>
        <p className="text-neutral mb-6">
          Upload your legal document to get a simplified explanation. We support PDF, DOCX, and TXT files up to 10MB.
        </p>
        
        <div 
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
          } transition-colors`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="bg-primary/10 rounded-full p-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            
            <div className="space-y-1">
              <p className="text-lg font-medium">
                {file ? file.name : 'Drag and drop your document here'}
              </p>
              <p className="text-sm text-neutral">
                {file 
                  ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` 
                  : 'or click to browse files (PDF, DOCX, TXT up to 10MB)'}
              </p>
            </div>
            
            {!file && (
              <div className="pt-4">
                <label className="cursor-pointer">
                  <Button variant="outline" type="button">
                    Browse Files
                  </Button>
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange}
                    accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {file && (
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={() => setFile(null)} 
              variant="outline" 
              className="mr-2"
              disabled={isUploading}
            >
              Remove
            </Button>
            <Button 
              onClick={handleUpload} 
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Analyze Document'
              )}
            </Button>
          </div>
        )}
        
        <Separator className="my-6" />
        
        <div className="space-y-4">
          <h3 className="text-lg font-bold">How It Works</h3>
          <ol className="space-y-2 ml-6 list-decimal">
            <li>Upload your legal document (court order, contract, etc.)</li>
            <li>Our AI will analyze the document</li>
            <li>Get a simplified explanation with highlighted key points</li>
            <li>See deadlines, requirements, and actions needed</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;
