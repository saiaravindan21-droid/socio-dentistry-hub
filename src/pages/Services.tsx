
import { ArrowRight } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import BlurImage from '@/components/common/BlurImage';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Services = () => {
  // Icons for services
  const icons = {
    homeVisits: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
    virtualConsultation: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10v4"></path><path d="M17 12h-4"></path><rect width="18" height="12" x="3" y="6" rx="2"></rect><path d="M22 18H2"></path></svg>,
    specializedTreatment: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path><path d="m9 12 2 2 4-4"></path></svg>,
    education: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 14c3 0 7 1.5 7 4v2H5v-2c0-2.5 4-4 7-4Z"></path><circle cx="12" cy="6" r="4"></circle></svg>,
    caregiverSupport: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 22h2c.5 0 1-.2 1.4-.6.4-.4.6-.9.6-1.4V7.5L14.5 2H6c-.5 0-1 .2-1.4.6C4.2 3 4 3.5 4 4v3"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M4.2 15h4.6c.5 0 1.1.2 1.4.6l.8.8c.3.4.8.6 1.4.6h2.4c.6 0 1.2-.2 1.6-.6l.8-.8c.3-.4.8-.6 1.4-.6h1.4"></path><path d="M13.3 10.6a2 2 0 0 1 3.4 2.1l-5.9 9.5a2.7 2.7 0 0 1-4.4.9 3 3 0 0 1-.7-3.2l1.5-3.2c.4-.7 1.1-1.2 1.9-1.2h1c.8 0 1.5-.5 1.8-1.2l1.4-2.7"></path></svg>,
    emergency: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 2 22"></path><path d="M17 7a5 5 0 0 0-5-5c-1.56 0-3 .72-4 2"></path><path d="M19.3 13a9 9 0 0 1-9.6 7.1c-2.6-.2-5-1.5-6.7-3.3"></path><path d="M10.2 6.3a3 3 0 0 0-5.9 1.15c0 1.25.7 2.26 1.4 3.2A6.3 6.3 0 0 0 8 12.5"></path><path d="M17.8 14.5a5 5 0 0 0 1.95-4.2c-.24-2.2-2.2-4.1-4.6-4.3-2.4-.2-4.5 1.3-5.1 3.3"></path><path d="M18 22a5 5 0 0 0-5-5"></path></svg>,
    accessibility: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="16" cy="4" r="1"></circle><path d="m18 19-5-7 1-4-7 5"></path><path d="M4 15 12 7"></path><path d="M14 15v2a3 3 0 0 0 3 3v0a3 3 0 0 0 3-3v-0a2 2 0 0 0-2-2h-6z"></path></svg>,
    medication: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="12" height="8" rx="1"></rect><rect x="4" y="16" width="16" height="4" rx="1"></rect><path d="M12 11v5"></path><path d="M8 11v2"></path><path d="M16 11v2"></path></svg>,
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="text-center mb-16 animate-slide-up">
        <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          Our Services
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Specialized Dental Care Services
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We provide comprehensive dental solutions tailored for patients with special healthcare needs, ensuring everyone receives the care they deserve.
        </p>
      </div>

      {/* Main Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        {mainServices.map((service, index) => (
          <div key={index} className={`flex flex-col md:flex-row gap-8 items-start ${index % 2 === 0 ? 'animate-slide-right' : 'animate-slide-left'}`}>
            <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-md">
              <BlurImage
                src={service.image}
                alt={service.title}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {icons[service.icon as keyof typeof icons]}
              </div>
              <h2 className="text-2xl font-bold">{service.title}</h2>
              <p className="text-muted-foreground">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="gap-2">
                Learn More <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Services */}
      <div className="mb-16">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Additional Services
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Complementary Dental Care
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Beyond our core services, we offer a range of supporting treatments to ensure comprehensive care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {additionalServices.map((service, index) => (
            <Card key={index} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
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
                    {icons[service.icon as keyof typeof icons]}
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

      {/* Service Process */}
      <div className="bg-primary/5 rounded-2xl p-8 md:p-12 mb-16">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            How It Works
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Our Service Process
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've designed a simple process to ensure you receive the care you need with minimal hassle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {index + 1}
              </div>
              <h3 className="text-lg font-medium mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Questions & Answers
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our specialized dental services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="border border-border/50 shadow-sm animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary rounded-2xl p-8 md:p-12 text-white animate-fade-in">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Schedule Your Appointment?
          </h2>
          <p className="text-white/90 mb-6">
            Our team is ready to provide the specialized dental care you or your loved one needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg" className="gap-2">
              Book an Appointment <ArrowRight size={18} />
            </Button>
            <Button variant="outline" size="lg" className="gap-2 bg-transparent text-white border-white/20 hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

// Service data
const mainServices = [
  {
    title: "Home Dental Visits",
    description: "We bring professional dental care directly to patients who have difficulty visiting traditional dental offices due to mobility issues, anxiety, or other special needs.",
    image: "https://images.unsplash.com/photo-1581092162384-8987c1d64424?q=80&w=1200",
    icon: "homeVisits",
    features: [
      "Comprehensive dental exams at home",
      "Portable equipment for quality care",
      "Scheduled appointments that fit your routine",
      "Same standard of care as in-office visits"
    ]
  },
  {
    title: "Virtual Consultations",
    description: "Connect with our specialized dentists through secure video calls for consultations, follow-ups, and oral health guidance without leaving your home.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200",
    icon: "virtualConsultation",
    features: [
      "Secure, HIPAA-compliant video platform",
      "Dental assessments and recommendations",
      "Prescription services when needed",
      "Easy scheduling through our online system"
    ]
  },
  {
    title: "Specialized Treatment Plans",
    description: "Individualized dental care plans designed specifically for patients with social, physical, or mental health needs, ensuring comfortable and effective treatment.",
    image: "https://images.unsplash.com/photo-1609840113041-757c8bd8f2eb?q=80&w=1200",
    icon: "specializedTreatment",
    features: [
      "Sensory-friendly approaches for sensitive patients",
      "Accommodations for physical limitations",
      "Sedation options for anxiety management",
      "Coordinated care with other healthcare providers"
    ]
  },
  {
    title: "Caregiver Support & Training",
    description: "Educational resources and hands-on training for caregivers to help maintain oral health for dependent individuals with special healthcare needs.",
    image: "https://images.unsplash.com/photo-1576671414121-aa2d60f2aca2?q=80&w=1200",
    icon: "caregiverSupport",
    features: [
      "Personalized oral hygiene instruction",
      "Practical techniques for assisting with brushing and flossing",
      "Nutritional guidance for oral health",
      "Regular follow-up support and resources"
    ]
  }
];

const additionalServices = [
  {
    title: "Patient Education",
    description: "Interactive and accessible educational materials to help patients understand and manage their oral health.",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=800",
    icon: "education"
  },
  {
    title: "Accessibility Services",
    description: "Features and accommodations designed to make dental care accessible to patients with various disabilities.",
    image: "https://images.unsplash.com/photo-1631556097152-c39782301e3e?q=80&w=800",
    icon: "accessibility"
  },
  {
    title: "Emergency Dental Care",
    description: "24/7 emergency services for urgent dental issues, with specialists trained in managing crises for patients with special needs.",
    image: "https://images.unsplash.com/photo-1612594305265-86300a9a5b5b?q=80&w=800",
    icon: "emergency"
  }
];

const processSteps = [
  {
    title: "Initial Consultation",
    description: "We begin with a thorough assessment of your needs, either virtually or at your location."
  },
  {
    title: "Personalized Plan",
    description: "Our specialists develop a customized treatment plan tailored to your specific requirements."
  },
  {
    title: "Treatment Delivery",
    description: "Receive care in the most comfortable setting for you—at home, through virtual visits, or in our office."
  },
  {
    title: "Ongoing Support",
    description: "We provide continuous care, follow-ups, and resources to maintain your oral health long-term."
  }
];

const faqs = [
  {
    question: "How do I know if I qualify for home dental visits?",
    answer: "Home dental visits are available for patients who have mobility challenges, severe anxiety about visiting a dental office, or medical conditions that make travel difficult. Contact us for an assessment to determine eligibility."
  },
  {
    question: "Are virtual consultations covered by insurance?",
    answer: "Many insurance providers now cover virtual dental consultations. We can verify your coverage before your appointment and provide necessary documentation for reimbursement."
  },
  {
    question: "What types of special needs do you accommodate?",
    answer: "We accommodate a wide range of special needs including physical disabilities, developmental disorders, cognitive impairments, sensory sensitivities, and various medical conditions that require specialized dental approaches."
  },
  {
    question: "How do you ensure quality care during home visits?",
    answer: "Our mobile units are equipped with portable dental equipment that meets professional standards. Our dentists are specially trained in providing care in non-traditional settings while maintaining high-quality treatment standards."
  },
  {
    question: "Can caregivers be present during treatments?",
    answer: "Yes, we encourage caregivers to be present during treatments. They can provide comfort to the patient and learn how to assist with ongoing oral care at home."
  },
  {
    question: "What emergency services do you provide?",
    answer: "Our emergency services include pain management, treatment for dental trauma, addressing broken dental work, and managing infections. We have a 24/7 hotline and can arrange urgent care when needed."
  }
];

export default Services;
