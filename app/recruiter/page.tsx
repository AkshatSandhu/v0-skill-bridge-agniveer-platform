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
    sector: 'Private',
    availability: 'Open'
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
    sector: 'Private',
    availability: 'Open'
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
    sector: 'Private',
    availability: 'Open'
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
    sector: 'Private',
    availability: 'Open'
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
    sector: 'Private',
    availability: 'Open'
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
    postedDate: '1 week ago',
    sector: 'Private',
    availability: 'Open'
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
    postedDate: '6 days ago',
    sector: 'Private',
    availability: 'Open'
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
    postedDate: '1 week ago',
    sector: 'Private',
    availability: 'Open'
  }
];

const GOVERNMENT_JOBS = [
  {
    id: 101,
    title: 'Assistant Commandant (AC) - Border Security Force',
    company: 'Border Security Force (BSF)',
    location: 'Pan India',
    salary: '₹56,100 - ₹177,500/month',
    type: 'Permanent',
    experience: '0-2 years',
    requiredSkills: ['Leadership', 'Physical Fitness', 'Decision Making'],
    idealRole: 'Infantry',
    description: 'Lead BSF operations at border, manage personnel, counter-terrorism duties',
    urgency: 'High',
    postedDate: '3 days ago',
    sector: 'Government',
    availability: 'Open',
    exam: 'UPSC (Union Public Service Commission)',
    examDate: 'June 2026',
    eligibility: 'Bachelor\'s degree, 21-30 years old',
    syllabus: ['General Studies', 'Optional Subject', 'Interview'],
    applicationDeadline: '15-April-2026'
  },
  {
    id: 102,
    title: 'Central Armed Police Forces (CAPF) Officer',
    company: 'CAPF (CRPF/CISF/BSF/SSB)',
    location: 'Pan India',
    salary: '₹44,900 - ₹142,400/month',
    type: 'Permanent',
    experience: '0-2 years',
    requiredSkills: ['Discipline', 'Physical Endurance', 'Problem Solving'],
    idealRole: 'Infantry',
    description: 'Serve in paramilitary forces, handle internal security, counter-terrorism',
    urgency: 'High',
    postedDate: '5 days ago',
    sector: 'Government',
    availability: 'Open',
    exam: 'UPSC CAPF Exam (AC)',
    examDate: 'August 2026',
    eligibility: 'Bachelor\'s degree, 21-30 years old',
    syllabus: ['General Ability', 'Physical Test', 'Interview'],
    applicationDeadline: '20-May-2026'
  },
  {
    id: 103,
    title: 'National Defence Academy (NDA) Officer',
    company: 'Indian Armed Forces',
    location: 'Pan India',
    salary: '₹56,100 onwards/month',
    type: 'Permanent (15 years service)',
    experience: '0-1 years',
    requiredSkills: ['Academic Excellence', 'Leadership', 'Physical Fitness'],
    idealRole: 'Infantry',
    description: 'Three-year training at NDA, followed by commission in Army/Navy/Air Force',
    urgency: 'High',
    postedDate: '1 week ago',
    sector: 'Government',
    availability: 'Open',
    exam: 'UPSC NDA Exam',
    examDate: 'April 2026 & September 2026',
    eligibility: '12th pass, 16-19 years old',
    syllabus: ['Mathematics', 'General Ability', 'Physical Test'],
    applicationDeadline: '25-February-2026'
  },
  {
    id: 104,
    title: 'Combined Defence Services (CDS) Officer',
    company: 'Indian Armed Forces',
    location: 'Pan India',
    salary: '₹56,100 - ₹177,500/month',
    type: 'Permanent',
    experience: '0-3 years',
    requiredSkills: ['Leadership', 'Strategic Thinking', 'Command Skills'],
    idealRole: 'Infantry',
    description: 'Commission in Army/Navy/Air Force through CDS exam, lead military operations',
    urgency: 'High',
    postedDate: '4 days ago',
    sector: 'Government',
    availability: 'Open',
    exam: 'UPSC CDS Exam',
    examDate: 'May 2026 & November 2026',
    eligibility: 'Bachelor\'s degree, 21-28 years old',
    syllabus: ['English', 'General Knowledge', 'Elementary Mathematics'],
    applicationDeadline: '01-March-2026'
  },
  {
    id: 105,
    title: 'SSC-CGL (Tier-2) - Administrative Officer',
    company: 'Ministry of Defence & Other Govt Departments',
    location: 'Pan India',
    salary: '₹35,400 - ₹112,400/month',
    type: 'Full-time',
    experience: '0-2 years',
    requiredSkills: ['Administration', 'Data Handling', 'Report Writing'],
    idealRole: 'Logistics',
    description: 'Administrative officer in government agencies, manage files and operations',
    urgency: 'Medium',
    postedDate: '1 week ago',
    sector: 'Government',
    availability: 'Open',
    exam: 'Staff Selection Commission (SSC-CGL)',
    examDate: 'Tier-1: December 2025 (Already Done), Tier-2: March-April 2026',
    eligibility: '12th pass minimum, 18-27 years old',
    syllabus: ['Quantitative Aptitude', 'English', 'Reasoning', 'General Knowledge'],
    applicationDeadline: 'Ongoing'
  },
  {
    id: 106,
    title: 'Railway Protection Force (RPF) Constable',
    company: 'Ministry of Railways',
    location: 'Pan India (Railway Stations)',
    salary: '₹21,700 - ₹69,100/month',
    type: 'Full-time',
    experience: '0-1 years',
    requiredSkills: ['Vigilance', 'Physical Strength', 'Problem Solving'],
    idealRole: 'Infantry',
    description: 'Provide security at railway stations and trains, prevent crime',
    urgency: 'High',
    postedDate: '2 days ago',
    sector: 'Government',
    availability: 'Open',
    exam: 'RRB/Railway Board Exam',
    examDate: 'May 2026',
    eligibility: '10th/12th pass, 18-25 years old',
    syllabus: ['General Knowledge', 'Arithmetic', 'Reasoning'],
    applicationDeadline: '10-March-2026'
  },
  {
    id: 107,
    title: 'Defence Research & Development Organisation (DRDO) Scientist',
    company: 'Ministry of Defence - DRDO',
    location: 'Various DRDO Centers (Delhi, Bangalore, Pune)',
    salary: '₹56,100 - ₹177,500/month',
    type: 'Full-time',
    experience: '0-3 years',
    requiredSkills: ['Research', 'Engineering', 'Technical Knowledge'],
    idealRole: 'Engineering Support',
    description: 'Work on defence research projects, develop military technologies',
    urgency: 'Medium',
    postedDate: '6 days ago',
    sector: 'Government',
    availability: 'Open',
    exam: 'DRDO Scientist Entry Test',
    examDate: 'Ongoing (Recruitment Notification)',
    eligibility: 'B.E/B.Tech/M.Tech in Engineering',
    syllabus: ['Engineering Core Subjects', 'Technical Knowledge', 'General Awareness'],
    applicationDeadline: 'Varies per notification'
  },
  {
    id: 108,
    title: 'Intelligence Bureau (IB) Recruitment - Grade-II Officer',
    company: 'Ministry of Home Affairs - IB',
    location: 'Pan India',
    salary: '₹50,000 - ₹160,000/month',
    type: 'Permanent',
    experience: '0-2 years',
    requiredSkills: ['Analytical Thinking', 'Surveillance', 'Intelligence'],
    idealRole: 'Signals',
    description: 'Work in intelligence gathering, national security, counter-terrorism',
    urgency: 'High',
    postedDate: '3 days ago',
    sector: 'Government',
    availability: 'Open',
    exam: 'UPSC Intelligence Bureau Exam',
    examDate: 'June 2026',
    eligibility: 'Bachelor\'s degree, 21-27 years old, Medical & Psychological fitness',
    syllabus: ['General Studies', 'Interview', 'Physical Test'],
    applicationDeadline: '15-April-2026'
  }
];

