'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Briefcase, Users, Shield, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-white">SkillBridge</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-white hover:bg-slate-700">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8 mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Transform Your Defence Career Into{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Civilian Success
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            SkillBridge connects Agniveers with employers by translating military expertise into civilian job opportunities
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/recruiter">
              <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                I'm Recruiting
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <Zap className="w-8 h-8 text-yellow-500 mb-2" />
              <CardTitle className="text-white">Smart Skill Translation</CardTitle>
            </CardHeader>
            <CardDescription className="text-slate-300">
              Military skills converted to civilian opportunities
            </CardDescription>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <Briefcase className="w-8 h-8 text-green-500 mb-2" />
              <CardTitle className="text-white">Career Roadmap</CardTitle>
            </CardHeader>
            <CardDescription className="text-slate-300">
              Personalized preparation plans and exam guidance
            </CardDescription>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <Shield className="w-8 h-8 text-blue-500 mb-2" />
              <CardTitle className="text-white">Digital Portfolio</CardTitle>
            </CardHeader>
            <CardDescription className="text-slate-300">
              Verified defence profile showcasing your expertise
            </CardDescription>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <Users className="w-8 h-8 text-purple-500 mb-2" />
              <CardTitle className="text-white">Employer Network</CardTitle>
            </CardHeader>
            <CardDescription className="text-slate-300">
              Connect with government and private recruiters
            </CardDescription>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Civilian Career?</h2>
            <p className="text-blue-100 mb-6">Join thousands of Agniveers finding their perfect career match</p>
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                Create Your Profile Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
