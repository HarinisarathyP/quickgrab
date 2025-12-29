import express from 'express';
import asyncHandler from 'express-async-handler';
import { Restaurant } from '../models';

const router = express.Router();

// @desc    Fetch all restaurants
// @route   GET /api/restaurants
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
    const restaurants = await Restaurant.find({});
    res.json(restaurants || []);
}));

// @desc    Fetch single restaurant
// @route   GET /api/restaurants/:id
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
        res.status(404);
        throw new Error('Restaurant not found');
    }
    
    res.status(200).json(restaurant);
}));

export default router;