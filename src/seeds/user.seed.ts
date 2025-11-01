import { connect, disconnect } from '../db/mongo';
import { populateInterestsIfEmpty } from './populateInterests';
import InterestModel from '../models/interest.model';
import UserModel from '../models/user.model';
import { hashPassword } from '../libs/bcrypt';
import { Gender } from '../enum/gender';

async function populateUser() {
  // Função utilitária para simular upload de fotos igual ao multer
  const { saveUserPhotos } = await import('../libs/multer');

  async function addPhotosToUser(userId: string, galleryIdxs: number[], imagePaths: string[]): Promise<{ profilePhotoUrl: string, galleryPhotoUrls: string[] }> {
    const galleryPaths = saveUserPhotos(userId, galleryIdxs.map((i: number) => imagePaths[i]));
    const profilePath = galleryPaths.length > 0 ? galleryPaths[0] : '';
    return { profilePhotoUrl: profilePath, galleryPhotoUrls: galleryPaths };
  }
  try {
    console.log('[seed] Conectando ao banco...');
    await connect();

    console.log('[seed] Garantindo interesses existentes...');
    await populateInterestsIfEmpty();

    const photography = await InterestModel.findOne({ name: 'Photography' });
    const travelling = await InterestModel.findOne({ name: 'Travelling' });

    if (!photography || !travelling) {
      console.warn('[seed] Interesses Photography ou Travelling não encontrados após população. Abortando.');
      await disconnect();
      process.exit(1);
    }

    const imagePaths = [
      'C:\\Users\\Gabriel\\OneDrive\\Imagens\\Plano de Fundo\\25tvya5uy9751.png',
      'C:\\Users\\Gabriel\\OneDrive\\Imagens\\Plano de Fundo\\711417.jpg',
      'C:\\Users\\Gabriel\\OneDrive\\Imagens\\Plano de Fundo\\1123953.png',
      'C:\\Users\\Gabriel\\OneDrive\\Imagens\\Plano de Fundo\\1125423.jpg',
      'C:\\Users\\Gabriel\\OneDrive\\Imagens\\Plano de Fundo\\1189464.jpg',
      'C:\\Users\\Gabriel\\OneDrive\\Imagens\\Plano de Fundo\\1270090.jpg',
      'C:\\Users\\Gabriel\\OneDrive\\Imagens\\Plano de Fundo\\wallpapersden.com_torii-gate-paint-art_2732x2048.jpg',
    ];

    console.log('[seed] Limpando usuários existentes (opcional)...');
    await UserModel.deleteMany({});

    console.log('[seed] Criando usuários...');

    const plainPassword = 'Password123!';
    const hashed = await hashPassword(plainPassword);


    // Criação dos usuários sem fotos
    const rawUsersData = [
      {
        firstName: 'Lucas', lastName: 'Silva', email: 'lucas.photography@example.com', dob: new Date('2002-04-12'), password: hashed, gender: Gender.Male, preference: Gender.Female, interests: [photography._id], galleryIdxs: [0, 1, 2]
      },
      {
        firstName: 'Mariana', lastName: 'Costa', email: 'mariana.photography@example.com', dob: new Date('2003-07-08'), password: hashed, gender: Gender.Female, preference: Gender.Male, interests: [photography._id], galleryIdxs: [1, 0, 2]
      },
      {
        firstName: 'Rafael', lastName: 'Pereira', email: 'rafael.samephoto@example.com', dob: new Date('2004-11-20'), password: hashed, gender: Gender.Male, preference: Gender.Male, interests: [photography._id], galleryIdxs: [2, 0, 1]
      },
      {
        firstName: 'Camila', lastName: 'Almeida', email: 'camila.samephoto@example.com', dob: new Date('2002-02-02'), password: hashed, gender: Gender.Female, preference: Gender.Female, interests: [photography._id], galleryIdxs: [3, 4, 5]
      },
      {
        firstName: 'Thiago', lastName: 'Gomes', email: 'thiago.travelling@example.com', dob: new Date('2003-06-15'), password: hashed, gender: Gender.Male, preference: Gender.Female, interests: [travelling._id], galleryIdxs: [4, 5, 6]
      },
      {
        firstName: 'Larissa', lastName: 'Fernandes', email: 'larissa.travelling@example.com', dob: new Date('2004-09-09'), password: hashed, gender: Gender.Female, preference: Gender.Male, interests: [travelling._id], galleryIdxs: [5, 4, 6]
      },
      {
        firstName: 'Bruno', lastName: 'Santos', email: 'bruno.travelling.same@example.com', dob: new Date('2005-01-30'), password: hashed, gender: Gender.Male, preference: Gender.Male, interests: [travelling._id], galleryIdxs: [6, 3, 4]
      },
    ];

    // Cria cada usuário, salva as fotos e atualiza os campos
    const createdUsers = [];
    for (const user of rawUsersData) {
      // Cria usuário sem fotos
      const created = await UserModel.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dob: user.dob,
        password: user.password,
        gender: user.gender,
        preference: user.preference,
        interests: user.interests
      });
      // Adiciona fotos
      const photoData = await addPhotosToUser(created._id.toString(), user.galleryIdxs, imagePaths);
      created.profilePhotoUrl = photoData.profilePhotoUrl;
      created.galleryPhotoUrls = photoData.galleryPhotoUrls;
      await created.save();
      createdUsers.push(created);
    }
    console.log(`[seed] ${createdUsers.length} usuários criados com sucesso.`);

    console.log('[seed] Finalizando e desconectando...');
    await disconnect();
    process.exit(0);
  } catch (err) {
    console.error('[seed] Erro ao rodar seed:', err);
    try {
      await disconnect();
    } catch (e) {
      // ignore
    }
    process.exit(1);
  }
}
