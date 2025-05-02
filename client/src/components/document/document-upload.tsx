import { useState, useRef } from "react";
import { Upload, Loader2, Camera, FolderOpen, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/language-context";
import { useIsMobile } from "@/hooks/use-mobile";

const DocumentUpload = ({ onDocumentProcessed }: { onDocumentProcessed: (data: { simplifiedText: string; keyPoints: string[] }) => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadOption, setUploadOption] = useState<'initial' | 'options'>('initial');
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  
  // Refs for file inputs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  
  // Handle clicking the main upload button
  const handleUploadClick = () => {
    setUploadOption('options');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
      setUploadOption('initial'); // Reset upload option after file selection
    }
  };

  const validateAndSetFile = (file: File) => {
    // Check file type (PDF, DOCX, TXT, and images)
    const validDocTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    const validTypes = [...validDocTypes, ...validImageTypes];
    
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOCX, TXT file, or an image (JPEG, PNG).",
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

    // If it's an image, inform the user about OCR processing
    if (validImageTypes.includes(file.type)) {
      toast({
        title: "Image document detected",
        description: "We'll use OCR to extract text from your image. This might take a moment.",
      });
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
      setUploadOption('initial'); // Reset upload option after file drop
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('document', file);
      formData.append('language', language); // Add language parameter
      formData.append('pageType', 'vidhana'); // Use vidhana for document analysis

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
      
      // Call the callback with processed text and key points
      onDocumentProcessed({
        simplifiedText: data.simplifiedText,
        keyPoints: data.keyPoints || []
      });
      
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
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-primary">{t('document.title')}</h2>
        <p className="text-neutral mb-6">
          {t('document.description')}
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
            
            {file ? (
              <div className="space-y-1">
                <p className="text-lg font-medium">{file.name}</p>
                <p className="text-sm text-neutral">{`${(file.size / (1024 * 1024)).toFixed(2)} MB`}</p>
              </div>
            ) : uploadOption === 'initial' ? (
              <div className="space-y-4">
                <p className="text-lg font-medium">{t('document.drag')}</p>
                <p className="text-sm text-neutral">{t('document.browse')}</p>
                <Button 
                  onClick={handleUploadClick}
                  className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                  size="lg"
                >
                  <Upload className="h-5 w-5" />
                  <span>Upload Document</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-4 w-full">
                <p className="text-lg font-medium">Choose an upload option:</p>
                <div className="pt-1 flex flex-wrap gap-3 justify-center">
                  {/* Browse Files */}
                  <label className="cursor-pointer w-full sm:w-auto">
                    <Button variant="outline" type="button" className="flex items-center gap-2 w-full" size="lg">
                      <FolderOpen className="h-5 w-5" />
                      <span>Browse Files</span>
                    </Button>
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange}
                      accept=".pdf,.docx,.txt,.jpg,.jpeg,.png,.webp,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,image/jpeg,image/png,image/jpg,image/webp"
                    />
                  </label>
                  
                  {/* Take Photo */}
                  <label className="cursor-pointer w-full sm:w-auto">
                    <Button variant="outline" type="button" className="flex items-center gap-2 w-full" size="lg">
                      <Camera className="h-5 w-5" />
                      <span>Take Photo</span>
                    </Button>
                    <input 
                      ref={cameraInputRef}
                      type="file" 
                      capture="environment"
                      className="hidden" 
                      onChange={handleFileChange}
                      accept="image/jpeg,image/png,image/jpg,image/webp"
                    />
                  </label>
                  
                  {/* Choose from Gallery */}
                  <label className="cursor-pointer w-full sm:w-auto">
                    <Button variant="outline" type="button" className="flex items-center gap-2 w-full" size="lg">
                      <Image className="h-5 w-5" />
                      <span>From Gallery</span>
                    </Button>
                    <input 
                      ref={galleryInputRef}
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange}
                      accept="image/jpeg,image/png,image/jpg,image/webp"
                    />
                  </label>
                </div>
                <Button 
                  variant="ghost" 
                  className="mt-4 text-sm"
                  onClick={() => setUploadOption('initial')}
                >
                  Cancel
                </Button>
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
              {t('document.remove')}
            </Button>
            <Button 
              onClick={handleUpload} 
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('document.processing')}
                </>
              ) : (
                t('document.analyze')
              )}
            </Button>
          </div>
        )}
        
        <Separator className="my-6" />
        
        <div className="space-y-4">
          <h3 className="text-lg font-bold">{t('document.howItWorks')}</h3>
          <ol className="space-y-2 ml-6 list-decimal">
            <li>{t('document.step1')}</li>
            <li>{t('document.step2')}</li>
            <li>{t('document.step3')}</li>
            <li>{t('document.step4')}</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;
