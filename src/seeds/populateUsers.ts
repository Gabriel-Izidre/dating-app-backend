import { Gender } from '../enum/gender';
import { hashPassword } from '../libs/bcrypt';
import { saveMockUserPhotos } from '../libs/multer';
import InterestModel from '../models/interest.model';
import UserModel from '../models/user.model';

const userPhotoMocks = [
  {
    userId: '',
    profilePhoto: 'profilePhoto.png',
    galleryPhotos: ['img 1.jpg', 'Img 2.jpg']
  },
  {
    userId: '',
    profilePhoto: 'Img 2.jpg',
    galleryPhotos: ['profilePhoto.png', 'Img 3.jpg']
  },
  {
    userId: '',
    profilePhoto: 'Img 3.jpg',
    galleryPhotos: ['img 1.jpg', 'profilePhoto.png']
  },
  {
    userId: '',
    profilePhoto: 'img 1.jpg',
    galleryPhotos: ['Img 2.jpg', 'Img 3.jpg']
  },
  {
    userId: '',
    profilePhoto: 'profilePhoto.png',
    galleryPhotos: ['img 1.jpg', 'Img 3.jpg']
  },
  {
    userId: '',
    profilePhoto: 'Img 2.jpg',
    galleryPhotos: ['profilePhoto.png', 'img 1.jpg']
  },
  {
    userId: '',
    profilePhoto: 'Img 3.jpg',
    galleryPhotos: ['Img 2.jpg', 'profilePhoto.png']
  },
  {
    userId: '',
    profilePhoto: 'profilePhoto.png',
    galleryPhotos: ['Img 3.jpg', 'img 1.jpg']
  },
  {
    userId: '',
    profilePhoto: 'img 1.jpg',
    galleryPhotos: ['Img 2.jpg', 'profilePhoto.png']
  },
  {
    userId: '',
    profilePhoto: 'Img 2.jpg',
    galleryPhotos: ['Img 3.jpg', 'img 1.jpg']
  },
  {
    userId: '',
    profilePhoto: 'Img 3.jpg',
    galleryPhotos: ['profilePhoto.png', 'Img 2.jpg']
  },
  {
    userId: '',
    profilePhoto: 'profilePhoto.png',
    galleryPhotos: ['img 1.jpg', 'Img 2.jpg']
  },
  {
    userId: '',
    profilePhoto: 'img 1.jpg',
    galleryPhotos: ['Img 3.jpg', 'profilePhoto.png']
  },
  {
    userId: '',
    profilePhoto: 'Img 2.jpg',
    galleryPhotos: ['img 1.jpg', 'Img 3.jpg']
  },
  {
    userId: '',
    profilePhoto: 'Img 3.jpg',
    galleryPhotos: ['profilePhoto.png', 'img 1.jpg']
  }
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
        profilePhotoUrl: '',
        galleryPhotoUrls: [],
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
        profilePhotoUrl: '',
        galleryPhotoUrls: [],
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
        profilePhotoUrl: '',
        galleryPhotoUrls: [],
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
        profilePhotoUrl: '',
        galleryPhotoUrls: [],
        interests: [photography._id],
      },
      {
        firstName: 'Ana',
        lastName: 'Rodrigues',
        email: 'ana.photography@example.com',
        dob: new Date('2001-12-15'),
        password: hashed,
        gender: Gender.Female,
        preference: Gender.Male,
        profilePhotoUrl: '',
        galleryPhotoUrls: [],
        interests: [photography._id],
      },
      {
        firstName: 'João',
        lastName: 'Oliveira',
        email: 'joao.photography@example.com',
        dob: new Date('2003-03-22'),
        password: hashed,
        gender: Gender.Male,
        preference: Gender.Female,
        profilePhotoUrl: '',
        galleryPhotoUrls: [],
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
        profilePhotoUrl: '',
        galleryPhotoUrls: [],
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
        profilePhotoUrl: '',
        galleryPhotoUrls: [],
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
        profilePhotoUrl: '',
        galleryPhotoUrls: [],
        interests: [travelling._id],
      },
      {
        firstName: 'Isabella',
        lastName: 'Martins',
        email: 'isabella.travelling@example.com',
        dob: new Date('2002-08-18'),
        password: hashed,
        gender: Gender.Female,
        preference: Gender.Female,
        profilePhotoUrl: '',
        galleryPhotoUrls: [],
        interests: [travelling._id],
      },
      {
        firstName: 'Diego',
        lastName: 'Carvalho',
        email: 'diego.travelling@example.com',
        dob: new Date('2001-11-05'),
        password: hashed,
        gender: Gender.Male,
        preference: Gender.Female,
        profilePhotoUrl: '',
        galleryPhotoUrls: [],
        interests: [travelling._id],
      },
      {
        firstName: 'Sophia',
        lastName: 'Lima',
        email: 'sophia.travelling@example.com',
        dob: new Date('2004-01-27'),
        password: hashed,
        gender: Gender.Female,
        preference: Gender.Male,
        profilePhotoUrl: '',
        galleryPhotoUrls: [],
        interests: [travelling._id],
      },

      // Usuários com ambos os interesses
      {
        firstName: 'Gabriel',
        lastName: 'Mendes',
        email: 'gabriel.both@example.com',
        dob: new Date('2002-05-13'),
        password: hashed,
        gender: Gender.Male,
        preference: Gender.Female,
        profilePhotoUrl: '',
        galleryPhotoUrls: [],
        interests: [photography._id, travelling._id],
      },
      {
        firstName: 'Valentina',
        lastName: 'Barbosa',
        email: 'valentina.both@example.com',
        dob: new Date('2003-10-08'),
        password: hashed,
        gender: Gender.Female,
        preference: Gender.Male,
        profilePhotoUrl: '',
        galleryPhotoUrls: [],
        interests: [photography._id, travelling._id],
      },
      {
        firstName: 'Pedro',
        lastName: 'Araújo',
        email: 'pedro.both@example.com',
        dob: new Date('2001-07-19'),
        password: hashed,
        gender: Gender.Male,
        preference: Gender.Male,
        profilePhotoUrl: '',
        galleryPhotoUrls: [],
        interests: [photography._id, travelling._id],
      },
    ];

    const savedUsers = await UserModel.insertMany(usersData);

    savedUsers.forEach((user, index) => {
      if (index < userPhotoMocks.length) {
        const photoMock = { ...userPhotoMocks[index], userId: user._id.toString() };
        const { profilePhotoUrl, galleryPhotoUrls } = saveMockUserPhotos(photoMock);

        UserModel.updateOne(
          { _id: user._id },
          {
            profilePhotoUrl: profilePhotoUrl,
            galleryPhotoUrls: galleryPhotoUrls
          }
        ).exec();
      }
    });

    console.log('[seed] Usuários mockados populados com fotos');
  }
}

