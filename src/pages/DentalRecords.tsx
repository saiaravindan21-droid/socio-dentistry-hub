import { useState, useRef, ChangeEvent } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { FileText, Image, Upload, Download, FilePlus, Search, Eye, CheckCircle } from 'lucide-react';
import { useAuth, DentalRecord } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DentalRecords = () => {
  const { user, addDentalRecord } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedDocType, setSelectedDocType] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [previewRecordId, setPreviewRecordId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const dentalRecords = user?.dentalRecords || [];
  
  const mockMedicalHistory = {
    allergies: ['Penicillin', 'Latex'],
    conditions: ['Hypertension', 'Diabetes Type 2'],
    medications: ['Lisinopril 10mg', 'Metformin 500mg'],
    surgeries: ['Wisdom teeth extraction (2019)'],
    familyHistory: ['Heart disease', 'Oral cancer'],
  };
  
  const filteredRecords = dentalRecords.filter(record => 
    record.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setSelectedFileName(file.name);
  };
  
  const handleDocTypeSelect = (docType: string) => {
    setSelectedDocType(docType);
  };
  
  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedDocType) {
      toast({
        title: "Error",
        description: "Please select a document type",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileContent = reader.result as string;
        const format = getFileFormat(file.type);
        
        addDentalRecord({
          name: file.name,
          type: selectedDocType,
          provider: "Self Upload",
          category: "Uploaded",
          format,
          fileContent
        });
        
        setSelectedDocType('');
        setNotes('');
        setSelectedFileName('');
        if (fileInputRef.current) fileInputRef.current.value = '';
        
        toast({
          title: "Success",
          description: "Record uploaded successfully",
        });
        
        setIsUploading(false);
      };
      
      reader.onerror = () => {
        toast({
          title: "Error",
          description: "Failed to read file",
          variant: "destructive"
        });
        setIsUploading(false);
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive"
      });
      setIsUploading(false);
    }
  };
  
  const getFileFormat = (mimeType: string): string => {
    if (mimeType.startsWith('image/')) return 'Image';
    if (mimeType === 'application/pdf') return 'PDF';
    if (mimeType.startsWith('video/')) return 'Video';
    if (mimeType.startsWith('audio/')) return 'Audio';
    return 'Document';
  };
  
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
            
            {filteredRecords.length === 0 ? (
              <div className="text-center py-16">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No records found</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  You haven't uploaded any dental records yet. Upload documents to keep track of your dental health.
                </p>
                <Button variant="default" asChild>
                  <a href="#" onClick={(e) => { e.preventDefault(); document.querySelector('[value="upload"]')?.dispatchEvent(new MouseEvent('click')); }}>
                    Upload Records
                  </a>
                </Button>
              </div>
            ) : viewMode === 'grid' ? (
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
                          <span className="text-muted-foreground">Name:</span>
                          <span className="truncate max-w-[150px]">{record.name}</span>
                        </div>
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setPreviewRecordId(record.id)}
                      >
                        <Eye className="mr-2 h-4 w-4" /> View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => {
                          if (record.fileContent) {
                            const a = document.createElement('a');
                            a.href = record.fileContent;
                            a.download = record.name;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                          }
                        }}
                      >
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
                        <TableHead>Name</TableHead>
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
                          <TableCell className="max-w-[150px] truncate">{record.name}</TableCell>
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
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setPreviewRecordId(record.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  if (record.fileContent) {
                                    const a = document.createElement('a');
                                    a.href = record.fileContent;
                                    a.download = record.name;
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                  }
                                }}
                              >
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
                <div 
                  className="border-2 border-dashed rounded-lg p-10 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx"
                  />
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium text-lg mb-1">
                    {selectedFileName ? (
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        {selectedFileName}
                      </span>
                    ) : (
                      "Drop files here or click to upload"
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">Support for PDF, JPG, PNG, and document files up to 25MB</p>
                  <Button variant="outline" size="sm">Select Files</Button>
                </div>
                
                <div>
                  <Label>Document Type</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                    {["X-Ray Results", "Lab Reports", "Insurance Forms", "Previous Treatments", "Medical History", "Other"].map(docType => (
                      <Button 
                        key={docType}
                        variant={selectedDocType === docType ? "default" : "outline"} 
                        className="justify-start font-normal"
                        onClick={() => handleDocTypeSelect(docType)}
                      >
                        {docType}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Input 
                    id="notes" 
                    placeholder="Add any notes about the uploaded documents" 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleUpload}
                  disabled={isUploading || !selectedFileName || !selectedDocType}
                >
                  {isUploading ? (
                    <>Uploading...</>
                  ) : (
                    <>Upload Documents</>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Dialog open={previewRecordId !== null} onOpenChange={(open) => !open && setPreviewRecordId(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>
              {previewRecordId && dentalRecords.find(r => r.id === previewRecordId)?.type}
            </DialogTitle>
            <DialogDescription>
              {previewRecordId && dentalRecords.find(r => r.id === previewRecordId)?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            {previewRecordId && dentalRecords.find(r => r.id === previewRecordId)?.fileContent && (
              <div className="flex justify-center">
                {dentalRecords.find(r => r.id === previewRecordId)?.format === 'Image' ? (
                  <img 
                    src={dentalRecords.find(r => r.id === previewRecordId)?.fileContent} 
                    alt="Document preview" 
                    className="max-w-full max-h-[60vh] object-contain"
                  />
                ) : (
                  <div className="text-center p-6">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-primary" />
                    <p>Preview not available for this file type</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {
                        const record = dentalRecords.find(r => r.id === previewRecordId);
                        if (record?.fileContent) {
                          const a = document.createElement('a');
                          a.href = record.fileContent;
                          a.download = record.name;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                        }
                      }}
                    >
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default DentalRecords;
