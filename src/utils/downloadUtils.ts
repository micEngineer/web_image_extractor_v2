import { convertToJpg } from './imageUtils';

export async function downloadImage(imageUrl: string, filename: string) {
  try {
    const jpgBlob = await convertToJpg(imageUrl);
    const url = window.URL.createObjectURL(jpgBlob);
    const link = document.createElement('a');
    link.href = url;
    // Ensure filename ends with .jpg
    const jpgFilename = filename.replace(/\.[^/.]+$/, '') + '.jpg';
    link.download = jpgFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to download image:', error);
    throw new Error('Failed to download image');
  }
}

export function generateFilename(url: string): string {
  const parts = url.split('/');
  const lastPart = parts[parts.length - 1];
  // Remove any existing extension and query parameters
  const baseName = lastPart.split(/[?#]/)[0].replace(/\.[^/.]+$/, '');
  return `${baseName}.jpg`;
}

export async function downloadAllImages(images: string[]) {
  try {
    for (const [index, imageUrl] of images.entries()) {
      const filename = generateFilename(imageUrl);
      await downloadImage(imageUrl, `${index + 1}-${filename}`);
      // Small delay to prevent overwhelming the browser
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  } catch (error) {
    throw new Error('Failed to download all images');
  }
}