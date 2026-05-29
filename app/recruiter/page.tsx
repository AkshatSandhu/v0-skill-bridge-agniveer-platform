'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Search, Mail, Phone, MapPin, ArrowRight, CheckCircle } from 'lucide-react';

const MOCK_CANDIDATES = [
  {
    id: 1,
    name: 'Arjun Singh',
    role: 'Infantry',
    location: 'Delhi',
    yearsOfService: 4,
    skills: ['Leadership', 'Tactical Planning', 'Emergency Response'],
    verified: true,
    email: 'arjun@example.com',
    phone: '+91 98765 43210',
    education: "Bachelor's in Electronics"
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Signals',
    location: 'Bangalore',
    yearsOfService: 3,
    skills: ['Network Administration', 'IT Support', 'System Maintenance'],
    verified: true,
    email: 'priya@example.com',
    phone: '+91 87654 32109',
    education: 'Bachelor in Computer Science'
  },
  {
    id: 3,
    name: 'Rajesh Kumar',
    role: 'Logistics',
    location: 'Mumbai',
    yearsOfService: 5,
    skills: ['Supply Chain Management', 'Operations', 'Warehouse Management'],
    verified: true,
    email: 'rajesh@example.com',
    phone: '+91 76543 21098',
    education: 'Diploma in Business Management'
  },
  {
    id: 4,
    name: 'Vikram Patel',
    role: 'Engineering Support',
    location: 'Chennai',
    yearsOfService: 6,
    skills: ['Project Engineering', 'Technical Management', 'Quality Assurance'],
    verified: true,
    email: 'vikram@example.com',
    phone: '+91 65432 10987',
    education: 'Bachelor in Mechanical Engineering'
  },
  {
    id: 5,
    name: 'Neha Gupta',
    role: 'Medical Support',
    location: 'Delhi',
    yearsOfService: 3,
    skills: ['Emergency Response', 'Healthcare Coordination', 'Disaster Relief'],
    verified: true,
    email: 'neha@example.com',
    phone: '+91 54321 09876',
    education: 'Bachelor in Nursing'
  }
];

const MOCK_JOBS = [
  {
    id: 1,
    title: 'Security Operations Manager',
    company: 'Private Security Ltd.',
    location: 'Delhi',
    salary: '₹50,000 - ₹70,000/month',
    type: 'Full-time',
    requiredRole: 'Infantry'
  },
  {
    id: 2,
    title: 'Network Technician',
    company: 'Telecom India',
    location: 'Bangalore',
    salary: '₹40,000 - ₹55,000/month',
    type: 'Full-time',
    requiredRole: 'Signals'
  },
  {
    id: 3,
    title: 'Operations Manager',
    company: 'Logistics Plus',
    location: 'Mumbai',
    salary: '₹55,000 - ₹75,000/month',
    type: 'Full-time',
    requiredRole: 'Logistics'
  },
  {
    id: 4,
    title: 'Project Coordinator',
    company: 'Construction Co.',
    location: 'Pune',
    salary: '₹45,000 - ₹60,000/month',
    type: 'Full-time',
    requiredRole: 'Engineering Support'
  },
  {
    id: 5,
    title: 'Healthcare Manager',
    company: 'Red Cross',
    location: 'All India',
    salary: '₹48,000 - ₹65,000/month',
    type: 'Full-time',
    requiredRole: 'Medical Support'
  }
];

