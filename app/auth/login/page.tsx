'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        router.push('/dashboard');
      } else {
        setError('Invalid email or password');
      }
      setIsLoading(false);
    }, 500);
  };

  const handleDemoLogin = () => {
    // Create demo user for testing
    const demoUser = {
      id: 1,
      name: 'Arjun Singh',
      email: 'arjun.singh@example.com',
      phone: '+91 98765 43210',
      defenceId: 'DEF123456',
      education: "Bachelor's in Electronics",
      state: 'Delhi',
      role: 'Infantry',
      yearsOfService: '4',
      skills: 'Leadership, Tactical Planning, Emergency Response',
      documents: [
        { name: 'Agniveer Service ID', status: 'Verified', type: 'PDF' },
        { name: 'Education Certificate', status: 'Verified', type: 'PDF' },
        { name: 'Training Certificate', status: 'Verified', type: 'PDF' }
      ]
    };
    localStorage.setItem('currentUser', JSON.stringify(demoUser));
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-bold text-white">SkillBridge</span>
          </div>
          <CardTitle className="text-white">Welcome Back</CardTitle>
          <CardDescription className="text-slate-400">Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded">
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full border-slate-600 text-white hover:bg-slate-700"
              onClick={handleDemoLogin}
            >
              Try Demo Account
            </Button>

            <p className="text-center text-slate-400">
              Don't have an account?{' '}
              <Link href="/auth/register" className="text-blue-400 hover:text-blue-300">
                Sign Up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
