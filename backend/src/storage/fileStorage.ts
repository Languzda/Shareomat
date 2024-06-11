import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';

export const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'data/images');
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4());
  },
});

export const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};