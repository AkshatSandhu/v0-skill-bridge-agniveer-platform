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
  ArrowRight, CheckCircle, Star, Zap, Target, BookOpen, Home, LogOut, FileText, Calendar
} from 'lucide-react';

// PRIVATE SECTOR JOBS
const PRIVATE_SECTOR_JOBS = [
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
    postedDate: '2 days ago',
    sector: 'Private'
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
    postedDate: '5 days ago',
    sector: 'Private'
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
    postedDate: '1 day ago',
    sector: 'Private'
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
    postedDate: '3 days ago',
    sector: 'Private'
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
    postedDate: '4 days ago',
    sector: 'Private'
  },
  {
    id: 6,
    title: 'Government Affairs Officer',
    company: 'GovernanceIQ Solutions',
    location: 'New Delhi',
    salary: '₹52,000 - ₹70,000/month',
    type: 'Full-time',
    experience: '2-3 years',
    requiredSkills: ['Policy Analysis', 'Stakeholder Management', 'Documentation'],
    idealRole: 'Signals',
    description: 'Liaison between government and corporate sectors',
    urgency: 'Medium',
    postedDate: '6 days ago',
    sector: 'Private'
  },
  {
    id: 7,
    title: 'Training & Development Coordinator',
    company: 'LearnPro Academy',
    location: 'Bangalore',
    salary: '₹45,000 - ₹60,000/month',
    type: 'Full-time',
    experience: '1-3 years',
    requiredSkills: ['Training Delivery', 'Curriculum Design', 'Team Building'],
    idealRole: 'Infantry',
    description: 'Develop and deliver training programs for corporate teams',
    urgency: 'Low',
    postedDate: '7 days ago',
    sector: 'Private'
  },
  {
    id: 8,
    title: 'Quality Assurance Officer',
    company: 'ManufactureEx Ltd',
    location: 'Chennai',
    salary: '₹50,000 - ₹68,000/month',
    type: 'Full-time',
    experience: '2-4 years',
    requiredSkills: ['Quality Control', 'Process Improvement', 'ISO Standards'],
    idealRole: 'Engineering Support',
    description: 'Ensure product quality and standards compliance',
    urgency: 'Medium',
    postedDate: '3 days ago',
    sector: 'Private'
  }
];

