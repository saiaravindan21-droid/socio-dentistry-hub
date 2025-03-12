import { useState } from 'react';
import { format } from 'date-fns';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CalendarIcon, CheckCircle2, Clock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const mockDoctors = [
  { id: 1, name: 'Dr. Sarah Smith', specialty: 'General Dentistry', availableTimes: ['9:00 AM', '11:30 AM', '2:00 PM'] },
  { id: 2, name: 'Dr. James Wilson', specialty: 'Orthodontics', availableTimes: ['10:00 AM', '1:00 PM', '3:30 PM'] },
  { id: 3, name: 'Dr. Emily Chen', specialty: 'Pediatric Dentistry', availableTimes: ['9:30 AM', '12:00 PM', '4:00 PM'] },
  { id: 4, name: 'Dr. Michael Johnson', specialty: 'Oral Surgery', availableTimes: ['8:00 AM', '10:30 AM', '2:30 PM'] },
];

const appointmentTypes = [
  { id: 'checkup', name: 'Regular Checkup', duration: '30 min', price: '$75' },
  { id: 'cleaning', name: 'Teeth Cleaning', duration: '45 min', price: '$120' },
  { id: 'whitening', name: 'Teeth Whitening', duration: '60 min', price: '$200' },
  { id: 'filling', name: 'Dental Filling', duration: '45 min', price: '$150' },
  { id: 'rootcanal', name: 'Root Canal', duration: '90 min', price: '$500' },
  { id: 'extraction', name: 'Tooth Extraction', duration: '60 min', price: '$180' },
];

