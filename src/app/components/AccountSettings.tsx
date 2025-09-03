'use client';
import { useState } from 'react';
import { Trash2, RefreshCw, AlertTriangle, X } from 'lucide-react';

interface UserProfile {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  role: 'STUDENT' | 'HELPER';
}

interface AccountSettingsProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onAccountDeleted: () => void;
  onAccountTypeChanged: (newUser: UserProfile) => void;
}

export default function AccountSettings({
  user,
  isOpen,
  onClose,
  onAccountDeleted,
  onAccountTypeChanged
}: AccountSettingsProps) {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isTypeChangeConfirmOpen, setIsTypeChangeConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChangingType, setIsChangingType] = useState(false);

  if (!isOpen) return null;

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch('/api/account/delete', {
        method: 'DELETE',
      });

      if (response.ok) {
        onAccountDeleted();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account');
    } finally {
      setIsDeleting(false);
      setIsDeleteConfirmOpen(false);
    }
  };

  const handleChangeAccountType = async () => {
    setIsChangingType(true);
    try {
      const newRole = user.role === 'STUDENT' ? 'HELPER' : 'STUDENT';
      const response = await fetch('/api/account/change-type', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        const { user: updatedUser } = await response.json();
        onAccountTypeChanged(updatedUser);
        onClose();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to change account type');
      }
    } catch (error) {
      console.error('Error changing account type:', error);
      alert('Failed to change account type');
    } finally {
      setIsChangingType(false);
      setIsTypeChangeConfirmOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Account Type Change - Only for Students */}
          {user.role === 'STUDENT' && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900">Account Type</h3>
              <p className="text-sm text-gray-600">
                Want to help other students? Switch to a Helper account.
              </p>
              <button
                onClick={() => setIsTypeChangeConfirmOpen(true)}
                disabled={isChangingType}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Switch to Helper Account</span>
              </button>
            </div>
          )}

          {/* Danger Zone */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-red-900 mb-3">Danger Zone</h3>
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-red-900">Delete Account</h4>
                  <p className="text-sm text-red-700 mt-1">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <button
                    onClick={() => setIsDeleteConfirmOpen(true)}
                    disabled={isDeleting}
                    className="mt-3 flex items-center space-x-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Account</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-60">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Account</h3>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Are you absolutely sure? This will permanently delete your account and all data. This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Account Type Change Confirmation Modal */}
      {isTypeChangeConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-60">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Switch Account Type</h3>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                You're about to switch from a Student to a Helper account. You'll gain access to helper tools and be able to assist other students.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsTypeChangeConfirmOpen(false)}
                  disabled={isChangingType}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleChangeAccountType}
                  disabled={isChangingType}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50"
                >
                  {isChangingType ? 'Switching...' : 'Switch'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
