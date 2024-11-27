export async function extractImages(url: string): Promise<string[]> {
  try {
    const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
    if (!response.ok) throw new Error('Failed to fetch webpage');
    
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const images = Array.from(doc.getElementsByTagName('img'))
      .map(img => img.src)
      .filter(src => src && src.startsWith('http'))
      .slice(0, 100);
    
    return images;
  } catch (error) {
    throw new Error('Failed to extract images');
  }
}