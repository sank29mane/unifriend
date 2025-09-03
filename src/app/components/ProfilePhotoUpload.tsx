'use client';
import { useState, useRef } from 'react';
import { Camera, User } from 'lucide-react';

interface ProfilePhotoUploadProps {
  currentPhoto?: string | null;
  onPhotoChange: (photo: string) => void;
  disabled?: boolean;
}

export default function ProfilePhotoUpload({
  currentPhoto,
  onPhotoChange,
  disabled = false
}: ProfilePhotoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      // Convert to base64 for simple storage (in a real app, you'd upload to a service like S3)
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        onPhotoChange(base64);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Error uploading photo');
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="relative">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
          {currentPhoto ? (
            <img
              src={currentPhoto}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
              <User className="w-16 h-16 text-white" />
            </div>
          )}
        </div>
        
        {!disabled && (
          <button
            type="button"
            onClick={triggerFileInput}
            disabled={isUploading}
            className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg transition-colors disabled:opacity-50"
          >
            <Camera className="w-5 h-5 text-white" />
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
        disabled={disabled || isUploading}
      />

      {isUploading && (
        <p className="text-sm text-gray-500">Uploading...</p>
      )}
      
      {!disabled && (
        <p className="text-xs text-gray-400 text-center">
          Click the camera icon to upload a new photo
          <br />
          (Max 5MB, JPG/PNG)
        </p>
      )}
    </div>
  );
}
