import { Request, Response, Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const directoryPath = path.join(path.join(process.cwd(), 'public', 'data'));
  try {
    const filesnamesArray = fs.readdirSync(directoryPath);
    return res.status(200).json({ data: filesnamesArray });
  } catch (error) {
    res.status(200).json({ message: 'Something went wrong,try again.' });
  }
});

export default router;
