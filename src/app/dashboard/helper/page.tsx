'use client';
import { useEffect, useState } from 'react';
import { 
  GraduationCap, 
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
  User,
  Star,
  Clock,
  DollarSign
} from 'lucide-react';
import ProfileEditor from '../../components/ProfileEditor';
import AccountSettings from '../../components/AccountSettings';

interface UserProfile {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
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
  university?: string | null;
  country?: string | null;
  createdAt?: string;
}

export default function HelperDashboard() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isProfileEditorOpen, setIsProfileEditorOpen] = useState(false);
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);
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

  const handleAccountDeleted = () => {
    window.location.href = '/auth/login';
  };

  const handleAccountTypeChanged = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    // Redirect to student dashboard if changed to student
    if (updatedUser.role === 'STUDENT') {
      window.location.href = '/dashboard/student';
    }
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
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
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
            <h1 className="text-2xl font-bold text-gray-900">Helper Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsAccountSettingsOpen(true)}
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
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
                      <User className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900">
                  {user.firstName && user.lastName 
                    ? `${user.firstName} ${user.lastName}` 
                    : user.name || 'Anonymous Helper'
                  }
                </h2>
                <p className="text-gray-600">{user.email}</p>
                <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full mt-2">
                  Helper
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
                          className="text-gray-600 hover:text-green-600 transition-colors"
                        >
                          {getSocialIcon(platform)}
                        </a>
                      );
                    })}
                  </div>
                )}

                <button
                  onClick={() => setIsProfileEditorOpen(true)}
                  className="w-full mt-6 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors flex items-center justify-center space-x-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm text-gray-600">Rating</span>
                  </div>
                  <span className="font-semibold text-gray-900">5.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-600">Students Helped</span>
                  </div>
                  <span className="font-semibold text-gray-900">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-purple-500" />
                    <span className="text-sm text-gray-600">Total Hours</span>
                  </div>
                  <span className="font-semibold text-gray-900">0h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Helper Tools</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
                  <GraduationCap className="w-8 h-8 text-green-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">My Subjects</h4>
                    <p className="text-sm text-gray-600">Manage subjects you can help with</p>
                  </div>
                </button>
                
                <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
                  <Calendar className="w-8 h-8 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Availability</h4>
                    <p className="text-sm text-gray-600">Set your available hours</p>
                  </div>
                </button>
                
                <button className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
                  <MessageCircle className="w-8 h-8 text-purple-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Messages</h4>
                    <p className="text-sm text-gray-600">Chat with students</p>
                  </div>
                </button>
                
                <button className="flex items-center space-x-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left">
                  <DollarSign className="w-8 h-8 text-orange-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Earnings</h4>
                    <p className="text-sm text-gray-600">Track your earnings</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h3>
              <div className="space-y-4">
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No sessions yet. Set up your profile and subjects to start helping students!</p>
                </div>
              </div>
            </div>

            {/* Helper Tips */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Getting Started as a Helper</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start space-x-2">
                  <span className="text-green-600 font-semibold">1.</span>
                  <span>Complete your profile with a photo, bio, and subjects you can help with</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-600 font-semibold">2.</span>
                  <span>Set your availability hours so students know when to reach you</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-600 font-semibold">3.</span>
                  <span>Start connecting with students and building your reputation</span>
                </div>
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

      {/* Account Settings Modal */}
      <AccountSettings
        user={user}
        isOpen={isAccountSettingsOpen}
        onClose={() => setIsAccountSettingsOpen(false)}
        onAccountDeleted={handleAccountDeleted}
        onAccountTypeChanged={handleAccountTypeChanged}
      />
    </div>
  );
}
