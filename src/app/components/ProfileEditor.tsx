'use client';
import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import ProfilePhotoUpload from './ProfilePhotoUpload';
import SocialLinksEditor from './SocialLinksEditor';

interface UserProfile {
  id: string;
  email: string;
  name?: string | null;
  role: 'STUDENT' | 'HELPER';
  profilePhoto?: string | null;
  bio?: string | null;
  socialLinks?: any;
  createdAt?: string;
}

interface ProfileEditorProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: UserProfile) => void;
}

export default function ProfileEditor({ user, isOpen, onClose, onSave }: ProfileEditorProps) {
  const [formData, setFormData] = useState({
    name: user.name || '',
    bio: user.bio || '',
    profilePhoto: user.profilePhoto || '',
    socialLinks: user.socialLinks || {}
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        profilePhoto: user.profilePhoto || '',
        socialLinks: user.socialLinks || {}
      });
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }

      const { user: updatedUser } = await response.json();
      onSave(updatedUser);
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={isLoading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Profile Photo */}
          <div className="flex justify-center">
            <ProfilePhotoUpload
              currentPhoto={formData.profilePhoto}
              onPhotoChange={(photo) => setFormData(prev => ({ ...prev, profilePhoto: photo }))}
              disabled={isLoading}
            />
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                id="bio"
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder={user.role === 'HELPER' 
                  ? "Tell students about your expertise, subjects you can help with, and your teaching style..."
                  : "Share a bit about yourself, your interests, subjects you're studying, or what you're looking to learn..."
                }
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Social Links */}
          <SocialLinksEditor
            socialLinks={formData.socialLinks}
            onLinksChange={(links) => setFormData(prev => ({ ...prev, socialLinks: links }))}
            disabled={isLoading}
          />

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
