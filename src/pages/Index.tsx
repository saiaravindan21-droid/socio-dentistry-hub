
import { ArrowRight, Calendar, Video, Heart, ShoppingCart, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PageLayout from '@/components/layout/PageLayout';
import BlurImage from '@/components/common/BlurImage';

const Index = () => {
  return (
    <PageLayout fullWidth>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 to-background pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-right">
              <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
                Specialized Dental Care
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Dental Care for Special Health Needs
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                SocioDent provides specialized dental services for patients with social, physical, or mental health requirements.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="rounded-full gap-2 px-6">
                  Book Appointment <ArrowRight size={18} />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full gap-2 px-6">
                  Virtual Consultation <Video size={18} />
                </Button>
              </div>
              
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="w-10 h-10 rounded-full border-2 border-background overflow-hidden"
                    >
                      <img
                        src={`https://randomuser.me/api/portraits/men/${20 + i}.jpg`}
                        alt="Patient"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-sm font-medium">4.9 out of 5</div>
                  <div className="text-xs text-muted-foreground">Based on 2,000+ reviews</div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-left">
              <div className="relative z-10 rounded-2xl overflow-hidden premium-shadow">
                <BlurImage
                  src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1200"
                  alt="Dentist with patient"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
              
              {/* Floating cards */}
              <div className="absolute -right-5 top-1/4 glass-card rounded-xl p-4 animate-float shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Next Appointment</p>
                    <p className="text-xs text-muted-foreground">Today, 2:00 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -left-5 bottom-1/4 glass-card rounded-xl p-4 animate-float shadow-lg animation-delay-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Patient Care</p>
                    <p className="text-xs text-muted-foreground">Specialized treatment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                  className="fill-background"></path>
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 animate-fade-in">
            <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              Our Services
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Specialized Dental Care Services
            </h2>
            <p className="text-muted-foreground">
              We provide comprehensive dental services tailored for patients with special healthcare needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <BlurImage
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {service.icon}
                    </div>
                    <h3 className="font-semibold text-lg">{service.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Button variant="link" className="p-0 h-auto font-medium flex items-center gap-1 text-primary">
                    Learn more <ArrowRight size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative animate-slide-right">
              <div className="relative z-10 rounded-2xl overflow-hidden premium-shadow">
                <BlurImage
                  src="https://images.unsplash.com/photo-1626256082893-d4046b346062?q=80&w=1200"
                  alt="Dentist consultation"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-5 -left-5 z-0">
                <div className="w-24 h-24 rounded-full bg-primary/10 animate-pulse"></div>
              </div>
              <div className="absolute -bottom-5 -right-5 z-0">
                <div className="w-32 h-32 rounded-full bg-primary/10 animate-pulse animation-delay-700"></div>
              </div>
              
              <div className="absolute top-10 -right-6 glass-card rounded-xl p-4 animate-float shadow-lg z-20">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-primary">
                    <Video className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Virtual Care</p>
                    <p className="text-xs text-muted-foreground">Available 24/7</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 animate-slide-left">
              <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
                Easy Appointments
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Schedule Your Dental Visit Today
              </h2>
              <p className="text-lg text-muted-foreground">
                Book an in-person appointment or schedule a virtual consultation with our specialized dentists.
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Flexible Scheduling</h3>
                    <p className="text-muted-foreground">Choose appointments that fit your schedule, including evenings and weekends.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <Video className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Virtual Consultations</h3>
                    <p className="text-muted-foreground">Connect with our specialists from the comfort of your home.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Emergency Care</h3>
                    <p className="text-muted-foreground">Immediate assistance for dental emergencies, available 24/7.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="rounded-full gap-2 px-6">
                  Book Now <Calendar size={18} />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full gap-2 px-6">
                  Call Us <Phone size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Preview Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div className="max-w-2xl">
              <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                Meet Our Team
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Specialized Dental Professionals
              </h2>
              <p className="text-muted-foreground">
                Our team of dentists are specially trained to work with patients who have social, physical, or mental health needs.
              </p>
            </div>
            <Button variant="ghost" className="mt-4 md:mt-0">
              View All Doctors <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {doctors.map((doctor, index) => (
              <Card key={index} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-56 overflow-hidden">
                  <BlurImage
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg">{doctor.name}</h3>
                  <p className="text-primary text-sm mb-2">{doctor.specialty}</p>
                  <p className="text-muted-foreground text-sm mb-4">{doctor.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div className="max-w-2xl">
              <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                Our Shop
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Specialized Dental Care Products
              </h2>
              <p className="text-muted-foreground">
                Browse our selection of products designed specifically for patients with special healthcare needs.
              </p>
            </div>
            <Button variant="ghost" className="mt-4 md:mt-0">
              Visit Shop <ShoppingCart size={16} className="ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Card key={index} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  <BlurImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{product.name}</h3>
                    <div className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-medium">
                      ${product.price}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
                  <Button size="sm" className="w-full">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="bg-destructive/10 rounded-2xl p-8 md:p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-destructive">
                Dental Emergency?
              </h2>
              <p className="text-muted-foreground mb-6">
                Our emergency dental services are available 24/7. Don't wait if you're experiencing severe pain or injury.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="destructive" size="lg" className="gap-2">
                  <Phone size={18} /> Call Now: 1-800-123-4567
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

// Sample data for services
const services = [
  {
    title: 'Home Visits',
    icon: <Calendar size={20} />,
    description: 'Dental care in the comfort of your home for patients with mobility challenges.',
    image: 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?q=80&w=800'
  },
  {
    title: 'Virtual Consultations',
    icon: <Video size={20} />,
    description: 'Connect with our dentists through secure video calls for advice and evaluations.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800'
  },
  {
    title: 'Specialized Treatment',
    icon: <Heart size={20} />,
    description: 'Tailored dental procedures for patients with special healthcare requirements.',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800'
  },
  {
    title: 'Patient Education',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2h12l5 5v12a3 3 0 0 1-3 3H4a2 2 0 0 1-2-2V7a3 3 0 0 1 3-3Z"></path><path d="M8 2v4a1 1 0 0 1-1 1H3"></path><circle cx="12" cy="14" r="4"></circle><path d="M9 18v3"></path><path d="M15 18v3"></path></svg>,
    description: 'Educational resources to help patients and caregivers maintain oral health.',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800'
  },
  {
    title: 'Caregiver Training',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
    description: 'Training for caregivers on oral hygiene techniques for dependent patients.',
    image: 'https://images.unsplash.com/photo-1576671414121-aa2d60f2aca2?q=80&w=800'
  },
  {
    title: 'Emergency Care',
    icon: <Phone size={20} />,
    description: '24/7 emergency dental services for urgent pain relief and treatments.',
    image: 'https://images.unsplash.com/photo-1612594305265-86300a9a5b5b?q=80&w=800'
  },
];

// Sample data for doctors
const doctors = [
  {
    name: 'Dr. Sarah Johnson',
    specialty: 'Special Needs Dentistry',
    description: 'Specialized in dental care for patients with physical disabilities.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    name: 'Dr. Michael Chen',
    specialty: 'Pediatric Special Care',
    description: 'Expert in treating children with developmental disabilities.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    name: 'Dr. Emily Rodriguez',
    specialty: 'Geriatric Dentistry',
    description: 'Focused on dental care for elderly patients with medical conditions.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    name: 'Dr. James Wilson',
    specialty: 'Anxiety Management',
    description: 'Specialized in treating patients with dental anxiety and phobias.',
    image: 'https://randomuser.me/api/portraits/men/75.jpg'
  }
];

// Sample data for products
const products = [
  {
    name: 'Adaptive Toothbrush',
    price: 24.99,
    description: 'Ergonomic design for patients with limited dexterity and mobility.',
    image: 'https://images.unsplash.com/photo-1559591937-ece91f49d900?q=80&w=800'
  },
  {
    name: 'Specialty Floss Holder',
    price: 12.99,
    description: 'Makes flossing easier for caregivers and patients with motor limitations.',
    image: 'https://images.unsplash.com/photo-1628359355624-855775b5c9c4?q=80&w=800'
  },
  {
    name: 'Sensitive Teeth Mouthwash',
    price: 18.99,
    description: 'Gentle formula for patients with heightened oral sensitivity.',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=800'
  },
  {
    name: 'Oral Irrigation System',
    price: 45.99,
    description: 'Water flosser with special attachments for patients with braces or implants.',
    image: 'https://images.unsplash.com/photo-1612947961947-ef5d2443e064?q=80&w=800'
  }
];

export default Index;
