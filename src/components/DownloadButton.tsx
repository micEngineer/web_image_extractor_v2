import React from 'react';
import { Download, Loader2 } from 'lucide-react';

interface DownloadButtonProps {
  onClick: () => void;
  isDownloading: boolean;
}

export function DownloadButton({ onClick, isDownloading }: DownloadButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDownloading}
      className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isDownloading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Download className="w-4 h-4 mr-2" />
      )}
      {isDownloading ? 'Converting & Downloading...' : 'Download All as JPG'}
    </button>
  );
}