const ALL_JOBS = [...PRIVATE_SECTOR_JOBS, ...GOVERNMENT_JOBS];

export default function RecruiterPage() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [selectedJob, setSelectedJob] = useState<typeof ALL_JOBS[0] | null>(ALL_JOBS[0]);
  const [jobSearch, setJobSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterSalary, setFilterSalary] = useState('');
  const [filterSector, setFilterSector] = useState('');

  const filteredJobs = ALL_JOBS.filter(job => {
    const searchMatch = job.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
                       job.company.toLowerCase().includes(jobSearch.toLowerCase());
    const roleMatch = !filterRole || job.idealRole === filterRole;
    const locationMatch = !filterLocation || job.location === filterLocation;
    const sectorMatch = !filterSector || job.sector === filterSector;
    const salaryMatch = !filterSalary || (
      filterSalary === 'high' && parseInt(job.salary.split('-')[1].replace(/[₹,]/g, '')) >= 75000
    ) || (
      filterSalary === 'medium' && parseInt(job.salary.split('-')[1].replace(/[₹,]/g, '')) >= 55000 && 
      parseInt(job.salary.split('-')[1].replace(/[₹,]/g, '')) < 75000
    ) || (
      filterSalary === 'low' && parseInt(job.salary.split('-')[1].replace(/[₹,]/g, '')) < 55000
    );
    return searchMatch && roleMatch && locationMatch && sectorMatch && salaryMatch;
  });

  const getUrgencyColor = (urgency: string) => {
    switch(urgency) {
      case 'High': return 'bg-red-900 text-red-100';
      case 'Medium': return 'bg-yellow-900 text-yellow-100';
      default: return 'bg-green-900 text-green-100';
    }
  };

  const getSectorColor = (sector: string) => {
    return sector === 'Government' ? 'bg-blue-900 text-blue-100' : 'bg-purple-900 text-purple-100';
  };

  const getMatchPercentage = (job: typeof ALL_JOBS[0]) => {
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
          <p className="text-slate-300">Find your perfect match from private and government sector employers across India</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800 border border-slate-700">
            <TabsTrigger value="jobs" className="text-white data-[state=active]:bg-blue-600">
              <Briefcase className="w-4 h-4 mr-2" />
              All Jobs
            </TabsTrigger>
            <TabsTrigger value="exams" className="text-white data-[state=active]:bg-blue-600">
              <FileText className="w-4 h-4 mr-2" />
              Exams & Tests
            </TabsTrigger>
            <TabsTrigger value="guide" className="text-white data-[state=active]:bg-blue-600">
              <BookOpen className="w-4 h-4 mr-2" />
              Government Path
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
                <div className="grid md:grid-cols-6 gap-4">
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
                    <label className="text-sm text-slate-300 mb-2 block">Sector</label>
                    <Select value={filterSector || "all-sectors"} onValueChange={(value) => setFilterSector(value === "all-sectors" ? "" : value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="All Sectors" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-sectors">All Sectors</SelectItem>
                        <SelectItem value="Private">Private</SelectItem>
                        <SelectItem value="Government">Government</SelectItem>
                      </SelectContent>
                    </Select>
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
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-cities">All Locations</SelectItem>
                        <SelectItem value="Delhi">Delhi</SelectItem>
                        <SelectItem value="Bangalore">Bangalore</SelectItem>
                        <SelectItem value="Mumbai">Mumbai</SelectItem>
                        <SelectItem value="Pune">Pune</SelectItem>
                        <SelectItem value="Chennai">Chennai</SelectItem>
                        <SelectItem value="New Delhi">New Delhi</SelectItem>
                        <SelectItem value="Pan India">Pan India</SelectItem>
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

                  <Button onClick={() => {
                    setJobSearch('');
                    setFilterRole('');
                    setFilterLocation('');
                    setFilterSalary('');
                    setFilterSector('');
                  }} className="bg-slate-700 hover:bg-slate-600 mt-6">
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="text-sm text-slate-400 mb-4">
              Showing {filteredJobs.length} of {ALL_JOBS.length} opportunities
            </div>

            {/* Jobs Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Job List */}
              <div className="lg:col-span-1 space-y-3 max-h-[700px] overflow-y-auto">
                {filteredJobs.length > 0 ? filteredJobs.map((job) => (
                  <Card
                    key={job.id}
                    className={`cursor-pointer transition-all ${
                      selectedJob?.id === job.id
                        ? 'bg-blue-900 border-blue-500 shadow-lg shadow-blue-500/20'
                        : 'bg-slate-800 border-slate-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10'
                    }`}
                    onClick={() => setSelectedJob(job)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white line-clamp-2">{job.title}</h3>
                          <p className="text-sm text-slate-300 mt-1">{job.company}</p>
                          <div className="flex gap-2 mt-2 flex-wrap">
                            <Badge className={getSectorColor(job.sector)}>
                              {job.sector}
                            </Badge>
                            <Badge className={getUrgencyColor(job.urgency)}>
                              {job.urgency}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )) : (
                  <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="p-6 text-center text-slate-400">
                      No jobs match your filters. Try adjusting your search criteria.
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Job Details */}
              <div className="lg:col-span-2">
                {selectedJob ? (
                  <Card className="bg-slate-800 border-slate-700 sticky top-24">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <Badge className={getSectorColor(selectedJob.sector)} className="mb-2">
                            {selectedJob.sector}
                          </Badge>
                          <CardTitle className="text-2xl text-white mt-2">{selectedJob.title}</CardTitle>
                          <CardDescription className="text-slate-300 mt-2">{selectedJob.company}</CardDescription>
                          <div className="flex gap-3 mt-4 flex-wrap">
                            <Badge variant="secondary" className="bg-slate-700">
                              <MapPin className="w-3 h-3 mr-1" />
                              {selectedJob.location}
                            </Badge>
                            <Badge variant="secondary" className="bg-slate-700">
                              <IndianRupee className="w-3 h-3 mr-1" />
                              {selectedJob.salary}
                            </Badge>
                            <Badge className={getUrgencyColor(selectedJob.urgency)}>
                              {selectedJob.urgency} Priority
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Job Info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-slate-400 uppercase">Experience</p>
                          <p className="text-white font-semibold">{selectedJob.experience}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase">Job Type</p>
                          <p className="text-white font-semibold">{selectedJob.type}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase">Ideal Background</p>
                          <p className="text-white font-semibold">{selectedJob.idealRole}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase">Status</p>
                          <p className="text-white font-semibold">{selectedJob.availability}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <h3 className="text-sm font-semibold text-white uppercase mb-2">Description</h3>
                        <p className="text-slate-300">{selectedJob.description}</p>
                      </div>

                      {/* Skills */}
                      <div>
                        <h3 className="text-sm font-semibold text-white uppercase mb-2">Required Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedJob.requiredSkills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="bg-blue-900/30 text-blue-200 border-blue-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Match Percentage */}
                      <div className="bg-slate-700 p-4 rounded-lg">
                        <p className="text-xs text-slate-400 uppercase">Your Match Score</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex-1 bg-slate-600 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${getMatchPercentage(selectedJob)}%` }}
                            />
                          </div>
                          <p className="text-white font-bold">{Math.round(getMatchPercentage(selectedJob))}%</p>
                        </div>
                      </div>

                      {/* Government Job Exam Info */}
                      {selectedJob.sector === 'Government' && (
                        <div className="bg-blue-900/30 border border-blue-700 p-4 rounded-lg space-y-3">
                          <h3 className="text-sm font-semibold text-blue-200 uppercase flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Exam Information
                          </h3>
                          <div className="space-y-2 text-sm">
                            <div>
                              <p className="text-blue-300 font-semibold">{selectedJob.exam}</p>
                              <p className="text-slate-300">Exam body for this position</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Exam Date:</p>
                              <p className="text-blue-200 font-semibold flex items-center gap-2">
                                <Calendar className="w-3 h-3" />
                                {selectedJob.examDate}
                              </p>
                            </div>
                            <div>
                              <p className="text-slate-400">Eligibility:</p>
                              <p className="text-blue-200 font-semibold">{selectedJob.eligibility}</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Application Deadline:</p>
                              <p className="text-red-300 font-semibold">{selectedJob.applicationDeadline}</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Exam Syllabus:</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {selectedJob.syllabus.map((topic, idx) => (
                                  <Badge key={idx} className="bg-blue-700 text-blue-100">{topic}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4 border-t border-slate-700">
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                          <Briefcase className="w-4 h-4 mr-2" />
                          Apply Now
                        </Button>
                        <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                          <Star className="w-4 h-4 mr-2" />
                          Save Job
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="p-12 text-center">
                      <p className="text-slate-400">Select a job to view details</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Government Sector Exams</CardTitle>
                <CardDescription className="text-slate-300">Written exams you need to clear for government jobs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      name: 'UPSC (Union Public Service Commission)',
                      exams: ['CDS', 'CAPF', 'NDA'],
                      syllabus: 'General Studies, Optional Subject, Interview',
                      difficulty: 'Very High',
                      frequency: 'Twice yearly'
                    },
                    {
                      name: 'SSC (Staff Selection Commission)',
                      exams: ['CGL', 'CHSL', 'CPO'],
                      syllabus: 'Quantitative Aptitude, English, Reasoning, General Knowledge',
                      difficulty: 'High',
                      frequency: 'Multiple times yearly'
                    },
                    {
                      name: 'RRB (Railway Recruitment Board)',
                      exams: ['RPF Constable', 'Railway Group D', 'NTPC'],
                      syllabus: 'General Knowledge, Arithmetic, Reasoning',
                      difficulty: 'Medium',
                      frequency: 'Multiple times yearly'
                    },
                    {
                      name: 'UPSC Intelligence Bureau (IB)',
                      exams: ['Grade-II Officer'],
                      syllabus: 'General Studies, Interview, Physical Test',
                      difficulty: 'Very High',
                      frequency: 'Annually'
                    },
                    {
                      name: 'DRDO Recruitment',
                      exams: ['Scientist Entry', 'Technical Officer'],
                      syllabus: 'Engineering Core, Technical Knowledge, General Awareness',
                      difficulty: 'High',
                      frequency: 'As per notifications'
                    },
                    {
                      name: 'BSF/CRPF/CISF Recruitment',
                      exams: ['Constable', 'Sub-Inspector'],
                      syllabus: 'General Knowledge, Arithmetic, Physical Test',
                      difficulty: 'Medium-High',
                      frequency: 'Multiple times yearly'
                    }
                  ].map((exam, idx) => (
                    <Card key={idx} className="bg-slate-700 border-slate-600">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-blue-300 mb-3">{exam.name}</h3>
                        <div className="space-y-2 text-sm">
                          <div>
                            <p className="text-slate-400">Associated Exams:</p>
                            <p className="text-white">{exam.exams.join(', ')}</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Syllabus:</p>
                            <p className="text-white">{exam.syllabus}</p>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-slate-600">
                            <div>
                              <p className="text-slate-400 text-xs">Difficulty</p>
                              <p className="text-red-300 font-semibold">{exam.difficulty}</p>
                            </div>
                            <div>
                              <p className="text-slate-400 text-xs">Frequency</p>
                              <p className="text-green-300 font-semibold">{exam.frequency}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Government Path Guide */}
          <TabsContent value="guide" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Your Path to Government Jobs</CardTitle>
                <CardDescription className="text-slate-300">Step-by-step guide for Agniveers to transition to government roles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    step: 1,
                    title: 'Understand Your Eligibility',
                    details: 'Check age limit, educational qualification, and service experience requirements for your target role',
                    advantages: 'Agniveers get age relaxation of 3-5 years in many exams'
                  },
                  {
                    step: 2,
                    title: 'Choose Your Exam',
                    details: 'Select UPSC CDS/CAPF/NDA, SSC-CGL, RRB, or specialized exams based on your background',
                    advantages: 'Multiple pathways available for different roles'
                  },
                  {
                    step: 3,
                    title: 'Prepare Systematically',
                    details: 'Study syllabus, take mock tests, join coaching if needed, prepare for 6-12 months',
                    advantages: 'Military training gives you advantage in discipline and problem-solving'
                  },
                  {
                    step: 4,
                    title: 'Apply & Appear for Exam',
                    details: 'Submit application before deadline, appear for written exam, physical test if applicable',
                    advantages: 'Your physical fitness from military service is an asset'
                  },
                  {
                    step: 5,
                    title: 'Interview & Selection',
                    details: 'Clear interview round, medical examination, final selection',
                    advantages: 'Your experience and leadership skills impress interviewers'
                  },
                  {
                    step: 6,
                    title: 'Join Government Role',
                    details: 'Start your new career with permanent status, pension, job security',
                    advantages: 'Higher job security and benefits than private sector'
                  }
                ].map((item) => (
                  <div key={item.step} className="border-l-4 border-blue-600 pl-4 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white">
                        {item.step}
                      </div>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    </div>
                    <p className="text-slate-300 mb-2">{item.details}</p>
                    <p className="text-green-300 text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      {item.advantages}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Benefits Comparison */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Government vs Private Sector</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-900/20 border border-blue-700 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-300 mb-3">Government Jobs</h3>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Permanent job security</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Comprehensive pension scheme</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Fixed working hours</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Leave benefits & allowances</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Competitive exams ensure merit</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-purple-900/20 border border-purple-700 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-300 mb-3">Private Sector Jobs</h3>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Higher salary potential</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Faster career growth</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Flexible work environment</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Diverse career opportunities</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Performance-based rewards</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
