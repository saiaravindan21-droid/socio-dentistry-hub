
import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { FileText, Image, Upload, Download, FilePlus, Search, Eye } from 'lucide-react';

// Mock data for dental records
const mockRecords = [
  { id: 1, type: 'X-Ray', date: '2023-09-15', provider: 'Dr. Smith', category: 'Diagnostic', format: 'Image' },
  { id: 2, type: 'Treatment Plan', date: '2023-08-22', provider: 'Dr. Johnson', category: 'Treatment', format: 'PDF' },
  { id: 3, type: 'Medical History', date: '2023-06-30', provider: 'Dr. Wilson', category: 'History', format: 'PDF' },
  { id: 4, type: 'Insurance Claim', date: '2023-05-12', provider: 'Admin Staff', category: 'Billing', format: 'PDF' },
  { id: 5, type: 'Dental Scan', date: '2023-04-03', provider: 'Dr. Chen', category: 'Diagnostic', format: 'Image' },
];

// Mock data for medical history
const mockMedicalHistory = {
  allergies: ['Penicillin', 'Latex'],
  conditions: ['Hypertension', 'Diabetes Type 2'],
  medications: ['Lisinopril 10mg', 'Metformin 500mg'],
  surgeries: ['Wisdom teeth extraction (2019)'],
  familyHistory: ['Heart disease', 'Oral cancer'],
};

const DentalRecords = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const filteredRecords = mockRecords.filter(record => 
    record.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dental Records</h1>
            <p className="text-muted-foreground">Access and manage your dental health information</p>
          </div>
          <Button>
            <FilePlus className="mr-2 h-4 w-4" /> Request Records
          </Button>
        </div>
        
        <Tabs defaultValue="records">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="records">Records & Documents</TabsTrigger>
            <TabsTrigger value="history">Medical History</TabsTrigger>
            <TabsTrigger value="upload">Upload Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="records" className="mt-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search records..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="px-3"
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="px-3"
                >
                  List
                </Button>
              </div>
            </div>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRecords.map((record) => (
                  <Card key={record.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{record.type}</CardTitle>
                          <CardDescription>Added on {new Date(record.date).toLocaleDateString()}</CardDescription>
                        </div>
                        {record.format === 'Image' ? (
                          <div className="bg-primary/10 p-2 rounded-md">
                            <Image className="h-5 w-5 text-primary" />
                          </div>
                        ) : (
                          <div className="bg-primary/10 p-2 rounded-md">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">Provider:</span>
                          <span>{record.provider}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">Category:</span>
                          <span>{record.category}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">Format:</span>
                          <span>{record.format}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="mr-2 h-4 w-4" /> View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Record Type</TableHead>
                        <TableHead>Date Added</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Format</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">{record.type}</TableCell>
                          <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                          <TableCell>{record.provider}</TableCell>
                          <TableCell>{record.category}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {record.format === 'Image' ? (
                                <Image className="mr-2 h-4 w-4 text-primary" />
                              ) : (
                                <FileText className="mr-2 h-4 w-4 text-primary" />
                              )}
                              {record.format}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Allergies & Conditions</CardTitle>
                  <CardDescription>Your reported medical information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Allergies</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {mockMedicalHistory.allergies.map((allergy, index) => (
                        <li key={index}>{allergy}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Medical Conditions</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {mockMedicalHistory.conditions.map((condition, index) => (
                        <li key={index}>{condition}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Update Medical Information</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Medications & History</CardTitle>
                  <CardDescription>Current medications and past procedures</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Current Medications</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {mockMedicalHistory.medications.map((medication, index) => (
                        <li key={index}>{medication}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Past Procedures</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {mockMedicalHistory.surgeries.map((surgery, index) => (
                        <li key={index}>{surgery}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Family Medical History</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {mockMedicalHistory.familyHistory.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Update History</Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Health Questionnaire</CardTitle>
                <CardDescription>Answer these questions to keep your medical information current</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="recent-changes">Have there been any changes to your health since your last visit?</Label>
                  <Input id="recent-changes" placeholder="Describe any changes" />
                </div>
                <div>
                  <Label htmlFor="new-medications">Are you taking any new medications?</Label>
                  <Input id="new-medications" placeholder="List any new medications" />
                </div>
                <div>
                  <Label htmlFor="dental-concerns">Do you have any current dental concerns?</Label>
                  <Input id="dental-concerns" placeholder="Describe any concerns" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Submit Health Information</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="upload" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Medical Documents</CardTitle>
                <CardDescription>Share your medical records securely with our dental team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed rounded-lg p-10 text-center">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium text-lg mb-1">Drop files here or click to upload</h3>
                  <p className="text-sm text-muted-foreground mb-4">Support for PDF, JPG, PNG, and DICOM files up to 25MB</p>
                  <Button variant="outline" size="sm">Select Files</Button>
                </div>
                
                <div>
                  <Label>Document Type</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                    <Button variant="outline" className="justify-start font-normal">X-Ray Results</Button>
                    <Button variant="outline" className="justify-start font-normal">Lab Reports</Button>
                    <Button variant="outline" className="justify-start font-normal">Insurance Forms</Button>
                    <Button variant="outline" className="justify-start font-normal">Previous Treatments</Button>
                    <Button variant="outline" className="justify-start font-normal">Medical History</Button>
                    <Button variant="outline" className="justify-start font-normal">Other</Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Input id="notes" placeholder="Add any notes about the uploaded documents" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Upload Documents</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default DentalRecords;
