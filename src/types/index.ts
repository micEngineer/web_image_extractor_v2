export interface ImageData {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ExtractorState {
  images: ImageData[];
  isLoading: boolean;
  error: string | null;
}