import React, { useState } from 'react';
import { Download, ExternalLink, Loader2 } from 'lucide-react';
import { downloadImage, generateFilename } from '../utils/downloadUtils';

interface ImageCardProps {
  src: string;
  alt: string;
}

export function ImageCard({ src, alt }: ImageCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDownloading(true);
    try {
      await downloadImage(src, generateFilename(src));
    } catch (error) {
      console.error('Failed to download image:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="relative group">
      <img
        src={src}
        alt={alt}
        className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
          title="Download as JPG"
        >
          {isDownloading ? (
            <Loader2 className="w-4 h-4 text-gray-700 animate-spin" />
          ) : (
            <Download className="w-4 h-4 text-gray-700" />
          )}
        </button>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
          title="View original"
        >
          <ExternalLink className="w-4 h-4 text-gray-700" />
        </a>
      </div>
    </div>
  );
}