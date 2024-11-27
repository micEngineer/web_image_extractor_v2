import React from 'react';
import { ImageCard } from './ImageCard';
import { ImageData } from '../types';

interface ImageGridProps {
  images: ImageData[];
}

export function ImageGrid({ images }: ImageGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {images.map((image, index) => (
        <ImageCard
          key={index}
          src={image.src}
          alt={image.alt}
        />
      ))}
    </div>
  );
}