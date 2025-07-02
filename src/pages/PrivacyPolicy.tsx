
import { Shield, Eye, Lock, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="font-orbitron text-4xl font-black gradient-text">
                Privacy Policy
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Your privacy matters to us. Learn how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: January 2024
            </p>
          </div>

          {/* Privacy Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card/50 border border-border/50 rounded-lg p-6 text-center">
              <Eye className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Transparency</h3>
              <p className="text-muted-foreground text-sm">We're clear about what data we collect and why</p>
            </div>
            
            <div className="bg-card/50 border border-border/50 rounded-lg p-6 text-center">
              <Lock className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Security</h3>
              <p className="text-muted-foreground text-sm">Your data is protected with industry-standard security</p>
            </div>
            
            <div className="bg-card/50 border border-border/50 rounded-lg p-6 text-center">
              <Database className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Control</h3>
              <p className="text-muted-foreground text-sm">You have control over your personal information</p>
            </div>
          </div>

          {/* Policy Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="bg-card/30 border border-border/50 rounded-lg p-8 mb-8">
              <h2 className="font-orbitron text-xl font-bold mb-4">Information We Collect</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Registration Information</h3>
                  <p>When you register for tournaments, we collect your name, email address, game username, and contact details.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Usage Data</h3>
                  <p>We automatically collect information about how you use our website, including pages visited and time spent.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Communication Data</h3>
                  <p>When you contact us, we keep records of your communications to provide better support.</p>
                </div>
              </div>
            </div>

            <div className="bg-card/30 border border-border/50 rounded-lg p-8 mb-8">
              <h2 className="font-orbitron text-xl font-bold mb-4">How We Use Your Information</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>• To organize and manage tournament registrations</p>
                <p>• To communicate tournament updates and announcements</p>
                <p>• To improve our services and user experience</p>
                <p>• To ensure fair play and tournament integrity</p>
                <p>• To comply with legal obligations</p>
              </div>
            </div>

            <div className="bg-card/30 border border-border/50 rounded-lg p-8 mb-8">
              <h2 className="font-orbitron text-xl font-bold mb-4">Data Protection</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                <p>Your data is stored on secure servers and access is restricted to authorized personnel only.</p>
                <p>We regularly review our security practices to ensure your information remains protected.</p>
              </div>
            </div>

            <div className="bg-card/30 border border-border/50 rounded-lg p-8 mb-8">
              <h2 className="font-orbitron text-xl font-bold mb-4">Your Rights</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>• <strong>Access:</strong> Request a copy of your personal data</p>
                <p>• <strong>Correction:</strong> Update or correct your information</p>
                <p>• <strong>Deletion:</strong> Request deletion of your data</p>
                <p>• <strong>Portability:</strong> Request transfer of your data</p>
                <p>• <strong>Objection:</strong> Object to processing of your data</p>
              </div>
            </div>

            <div className="bg-card/30 border border-border/50 rounded-lg p-8 mb-8">
              <h2 className="font-orbitron text-xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy or how we handle your data, 
                please contact us at <strong>privacy@arjuna-esports.com</strong> or use our contact form.
              </p>
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

export default PrivacyPolicy;
