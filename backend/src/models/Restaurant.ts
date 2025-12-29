import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    cuisine: { type: String, required: true },
    address: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    deliveryTime: { type: Number, required: true }, // in minutes
    priceRange: { type: String, required: true }, // e.g. "$", "$$", "$$$"
}, {
    timestamps: true,
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;
