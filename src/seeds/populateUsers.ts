import UserModel from '../models/user.model';
import InterestModel from '../models/interest.model';
import { hashPassword } from '../libs/bcrypt';
import { Gender } from '../enum/gender';

const imagePaths = [
  'C:\\Users\\Gabriel\\OneDrive\\Imagens\\Plano de Fundo\\25tvya5uy9751.png',
  'C:\\Users\\Gabriel\\OneDrive\\Imagens\\Plano de Fundo\\711417.jpg',
  'C:\\Users\\Gabriel\\OneDrive\\Imagens\\Plano de Fundo\\1123953.png',
  'C:\\Users\\Gabriel\\OneDrive\\Imagens\\Plano de Fundo\\1125423.jpg',
  'C:\\Users\\Gabriel\\OneDrive\\Imagens\\Plano de Fundo\\1189464.jpg',
  'C:\\Users\\Gabriel\\OneDrive\\Imagens\\Plano de Fundo\\1270090.jpg',
  'C:\\Users\\Gabriel\\OneDrive\\Imagens\\Plano de Fundo\\wallpapersden.com_torii-gate-paint-art_2732x2048.jpg',
];

export async function populateUsersIfEmpty() {
  const count = await UserModel.countDocuments();
  if (count === 0) {
    const photography = await InterestModel.findOne({ name: 'Photography' });
    const travelling = await InterestModel.findOne({ name: 'Travelling' });

    if (!photography || !travelling) {
      console.warn('[seed] Interesses "Photography" ou "Travelling" não encontrados. Rode populateInterestsIfEmpty() antes.');
      return;
    }

    const plainPassword = 'Password123!';
    const hashed = await hashPassword(plainPassword);

    const usersData = [
      // Grupo Photography
      {
        firstName: 'Lucas',
        lastName: 'Silva',
        email: 'lucas.photography@example.com',
        dob: new Date('2002-04-12'),
        password: hashed,
        gender: Gender.Male,
        preference: Gender.Female,
        profilePhotoUrl: imagePaths[0],
        galleryPhotoUrls: [imagePaths[1], imagePaths[2]],
        interests: [photography._id],
      },
      {
        firstName: 'Mariana',
        lastName: 'Costa',
        email: 'mariana.photography@example.com',
        dob: new Date('2003-07-08'),
        password: hashed,
        gender: Gender.Female,
        preference: Gender.Male,
        profilePhotoUrl: imagePaths[1],
        galleryPhotoUrls: [imagePaths[0], imagePaths[2]],
        interests: [photography._id],
      },
      {
        firstName: 'Rafael',
        lastName: 'Pereira',
        email: 'rafael.samephoto@example.com',
        dob: new Date('2004-11-20'),
        password: hashed,
        gender: Gender.Male,
        preference: Gender.Male,
        profilePhotoUrl: imagePaths[2],
        galleryPhotoUrls: [imagePaths[0], imagePaths[1]],
        interests: [photography._id],
      },
      {
        firstName: 'Camila',
        lastName: 'Almeida',
        email: 'camila.samephoto@example.com',
        dob: new Date('2002-02-02'),
        password: hashed,
        gender: Gender.Female,
        preference: Gender.Female,
        profilePhotoUrl: imagePaths[3],
        galleryPhotoUrls: [imagePaths[4], imagePaths[5]],
        interests: [photography._id],
      },

      // Grupo Travelling
      {
        firstName: 'Thiago',
        lastName: 'Gomes',
        email: 'thiago.travelling@example.com',
        dob: new Date('2003-06-15'),
        password: hashed,
        gender: Gender.Male,
        preference: Gender.Female,
        profilePhotoUrl: imagePaths[4],
        galleryPhotoUrls: [imagePaths[5], imagePaths[6]],
        interests: [travelling._id],
      },
      {
        firstName: 'Larissa',
        lastName: 'Fernandes',
        email: 'larissa.travelling@example.com',
        dob: new Date('2004-09-09'),
        password: hashed,
        gender: Gender.Female,
        preference: Gender.Male,
        profilePhotoUrl: imagePaths[5],
        galleryPhotoUrls: [imagePaths[4], imagePaths[6]],
        interests: [travelling._id],
      },
      {
        firstName: 'Bruno',
        lastName: 'Santos',
        email: 'bruno.travelling.same@example.com',
        dob: new Date('2005-01-30'),
        password: hashed,
        gender: Gender.Male,
        preference: Gender.Male,
        profilePhotoUrl: imagePaths[6],
        galleryPhotoUrls: [imagePaths[3], imagePaths[4]],
        interests: [travelling._id],
      },
    ];

    await UserModel.insertMany(usersData);
    console.log('[seed] Usuários mockados populados');
  }
}

