'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Briefcase, Search, MapPin, IndianRupee, Users, Building2, 
  ArrowRight, CheckCircle, Star, Zap, Target, BookOpen, Home, LogOut
} from 'lucide-react';

const EMPLOYERS = [
  {
    id: 1,
    name: 'TechCorp India',
    industry: 'Information Technology',
    location: 'Bangalore',
    description: 'Leading IT services company hiring tech-savvy professionals',
    logo: '💻',
    rating: 4.8,
    employees: '5000+',
    openPositions: 12
  },
  {
    id: 2,
    name: 'SecureGuard Solutions',
    industry: 'Security & Defense',
    location: 'Delhi',
    description: 'Premier security firm seeking experienced operational leaders',
    logo: '🛡️',
    rating: 4.9,
    employees: '2000+',
    openPositions: 8
  },
  {
    id: 3,
    name: 'LogisticsPro Network',
    industry: 'Logistics & Supply Chain',
    location: 'Mumbai',
    description: 'Fast-growing logistics company looking for operations managers',
    logo: '📦',
    rating: 4.7,
    employees: '3500+',
    openPositions: 15
  },
  {
    id: 4,
    name: 'HealthFirst Services',
    industry: 'Healthcare',
    location: 'Pune',
    description: 'Multi-specialty healthcare provider expanding across India',
    logo: '⚕️',
    rating: 4.6,
    employees: '1500+',
    openPositions: 6
  },
  {
    id: 5,
    name: 'InfraBuild Engineering',
    industry: 'Construction & Engineering',
    location: 'Chennai',
    description: 'Major infrastructure development company seeking project leads',
    logo: '🏗️',
    rating: 4.8,
    employees: '4000+',
    openPositions: 10
  },
  {
    id: 6,
    name: 'GovernanceIQ Solutions',
    industry: 'Public Administration',
    location: 'New Delhi',
    description: 'Government contractor looking for experienced administrators',
    logo: '🏛️',
    rating: 4.9,
    employees: '800+',
    openPositions: 5
  }
];

const JOB_LISTINGS = [
  {
    id: 1,
    title: 'Senior Security Operations Manager',
    company: 'SecureGuard Solutions',
    location: 'Delhi',
    salary: '₹65,000 - ₹90,000/month',
    type: 'Full-time',
    experience: '3-5 years',
    requiredSkills: ['Leadership', 'Team Management', 'Tactical Planning'],
    idealRole: 'Infantry',
    description: 'Lead security operations team, manage 50+ personnel',
    urgency: 'High',
    postedDate: '2 days ago'
  },
  {
    id: 2,
    title: 'Network Infrastructure Manager',
    company: 'TechCorp India',
    location: 'Bangalore',
    salary: '₹55,000 - ₹75,000/month',
    type: 'Full-time',
    experience: '2-4 years',
    requiredSkills: ['Network Administration', 'System Maintenance', 'Technical Documentation'],
    idealRole: 'Signals',
    description: 'Manage enterprise network infrastructure, ensure 99.9% uptime',
    urgency: 'Medium',
    postedDate: '5 days ago'
  },
  {
    id: 3,
    title: 'Supply Chain Operations Director',
    company: 'LogisticsPro Network',
    location: 'Mumbai',
    salary: '₹70,000 - ₹95,000/month',
    type: 'Full-time',
    experience: '4-6 years',
    requiredSkills: ['Supply Chain Management', 'Operations Planning', 'Warehouse Management'],
    idealRole: 'Logistics',
    description: 'Oversee logistics operations across 10 cities, optimize efficiency',
    urgency: 'High',
    postedDate: '1 day ago'
  },
  {
    id: 4,
    title: 'Project Execution Manager',
    company: 'InfraBuild Engineering',
    location: 'Pune',
    salary: '₹60,000 - ₹80,000/month',
    type: 'Full-time',
    experience: '3-5 years',
    requiredSkills: ['Project Management', 'Technical Knowledge', 'Quality Assurance'],
    idealRole: 'Engineering Support',
    description: 'Lead infrastructure projects worth ₹50+ crores',
    urgency: 'High',
    postedDate: '3 days ago'
  },
  {
    id: 5,
    title: 'Medical Administrator & Coordinator',
    company: 'HealthFirst Services',
    location: 'Pune',
    salary: '₹48,000 - ₹65,000/month',
    type: 'Full-time',
    experience: '2-3 years',
    requiredSkills: ['Healthcare Coordination', 'Emergency Response', 'Team Leadership'],
    idealRole: 'Medical Support',
    description: 'Manage hospital operations, coordinate with medical teams',
    urgency: 'Medium',
    postedDate: '4 days ago'
  },
  {
    id: 6,
    title: 'Government Affairs Officer',
    company: 'GovernanceIQ Solutions',
    location: 'New Delhi',
    salary: '₹50,000 - ₹70,000/month',
    type: 'Full-time',
    experience: '2-4 years',
    requiredSkills: ['Administration', 'Policy Knowledge', 'Documentation'],
    idealRole: 'Infantry',
    description: 'Interface with government agencies, manage compliance',
    urgency: 'Medium',
    postedDate: '1 week ago'
  },
  {
    id: 7,
    title: 'IT Systems Administrator',
    company: 'TechCorp India',
    location: 'Bangalore',
    salary: '₹40,000 - ₹55,000/month',
    type: 'Full-time',
    experience: '1-3 years',
    requiredSkills: ['System Administration', 'IT Support', 'Network Administration'],
    idealRole: 'Signals',
    description: 'Manage IT infrastructure, user support, system security',
    urgency: 'Medium',
    postedDate: '6 days ago'
  },
  {
    id: 8,
    title: 'Warehouse Operations Specialist',
    company: 'LogisticsPro Network',
    location: 'Mumbai',
    salary: '₹35,000 - ₹50,000/month',
    type: 'Full-time',
    experience: '1-2 years',
    requiredSkills: ['Inventory Management', 'Logistics', 'Operations'],
    idealRole: 'Logistics',
    description: 'Optimize warehouse operations, manage inventory',
    urgency: 'Low',
    postedDate: '1 week ago'
  }
];

