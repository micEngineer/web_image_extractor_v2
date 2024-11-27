import React, { useState } from 'react';
import { ImageData } from './types';
import { extractImages } from './utils/imageExtractor';
import { downloadAllImages } from './utils/downloadUtils';
import { UrlInput } from './components/UrlInput';
import { ImageGrid } from './components/ImageGrid';
import { DownloadButton } from './components/DownloadButton';
import { Loader2 } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [images, setImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExtract = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const extractedImages = await extractImages(url);
      setImages(
        extractedImages.map((src) => ({
          src,
          alt: 'Extracted image',
        }))
      );
    } catch (err) {
      setError('Failed to extract images. Please check the URL and try again.');
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadAll = async () => {
    setIsDownloading(true);
    try {
      await downloadAllImages(images.map(img => img.src));
    } catch (err) {
      setError('Failed to download images. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Web Image Extractor
          </h1>
          <p className="text-gray-600 mb-6">
            Enter a website URL to extract up to 100 images
          </p>
          <UrlInput
            url={url}
            onUrlChange={setUrl}
            onSubmit={handleExtract}
            isLoading={isLoading}
          />
        </div>

        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        )}

        {!isLoading && images.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-4 px-4">
              <div className="text-gray-600">
                Found {images.length} images
              </div>
              <DownloadButton
                onClick={handleDownloadAll}
                isDownloading={isDownloading}
              />
            </div>
            <ImageGrid images={images} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;