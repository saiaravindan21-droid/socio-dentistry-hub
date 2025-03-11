
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <a href="/" className="text-xl font-bold text-primary flex items-center gap-2">
              <span className="w-8 h-8 bg-primary text-white rounded-md flex items-center justify-center font-display">
                SD
              </span>
              <span>SocioDent</span>
            </a>
            <p className="text-muted-foreground">
              Specialized dental care services for those with social, physical, or mental health needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="/services" className="text-muted-foreground hover:text-primary transition-colors">Services</a></li>
              <li><a href="/doctors" className="text-muted-foreground hover:text-primary transition-colors">Our Dentists</a></li>
              <li><a href="/appointments" className="text-muted-foreground hover:text-primary transition-colors">Appointments</a></li>
              <li><a href="/marketplace" className="text-muted-foreground hover:text-primary transition-colors">Shop</a></li>
              <li><a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <span className="text-muted-foreground">contact@sociodent.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Emergency Dental Care</h4>
              <a 
                href="tel:+18001234567" 
                className="bg-destructive/10 text-destructive font-medium px-4 py-2 rounded-md inline-flex hover:bg-destructive/20 transition-colors"
              >
                <Phone size={16} className="mr-2" /> 1-800-123-4567
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-6">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to receive updates on special care dentistry and exclusive offers.
            </p>
            <div className="space-y-3">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-background border-foreground/10"
              />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SocioDent. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