export default function RecruiterPage() {
  const [activeTab, setActiveTab] = useState('candidates');
  const [searchRole, setSearchRole] = useState('all');
  const [searchLocation, setSearchLocation] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState<typeof MOCK_CANDIDATES[0] | null>(null);
  const [jobSearch, setJobSearch] = useState('');

  const filteredCandidates = MOCK_CANDIDATES.filter(candidate => {
    const roleMatch = searchRole === 'all' || candidate.role === searchRole;
    const locationMatch = searchLocation === 'all' || candidate.location === searchLocation;
    return roleMatch && locationMatch;
  });

  const filteredJobs = MOCK_JOBS.filter(job =>
    job.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
    job.company.toLowerCase().includes(jobSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-500" />
            SkillBridge Recruiters
          </Link>
          <div className="flex gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-white hover:bg-slate-700">
                My Dashboard
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-slate-700">
                Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Talent Marketplace</h1>
          <p className="text-slate-300">Find and hire verified Agniveers with military expertise</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800 border-slate-700">
            <TabsTrigger value="candidates" className="text-white data-[state=active]:bg-blue-600">
              Browse Candidates
            </TabsTrigger>
            <TabsTrigger value="jobs" className="text-white data-[state=active]:bg-blue-600">
              Posted Jobs
            </TabsTrigger>
          </TabsList>

          {/* Candidates Tab */}
          <TabsContent value="candidates" className="space-y-6">
            {/* Filters */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Filter Candidates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">Defence Role</label>
                    <Select value={searchRole} onValueChange={setSearchRole}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="All Roles" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="Infantry">Infantry</SelectItem>
                        <SelectItem value="Signals">Signals</SelectItem>
                        <SelectItem value="Logistics">Logistics</SelectItem>
                        <SelectItem value="Medical Support">Medical Support</SelectItem>
                        <SelectItem value="Engineering Support">Engineering Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">Location</label>
                    <Select value={searchLocation} onValueChange={setSearchLocation}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="Delhi">Delhi</SelectItem>
                        <SelectItem value="Bangalore">Bangalore</SelectItem>
                        <SelectItem value="Mumbai">Mumbai</SelectItem>
                        <SelectItem value="Chennai">Chennai</SelectItem>
                        <SelectItem value="Pune">Pune</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">Results</label>
                    <div className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white">
                      {filteredCandidates.length} candidates found
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Candidates Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Candidates List */}
              <div className="lg:col-span-1 space-y-4">
                <h2 className="text-lg font-semibold">Candidates ({filteredCandidates.length})</h2>
                {filteredCandidates.map(candidate => (
                  <div
                    key={candidate.id}
                    onClick={() => setSelectedCandidate(candidate)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedCandidate?.id === candidate.id
                        ? 'bg-blue-600 border-blue-500'
                        : 'bg-slate-700 border-slate-600 hover:bg-slate-600'
                    } border`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-white">{candidate.name}</h3>
                      {candidate.verified && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    <p className="text-slate-300 text-sm">{candidate.role}</p>
                    <p className="text-slate-400 text-sm flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {candidate.location}
                    </p>
                  </div>
                ))}
              </div>

              {/* Candidate Details */}
              <div className="lg:col-span-2">
                {selectedCandidate ? (
                  <Card className="bg-slate-800 border-slate-700 sticky top-20">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <CardTitle className="text-white text-2xl">{selectedCandidate.name}</CardTitle>
                          <div className="flex gap-2 mt-2">
                            <Badge className="bg-blue-900 text-blue-100">{selectedCandidate.role}</Badge>
                            <Badge className="bg-green-900 text-green-100">Verified</Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="text-white font-semibold mb-3">Contact Information</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-slate-300">
                            <Mail className="w-4 h-4 text-blue-400" />
                            {selectedCandidate.email}
                          </div>
                          <div className="flex items-center gap-2 text-slate-300">
                            <Phone className="w-4 h-4 text-blue-400" />
                            {selectedCandidate.phone}
                          </div>
                          <div className="flex items-center gap-2 text-slate-300">
                            <MapPin className="w-4 h-4 text-blue-400" />
                            {selectedCandidate.location}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-semibold mb-3">Background</h4>
                        <p className="text-slate-300">
                          <strong>Years of Service:</strong> {selectedCandidate.yearsOfService} years
                        </p>
                        <p className="text-slate-300">
                          <strong>Education:</strong> {selectedCandidate.education}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-white font-semibold mb-3">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedCandidate.skills.map((skill, idx) => (
                            <Badge key={idx} className="bg-blue-900 text-blue-100">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                          <Mail className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
                        <Button variant="outline" className="flex-1 border-slate-600 text-white hover:bg-slate-700">
                          Download CV
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-slate-800 border-slate-700 flex items-center justify-center h-full min-h-96">
                    <CardContent className="text-center">
                      <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">Select a candidate to view details</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            {/* Search */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input
                    placeholder="Search jobs by title or company..."
                    value={jobSearch}
                    onChange={(e) => setJobSearch(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Jobs List */}
            <div className="space-y-4">
              {filteredJobs.map(job => (
                <Card key={job.id} className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                        <p className="text-slate-400">{job.company}</p>
                      </div>
                      <Badge className="bg-blue-900 text-blue-100">{job.type}</Badge>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-slate-300">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        {job.location}
                      </div>
                      <div className="text-slate-300">
                        <strong>Salary:</strong> {job.salary}
                      </div>
                      <div className="text-slate-300">
                        <strong>Role Match:</strong> {job.requiredRole}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        View Matching Candidates <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                        Post Job
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer CTA */}
        <div className="mt-12 p-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Post a Job Opening</h2>
          <p className="text-purple-100 mb-6">Reach thousands of verified Agniveers looking for their next opportunity</p>
          <Button className="bg-white text-purple-600 hover:bg-slate-100">
            Post Your Job Now
          </Button>
        </div>
      </div>
    </div>
  );
}