// PUBLIC SECTOR UNDERTAKINGS (PSU) JOBS
const PSU_JOBS = [
  {
    id: 101,
    title: 'Junior Management Trainee (JMT)',
    company: 'NTPC (National Thermal Power Corporation)',
    location: 'Delhi',
    salary: '₹40,000 - ₹55,000/month',
    type: 'Full-time',
    experience: '0-1 years',
    requiredSkills: ['Problem Solving', 'Team Work', 'Technical Aptitude'],
    idealRole: 'Engineering Support',
    description: 'Trainee position for management careers in power sector',
    urgency: 'High',
    postedDate: '10 days ago',
    sector: 'PSU',
    lastApplyDate: '31st March 2025'
  },
  {
    id: 102,
    title: 'Executive Officer Grade A',
    company: 'SAIL (Steel Authority of India Limited)',
    location: 'Kolkata',
    salary: '₹50,000 - ₹70,000/month',
    type: 'Full-time',
    experience: '2-4 years',
    requiredSkills: ['Operations Management', 'Technical Knowledge', 'Leadership'],
    idealRole: 'Logistics',
    description: 'Management position in steel manufacturing operations',
    urgency: 'High',
    postedDate: '8 days ago',
    sector: 'PSU',
    lastApplyDate: '15th April 2025'
  },
  {
    id: 103,
    title: 'Security Officer - Grade B',
    company: 'BHEL (Bharat Heavy Electricals Limited)',
    location: 'Bangalore',
    salary: '₹38,000 - ₹52,000/month',
    type: 'Full-time',
    experience: '2-3 years',
    requiredSkills: ['Security Management', 'Emergency Response', 'Team Leadership'],
    idealRole: 'Infantry',
    description: 'Security and safety operations in manufacturing facilities',
    urgency: 'Medium',
    postedDate: '5 days ago',
    sector: 'PSU',
    lastApplyDate: '30th March 2025'
  },
  {
    id: 104,
    title: 'Technical Officer - IT',
    company: 'GAIL (Gas Authority of India Limited)',
    location: 'New Delhi',
    salary: '₹48,000 - ₹65,000/month',
    type: 'Full-time',
    experience: '2-4 years',
    requiredSkills: ['IT Systems', 'Network Management', 'Data Security'],
    idealRole: 'Signals',
    description: 'IT infrastructure management for national gas distribution',
    urgency: 'High',
    postedDate: '3 days ago',
    sector: 'PSU',
    lastApplyDate: '20th March 2025'
  },
  {
    id: 105,
    title: 'Medical Officer - Grade A',
    company: 'Indian Oil Corporation Limited (IOCL)',
    location: 'Mumbai',
    salary: '₹55,000 - ₹75,000/month',
    type: 'Full-time',
    experience: '3-5 years',
    requiredSkills: ['Occupational Health', 'Emergency Medicine', 'Team Management'],
    idealRole: 'Medical Support',
    description: 'Healthcare management in oil refinery operations',
    urgency: 'Medium',
    postedDate: '6 days ago',
    sector: 'PSU',
    lastApplyDate: '25th March 2025'
  },
  {
    id: 106,
    title: 'Operations Technician',
    company: 'Power Grid Corporation of India (PGCIL)',
    location: 'Chennai',
    salary: '₹36,000 - ₹50,000/month',
    type: 'Full-time',
    experience: '1-2 years',
    requiredSkills: ['Electrical Knowledge', 'Systems Operation', 'Safety Protocols'],
    idealRole: 'Engineering Support',
    description: 'Power grid operation and maintenance',
    urgency: 'High',
    postedDate: '2 days ago',
    sector: 'PSU',
    lastApplyDate: '10th April 2025'
  }
];

// PUBLIC-PRIVATE PARTNERSHIP (PPP) JOBS
const PPP_JOBS = [
  {
    id: 201,
    title: 'Project Operations Manager',
    company: 'Delhi Metro Rail Corporation (DMRC) - PPP Division',
    location: 'Delhi',
    salary: '₹58,000 - ₹80,000/month',
    type: 'Full-time',
    experience: '3-5 years',
    requiredSkills: ['Project Management', 'Operations', 'Stakeholder Management'],
    idealRole: 'Logistics',
    description: 'Manage metro operations in PPP model infrastructure projects',
    urgency: 'High',
    postedDate: '4 days ago',
    sector: 'PPP',
    lastApplyDate: '28th March 2025'
  },
  {
    id: 202,
    title: 'Toll Management Officer',
    company: 'National Highway Authority of India (NHAI) - PPP',
    location: 'Pune',
    salary: '₹45,000 - ₹62,000/month',
    type: 'Full-time',
    experience: '2-3 years',
    requiredSkills: ['Revenue Management', 'Operations', 'Customer Service'],
    idealRole: 'Signals',
    description: 'Toll collection and management in PPP highway projects',
    urgency: 'Medium',
    postedDate: '7 days ago',
    sector: 'PPP',
    lastApplyDate: '22nd March 2025'
  },
  {
    id: 203,
    title: 'Safety & Security Manager',
    company: 'Airport Authority of India (AAI) - PPP Terminal',
    location: 'Bangalore',
    salary: '₹62,000 - ₹85,000/month',
    type: 'Full-time',
    experience: '3-5 years',
    requiredSkills: ['Security Management', 'Risk Assessment', 'Team Leadership'],
    idealRole: 'Infantry',
    description: 'Safety and security operations in PPP airport terminals',
    urgency: 'High',
    postedDate: '2 days ago',
    sector: 'PPP',
    lastApplyDate: '18th April 2025'
  },
  {
    id: 204,
    title: 'Clinical Operations Manager',
    company: 'Ministry of Health - PPP Hospital Initiative',
    location: 'Hyderabad',
    salary: '₹52,000 - ₹70,000/month',
    type: 'Full-time',
    experience: '2-4 years',
    requiredSkills: ['Healthcare Management', 'Operations', 'Compliance'],
    idealRole: 'Medical Support',
    description: 'Hospital operations in public-private healthcare partnerships',
    urgency: 'High',
    postedDate: '1 day ago',
    sector: 'PPP',
    lastApplyDate: '30th April 2025'
  },
  {
    id: 205,
    title: 'Water Management Officer',
    company: 'Water Supply Board - PPP Project',
    location: 'Jaipur',
    salary: '₹40,000 - ₹58,000/month',
    type: 'Full-time',
    experience: '2-3 years',
    requiredSkills: ['Water Treatment', 'Operations', 'Environmental Compliance'],
    idealRole: 'Engineering Support',
    description: 'Water supply operations in PPP model infrastructure',
    urgency: 'Medium',
    postedDate: '5 days ago',
    sector: 'PPP',
    lastApplyDate: '15th April 2025'
  },
  {
    id: 206,
    title: 'Maintenance Supervisor',
    company: 'Railway Board - PPP Maintenance Services',
    location: 'Mumbai',
    salary: '₹44,000 - ₹60,000/month',
    type: 'Full-time',
    experience: '2-4 years',
    requiredSkills: ['Maintenance Management', 'Technical Skills', 'Quality Control'],
    idealRole: 'Logistics',
    description: 'Rail infrastructure maintenance in PPP contracts',
    urgency: 'Medium',
    postedDate: '4 days ago',
    sector: 'PPP',
    lastApplyDate: '25th March 2025'
  }
];

