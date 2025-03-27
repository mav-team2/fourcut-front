// filepath: /fourcut-front/fourcut-front/src/types/index.ts

export interface PageProps {
  onNext: () => void;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Photo {
  id: number;
  url: string;
  description?: string;
}

export interface Background {
  id: number;
  name: string;
  imageUrl: string;
}
