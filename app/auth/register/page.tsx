'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield } from 'lucide-react';

const DEFENCE_ROLES = [
  'Infantry',
  'Signals',
  'Logistics',
  'Medical Support',
  'Engineering Support',
  'Air Force',
  'Navy',
  'Other'
];

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    defenceId: '',
    education: '',
    state: '',
    role: '',
    yearsOfService: '',
    skills: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Mock registration - store in localStorage for demo
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u: any) => u.email === formData.email)) {
      setError('Email already registered');
      return;
    }

    users.push({
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    });

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify({ id: Date.now(), ...formData }));

    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-slate-800 border-slate-700">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-bold text-white">SkillBridge</span>
          </div>
          <CardTitle className="text-white">Create Your Agniveer Account</CardTitle>
          <CardDescription className="text-slate-400">Register to access career opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-white">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-white">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="text-white">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
              <div>
                <Label htmlFor="defenceId" className="text-white">Defence ID / Service ID</Label>
                <Input
                  id="defenceId"
                  name="defenceId"
                  value={formData.defenceId}
                  onChange={handleChange}
                  placeholder="DEF123456"
                  className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="education" className="text-white">Education</Label>
                <Input
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="Bachelor's Degree"
                  className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
              <div>
                <Label htmlFor="state" className="text-white">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Delhi"
                  className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="role" className="text-white">Defence Role *</Label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select role</option>
                  {DEFENCE_ROLES.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="yearsOfService" className="text-white">Years of Service</Label>
                <Input
                  id="yearsOfService"
                  name="yearsOfService"
                  type="number"
                  value={formData.yearsOfService}
                  onChange={handleChange}
                  placeholder="4"
                  className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="skills" className="text-white">Key Skills (comma separated)</Label>
              <Input
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Leadership, Tactical Planning"
                className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password" className="text-white">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="text-white">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Create Account
            </Button>

            <p className="text-center text-slate-400">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-blue-400 hover:text-blue-300">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
