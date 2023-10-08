export type Callback = (error: Error | null, destination: string) => void;

export interface FileWithSize {
  file: string;
  size: number;
}
export interface ApiError {
  message: string;
}