// JOINT SECTOR UNDERTAKINGS (JSU) JOBS
const JSU_JOBS = [
  {
    id: 301,
    title: 'Supervisory Officer - Manufacturing',
    company: 'Vedanta Limited - Government JV',
    location: 'Chhattisgarh',
    salary: '₹50,000 - ₹68,000/month',
    type: 'Full-time',
    experience: '3-4 years',
    requiredSkills: ['Operations Supervision', 'Production Management', 'Safety'],
    idealRole: 'Engineering Support',
    description: 'Supervision of joint venture mining and manufacturing',
    urgency: 'High',
    postedDate: '3 days ago',
    sector: 'JSU',
    lastApplyDate: '20th April 2025'
  },
  {
    id: 302,
    title: 'Field Operations Executive',
    company: 'ONGC-Rosneft Joint Venture',
    location: 'Mumbai',
    salary: '₹55,000 - ₹75,000/month',
    type: 'Full-time',
    experience: '2-4 years',
    requiredSkills: ['Oil & Gas Operations', 'Field Management', 'Technical Expertise'],
    idealRole: 'Logistics',
    description: 'Operations management in oil and gas joint ventures',
    urgency: 'High',
    postedDate: '1 day ago',
    sector: 'JSU',
    lastApplyDate: '10th May 2025'
  },
  {
    id: 303,
    title: 'Safety & Compliance Officer',
    company: 'Coal India Limited - Government JV',
    location: 'Kolkata',
    salary: '₹48,000 - ₹65,000/month',
    type: 'Full-time',
    experience: '2-3 years',
    requiredSkills: ['Safety Management', 'Compliance', 'Risk Assessment'],
    idealRole: 'Infantry',
    description: 'Safety operations in joint sector coal mining ventures',
    urgency: 'High',
    postedDate: '5 days ago',
    sector: 'JSU',
    lastApplyDate: '28th March 2025'
  },
  {
    id: 304,
    title: 'Technical Operations Manager',
    company: 'Hindustan Zinc Limited - JV Division',
    location: 'Udaipur',
    salary: '₹58,000 - ₹78,000/month',
    type: 'Full-time',
    experience: '3-5 years',
    requiredSkills: ['Technical Management', 'Production Operations', 'Quality'],
    idealRole: 'Engineering Support',
    description: 'Technical operations in joint venture mining operations',
    urgency: 'Medium',
    postedDate: '6 days ago',
    sector: 'JSU',
    lastApplyDate: '15th April 2025'
  },
  {
    id: 305,
    title: 'Health & Wellness Manager',
    company: 'JSW Steel - Government Partnership',
    location: 'Karnataka',
    salary: '₹52,000 - ₹70,000/month',
    type: 'Full-time',
    experience: '2-3 years',
    requiredSkills: ['Occupational Health', 'Wellness Programs', 'Team Leadership'],
    idealRole: 'Medical Support',
    description: 'Health and wellness management in JSU steel operations',
    urgency: 'Medium',
    postedDate: '4 days ago',
    sector: 'JSU',
    lastApplyDate: '25th April 2025'
  },
  {
    id: 306,
    title: 'Infrastructure Operations Officer',
    company: 'Adani Ports - Government JV',
    location: 'Ahmedabad',
    salary: '₹54,000 - ₹72,000/month',
    type: 'Full-time',
    experience: '2-4 years',
    requiredSkills: ['Port Operations', 'Logistics', 'Operations Management'],
    idealRole: 'Logistics',
    description: 'Port operations in government-private joint ventures',
    urgency: 'High',
    postedDate: '2 days ago',
    sector: 'JSU',
    lastApplyDate: '8th May 2025'
  }
];

