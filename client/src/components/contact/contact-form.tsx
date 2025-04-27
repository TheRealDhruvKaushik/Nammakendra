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
  const { toast } = useToast();
  const { t, language } = useLanguage();
  
  // Dynamic form schema with translations
  const formSchema = z.object({
    name: z.string().min(2, language === 'english' ? 
      "Name must be at least 2 characters" : 
      t('contact.form.nameRequired')),
    email: z.string().email(language === 'english' ? 
      "Please enter a valid email address" : 
      t('contact.form.emailInvalid')),
    phone: z.string().optional(),
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
      const hasValidEmail = !!value.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email);
      const hasMessage = !!value.message && value.message.length >= 10;
      
      setFormIsValid(hasName && hasValidEmail && hasMessage);
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", values);
      
      toast({
        title: language === 'english' ? "Message sent successfully" : t('contact.form.success'),
        description: language === 'english' ? "We'll get back to you as soon as possible." : "",
      });
      
      form.reset();
      setFormIsValid(false);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: language === 'english' ? "Failed to send message" : t('contact.form.error'),
        description: language === 'english' ? "Please try again or contact us directly." : "",
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
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      <RequiredMark />
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={language === 'english' ? "Enter your email" : t('contact.form.email')} 
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
                      {t('contact.form.phone')} {/* No asterisk for phone as it's optional */}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={language === 'english' ? "Enter your phone number (optional)" : t('contact.form.phone')} 
                        type="tel" 
                        {...field} 
                        className="h-12"
                        disabled={isSubmitting}
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
      </CardContent>
    </Card>
  );
};

export default ContactForm;
