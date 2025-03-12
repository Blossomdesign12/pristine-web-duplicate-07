
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Mail, Send } from 'lucide-react';

interface ContactFormProps {
  agentName: string;
  propertyTitle: string;
}

const ContactForm = ({ agentName, propertyTitle }: ContactFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in ${propertyTitle}. Please provide more information.`
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: `Your message has been sent to ${agentName}. They will contact you soon.`,
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Mail size={18} className="text-estate-primary" />
        <span>Contact Agent</span>
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-estate-gray mb-1">
            Your Name
          </label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-estate-gray mb-1">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-estate-gray mb-1">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-estate-gray mb-1">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-estate-primary hover:bg-estate-primary/90 gap-2"
          disabled={isSubmitting}
        >
          <Send size={18} />
          <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
        </Button>
        
        <p className="text-xs text-estate-gray text-center">
          By submitting this form, you agree to our privacy policy and terms of service.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