export default function RecruiterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSector, setFilterSector] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterSalary, setFilterSalary] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeTab, setActiveTab] = useState('jobs');

  // Combine all jobs
  const allJobs = [...PRIVATE_SECTOR_JOBS, ...PSU_JOBS, ...PPP_JOBS, ...JSU_JOBS];

  // Filter jobs
  const filteredJobs = allJobs.filter(job => {
    const matchSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSector = !filterSector || job.sector === filterSector;
    const matchLocation = !filterLocation || job.location === filterLocation;
    
    let matchSalary = true;
    if (filterSalary) {
      const salary = job.salary.toLowerCase();
      if (filterSalary === 'high') matchSalary = salary.includes('75000') || salary.includes('90000') || salary.includes('80000') || salary.includes('85000');
      if (filterSalary === 'medium') matchSalary = salary.includes('55000') || salary.includes('65000') || salary.includes('70000') || salary.includes('60000');
      if (filterSalary === 'low') matchSalary = salary.includes('40000') || salary.includes('45000') || salary.includes('50000') || salary.includes('38000');
    }
    
    return matchSearch && matchSector && matchLocation && matchSalary;
  });

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'High': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  const getSectorColor = (sector) => {
    switch(sector) {
      case 'Private': return 'bg-emerald-500/20 text-emerald-300';
      case 'PSU': return 'bg-blue-500/20 text-blue-300';
      case 'PPP': return 'bg-purple-500/20 text-purple-300';
      case 'JSU': return 'bg-orange-500/20 text-orange-300';
      default: return 'bg-slate-500/20 text-slate-300';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-400">SkillBridge</h1>
            <p className="text-sm text-slate-400">Career Opportunities</p>
          </div>
          <Link href="/dashboard">
            <Button className="bg-slate-700 text-white hover:bg-slate-600">
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-slate-800 border-b border-slate-700 mb-6 w-full justify-start">
            <TabsTrigger value="jobs" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Briefcase className="w-4 h-4 mr-2" />
              All Job Opportunities
            </TabsTrigger>
            <TabsTrigger value="employers" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Building2 className="w-4 h-4 mr-2" />
              Employers
            </TabsTrigger>
            <TabsTrigger value="exams" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <BookOpen className="w-4 h-4 mr-2" />
              Exams & Tests
            </TabsTrigger>
            <TabsTrigger value="pathway" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Target className="w-4 h-4 mr-2" />
              Career Pathway
            </TabsTrigger>
          </TabsList>

          {/* All Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            {/* Filters */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Find Your Opportunity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder="Search jobs, companies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">Sector</label>
                    <Select value={filterSector || "all-sectors"} onValueChange={(value) => setFilterSector(value === "all-sectors" ? "" : value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="All Sectors" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="all-sectors">All Sectors</SelectItem>
                        <SelectItem value="Private">Private Sector</SelectItem>
                        <SelectItem value="PSU">PSU (Public Sector Undertaking)</SelectItem>
                        <SelectItem value="PPP">PPP (Public-Private Partnership)</SelectItem>
                        <SelectItem value="JSU">JSU (Joint Sector Undertaking)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">Location</label>
                    <Select value={filterLocation || "all-cities"} onValueChange={(value) => setFilterLocation(value === "all-cities" ? "" : value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="All Cities" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="all-cities">All Cities</SelectItem>
                        <SelectItem value="Delhi">Delhi</SelectItem>
                        <SelectItem value="New Delhi">New Delhi</SelectItem>
                        <SelectItem value="Bangalore">Bangalore</SelectItem>
                        <SelectItem value="Mumbai">Mumbai</SelectItem>
                        <SelectItem value="Pune">Pune</SelectItem>
                        <SelectItem value="Chennai">Chennai</SelectItem>
                        <SelectItem value="Kolkata">Kolkata</SelectItem>
                        <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                        <SelectItem value="Jaipur">Jaipur</SelectItem>
                        <SelectItem value="Chhattisgarh">Chhattisgarh</SelectItem>
                        <SelectItem value="Udaipur">Udaipur</SelectItem>
                        <SelectItem value="Ahmedabad">Ahmedabad</SelectItem>
                        <SelectItem value="Karnataka">Karnataka</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">Salary Range</label>
                    <Select value={filterSalary || "any"} onValueChange={(value) => setFilterSalary(value === "any" ? "" : value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="high">₹75,000+ monthly</SelectItem>
                        <SelectItem value="medium">₹55,000 - ₹75,000</SelectItem>
                        <SelectItem value="low">Below ₹55,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Badge className="bg-blue-600">
                      {filteredJobs.length} opportunities found
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Jobs Grid */}
            {filteredJobs.length > 0 ? (
              <div className="grid gap-4">
                {filteredJobs.map(job => (
                  <Card key={job.id} className="bg-slate-800 border-slate-700 hover:border-blue-500 transition cursor-pointer" onClick={() => setSelectedJob(job)}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                          <p className="text-slate-400">{job.company}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getSectorColor(job.sector)}>
                            {job.sector}
                          </Badge>
                          {job.urgency && (
                            <Badge className={getUrgencyColor(job.urgency)}>
                              {job.urgency}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-slate-300">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <IndianRupee className="w-4 h-4" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.experience}
                        </div>
                      </div>

                      <p className="text-slate-400 text-sm mb-4">{job.description}</p>

                      <div className="flex gap-2 flex-wrap mb-4">
                        {job.requiredSkills.map(skill => (
                          <Badge key={skill} className="bg-slate-700 text-slate-200 hover:bg-slate-600">{skill}</Badge>
                        ))}
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">{job.postedDate}</span>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setSelectedJob(job)}>
                          View Details <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>

                      {job.lastApplyDate && (
                        <p className="text-xs text-yellow-400 mt-2">Apply by: {job.lastApplyDate}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-slate-800 border-slate-700 p-8 text-center">
                <p className="text-slate-400">No opportunities found matching your filters</p>
              </Card>
            )}
          </TabsContent>

          {/* Employers Tab */}
          <TabsContent value="employers" className="space-y-6">
            <div className="grid gap-4">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle>Major Employers Hiring Agniveers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'NTPC Limited', type: 'PSU - Power Sector', roles: 12, openings: 'JMT, Engineering, Operations' },
                      { name: 'SAIL Limited', type: 'PSU - Steel Industry', roles: 8, openings: 'Executive, Technical, Security' },
                      { name: 'IOCL', type: 'PSU - Oil & Gas', roles: 10, openings: 'Operations, Technical, Medical' },
                      { name: 'Delhi Metro (PPP)', type: 'Public-Private Partnership', roles: 15, openings: 'Operations, Security, Management' },
                      { name: 'ONGC-Rosneft (JSU)', type: 'Joint Sector Undertaking', roles: 6, openings: 'Field Operations, Technical' },
                      { name: 'SecureGuard Solutions', type: 'Private Sector', roles: 7, openings: 'Security Management, Team Lead' },
                      { name: 'TechCorp India', type: 'Private Sector - IT', roles: 5, openings: 'Infrastructure, Network Management' },
                      { name: 'Coal India Limited', type: 'JSU - Mining', roles: 9, openings: 'Safety, Operations, Supervision' }
                    ].map((employer, idx) => (
                      <div key={idx} className="border-b border-slate-700 pb-4 last:border-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-white">{employer.name}</h3>
                            <p className="text-sm text-slate-400">{employer.type}</p>
                          </div>
                          <Badge className="bg-blue-600">{employer.roles} Roles</Badge>
                        </div>
                        <p className="text-sm text-slate-300 mb-2">{employer.openings}</p>
                        <Button className="bg-slate-700 hover:bg-slate-600 text-sm">View Openings</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams" className="space-y-6">
            <div className="grid gap-4">
              {[
                {
                  name: 'UPSC CDS (Combined Defence Services)',
                  frequency: 'Twice yearly',
                  difficulty: 'Very High',
                  exams: ['Written Exam', 'Intelligence Test', 'Psychological Test', 'Interview'],
                  age: '19-24 years',
                  benefit: 'Officer rank positions'
                },
                {
                  name: 'SSC-CGL (Combined Graduate Level)',
                  frequency: 'Annual',
                  difficulty: 'High',
                  exams: ['Tier-I (Online)', 'Tier-II (Online)', 'Tier-III (Descriptive)', 'Tier-IV (Computer)'],
                  age: 'Age relaxation applicable',
                  benefit: 'Government Group B & C posts'
                },
                {
                  name: 'RRB NTPC (Railway)',
                  frequency: 'Quarterly',
                  difficulty: 'Medium',
                  exams: ['CBT Stage 1', 'CBT Stage 2', 'Document Verification'],
                  age: 'Age relaxation for ex-servicemen',
                  benefit: 'Railway sector positions'
                },
                {
                  name: 'AFCAT (Armed Forces Common Admission Test)',
                  frequency: 'Twice yearly',
                  difficulty: 'High',
                  exams: ['Written Exam', 'SSB Interview', 'Medical Examination'],
                  age: '20-24 years',
                  benefit: 'Officer commissions'
                }
              ].map((exam, idx) => (
                <Card key={idx} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-white">{exam.name}</CardTitle>
                      <Badge className="bg-yellow-600">{exam.difficulty}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-300">Frequency: <span className="text-white font-semibold">{exam.frequency}</span></p>
                      <p className="text-sm text-slate-300">Age Criteria: <span className="text-white font-semibold">{exam.age}</span></p>
                      <p className="text-sm text-slate-300">Benefit: <span className="text-white font-semibold">{exam.benefit}</span></p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 mb-2">Examination Stages:</p>
                      <div className="flex flex-wrap gap-2">
                        {exam.exams.map((stage, i) => (
                          <Badge key={i} className="bg-slate-700 text-slate-200">{stage}</Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 w-full mt-4">Learn More</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Career Pathway Tab */}
          <TabsContent value="pathway" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Government vs Private vs Sector Opportunities</CardTitle>
                <CardDescription className="text-slate-400">Choose the path that suits your career goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-slate-700 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-emerald-400">Private Sector</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-slate-300">
                      <p>✓ Competitive salaries (₹45K - ₹95K monthly)</p>
                      <p>✓ Performance-based growth</p>
                      <p>✓ International exposure</p>
                      <p>✓ Flexible working culture</p>
                      <p>✓ Quick recruitment process</p>
                      <Button className="bg-emerald-600 hover:bg-emerald-700 w-full mt-4">View Private Roles</Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-700 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-blue-400">PSU Sector</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-slate-300">
                      <p>✓ Job security & stability</p>
                      <p>✓ Pension benefits</p>
                      <p>✓ Employer coverage</p>
                      <p>✓ Government regulations & fairness</p>
                      <p>✓ Age relaxation for ex-servicemen</p>
                      <Button className="bg-blue-600 hover:bg-blue-700 w-full mt-4">View PSU Roles</Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-700 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-purple-400">PPP Sector</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-slate-300">
                      <p>✓ Hybrid benefits (Government + Private)</p>
                      <p>✓ Infrastructure projects</p>
                      <p>✓ Skill development opportunities</p>
                      <p>✓ Decent salary packages</p>
                      <p>✓ National importance projects</p>
                      <Button className="bg-purple-600 hover:bg-purple-700 w-full mt-4">View PPP Roles</Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-700 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-orange-400">JSU Sector</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-slate-300">
                      <p>✓ Government backing with private expertise</p>
                      <p>✓ Better facilities & technology</p>
                      <p>✓ Strong growth opportunities</p>
                      <p>✓ Competitive compensation</p>
                      <p>✓ Strategic industry roles</p>
                      <Button className="bg-orange-600 hover:bg-orange-700 w-full mt-4">View JSU Roles</Button>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-slate-700 border-slate-600 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Special Benefits for Agniveers</h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>✓ Age relaxation (up to 5 years) in government exams</li>
                    <li>✓ Preference points in PSU recruitment</li>
                    <li>✓ Government skill certification programs (free)</li>
                    <li>✓ Priority in infrastructure projects (PPP/JSU)</li>
                    <li>✓ Reservation benefits in Group B & C positions</li>
                  </ul>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <Card className="bg-slate-800 border-slate-700 max-w-2xl w-full max-h-96 overflow-y-auto">
            <CardHeader className="flex flex-row justify-between items-start">
              <div>
                <CardTitle className="text-white">{selectedJob.title}</CardTitle>
                <CardDescription className="text-slate-400">{selectedJob.company}</CardDescription>
              </div>
              <Button variant="ghost" className="text-white" onClick={() => setSelectedJob(null)}>✕</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400">Location</p>
                  <p className="text-white font-semibold flex items-center gap-1"><MapPin className="w-4 h-4" /> {selectedJob.location}</p>
                </div>
                <div>
                  <p className="text-slate-400">Salary</p>
                  <p className="text-white font-semibold flex items-center gap-1"><IndianRupee className="w-4 h-4" /> {selectedJob.salary}</p>
                </div>
                <div>
                  <p className="text-slate-400">Experience</p>
                  <p className="text-white font-semibold">{selectedJob.experience}</p>
                </div>
                <div>
                  <p className="text-slate-400">Sector</p>
                  <p className="text-white font-semibold"><Badge className={getSectorColor(selectedJob.sector)}>{selectedJob.sector}</Badge></p>
                </div>
              </div>

              <div>
                <p className="text-slate-400 mb-2">Description</p>
                <p className="text-white">{selectedJob.description}</p>
              </div>

              <div>
                <p className="text-slate-400 mb-2">Required Skills</p>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.requiredSkills.map(skill => (
                    <Badge key={skill} className="bg-slate-700 text-slate-200">{skill}</Badge>
                  ))}
                </div>
              </div>

              {selectedJob.lastApplyDate && (
                <div className="bg-yellow-600/20 border border-yellow-600/30 rounded p-3">
                  <p className="text-yellow-300 text-sm"><Calendar className="w-4 h-4 inline mr-2" />Apply by: {selectedJob.lastApplyDate}</p>
                </div>
              )}

              <Button className="bg-blue-600 hover:bg-blue-700 w-full mt-4">Apply Now</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
