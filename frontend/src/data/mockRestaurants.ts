export const mockRestaurants = Array.from({ length: 10 }).map((_, i) => ({
    _id: (i + 1).toString(),
    name: `Restaurant ${i + 1}`,
    image: `https://source.unsplash.com/random/800x600/?restaurant,food,${i}`, // Dynamic placeholder
    // Using a fixed set of images for reliability if unsplash random behaves strictly
    // image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    cuisine: ['Italian', 'Indian', 'Chinese', 'Mexican', 'American', 'Thai', 'Japanese', 'Mediterranean', 'French', 'Greek'][i % 10],
    address: `${i + 1}00 Food Street, Flavor Town`,
    rating: 4 + (i % 5) * 0.1,
    numReviews: (i + 1) * 25,
    deliveryTime: 25 + i * 2,
    priceRange: ['$', '$$', '$$$'][i % 3],
    menu: Array.from({ length: 5 }).map((__, j) => ({
        _id: `${i + 1}-${j + 1}`,
        name: `Menu Item ${j + 1} from Rest ${i + 1}`,
        image: `https://source.unsplash.com/random/400x400/?food,dish,${i}-${j}`,
        description: `This is a delicious sample description for menu item ${j + 1}. Fresh ingredients and distinct flavors.`,
        price: 10 + j * 3,
        category: ['Appetizers', 'Main Course', 'Drinks', 'Desserts', 'Specials'][j % 5],
        rating: 4.5,
        numReviews: 10,
        countInStock: 20
    }))
}));