const Appointments = () => {
  const { user, addAppointment, cancelAppointment } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [appointmentToCancel, setAppointmentToCancel] = useState<number | null>(null);
  
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };
  
  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId);
    setSelectedTime('');
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };
  
  const handleNextStep = () => {
    if (currentStep === 1 && !selectedDate) {
      toast({
        title: "Please select a date",
        description: "You need to select an appointment date to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 2 && (!selectedDoctor || !selectedTime)) {
      toast({
        title: "Incomplete selection",
        description: "Please select both a doctor and an available time slot.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 3 && !selectedType) {
      toast({
        title: "Appointment type required",
        description: "Please select the type of dental appointment.",
        variant: "destructive",
      });
      return;
    }
    
    setCurrentStep(currentStep + 1);
  };
  
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleBookAppointment = () => {
    if (!selectedDate || !selectedDoctor || !selectedTime || !selectedType) {
      toast({
        title: "Missing information",
        description: "Please complete all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    const selectedDoctorData = mockDoctors.find(d => d.id.toString() === selectedDoctor);
    const selectedTypeData = appointmentTypes.find(t => t.id === selectedType);
    
    if (!selectedDoctorData || !selectedTypeData) {
      toast({
        title: "Invalid selection",
        description: "Please make valid selections for doctor and appointment type.",
        variant: "destructive",
      });
      return;
    }
    
    const newAppointment = {
      date: format(selectedDate, 'MMMM d, yyyy'),
      time: selectedTime,
      doctor: selectedDoctorData.name,
      type: selectedTypeData.name,
    };
    
    addAppointment(newAppointment);
    
    toast({
      title: "Appointment Booked!",
      description: `Your appointment has been scheduled for ${format(selectedDate, 'MMMM d, yyyy')} at ${selectedTime}.`,
    });
    
    setSelectedDate(new Date());
    setSelectedDoctor('');
    setSelectedTime('');
    setSelectedType('');
    setPhone('');
    setNotes('');
    setCurrentStep(1);
  };
  
  const handleCancelAppointment = (appointmentId: number) => {
    setAppointmentToCancel(appointmentId);
  };
  
  const confirmCancelAppointment = () => {
    if (appointmentToCancel) {
      cancelAppointment(appointmentToCancel);
      setAppointmentToCancel(null);
      
      toast({
        title: "Appointment Canceled",
        description: "Your appointment has been successfully canceled.",
      });
    }
  };
  
  const selectedDoctorData = selectedDoctor ? mockDoctors.find(d => d.id.toString() === selectedDoctor) : null;
  const selectedTypeData = selectedType ? appointmentTypes.find(t => t.id === selectedType) : null;
  
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Book Your Dental Appointment</h1>
        <p className="text-muted-foreground mb-8">Schedule a visit with our expert dental professionals</p>
        
        <Tabs defaultValue="book" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="book">Book New Appointment</TabsTrigger>
            <TabsTrigger value="manage">Manage Appointments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="book" className="mt-6">
            <div className="space-y-6">
              <div className="relative pb-12">
                <div className="absolute left-4 h-full w-0.5 bg-gray-200"></div>
                <div className="flex items-center mb-8 relative z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                    currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {currentStep > 1 ? <CheckCircle2 className="h-5 w-5" /> : 1}
                  </div>
                  <span className="ml-3 font-medium">Select Date</span>
                </div>
                
                <div className="flex items-center mb-8 relative z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                    currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {currentStep > 2 ? <CheckCircle2 className="h-5 w-5" /> : 2}
                  </div>
                  <span className="ml-3 font-medium">Choose Doctor & Time</span>
                </div>
                
                <div className="flex items-center mb-8 relative z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                    currentStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {currentStep > 3 ? <CheckCircle2 className="h-5 w-5" /> : 3}
                  </div>
                  <span className="ml-3 font-medium">Select Appointment Type</span>
                </div>
                
                <div className="flex items-center relative z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                    currentStep >= 4 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    4
                  </div>
                  <span className="ml-3 font-medium">Confirm Details</span>
                </div>
              </div>
              
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Select Appointment Date</CardTitle>
                    <CardDescription>Choose a preferred date for your dental visit</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={(date) => {
                        const day = date.getDay();
                        return date < new Date(new Date().setHours(0, 0, 0, 0)) || day === 0 || day === 6;
                      }}
                      className="rounded-md border pointer-events-auto"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleNextStep}>Next Step</Button>
                  </CardFooter>
                </Card>
              )}
              
              {currentStep === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Select Doctor & Time</CardTitle>
                    <CardDescription>Choose from our available specialists</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="doctor">Select Doctor</Label>
                      <Select value={selectedDoctor} onValueChange={handleDoctorSelect}>
                        <SelectTrigger id="doctor" className="w-full">
                          <SelectValue placeholder="Select a doctor" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockDoctors.map((doctor) => (
                            <SelectItem key={doctor.id} value={doctor.id.toString()}>
                              {doctor.name} - {doctor.specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {selectedDoctor && (
                      <div>
                        <Label>Available Time Slots for {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}</Label>
                        <div className="grid grid-cols-3 gap-3 mt-2">
                          {selectedDoctorData?.availableTimes.map((time) => (
                            <Button
                              key={time}
                              type="button"
                              variant={selectedTime === time ? "default" : "outline"}
                              className="flex items-center justify-center gap-2"
                              onClick={() => handleTimeSelect(time)}
                            >
                              <Clock className="h-4 w-4" />
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePreviousStep}>Previous</Button>
                    <Button onClick={handleNextStep}>Next Step</Button>
                  </CardFooter>
                </Card>
              )}
              
              {currentStep === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Select Appointment Type</CardTitle>
                    <CardDescription>Choose the dental service you need</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={selectedType} onValueChange={handleTypeSelect} className="space-y-3">
                      {appointmentTypes.map((type) => (
                        <div key={type.id} className="flex items-center space-x-2 rounded-md border p-4">
                          <RadioGroupItem value={type.id} id={type.id} />
                          <Label htmlFor={type.id} className="flex flex-1 justify-between cursor-pointer">
                            <div>
                              <span className="font-medium">{type.name}</span>
                              <p className="text-sm text-muted-foreground">Duration: {type.duration}</p>
                            </div>
                            <span className="font-medium">{type.price}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePreviousStep}>Previous</Button>
                    <Button onClick={handleNextStep}>Next Step</Button>
                  </CardFooter>
                </Card>
              )}
              
              {currentStep === 4 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Confirm Your Appointment</CardTitle>
                    <CardDescription>Please review your appointment details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="rounded-lg border p-4 bg-primary/5">
                      <h3 className="font-medium mb-4">Appointment Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Date:</span>
                          <span className="font-medium">{selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Time:</span>
                          <span className="font-medium">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Doctor:</span>
                          <span className="font-medium">{selectedDoctorData?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Service:</span>
                          <span className="font-medium">{selectedTypeData?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Duration:</span>
                          <span className="font-medium">{selectedTypeData?.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Price:</span>
                          <span className="font-medium">{selectedTypeData?.price}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          placeholder="Enter your full name" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          placeholder="Enter your phone number" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="notes">Special Notes (Optional)</Label>
                        <Input 
                          id="notes" 
                          placeholder="Any special requirements or concerns" 
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePreviousStep}>Previous</Button>
                    <Button onClick={handleBookAppointment}>Book Appointment</Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="manage" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Upcoming Appointments</CardTitle>
                <CardDescription>Manage your scheduled dental visits</CardDescription>
              </CardHeader>
              <CardContent>
                {user && user.appointments && user.appointments.length > 0 ? (
                  <div className="space-y-4">
                    {user.appointments.map((appointment, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-primary/10 rounded-full">
                            <CalendarIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{appointment.type}</p>
                            <p className="text-sm text-muted-foreground">{appointment.date} at {appointment.time}</p>
                            <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Reschedule</Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleCancelAppointment(appointment.id)}
                              >
                                Cancel
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to cancel this appointment? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setAppointmentToCancel(null)}>
                                  Keep Appointment
                                </AlertDialogCancel>
                                <AlertDialogAction onClick={confirmCancelAppointment}>
                                  Yes, Cancel Appointment
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">You don't have any upcoming appointments</p>
                    <Button 
                      onClick={() => document.querySelector('[data-value="book"]')?.dispatchEvent(new Event('click', { bubbles: true }))}
                    >
                      Book Your First Appointment
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Appointment History</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Appointments;
