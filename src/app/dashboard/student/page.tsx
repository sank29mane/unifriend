'use client';
import { useEffect, useState } from 'react';
import { 
  BookOpen, 
  Users, 
  MessageCircle, 
  Calendar,
  Edit3,
  Settings,
  LogOut,
  Linkedin,
  Github,
  Twitter,
  Globe,
  User
} from 'lucide-react';
import ProfileEditor from '../../components/ProfileEditor';

interface UserProfile {
  id: string;
  email: string;
  name?: string | null;
  role: 'STUDENT' | 'HELPER';
  profilePhoto?: string | null;
  bio?: string | null;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  createdAt?: string;
}

export default function StudentDashboard() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isProfileEditorOpen, setIsProfileEditorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        // Redirect to login if unauthorized
        window.location.href = '/auth/login';
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/auth/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleProfileSave = (updatedUser: UserProfile) => {
    setUser(updatedUser);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'github': return <Github className="w-5 h-5" />;
      case 'twitter': return <Twitter className="w-5 h-5" />;
      case 'website': return <Globe className="w-5 h-5" />;
      default: return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Unable to load profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsProfileEditorOpen(true)}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span className="hidden sm:block">Settings</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:text-red-800 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:block">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
                  {user.profilePhoto ? (
                    <img
                      src={user.profilePhoto}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
                      <User className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900">
                  {user.name || 'Anonymous Student'}
                </h2>
                <p className="text-gray-600">{user.email}</p>
                <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mt-2">
                  Student
                </span>

                {user.bio && (
                  <p className="text-gray-700 text-sm mt-4 text-left">{user.bio}</p>
                )}

                {/* Social Links */}
                {user.socialLinks && Object.keys(user.socialLinks).length > 0 && (
                  <div className="flex justify-center space-x-3 mt-4">
                    {Object.entries(user.socialLinks).map(([platform, url]) => {
                      if (!url) return null;
                      return (
                        <a
                          key={platform}
                          href={url as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          {getSocialIcon(platform)}
                        </a>
                      );
                    })}
                  </div>
                )}

                <button
                  onClick={() => setIsProfileEditorOpen(true)}
                  className="w-full mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center justify-center space-x-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Find a Helper</h4>
                    <p className="text-sm text-gray-600">Get help with your subjects</p>
                  </div>
                </button>
                
                <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
                  <MessageCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Study Groups</h4>
                    <p className="text-sm text-gray-600">Join or create study groups</p>
                  </div>
                </button>
                
                <button className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
                  <Calendar className="w-8 h-8 text-purple-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Schedule Session</h4>
                    <p className="text-sm text-gray-600">Book a tutoring session</p>
                  </div>
                </button>
                
                <button className="flex items-center space-x-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left">
                  <Users className="w-8 h-8 text-orange-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">My Sessions</h4>
                    <p className="text-sm text-gray-600">View upcoming sessions</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Welcome to UniFriend!</p>
                    <p className="text-xs text-gray-600">Complete your profile to get started</p>
                  </div>
                  <span className="text-xs text-gray-400">Just now</span>
                </div>
              </div>
            </div>

            {/* Study Progress */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Progress</h3>
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Start connecting with helpers to track your progress!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Editor Modal */}
      <ProfileEditor
        user={user}
        isOpen={isProfileEditorOpen}
        onClose={() => setIsProfileEditorOpen(false)}
        onSave={handleProfileSave}
      />
    </div>
  );
}
