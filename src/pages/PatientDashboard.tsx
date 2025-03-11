import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bell, Calendar as CalendarIcon, ClipboardList, Clock, Stethoscope } from 'lucide-react';

const mockAppointments = [
  { id: 1, date: 'Oct 15, 2023', time: '10:00 AM', doctor: 'Dr. Smith', type: 'Regular Checkup' },
  { id: 2, date: 'Nov 2, 2023', time: '2:30 PM', doctor: 'Dr. Johnson', type: 'Cleaning' },
];

const mockTreatments = [
  { name: 'Cleanings', completed: 2, total: 2 },
  { name: 'Fillings', completed: 1, total: 3 },
  { name: 'Root Canal', completed: 0, total: 1 },
];

const mockVisitData = [
  { month: 'Jan', visits: 1 },
  { month: 'Feb', visits: 0 },
  { month: 'Mar', visits: 1 },
  { month: 'Apr', visits: 0 },
  { month: 'May', visits: 2 },
  { month: 'Jun', visits: 0 },
];

const PatientDashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Patient Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Sarah! Manage your dental health in one place.</p>
          </div>
          <Button className="flex items-center gap-2">
            <Bell size={16} /> Notifications
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Next Appointment</CardTitle>
              <CardDescription>Your upcoming dental visit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Regular Checkup</p>
                  <p className="text-sm text-muted-foreground">Oct 15, 2023 at 10:00 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Stethoscope className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Dr. Smith</p>
                  <p className="text-sm text-muted-foreground">General Dentist</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Reschedule</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Treatment Progress</CardTitle>
              <CardDescription>Your ongoing treatment plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockTreatments.map((treatment, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{treatment.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {treatment.completed}/{treatment.total}
                    </span>
                  </div>
                  <Progress value={(treatment.completed / treatment.total) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Plan</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Payment Overview</CardTitle>
              <CardDescription>Your billing status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Last Payment</span>
                  <span className="text-sm font-medium">$120.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Insurance Coverage</span>
                  <span className="text-sm font-medium">$850.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Outstanding Balance</span>
                  <span className="text-sm font-medium text-destructive">$75.00</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="default" className="w-full">Make Payment</Button>
            </CardFooter>
          </Card>
        </div>
        
        <Tabs defaultValue="appointments">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="history">Visit History</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appointments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Appointments</CardTitle>
                <CardDescription>View and manage your scheduled visits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{appointment.type}</p>
                          <p className="text-sm text-muted-foreground">{appointment.date} at {appointment.time}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Reschedule</Button>
                        <Button variant="destructive" size="sm">Cancel</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Book New Appointment</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Visit History</CardTitle>
                <CardDescription>Your dental visit patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockVisitData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="visits" fill="#4f46e5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="calendar" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Dental Calendar</CardTitle>
                <CardDescription>Plan your future appointments</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border pointer-events-auto"
                />
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button>Book on Selected Date</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Dental Records</CardTitle>
              <CardDescription>Your medical history and documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    <span>Medical History Form</span>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    <span>X-Ray Results (2023)</span>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    <span>Treatment History</span>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">All Records</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Oral Health Tips</CardTitle>
              <CardDescription>Personalized recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-lg bg-primary/5">
                  <p className="font-medium mb-1">Sensitive Teeth Care</p>
                  <p className="text-sm text-muted-foreground">Use desensitizing toothpaste and avoid very hot or cold foods for the next two weeks.</p>
                </div>
                <div className="p-3 border rounded-lg bg-primary/5">
                  <p className="font-medium mb-1">Flossing Technique</p>
                  <p className="text-sm text-muted-foreground">Remember to curve the floss around each tooth in a C shape for effective cleaning.</p>
                </div>
                <div className="p-3 border rounded-lg bg-primary/5">
                  <p className="font-medium mb-1">Mouthwash Usage</p>
                  <p className="text-sm text-muted-foreground">Use the prescribed antimicrobial mouthwash twice daily until your next appointment.</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Tips</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default PatientDashboard;
