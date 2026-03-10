'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Download, LogOut, MapPin, Briefcase, FileText, CheckCircle } from 'lucide-react';
import jsPDF from 'jspdf';

const SKILL_TRANSLATIONS: Record<string, string[]> = {
  'Infantry': ['Project Management', 'Team Leadership', 'Risk Assessment', 'Security Management'],
  'Signals': ['Network Administration', 'Telecom Technician', 'IT Support', 'System Maintenance'],
  'Logistics': ['Supply Chain Management', 'Operations Manager', 'Warehouse Management', 'Inventory Control'],
  'Medical Support': ['Emergency Response', 'Healthcare Coordination', 'Crisis Management', 'Disaster Relief'],
  'Engineering Support': ['Project Engineering', 'Technical Management', 'Systems Design', 'Quality Assurance'],
  'Air Force': ['Aviation Safety', 'Technical Operations', 'Systems Maintenance', 'Team Coordination'],
  'Navy': ['Maritime Operations', 'Equipment Maintenance', 'Logistics Coordination', 'Safety Management']
};

const CAREER_RECOMMENDATIONS: Record<string, string[]> = {
  'Infantry': ['Police Officer', 'CAPF Officer', 'Security Manager', 'Disaster Management Officer', 'Private Security'],
  'Signals': ['Telecom Engineer', 'Network Technician', 'ISRO Support Staff', 'PSU Jobs', 'IT Service Provider'],
  'Logistics': ['Supply Chain Manager', 'Operations Manager', 'Transport Manager', 'Warehouse Manager', 'Procurement Officer'],
  'Medical Support': ['Healthcare Manager', 'Disaster Management Coordinator', 'NGO Health Officer', 'Red Cross Staff', 'Emergency Coordinator'],
  'Engineering Support': ['Project Manager', 'Technical Consultant', 'Infrastructure Officer', 'Maintenance Manager', 'PSU Engineer'],
  'Air Force': ['Aviation Safety Officer', 'Maintenance Manager', 'Technical Consultant', 'Operations Manager', 'PSU Technical Staff'],
  'Navy': ['Maritime Officer', 'Operations Manager', 'Equipment Manager', 'Safety Officer', 'Logistics Coordinator']
};