export default function RecruiterPage() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [selectedJob, setSelectedJob] = useState<typeof JOB_LISTINGS[0] | null>(JOB_LISTINGS[0]);
  const [selectedEmployer, setSelectedEmployer] = useState<typeof EMPLOYERS[0] | null>(null);
  const [jobSearch, setJobSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterSalary, setFilterSalary] = useState('');
  const [employerSearch, setEmployerSearch] = useState('');

  const filteredJobs = JOB_LISTINGS.filter(job => {
    const searchMatch = job.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
                       job.company.toLowerCase().includes(jobSearch.toLowerCase());
    const roleMatch = !filterRole || job.idealRole === filterRole;
    const locationMatch = !filterLocation || job.location === filterLocation;
    const salaryMatch = !filterSalary || (filterSalary === 'high' && parseInt(job.salary.split('-')[1]) >= 75000) ||
                                         (filterSalary === 'medium' && parseInt(job.salary.split('-')[1]) >= 55000 && parseInt(job.salary.split('-')[1]) < 75000) ||
                                         (filterSalary === 'low' && parseInt(job.salary.split('-')[1]) < 55000);
    return searchMatch && roleMatch && locationMatch && salaryMatch;
  });

  const filteredEmployers = EMPLOYERS.filter(emp =>
    emp.name.toLowerCase().includes(employerSearch.toLowerCase()) ||
    emp.industry.toLowerCase().includes(employerSearch.toLowerCase())
  );

  const getUrgencyColor = (urgency: string) => {
    switch(urgency) {
      case 'High': return 'bg-red-900 text-red-100';
      case 'Medium': return 'bg-yellow-900 text-yellow-100';
      default: return 'bg-green-900 text-green-100';
    }
  };

  const getMatchPercentage = (job: typeof JOB_LISTINGS[0]) => {
    // Mock skill match calculation
    const baseMatch = 75;
    return baseMatch + Math.random() * 20;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-500" />
            SkillBridge Jobs
          </Link>
          <div className="flex gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-white hover:bg-slate-700">
                <Home className="w-4 h-4 mr-2" />
                My Dashboard
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-slate-700">
                <LogOut className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Browse Job Opportunities</h1>
          <p className="text-slate-300">Find your perfect match from top employers across India</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800 border border-slate-700">
            <TabsTrigger value="jobs" className="text-white data-[state=active]:bg-blue-600">
              <Briefcase className="w-4 h-4 mr-2" />
              Job Opportunities
            </TabsTrigger>
            <TabsTrigger value="employers" className="text-white data-[state=active]:bg-blue-600">
              <Building2 className="w-4 h-4 mr-2" />
              Top Employers
            </TabsTrigger>
          </TabsList>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            {/* Filters */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Filter Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-5 gap-4">
                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">Search Jobs</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <Input
                        placeholder="Job title or company..."
                        value={jobSearch}
                        onChange={(e) => setJobSearch(e.target.value)}
                        className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">Defence Role</label>
                    <Select value={filterRole || "all-roles"} onValueChange={(value) => setFilterRole(value === "all-roles" ? "" : value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="All Roles" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-roles">All Roles</SelectItem>
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
                    <Select value={filterLocation || "all-cities"} onValueChange={(value) => setFilterLocation(value === "all-cities" ? "" : value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="All Cities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-cities">All Cities</SelectItem>
                        <SelectItem value="Delhi">Delhi</SelectItem>
                        <SelectItem value="Bangalore">Bangalore</SelectItem>
                        <SelectItem value="Mumbai">Mumbai</SelectItem>
                        <SelectItem value="Pune">Pune</SelectItem>
                        <SelectItem value="Chennai">Chennai</SelectItem>
                        <SelectItem value="New Delhi">New Delhi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">Salary Range</label>
                    <Select value={filterSalary || "any"} onValueChange={(value) => setFilterSalary(value === "any" ? "" : value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="high">₹75,000+ monthly</SelectItem>
                        <SelectItem value="medium">₹55,000 - ₹75,000</SelectItem>
                        <SelectItem value="low">Below ₹55,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">Results</label>
                    <div className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white font-medium">
                      {filteredJobs.length} jobs
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Jobs Layout */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Jobs List */}
              <div className="lg:col-span-1 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                <h2 className="text-lg font-semibold sticky top-0 bg-slate-800 p-2 rounded">
                  Available Jobs ({filteredJobs.length})
                </h2>
                {filteredJobs.map(job => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`p-4 rounded-lg cursor-pointer transition-all border ${
                      selectedJob?.id === job.id
                        ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/20'
                        : 'bg-slate-700 border-slate-600 hover:border-blue-500 hover:bg-slate-650'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-white text-sm line-clamp-2">{job.title}</h3>
                      <Badge className={`ml-2 flex-shrink-0 ${getUrgencyColor(job.urgency)}`}>
                        {job.urgency}
                      </Badge>
                    </div>
                    <p className="text-slate-300 text-sm font-medium">{job.company}</p>
                    <div className="flex items-center gap-1 text-slate-400 text-xs mt-2">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 text-xs mt-1">
                      <IndianRupee className="w-3 h-3" />
                      {job.salary.split('-')[1]}
                    </div>
                  </div>
                ))}
              </div>

              {/* Job Details */}
              <div className="lg:col-span-2">
                {selectedJob ? (
                  <Card className="bg-slate-800 border-slate-700 sticky top-20">
                    <CardHeader>
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <CardTitle className="text-white text-2xl">{selectedJob.title}</CardTitle>
                            <p className="text-blue-400 font-medium mt-1">{selectedJob.company}</p>
                          </div>
                          <Badge className={getUrgencyColor(selectedJob.urgency)}>
                            {selectedJob.urgency} Priority
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Match Score */}
                      <div className="bg-slate-700 rounded-lg p-4 flex items-center justify-between">
                        <div>
                          <p className="text-slate-400 text-sm">Skill Match Score</p>
                          <p className="text-2xl font-bold text-white">{getMatchPercentage(selectedJob).toFixed(0)}%</p>
                        </div>
                        <Zap className="w-8 h-8 text-yellow-500" />
                      </div>

                      {/* Key Details */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-700 rounded-lg p-3">
                          <p className="text-slate-400 text-sm mb-1">Salary</p>
                          <p className="text-white font-semibold">{selectedJob.salary}</p>
                        </div>
                        <div className="bg-slate-700 rounded-lg p-3">
                          <p className="text-slate-400 text-sm mb-1">Location</p>
                          <div className="flex items-center gap-1 text-white font-semibold">
                            <MapPin className="w-4 h-4" />
                            {selectedJob.location}
                          </div>
                        </div>
                        <div className="bg-slate-700 rounded-lg p-3">
                          <p className="text-slate-400 text-sm mb-1">Experience</p>
                          <p className="text-white font-semibold">{selectedJob.experience}</p>
                        </div>
                        <div className="bg-slate-700 rounded-lg p-3">
                          <p className="text-slate-400 text-sm mb-1">Posted</p>
                          <p className="text-white font-semibold text-sm">{selectedJob.postedDate}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-blue-400" />
                          About This Role
                        </h4>
                        <p className="text-slate-300">{selectedJob.description}</p>
                      </div>

                      {/* Required Skills */}
                      <div>
                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                          <Target className="w-4 h-4 text-blue-400" />
                          Required Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedJob.requiredSkills.map((skill, idx) => (
                            <Badge key={idx} className="bg-blue-900 text-blue-100 border border-blue-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Ideal Background */}
                      <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
                        <p className="text-blue-200 text-sm">
                          <strong>Ideal for:</strong> Agniveers with background in {selectedJob.idealRole}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 pt-4">
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                          <Briefcase className="w-4 h-4 mr-2" />
                          Apply Now
                        </Button>
                        <Button variant="outline" className="flex-1 border-slate-600 text-white hover:bg-slate-700">
                          Save Job
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-slate-800 border-slate-700 flex items-center justify-center h-full min-h-96">
                    <CardContent className="text-center">
                      <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">Select a job to view details</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Employers Tab */}
          <TabsContent value="employers" className="space-y-6">
            {/* Employer Search */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input
                    placeholder="Search employers by name or industry..."
                    value={employerSearch}
                    onChange={(e) => setEmployerSearch(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Employers Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployers.map(employer => (
                <Card 
                  key={employer.id} 
                  onClick={() => setSelectedEmployer(employer)}
                  className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-all cursor-pointer group"
                >
                  <CardContent className="p-6">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                      {employer.logo}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1">{employer.name}</h3>
                    <p className="text-blue-400 text-sm font-medium mb-3">{employer.industry}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-slate-300 text-sm">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        {employer.location}
                      </div>
                      <div className="flex items-center gap-2 text-slate-300 text-sm">
                        <Users className="w-4 h-4 text-slate-500" />
                        {employer.employees} employees
                      </div>
                      <div className="flex items-center gap-2 text-slate-300 text-sm">
                        <Briefcase className="w-4 h-4 text-slate-500" />
                        {employer.openPositions} open positions
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-700">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-white font-semibold">{employer.rating}</span>
                      <span className="text-slate-400 text-sm">(Employer Rating)</span>
                    </div>

                    <p className="text-slate-300 text-sm mb-4 line-clamp-2">{employer.description}</p>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      View All Jobs
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Employer Details Modal Alternative */}
            {selectedEmployer && (
              <Card className="bg-slate-800 border-slate-700 mt-8">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-5xl mb-3">{selectedEmployer.logo}</div>
                      <CardTitle className="text-white text-2xl">{selectedEmployer.name}</CardTitle>
                      <p className="text-blue-400 font-medium mt-1">{selectedEmployer.industry}</p>
                    </div>
                    <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                      <BookOpen className="w-4 h-4 mr-2" />
                      See All {selectedEmployer.openPositions} Jobs
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300">{selectedEmployer.description}</p>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-slate-700 rounded-lg p-4">
                      <p className="text-slate-400 text-sm mb-1">Headquarters</p>
                      <p className="text-white font-semibold">{selectedEmployer.location}</p>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-4">
                      <p className="text-slate-400 text-sm mb-1">Team Size</p>
                      <p className="text-white font-semibold">{selectedEmployer.employees}</p>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-4">
                      <p className="text-slate-400 text-sm mb-1">Open Positions</p>
                      <p className="text-white font-semibold">{selectedEmployer.openPositions}</p>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-4">
                      <p className="text-slate-400 text-sm mb-1">Rating</p>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <p className="text-white font-semibold">{selectedEmployer.rating}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="mt-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">Start applying to positions matched to your military background and skills. Our employers actively hire verified Agniveers.</p>
          <Link href="/dashboard">
            <Button className="bg-white text-blue-600 hover:bg-slate-100 text-lg px-8">
              Complete Your Profile
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
