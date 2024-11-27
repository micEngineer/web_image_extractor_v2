export async function convertToJpg(imageUrl: string): Promise<Blob> {
  // Create an in-memory canvas to convert the image
  const img = new Image();
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Load image and convert to JPG
  return new Promise((resolve, reject) => {
    img.crossOrigin = 'anonymous';  // Enable CORS
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert image to JPG'));
          }
        },
        'image/jpeg',
        0.9  // Quality setting (0.9 = 90% quality)
      );
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageUrl;
  });
}