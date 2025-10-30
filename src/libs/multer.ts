import fs from 'fs';
import multer from 'multer';
import path from 'path';

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

export function saveUserPhotos(userId: string, filePaths: string[]): string[] {
  const userDir = path.join(__dirname, '../../uploads', userId);
  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir, { recursive: true });
  }

  const movedPaths: string[] = [];
  for (const filePath of filePaths) {
    const fileName = path.basename(filePath);
    const destPath = path.join(userDir, fileName);
    fs.renameSync(filePath, destPath);
    movedPaths.push(`/uploads/${userId}/${fileName}`);
  }
  return movedPaths;
}

const upload = multer({ storage });

export default upload;
