
import { HelpCircle, MessageCircle, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const HelpCenter = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How do I register for a tournament?",
      answer: "Click the 'Register Now' button on any tournament card and fill out the registration form. Make sure to complete registration at least 48 hours before the tournament starts."
    },
    {
      question: "What are the technical requirements?",
      answer: "You need a stable internet connection, compatible mobile device for Mobile Legends, and Discord for team communication during matches."
    },
    {
      question: "How are prizes distributed?",
      answer: "Prizes are distributed within 7 business days after tournament conclusion. Winners will be contacted via registered email for prize collection details."
    },
    {
      question: "Can I participate in multiple tournaments?",
      answer: "Yes, you can register for multiple tournaments as long as there are no scheduling conflicts and you meet all requirements for each tournament."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HelpCircle className="h-8 w-8 text-primary" />
              <h1 className="font-orbitron text-4xl font-black gradient-text">
                Help Center
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find answers to frequently asked questions and get the support you need.
            </p>
          </div>

          {/* FAQs */}
          <div className="mb-12">
            <h2 className="font-orbitron text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-card/50 border border-border/50 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Options */}
          <div className="bg-card/30 border border-border/50 rounded-lg p-8 mb-8">
            <h2 className="font-orbitron text-2xl font-bold mb-6">Need More Help?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-muted-foreground text-sm mb-4">Chat with our support team</p>
                <Button size="sm" variant="outline">Start Chat</Button>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-muted-foreground text-sm mb-4">Get help via email</p>
                <Button size="sm" variant="outline">Send Email</Button>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-muted-foreground text-sm mb-4">Call our support line</p>
                <Button size="sm" variant="outline">Call Now</Button>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="font-orbitron"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HelpCenter;
