
import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CheckCircle2, Clock, DollarSign, AlertCircle, Calendar, ArrowRight } from 'lucide-react';

// Mock data for treatment plan
const mockTreatmentPlan = {
  id: 'TP-2023-001',
  patientName: 'Sarah Johnson',
  dentist: 'Dr. Michael Smith',
  created: '2023-09-10',
  lastUpdated: '2023-10-05',
  status: 'In Progress',
  totalCost: 2850,
  insuranceCoverage: 1500,
  outOfPocket: 1350,
  treatments: [
    { id: 1, name: 'Initial Consultation', status: 'completed', date: '2023-09-15', cost: 150, insuranceCoverage: 150, provider: 'Dr. Smith' },
    { id: 2, name: 'Deep Cleaning', status: 'completed', date: '2023-09-28', cost: 300, insuranceCoverage: 240, provider: 'Dr. Wilson' },
    { id: 3, name: 'Filling (Tooth #14)', status: 'scheduled', date: '2023-10-20', cost: 200, insuranceCoverage: 160, provider: 'Dr. Smith' },
    { id: 4, name: 'Filling (Tooth #18)', status: 'scheduled', date: '2023-10-20', cost: 200, insuranceCoverage: 160, provider: 'Dr. Smith' },
    { id: 5, name: 'Root Canal', status: 'pending', date: '2023-11-10', cost: 1200, insuranceCoverage: 600, provider: 'Dr. Chen' },
    { id: 6, name: 'Crown', status: 'pending', date: '2023-11-24', cost: 800, insuranceCoverage: 400, provider: 'Dr. Smith' },
  ]
};

// Finance data
const paymentData = [
  { name: 'Insurance', value: 1500 },
  { name: 'Out of Pocket', value: 1350 },
];

const COLORS = ['#4f46e5', '#f59e0b'];

// Treatment progress data
const progressData = [
  { name: 'Completed', treatments: 2 },
  { name: 'Scheduled', treatments: 2 },
  { name: 'Pending', treatments: 2 },
];

