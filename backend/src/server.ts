// food-api/src/server.ts

import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import path from 'path';

import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import restaurantRoutes from './routes/restaurantRoutes';

import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'fs/promises';

interface MulterRequest extends Request {
    file: Express.Multer.File;
}

// Load environment variables explicitly
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

// Multer Storage
const uploadPath = path.resolve(__dirname, '..', 'temp_uploads');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdir(uploadPath, { recursive: true }).then(() => {
            cb(null, uploadPath);
        }).catch(err => cb(err, uploadPath));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, '_'));
    },
});
const upload = multer({ storage: storage });

console.log('Attempting to connect to MongoDB...');
connectDB();

const app: Express = express();
const PORT = 5173; // Hardcoded to prevent environment conflicts

console.log(`Configuring server on port ${PORT}...`);

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

app.get('/health', async (req: Request, res: Response) => {
    console.log('Health check requested');
    res.send({ message: "health ok" })
});

// Upload Route
app.post('/api/upload', upload.single('image'), async (req: Request, res: Response) => {
    const multerReq = req as MulterRequest;
    if (!multerReq.file) {
        return res.status(400).json({ error: 'No image file provided.' });
    }
    const localFilePath = multerReq.file.path;

    try {
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            folder: 'ecommerce_products',
            resource_type: 'auto',
        });
        await fs.unlink(localFilePath);
        res.status(200).json({
            message: 'Image uploaded successfully!',
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
        });
    } catch (error) {
        await fs.unlink(localFilePath).catch(e => console.error("Cleanup failed:", e));
        console.error('Cloudinary Upload Error:', error);
        res.status(500).json({ error: 'Failed to upload image.' });
    }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/restaurants', restaurantRoutes);

app.get('/', (req, res) => {
    res.send('eCommerce API is Running...');
});

console.log('Starting app.listen...');
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
