# Dating App Backend

Backend em Node.js, Express, Mongoose, Zod, Multer e MongoDB em memória.

## Requisitos
- Node.js 18+
- npm

## Instalação
```bash
npm install
```

## Configuração do ambiente
Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias, há um arquivo de exemplo `.env.example`
na raiz do projeto com as variáveis necessárias.

```

## Inicialização
```bash
npm start
```

O servidor será iniciado com Nodemon usando o arquivo `src/server.ts`.

## Banco de dados
- Utiliza MongoDB em memória (mongodb-memory-server), não precisa instalar nada.

## Upload de imagens
- As imagens de perfil são salvas em `/uploads/<id_do_usuario>/profile.jpg`.
- O Express serve arquivos estáticos da pasta `/uploads`.

## Principais dependências
- express
- mongoose
- zod
- multer
- jsonwebtoken
- bcrypt
- mongodb-memory-server

## Scripts disponíveis
- `npm start`: Inicia o servidor em modo desenvolvimento (hot reload com Nodemon).

## Autor
Gabriel Izidre e Costa | RA: 194629

---
