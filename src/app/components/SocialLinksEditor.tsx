'use client';
import { useState } from 'react';
import { Linkedin, Github, Twitter, Globe, ExternalLink } from 'lucide-react';

interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

interface SocialLinksEditorProps {
  socialLinks: SocialLinks;
  onLinksChange: (links: SocialLinks) => void;
  disabled?: boolean;
}

export default function SocialLinksEditor({
  socialLinks,
  onLinksChange,
  disabled = false
}: SocialLinksEditorProps) {
  const [links, setLinks] = useState<SocialLinks>(socialLinks || {});

  const handleLinkChange = (platform: keyof SocialLinks, value: string) => {
    const updatedLinks = { ...links, [platform]: value };
    setLinks(updatedLinks);
    onLinksChange(updatedLinks);
  };

  const socialPlatforms = [
    {
      key: 'linkedin' as const,
      label: 'LinkedIn',
      icon: Linkedin,
      placeholder: 'https://linkedin.com/in/yourprofile',
      color: 'text-blue-600'
    },
    {
      key: 'github' as const,
      label: 'GitHub',
      icon: Github,
      placeholder: 'https://github.com/yourusername',
      color: 'text-gray-800'
    },
    {
      key: 'twitter' as const,
      label: 'Twitter/X',
      icon: Twitter,
      placeholder: 'https://twitter.com/yourusername',
      color: 'text-blue-400'
    },
    {
      key: 'website' as const,
      label: 'Personal Website',
      icon: Globe,
      placeholder: 'https://yourwebsite.com',
      color: 'text-green-600'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Social Links</h3>
      <div className="space-y-3">
        {socialPlatforms.map(({ key, label, icon: Icon, placeholder, color }) => (
          <div key={key} className="space-y-1">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Icon className={`w-4 h-4 ${color}`} />
              <span>{label}</span>
            </label>
            <div className="relative">
              <input
                type="url"
                value={links[key] || ''}
                onChange={(e) => handleLinkChange(key, e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
              {links[key] && (
                <a
                  href={links[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
