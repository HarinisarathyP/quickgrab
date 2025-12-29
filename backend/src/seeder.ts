import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import User from './models/User';
import Product from './models/Product';
import Restaurant from './models/Restaurant';
import Order from './models/Order';
import connectDB from './config/db';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await Restaurant.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');

        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'admin123',
            isAdmin: true,
        });

        // Create test user for login testing
        const testUser = await User.create({
            name: 'Harini Sarathy',
            email: 'harinisarathyy21@gmail.com',
            password: 'password123',
            isAdmin: false,
        });

        console.log('Admin and test users created successfully!');

        // Curated list of 10 Specific Restaurants
        const restaurantData = [
            {
                name: "Luigi's Trattoria",
                cuisine: "Italian",
                image: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&w=800&q=80", // Italian
                description: "Authentic Italian pasta and wood-fired pizzas."
            },
            {
                name: "Spice Garden",
                cuisine: "Indian",
                image: "https://images.unsplash.com/photo-1517244683847-745431cd4410?auto=format&fit=crop&w=800&q=80", // Indian vibe
                description: "Traditional Indian curries and tandoori specials."
            },
            {
                name: "Golden Dragon",
                cuisine: "Chinese",
                image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80", // Chinese/Dim Sum vibe
                description: "Delicious dim sum and classic Chinese dishes."
            },
            {
                name: "El Mariachi",
                cuisine: "Mexican",
                image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80", // Tacos
                description: "Spicy tacos, burritos and fresh guacamole."
            },
            {
                name: "The Burger Joint",
                cuisine: "American",
                image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80", // Burger place
                description: "Handcrafted burgers and crispy fries."
            },
            {
                name: "Siam Spice",
                cuisine: "Thai",
                image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80", // Thai vibe
                description: "Zesty Pad Thai and aromatic curries."
            },
            {
                name: "Sakura Sushi",
                cuisine: "Japanese",
                image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=800&q=80", // Sushi
                description: "Fresh sushi rolls and sashimi platters."
            },
            {
                name: "Olive & Thyme",
                cuisine: "Mediterranean",
                image: "https://images.unsplash.com/photo-1544124499-58912cbddad9?auto=format&fit=crop&w=800&q=80", // Med
                description: "Healthy bowls, hummus and falafel."
            },
            {
                name: "Le Petit Bistro",
                cuisine: "French",
                image: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&w=800&q=80", // French
                description: "Elegant French cuisine and fine wines."
            },
            {
                name: "Santorini Grill",
                cuisine: "Greek",
                image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", // Greek vibe
                description: "Grilled souvlaki and fresh greek salads."
            }
        ];

        const sampleRestaurants = restaurantData.map((data, i) => ({
            name: data.name,
            image: data.image,
            cuisine: data.cuisine,
            address: `${i + 1}00 Tasty Blvd, Food City`,
            rating: 4 + (i % 5) * 0.2,
            numReviews: (i + 1) * 20 + 5,
            deliveryTime: 20 + i * 3,
            priceRange: ['$', '$$', '$$$'][i % 3],
        }));

        const createdRestaurants = await Restaurant.insertMany(sampleRestaurants);

        // Food Images by Category
        const foodImages: Record<string, string[]> = {
            'Appetizers': [
                'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80', // Wings
                'https://images.unsplash.com/photo-1541529086526-db283bf9311a?auto=format&fit=crop&w=600&q=80', // Spring rolls
                'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80', // Sushi
            ],
            'Main Course': [
                'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', // Burger
                'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80', // Steak/Fancy
                'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80', // Curry
            ],
            'Drinks': [
                'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80', // Juice
                'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80', // Cocktail
                'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', // Soda
            ],
            'Desserts': [
                'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80', // Cake
                'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80', // Ice Cream
                'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80', // Waffles
            ]
        };

        const products = [];
        const menuCategories = ['Appetizers', 'Main Course', 'Drinks', 'Desserts'];

        for (const restaurant of createdRestaurants) {
            for (const category of menuCategories) {
                const catImages = foodImages[category] || foodImages['Main Course'];

                for (let j = 1; j <= 3; j++) {
                    const randomImg = catImages[Math.floor(Math.random() * catImages.length)];

                    // Realistic Indian food delivery pricing
                    let price: number;
                    switch (category) {
                        case 'Appetizers':
                            price = Math.floor(120 + Math.random() * 130); // ₹120-250
                            break;
                        case 'Main Course':
                            price = Math.floor(250 + Math.random() * 350); // ₹250-600
                            break;
                        case 'Desserts':
                            price = Math.floor(150 + Math.random() * 200); // ₹150-350
                            break;
                        case 'Drinks':
                            price = Math.floor(60 + Math.random() * 120); // ₹60-180
                            break;
                        default:
                            price = Math.floor(150 + Math.random() * 250);
                    }

                    // Determine if item is vegetarian (70% veg for Appetizers/Desserts, 50% for Main Course, 90% for Drinks)
                    let isVeg: boolean;
                    if (category === 'Drinks' || category === 'Desserts') {
                        isVeg = Math.random() > 0.1; // 90% veg
                    } else if (category === 'Appetizers') {
                        isVeg = Math.random() > 0.3; // 70% veg
                    } else {
                        isVeg = Math.random() > 0.5; // 50% veg for Main Course
                    }

                    products.push({
                        name: `${restaurant.name} ${category} ${j}`,
                        image: randomImg,
                        description: `A delicious ${category.toLowerCase()} dish prepared with premium ingredients. Chef's special.`,
                        brand: restaurant.name,
                        category: category,
                        price: price,
                        countInStock: 20,
                        isVeg: isVeg,
                        rating: 4.5,
                        numReviews: 5,
                        user: adminUser,
                        restaurant: restaurant._id,
                    });
                }
            }
        }

        await Product.insertMany(products);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await Restaurant.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
