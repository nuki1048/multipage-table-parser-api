export type Callback = (error: Error | null, destination: string) => void;

export interface FileWithSize {
  file: string;
  size: number;
  createdAt: Date;
}
export interface ApiError {
  message: string;
}
