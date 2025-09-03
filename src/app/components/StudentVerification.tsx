'use client';
import { useState, useRef } from 'react';
import { Shield, Mail, Upload, Check, Clock, AlertTriangle, X } from 'lucide-react';

interface UserProfile {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  role: 'STUDENT' | 'HELPER';
  studentStatus?: string | null;
  verificationMethod?: string | null;
  universityEmail?: string | null;
  isUniversityEmailVerified?: boolean | null;
  university?: string | null;
}

interface StudentVerificationProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onVerificationUpdated: (updatedUser: UserProfile) => void;
}

export default function StudentVerification({
  user,
  isOpen,
  onClose,
  onVerificationUpdated
}: StudentVerificationProps) {
  const [selectedMethod, setSelectedMethod] = useState<'email' | 'document' | null>(null);
  const [universityEmail, setUniversityEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleEmailVerification = async () => {
    if (!universityEmail || !universityEmail.includes('.edu')) {
      alert('Please enter a valid university email address');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/verification/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ universityEmail }),
      });

      if (response.ok) {
        const { user: updatedUser } = await response.json();
        onVerificationUpdated(updatedUser);
        alert('Verification email sent! Please check your university email.');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to send verification email');
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
      alert('Failed to send verification email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDocumentUpload = async () => {
    if (!uploadedFile) {
      alert('Please select a file to upload');
      return;
    }

    setIsLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        
        const response = await fetch('/api/verification/document', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            document: base64,
            fileName: uploadedFile.name 
          }),
        });

        if (response.ok) {
          const { user: updatedUser } = await response.json();
          onVerificationUpdated(updatedUser);
          alert('Document uploaded successfully! We will review it within 24-48 hours.');
          onClose();
        } else {
          const errorData = await response.json();
          alert(errorData.error || 'Failed to upload document');
        }
        setIsLoading(false);
      };
      reader.readAsDataURL(uploadedFile);
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Failed to upload document');
      setIsLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF, image, or Word document');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploadedFile(file);
  };

  const getStatusIcon = () => {
    switch (user.studentStatus) {
      case 'VERIFIED':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'PENDING':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    switch (user.studentStatus) {
      case 'VERIFIED':
        return 'Verified Student';
      case 'PENDING':
        return 'Verification Pending';
      default:
        return 'Unverified';
    }
  };

  const getStatusColor = () => {
    switch (user.studentStatus) {
      case 'VERIFIED':
        return 'text-green-600 bg-green-50';
      case 'PENDING':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Student Verification</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Current Status */}
          <div className="mb-6 p-4 rounded-lg border">
            <div className="flex items-center space-x-3">
              {getStatusIcon()}
              <div>
                <h3 className="font-medium text-gray-900">Verification Status</h3>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor()}`}>
                  {getStatusText()}
                </span>
              </div>
            </div>
          </div>

          {user.studentStatus === 'VERIFIED' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">You're Verified!</h3>
              <p className="text-gray-600">Your student status has been confirmed.</p>
            </div>
          ) : user.studentStatus === 'PENDING' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Verification in Progress</h3>
              <p className="text-gray-600">We're reviewing your verification. This usually takes 24-48 hours.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Verify Your Student Status</h3>
                <p className="text-gray-600 text-sm">
                  Choose one of the methods below to verify that you're currently enrolled as a student.
                </p>
              </div>

              {/* Verification Methods */}
              <div className="space-y-4">
                {/* University Email Verification */}
                <div className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedMethod === 'email' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`} onClick={() => setSelectedMethod('email')}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedMethod === 'email' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Mail className={`w-5 h-5 ${selectedMethod === 'email' ? 'text-blue-600' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">University Email Verification</h4>
                      <p className="text-sm text-gray-600">Verify using your .edu email address</p>
                    </div>
                    <input
                      type="radio"
                      checked={selectedMethod === 'email'}
                      onChange={() => setSelectedMethod('email')}
                      className="text-blue-600"
                    />
                  </div>
                  
                  {selectedMethod === 'email' && (
                    <div className="mt-4 space-y-3">
                      <input
                        type="email"
                        placeholder="your.email@university.edu"
                        value={universityEmail}
                        onChange={(e) => setUniversityEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        disabled={isLoading}
                      />
                      <button
                        onClick={handleEmailVerification}
                        disabled={isLoading || !universityEmail}
                        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50"
                      >
                        {isLoading ? 'Sending...' : 'Send Verification Email'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Document Upload Verification */}
                <div className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedMethod === 'document' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`} onClick={() => setSelectedMethod('document')}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedMethod === 'document' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Upload className={`w-5 h-5 ${selectedMethod === 'document' ? 'text-blue-600' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">Document Upload</h4>
                      <p className="text-sm text-gray-600">Upload student ID, enrollment letter, or transcript</p>
                    </div>
                    <input
                      type="radio"
                      checked={selectedMethod === 'document'}
                      onChange={() => setSelectedMethod('document')}
                      className="text-blue-600"
                    />
                  </div>
                  
                  {selectedMethod === 'document' && (
                    <div className="mt-4 space-y-3">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          onChange={handleFileSelect}
                          className="hidden"
                          disabled={isLoading}
                        />
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          {uploadedFile ? uploadedFile.name : 'Choose a file to upload'}
                        </p>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isLoading}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors disabled:opacity-50"
                        >
                          Select File
                        </button>
                        <p className="text-xs text-gray-500 mt-2">
                          PDF, JPG, PNG, DOC, DOCX (max 10MB)
                        </p>
                      </div>
                      
                      {uploadedFile && (
                        <button
                          onClick={handleDocumentUpload}
                          disabled={isLoading}
                          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50"
                        >
                          {isLoading ? 'Uploading...' : 'Upload Document'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-xs text-gray-500 space-y-1">
                <p>• University email verification is instant but requires a .edu email</p>
                <p>• Document verification takes 24-48 hours but accepts various document types</p>
                <p>• Verification gives you access to student-only features and discounts</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
