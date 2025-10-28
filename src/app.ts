import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(express.json());
const PORT = 3000;
const uri = process.env.MONGO_URI || '';

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Funcionou' });
});

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Conectado ao MongoDB');

        app.listen(PORT, () => {
            console.log(`Servidor está correndo na porta ${PORT}`);
        });
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err);
    }
}

connectDB();
