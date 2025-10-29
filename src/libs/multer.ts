import fs from 'fs';
import multer from 'multer';
import path from 'path';

//ver depois se vai ser necessário
const tmpDir = path.join(__dirname, '../../uploads/tmp');
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tmpDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

export function saveUserProfilePhoto(userId: string, filePath: string): string {
  const userDir = path.join(__dirname, '../../uploads', userId);
  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir, { recursive: true });
  }
  const destPath = path.join(userDir, 'profile.jpg');
  fs.renameSync(filePath, destPath);
  return `/uploads/${userId}/profile.jpg`;
}

const upload = multer({ storage });

export default upload;
