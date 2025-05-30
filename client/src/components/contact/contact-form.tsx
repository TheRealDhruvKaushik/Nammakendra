import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

// Required field marker component
const RequiredMark = () => {
  return <span className="text-red-500 ml-1">*</span>;
};

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { t, language } = useLanguage();
  
  // Dynamic form schema with translations
  const formSchema = z.object({
    name: z.string().min(2, language === 'english' ? 
      "Name must be at least 2 characters" : 
      t('contact.form.nameRequired')),
    email: z.string().optional(),
    phone: z.string().min(10, language === 'english' ? 
      "Please enter a valid phone number" : 
      "ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ"),
    message: z.string().min(10, language === 'english' ? 
      "Message must be at least 10 characters" : 
      t('contact.form.messageTooShort')),
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    mode: "onChange",
  });
  
  // Track form validity changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      // Check if required fields are filled
      const hasName = !!value.name && value.name.length >= 2;
      const hasValidPhone = !!value.phone && value.phone.length >= 10;
      const hasMessage = !!value.message && value.message.length >= 10;
      
      setFormIsValid(hasName && hasValidPhone && hasMessage);
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const handleSubmit = (e: React.FormEvent) => {
    // For FormSubmit to work properly, we need to let the browser handle the submission
    // We'll show our success message using a different approach
    setIsSubmitting(true);
    
    // Set a timeout to show success message after form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      form.reset();
      setFormIsValid(false);
    }, 2000); // Give time for FormSubmit to process
  };
  
  // Required field marker already defined at the top of the file

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-primary">{t('contact.title')}</h2>
        
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="mb-4">
              <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {language === 'english' ? 'Thank you for your message!' : 'ನಿಮ್ಮ ಸಂದೇಶಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು!'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'english' ? 'We will reply as soon as possible.' : 'ನಾವು ಸಾಧ್ಯವಾದಷ್ಟು ಬೇಗ ಉತ್ತರಿಸುತ್ತೇವೆ.'}
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="bg-primary text-white hover:bg-primary-dark"
            >
              {language === 'english' ? 'Send Another Message' : 'ಇನ್ನೊಂದು ಸಂದೇಶ ಕಳುಹಿಸಿ'}
            </Button>
          </div>
        ) : (
          <form action="https://formsubmit.co/dhruvkkaushik8@gmail.com" method="POST" className="space-y-6">
            {/* Hidden fields for FormSubmit configuration */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="Contact Form Submission - NammaKendra" />
            
            <div>
              <label className="text-base font-medium">
                {t('contact.form.name')}
                <RequiredMark />
              </label>
              <input 
                type="text"
                name="name"
                placeholder={language === 'english' ? "Enter your full name" : t('contact.form.name')} 
                className="mt-1 block w-full h-12 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-base font-medium">
                  {t('contact.form.email')}
                  {/* No required mark for email as it's optional */}
                </label>
                <input 
                  type="email"
                  name="email"
                  placeholder={language === 'english' ? "Enter your email (optional)" : t('contact.form.email')} 
                  className="mt-1 block w-full h-12 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <label className="text-base font-medium">
                  {t('contact.form.phone')}
                  <RequiredMark />
                </label>
                <input 
                  type="tel"
                  name="phone"
                  placeholder={language === 'english' ? "Enter your phone number" : t('contact.form.phone')} 
                  className="mt-1 block w-full h-12 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="text-base font-medium">
                {t('contact.form.message')}
                <RequiredMark />
              </label>
              <textarea 
                name="message"
                placeholder={language === 'english' ? "How can we help you?" : t('contact.form.message')} 
                rows={6} 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-vertical"
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full md:w-auto md:min-w-[200px] h-12 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-200 px-6"
            >
              {language === 'english' ? "Send Message" : t('contact.form.submit')}
            </button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactForm;
