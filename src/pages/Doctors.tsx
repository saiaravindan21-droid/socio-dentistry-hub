
import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import BlurImage from '@/components/common/BlurImage';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Video, Star, MapPin, Phone, Filter } from 'lucide-react';

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

  // Filter doctors based on search term and selected specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty ? doctor.specialty === selectedSpecialty : true;
    return matchesSearch && matchesSpecialty;
  });

  // Get unique specialties for filter
  const specialties = Array.from(new Set(doctors.map(doctor => doctor.specialty)));

  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="text-center mb-16 animate-slide-up">
        <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          Our Team
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Meet Our Specialized Dentists
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our team of dental professionals is specially trained to work with patients who have unique healthcare needs.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Input
              placeholder="Search by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="col-span-1 relative">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={18} className="text-muted-foreground" />
              <Badge
                className={`cursor-pointer ${!selectedSpecialty ? 'bg-primary' : 'bg-secondary text-foreground hover:bg-secondary/80'}`}
                onClick={() => setSelectedSpecialty(null)}
              >
                All
              </Badge>
              {specialties.map(specialty => (
                <Badge
                  key={specialty}
                  className={`cursor-pointer ${selectedSpecialty === specialty ? 'bg-primary' : 'bg-secondary text-foreground hover:bg-secondary/80'}`}
                  onClick={() => setSelectedSpecialty(specialty)}
                >
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor, index) => (
            <Card key={index} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="h-64 overflow-hidden">
                <BlurImage
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-xl">{doctor.name}</h3>
                    <p className="text-primary text-sm">{doctor.specialty}</p>
                  </div>
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                    {doctor.availability}
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center gap-1 text-amber-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < doctor.rating ? "currentColor" : "none"} />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">({doctor.reviewCount})</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{doctor.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <MapPin size={14} />
                    <span>{doctor.location}</span>
                  </div>
                  {doctor.languages && (
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {doctor.languages.map((language, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-secondary/50">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Calendar size={14} /> Book
                  </Button>
                  <Button size="sm" className="gap-1">
                    <Video size={14} /> Consult
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground text-lg">No doctors found matching your search criteria.</p>
            <Button variant="link" onClick={() => {setSearchTerm(''); setSelectedSpecialty(null);}}>
              Reset filters
            </Button>
          </div>
        )}
      </div>

      {/* Join Our Team */}
      <div className="bg-primary/5 rounded-2xl p-8 md:p-12 mb-16 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
              Join Our Team
            </div>
            <h2 className="text-3xl font-bold">
              Are You a Dental Professional?
            </h2>
            <p className="text-muted-foreground">
              We're always looking for passionate dental professionals who are dedicated to providing specialized care for patients with unique needs. Join our team of experts and make a difference.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button className="gap-2">
                Apply Now <ArrowRight size={16} />
              </Button>
              <Button variant="outline" className="gap-2">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden premium-shadow">
              <BlurImage
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200"
                alt="Dental team"
                className="w-full h-[300px] md:h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-primary text-white rounded-2xl p-8 md:p-12 animate-fade-in">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Have Questions About Our Specialists?
          </h2>
          <p className="text-white/90 mb-6">
            Contact our team to learn more about our dental professionals and how they can help with your specific needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg" className="gap-2">
              <Phone size={18} /> Call Us
            </Button>
            <Button variant="outline" size="lg" className="gap-2 bg-transparent text-white border-white/20 hover:bg-white/10">
              Send a Message
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

// Arrow Right icon for the buttons
const ArrowRight = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);

// Doctor data
const doctors = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "Special Needs Dentistry",
    description: "Specialized in dental care for patients with physical and developmental disabilities.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    reviewCount: 127,
    availability: "Accepting Patients",
    location: "Chicago, IL",
    languages: ["English", "Spanish"],
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Pediatric Special Care",
    description: "Expert in treating children with developmental disabilities and behavioral challenges.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    reviewCount: 98,
    availability: "Accepting Patients",
    location: "New York, NY",
    languages: ["English", "Mandarin"],
  },
  {
    name: "Dr. Emily Rodriguez",
    specialty: "Geriatric Dentistry",
    description: "Focused on dental care for elderly patients with chronic conditions and mobility issues.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    reviewCount: 142,
    availability: "Limited Availability",
    location: "Boston, MA",
    languages: ["English", "Spanish", "Portuguese"],
  },
  {
    name: "Dr. James Wilson",
    specialty: "Anxiety Management",
    description: "Specialized in treating patients with dental anxiety, phobias, and PTSD.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 5,
    reviewCount: 112,
    availability: "Accepting Patients",
    location: "Los Angeles, CA",
    languages: ["English"],
  },
  {
    name: "Dr. Aisha Patel",
    specialty: "Sensory-Friendly Dentistry",
    description: "Expert in creating accommodating environments for patients with sensory processing disorders.",
    image: "https://randomuser.me/api/portraits/women/37.jpg",
    rating: 4,
    reviewCount: 87,
    availability: "Accepting Patients",
    location: "San Francisco, CA",
    languages: ["English", "Hindi", "Gujarati"],
  },
  {
    name: "Dr. Robert Kim",
    specialty: "Mobile Dentistry",
    description: "Provides comprehensive dental care through home visits for patients with mobility challenges.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 5,
    reviewCount: 156,
    availability: "Accepting Patients",
    location: "Seattle, WA",
    languages: ["English", "Korean"],
  },
  {
    name: "Dr. Lisa Nguyen",
    specialty: "Special Needs Dentistry",
    description: "Specialized in treating patients with intellectual disabilities and autism spectrum disorders.",
    image: "https://randomuser.me/api/portraits/women/57.jpg",
    rating: 5,
    reviewCount: 134,
    availability: "Limited Availability",
    location: "Portland, OR",
    languages: ["English", "Vietnamese"],
  },
  {
    name: "Dr. Marcus Johnson",
    specialty: "Geriatric Dentistry",
    description: "Focused on dental care for elderly patients in nursing homes and assisted living facilities.",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    rating: 4,
    reviewCount: 91,
    availability: "Accepting Patients",
    location: "Atlanta, GA",
    languages: ["English"],
  },
  {
    name: "Dr. Sophia Martinez",
    specialty: "Pediatric Special Care",
    description: "Specialized in dental treatment for children with special healthcare needs and medical complexities.",
    image: "https://randomuser.me/api/portraits/women/29.jpg",
    rating: 5,
    reviewCount: 168,
    availability: "Accepting Patients",
    location: "Miami, FL",
    languages: ["English", "Spanish"],
  }
];

export default Doctors;