const TreatmentPlanner = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Calculate treatment progress
  const completedTreatments = mockTreatmentPlan.treatments.filter(t => t.status === 'completed').length;
  const totalTreatments = mockTreatmentPlan.treatments.length;
  const progressPercentage = (completedTreatments / totalTreatments) * 100;
  
  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Treatment Planner</h1>
            <p className="text-muted-foreground">Track and manage your dental treatment plan</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Download Plan</Button>
            <Button>Schedule Next Visit</Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
              <div>
                <CardTitle className="text-2xl">Treatment Plan #{mockTreatmentPlan.id}</CardTitle>
                <CardDescription>
                  Created on {new Date(mockTreatmentPlan.created).toLocaleDateString()} | 
                  Last updated on {new Date(mockTreatmentPlan.lastUpdated).toLocaleDateString()}
                </CardDescription>
              </div>
              <div className="flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">
                <Clock className="mr-2 h-4 w-4" /> {mockTreatmentPlan.status}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Patient</p>
                <p className="font-medium">{mockTreatmentPlan.patientName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Primary Dentist</p>
                <p className="font-medium">{mockTreatmentPlan.dentist}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Treatment Progress</p>
                <div className="flex items-center gap-2">
                  <Progress value={progressPercentage} className="h-2 w-40" />
                  <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Cost</p>
                <p className="font-medium">${mockTreatmentPlan.totalCost.toLocaleString()}</p>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="notes">Notes & Instructions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6 space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Treatment Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Treatment</TableHead>
                          <TableHead>Provider</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Cost</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockTreatmentPlan.treatments.map((treatment) => (
                          <TableRow key={treatment.id}>
                            <TableCell className="font-medium">{treatment.name}</TableCell>
                            <TableCell>{treatment.provider}</TableCell>
                            <TableCell>{new Date(treatment.date).toLocaleDateString()}</TableCell>
                            <TableCell>${treatment.cost}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                {treatment.status === 'completed' ? (
                                  <div className="flex items-center text-green-600">
                                    <CheckCircle2 className="mr-1 h-4 w-4" /> Completed
                                  </div>
                                ) : treatment.status === 'scheduled' ? (
                                  <div className="flex items-center text-blue-600">
                                    <Calendar className="mr-1 h-4 w-4" /> Scheduled
                                  </div>
                                ) : (
                                  <div className="flex items-center text-amber-600">
                                    <Clock className="mr-1 h-4 w-4" /> Pending
                                  </div>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Treatment Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={progressData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="treatments" fill="#4f46e5" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Financial Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="h-72 flex items-center justify-center">
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <ResponsiveContainer width="100%" height="70%">
                          <PieChart>
                            <Pie
                              data={paymentData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              dataKey="value"
                            >
                              {paymentData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="flex gap-6 mt-2">
                          {paymentData.map((entry, index) => (
                            <div key={`legend-${index}`} className="flex items-center">
                              <div className="w-3 h-3 mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                              <span>{entry.name}: ${entry.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockTreatmentPlan.treatments.find(t => t.status === 'scheduled') ? (
                        <div className="flex items-start gap-4 p-4 border rounded-lg">
                          <Calendar className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="font-medium">Your Next Appointment</h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date('2023-10-20').toLocaleDateString()} at 10:00 AM with Dr. Smith
                            </p>
                            <p className="text-sm mt-1">
                              Treatments: Filling (Tooth #14), Filling (Tooth #18)
                            </p>
                            <div className="mt-3">
                              <Button size="sm">Confirm Appointment</Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-4 p-4 border rounded-lg">
                          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Schedule Your Next Appointment</h4>
                            <p className="text-sm text-muted-foreground">
                              You don't have any upcoming appointments scheduled
                            </p>
                            <div className="mt-3">
                              <Button size="sm">Book Appointment</Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="timeline" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Treatment Timeline</CardTitle>
                    <CardDescription>View your dental treatment journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative border-l-2 border-primary/30 pl-6 pb-6 space-y-8">
                      {mockTreatmentPlan.treatments.map((treatment, index) => (
                        <div key={treatment.id} className="relative">
                          <div className={`absolute -left-[31px] w-6 h-6 rounded-full flex items-center justify-center ${
                            treatment.status === 'completed' 
                              ? 'bg-green-100 border-2 border-green-600' 
                              : treatment.status === 'scheduled'
                                ? 'bg-blue-100 border-2 border-blue-600'
                                : 'bg-amber-100 border-2 border-amber-600'
                          }`}>
                            {treatment.status === 'completed' ? (
                              <CheckCircle2 className="h-3 w-3 text-green-600" />
                            ) : treatment.status === 'scheduled' ? (
                              <Calendar className="h-3 w-3 text-blue-600" />
                            ) : (
                              <Clock className="h-3 w-3 text-amber-600" />
                            )}
                          </div>
                          
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border rounded-lg p-4">
                            <div>
                              <div className="mb-1 flex items-center">
                                <span className="font-medium mr-2">{treatment.name}</span>
                                {treatment.status === 'completed' ? (
                                  <span className="text-xs text-green-600 bg-green-100 py-0.5 px-2 rounded-full">Completed</span>
                                ) : treatment.status === 'scheduled' ? (
                                  <span className="text-xs text-blue-600 bg-blue-100 py-0.5 px-2 rounded-full">Scheduled</span>
                                ) : (
                                  <span className="text-xs text-amber-600 bg-amber-100 py-0.5 px-2 rounded-full">Pending</span>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {new Date(treatment.date).toLocaleDateString()} | {treatment.provider}
                              </div>
                            </div>
                            <div className="flex items-center gap-6">
                              <div>
                                <span className="text-sm text-muted-foreground">Cost</span>
                                <div className="font-medium">${treatment.cost}</div>
                              </div>
                              <div>
                                <span className="text-sm text-muted-foreground">Insurance</span>
                                <div className="font-medium">${treatment.insuranceCoverage}</div>
                              </div>
                              <div>
                                <span className="text-sm text-muted-foreground">Your Cost</span>
                                <div className="font-medium">${treatment.cost - treatment.insuranceCoverage}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="financial" className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Total Treatment Cost</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 rounded-full p-2">
                          <DollarSign className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-3xl font-bold">${mockTreatmentPlan.totalCost.toLocaleString()}</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Insurance Coverage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 rounded-full p-2">
                          <DollarSign className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-3xl font-bold">${mockTreatmentPlan.insuranceCoverage.toLocaleString()}</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Your Out-of-Pocket</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 rounded-full p-2">
                          <DollarSign className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-3xl font-bold">${mockTreatmentPlan.outOfPocket.toLocaleString()}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Cost Breakdown by Procedure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Procedure</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Total Cost</TableHead>
                          <TableHead>Insurance Coverage</TableHead>
                          <TableHead>Your Cost</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockTreatmentPlan.treatments.map((treatment) => (
                          <TableRow key={treatment.id}>
                            <TableCell className="font-medium">{treatment.name}</TableCell>
                            <TableCell>{new Date(treatment.date).toLocaleDateString()}</TableCell>
                            <TableCell>${treatment.cost}</TableCell>
                            <TableCell>${treatment.insuranceCoverage}</TableCell>
                            <TableCell>${treatment.cost - treatment.insuranceCoverage}</TableCell>
                            <TableCell>
                              <div className={`px-2 py-1 rounded-full text-xs inline-block ${
                                treatment.status === 'completed' 
                                  ? 'bg-green-100 text-green-600' 
                                  : treatment.status === 'scheduled'
                                    ? 'bg-blue-100 text-blue-600'
                                    : 'bg-amber-100 text-amber-600'
                              }`}>
                                {treatment.status === 'completed' ? 'Paid' : treatment.status === 'scheduled' ? 'Due Soon' : 'Pending'}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Options</CardTitle>
                    <CardDescription>Manage your payment methods and plans</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Payment Plans</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center">
                          <span className="font-medium mb-1">Pay in Full</span>
                          <span className="text-sm text-muted-foreground mb-2">10% discount on total cost</span>
                          <span className="font-medium text-primary">${(mockTreatmentPlan.outOfPocket * 0.9).toFixed(2)}</span>
                        </Button>
                        
                        <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center">
                          <span className="font-medium mb-1">Monthly Payments</span>
                          <span className="text-sm text-muted-foreground mb-2">6 equal monthly installments</span>
                          <span className="font-medium text-primary">${(mockTreatmentPlan.outOfPocket / 6).toFixed(2)}/month</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-4">Payment Methods</h3>
                      <div className="flex flex-col space-y-3">
                        <div className="border rounded-lg p-4 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-md">
                              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                                <rect width="20" height="14" x="2" y="5" rx="2" stroke="currentColor" strokeWidth="2" />
                                <path d="M2 10h20" stroke="currentColor" strokeWidth="2" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium">Credit Card ending in 4242</p>
                              <p className="text-sm text-muted-foreground">Expires 04/25</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm">Remove</Button>
                          </div>
                        </div>
                        
                        <Button variant="outline" className="justify-start">
                          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                          Add New Payment Method
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Make a Payment</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notes" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Care Instructions</CardTitle>
                    <CardDescription>Follow these instructions for optimal dental health</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Post Root Canal Care</h3>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Avoid chewing on the treated side until the permanent restoration is placed</li>
                        <li>Take prescribed medications as directed</li>
                        <li>Some sensitivity is normal for a few days following treatment</li>
                        <li>Contact our office if you experience severe pain or swelling</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">After Filling Care</h3>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Wait at least 2 hours before eating on the treated side</li>
                        <li>Avoid extremely hot or cold foods for 24-48 hours</li>
                        <li>Sensitivity to temperature and pressure may occur temporarily</li>
                        <li>Floss carefully around the new filling</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Daily Oral Hygiene</h3>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Brush twice daily with fluoride toothpaste</li>
                        <li>Floss daily, especially before bedtime</li>
                        <li>Use antiseptic mouthwash as recommended</li>
                        <li>Avoid sugary foods and beverages</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Doctor's Notes</CardTitle>
                    <CardDescription>Treatment observations and recommendations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">Initial Consultation Notes</h3>
                        <span className="text-sm text-muted-foreground">September 15, 2023</span>
                      </div>
                      <p className="text-sm">
                        Patient presents with moderate decay on teeth #14 and #18. Recommended fillings for both. 
                        X-rays show potential need for root canal on tooth #30 due to deep decay near pulp. 
                        Will monitor for symptoms. Overall oral hygiene is good but patient should improve flossing technique.
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">Deep Cleaning Follow-up</h3>
                        <span className="text-sm text-muted-foreground">September 28, 2023</span>
                      </div>
                      <p className="text-sm">
                        Deep cleaning completed on all quadrants. Moderate calculus buildup was removed. 
                        Gingival health should improve within 2 weeks. Recommended continued use of antiseptic 
                        mouthwash twice daily and improved flossing technique. Patient is scheduled for fillings 
                        in October.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Education Resources</CardTitle>
                    <CardDescription>Learn more about your dental treatments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="h-auto py-4 justify-start">
                        <div className="flex flex-col items-start text-left">
                          <span className="font-medium">Understanding Root Canals</span>
                          <span className="text-sm text-muted-foreground">What to expect during and after treatment</span>
                          <span className="text-sm text-primary mt-2 flex items-center">
                            View Guide <ArrowRight className="ml-1 h-3 w-3" />
                          </span>
                        </div>
                      </Button>
                      
                      <Button variant="outline" className="h-auto py-4 justify-start">
                        <div className="flex flex-col items-start text-left">
                          <span className="font-medium">Dental Crown Care</span>
                          <span className="text-sm text-muted-foreground">How to care for your new dental crown</span>
                          <span className="text-sm text-primary mt-2 flex items-center">
                            View Guide <ArrowRight className="ml-1 h-3 w-3" />
                          </span>
                        </div>
                      </Button>
                      
                      <Button variant="outline" className="h-auto py-4 justify-start">
                        <div className="flex flex-col items-start text-left">
                          <span className="font-medium">Preventing Tooth Decay</span>
                          <span className="text-sm text-muted-foreground">Tips for maintaining a healthy smile</span>
                          <span className="text-sm text-primary mt-2 flex items-center">
                            View Guide <ArrowRight className="ml-1 h-3 w-3" />
                          </span>
                        </div>
                      </Button>
                      
                      <Button variant="outline" className="h-auto py-4 justify-start">
                        <div className="flex flex-col items-start text-left">
                          <span className="font-medium">Understanding Dental Insurance</span>
                          <span className="text-sm text-muted-foreground">How insurance coverage works for dental procedures</span>
                          <span className="text-sm text-primary mt-2 flex items-center">
                            View Guide <ArrowRight className="ml-1 h-3 w-3" />
                          </span>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default TreatmentPlanner;
