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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      await fetch('https://formsubmit.co/dhruvkkaushik8@gmail.com', {
        method: 'POST',
        body: formData
      });
      
      setIsSubmitted(true);
      form.reset();
      setFormIsValid(false);
    } catch (error) {
      toast({
        title: language === 'english' ? "Failed to send message" : "ಸಂದೇಶ ಕಳುಹಿಸಲು ವಿಫಲವಾಗಿದೆ",
        description: language === 'english' ? "Please try again or contact us directly." : "ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ ನೇರವಾಗಿ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Hidden fields for FormSubmit configuration */}
            <input type="hidden" name="_captcha" value="false" />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    {t('contact.form.name')}
                    <RequiredMark />
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={language === 'english' ? "Enter your full name" : t('contact.form.name')} 
                      {...field} 
                      className="h-12"
                      disabled={isSubmitting}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      {t('contact.form.email')}
                      {/* No required mark for email as it's optional */}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={language === 'english' ? "Enter your email (optional)" : t('contact.form.email')} 
                        type="email" 
                        {...field} 
                        className="h-12"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      {t('contact.form.phone')}
                      <RequiredMark />
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={language === 'english' ? "Enter your phone number" : t('contact.form.phone')} 
                        type="tel" 
                        {...field} 
                        className="h-12"
                        disabled={isSubmitting}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    {t('contact.form.message')}
                    <RequiredMark />
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={language === 'english' ? "How can we help you?" : t('contact.form.message')} 
                      rows={6} 
                      {...field} 
                      disabled={isSubmitting}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className={cn(
                "w-full md:w-auto md:min-w-[200px] h-12 transition-colors duration-200",
                formIsValid ? "opacity-100" : "opacity-70 bg-primary/70"
              )}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {language === 'english' ? "Sending..." : t('document.processing')}
                </>
              ) : (
                t('contact.form.submit')
              )}
            </Button>
          </form>
        </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactForm;
