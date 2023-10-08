import { statSync } from 'fs';
import { FileWithSize } from '../global/interfaces';

const MEGABYTES = 1024 * 1024;

export function fileAndSize(filePath: string, fileName: string): FileWithSize {
  const fileStats = statSync(filePath);
  const fileInBytes = fileStats.size;
  return {
    file: fileName,
    size: fileInBytes / MEGABYTES,
    createdAt: fileStats.birthtime,
  };
}