const EXAM_ELIGIBILITY: Record<string, any[]> = {
  'Infantry': [
    { exam: 'UPSC CAPF Exam', status: 'Eligible', details: 'Age, Education, Service requirements met' },
    { exam: 'State Police Exam', status: 'Eligible', details: 'Open for ex-servicemen' },
    { exam: 'NDRF Recruitment', status: 'Eligible', details: 'Disaster response background' },
    { exam: 'SSC GD Constable', status: 'Eligible', details: 'Physical standards equivalent' }
  ],
  'Signals': [
    { exam: 'PSU Telecom Jobs', status: 'Eligible', details: 'Technical background strong' },
    { exam: 'ISRO Technical Posts', status: 'Requires Certification', details: 'Consider networking certificate' },
    { exam: 'RRB NTPC', status: 'Eligible', details: 'General eligibility met' },
    { exam: 'Network Technician Certification', status: 'Recommended', details: 'Boost employability' }
  ],
  'Logistics': [
    { exam: 'APFC Officer Exam', status: 'Eligible', details: 'Management background strong' },
    { exam: 'PSU Supply Chain', status: 'Eligible', details: 'Direct match with experience' },
    { exam: 'State Government Jobs', status: 'Eligible', details: 'Operations management' },
    { exam: 'SCML Certification', status: 'Recommended', details: 'Industry recognized' }
  ]
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      router.push('/auth/login');
      return;
    }
    setUser(JSON.parse(currentUser));
  }, [router]);

  if (!user) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/');
  };

  const handleDownloadPortfolio = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPosition = 20;

    // Header
    doc.setFillColor(30, 41, 82);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('SKILLBRIDGE PORTFOLIO', 20, 25);

    // Reset colors
    doc.setTextColor(0, 0, 0);
    yPosition = 50;

    // Title
    doc.setFontSize(18);
    doc.setTextColor(30, 58, 138);
    doc.text(user.name, 20, yPosition);
    yPosition += 10;

    // Basic Info
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`Email: ${user.email}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Phone: ${user.phone}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Defence ID: ${user.defenceId}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Role: ${user.role} | Years of Service: ${user.yearsOfService}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Location: ${user.state} | Education: ${user.education}`, 20, yPosition);
    yPosition += 12;

    // Military Skills Section
    doc.setFontSize(14);
    doc.setTextColor(30, 58, 138);
    doc.text('Military Skills & Experience', 20, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const skillsArray = user.skills.split(',').map((s: string) => s.trim());
    skillsArray.forEach((skill: string) => {
      doc.text(`• ${skill}`, 25, yPosition);
      yPosition += 6;
    });
    yPosition += 6;

    // Translated Skills Section
    doc.setFontSize(14);
    doc.setTextColor(30, 58, 138);
    doc.text('Translated Civilian Skills', 20, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const translatedSkills = SKILL_TRANSLATIONS[user.role] || [];
    translatedSkills.forEach((skill: string) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(`• ${skill}`, 25, yPosition);
      yPosition += 6;
    });
    yPosition += 6;

    // Career Recommendations Section
    if (yPosition > pageHeight - 40) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(30, 58, 138);
    doc.text('Career Recommendations', 20, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const careerRecommendations = CAREER_RECOMMENDATIONS[user.role] || [];
    careerRecommendations.forEach((career: string) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(`• ${career}`, 25, yPosition);
      yPosition += 6;
    });
    yPosition += 6;

    // Document Verification Section
    if (yPosition > pageHeight - 40) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(30, 58, 138);
    doc.text('Verified Documents', 20, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const documents = [
      { name: 'Agniveer Service ID', status: 'Verified' },
      { name: 'Education Certificate', status: 'Verified' },
      { name: 'Training Certificate', status: 'Verified' },
      { name: 'Identity Proof', status: 'Verified' }
    ];
    documents.forEach((doc_item: any) => {
      doc.text(`• ${doc_item.name}: ${doc_item.status}`, 25, yPosition);
      yPosition += 6;
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Generated on ${new Date().toLocaleDateString()} | SkillBridge Platform`, 20, pageHeight - 10);

    // Save PDF
    doc.save(`${user.name}_Portfolio.pdf`);
  };

  const translatedSkills = SKILL_TRANSLATIONS[user.role] || [];
  const careerRecommendations = CAREER_RECOMMENDATIONS[user.role] || [];
  const examEligibility = EXAM_ELIGIBILITY[user.role] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <span className="text-2xl font-bold">SkillBridge Dashboard</span>
          <div className="flex gap-4">
            <Link href="/recruiter">
              <Button variant="ghost" className="text-white hover:bg-slate-700">
                Find Talent
              </Button>
            </Link>
            <Button variant="ghost" onClick={handleLogout} className="text-white hover:bg-slate-700">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0 mb-8 text-white">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
                <div className="flex gap-4 flex-wrap">
                  <Badge className="bg-blue-900 text-blue-100">{user.role}</Badge>
                  <Badge className="bg-blue-900 text-blue-100">{user.yearsOfService} Years Service</Badge>
                  <Badge className="bg-green-900 text-green-100">Profile Complete</Badge>
                </div>
              </div>
              <Button onClick={handleDownloadPortfolio} className="bg-white text-blue-600 hover:bg-slate-100">
                <Download className="w-4 h-4 mr-2" />
                Download Portfolio
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
            <TabsTrigger value="profile" className="text-white data-[state=active]:bg-blue-600">Profile</TabsTrigger>
            <TabsTrigger value="skills" className="text-white data-[state=active]:bg-blue-600">Skills</TabsTrigger>
            <TabsTrigger value="careers" className="text-white data-[state=active]:bg-blue-600">Careers</TabsTrigger>
            <TabsTrigger value="exams" className="text-white data-[state=active]:bg-blue-600">Exams</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-slate-400 text-sm">Email</p>
                    <p className="text-white font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Phone</p>
                    <p className="text-white font-medium">{user.phone}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Defence ID</p>
                    <p className="text-white font-medium">{user.defenceId}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">State</p>
                    <p className="text-white font-medium">{user.state}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Education</p>
                    <p className="text-white font-medium">{user.education}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Service Years</p>
                    <p className="text-white font-medium">{user.yearsOfService}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents Section */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Verification Documents
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Demo Mode: Sample documents used for prototype
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Agniveer Service ID', file: 'service_id.pdf' },
                    { name: 'Education Certificate', file: 'education_cert.pdf' },
                    { name: 'Training Certificate', file: 'training_cert.pdf' },
                    { name: 'Identity Proof', file: 'identity_proof.pdf' }
                  ].map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-white font-medium">{doc.name}</p>
                          <p className="text-slate-400 text-sm">{doc.file}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-900 text-green-100 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Your Military Skills</CardTitle>
                <CardDescription className="text-slate-400">
                  Original defence skills and training
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-8">
                  {user.skills.split(',').map((skill: string, idx: number) => (
                    <Badge key={idx} className="bg-blue-900 text-blue-100 px-4 py-2 text-sm">
                      {skill.trim()}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700 mt-6">
              <CardHeader>
                <CardTitle className="text-white">Translated Civilian Skills</CardTitle>
                <CardDescription className="text-slate-400">
                  AI-converted skills for civilian job market
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {translatedSkills.map((skill, idx) => (
                    <div key={idx} className="p-4 bg-slate-700 rounded-lg border border-slate-600">
                      <p className="text-white font-medium">{skill}</p>
                      <p className="text-slate-400 text-sm mt-1">Civilian equivalent skill</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Careers Tab */}
          <TabsContent value="careers">
            <div className="space-y-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Recommended Careers
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Perfect matches based on your role and skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {careerRecommendations.map((career, idx) => (
                      <div key={idx} className="p-4 bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-800 rounded-lg">
                        <h3 className="text-white font-medium text-lg">{career}</h3>
                        <p className="text-slate-400 text-sm mt-2">Strong match with your background</p>
                        <Button size="sm" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                          Learn More <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 text-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2">Build Your Career Roadmap</h3>
                  <p className="text-purple-100 mb-6">Get a personalized step-by-step preparation plan with timelines and resources</p>
                  <Button className="bg-white text-purple-600 hover:bg-slate-100">
                    Generate My Roadmap
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Government Exam Eligibility</CardTitle>
                <CardDescription className="text-slate-400">
                  Check which exams you're eligible for
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {examEligibility.map((exam, idx) => (
                    <div key={idx} className="p-4 bg-slate-700 border border-slate-600 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-medium text-lg">{exam.exam}</h4>
                        <Badge className={
                          exam.status === 'Eligible' ? 'bg-green-900 text-green-100' :
                          exam.status === 'Requires Certification' ? 'bg-yellow-900 text-yellow-100' :
                          'bg-blue-900 text-blue-100'
                        }>
                          {exam.status}
                        </Badge>
                      </div>
                      <p className="text-slate-400">{exam.details}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 mb-4">Ready to connect with employers?</p>
          <Link href="/recruiter">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Browse Job Opportunities <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
