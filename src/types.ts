export interface Image{
  id: string;
  urls: { regular: string;  small: string; full: string; };
  alt_description: string;
  user: { name: string };
  likes: number;
  description?: string;
}

export interface FetchImagesResponse {
  results: Image[];
  total_pages: number;
 }