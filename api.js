const mockPrompts = [
    {
        id: 1,
        title: 'Surreal Landscape',
        description: 'A dreamlike landscape with floating islands.',
        category: 'Surreal',
        beforeImage: 'https://via.placeholder.com/300x200',
        beforeText: 'A simple landscape.',
        afterImage: 'https://via.placeholder.com/300x200',
        afterText: 'A surreal landscape with floating islands and vibrant colors.'
    },
    {
        id: 2,
        title: 'Funny Cat',
        description: 'A cat doing something hilarious.',
        category: 'Funny',
        beforeImage: 'https://via.placeholder.com/300x200',
        beforeText: 'A regular cat.',
        afterImage: 'https://via.placeholder.com/300x200',
        afterText: 'A cat wearing sunglasses and riding a skateboard.'
    },
    {
        id: 3,
        title: 'Technical Diagram',
        description: 'A detailed technical diagram of a complex system.',
        category: 'Technical',
        beforeImage: 'https://via.placeholder.com/300x200',
        beforeText: 'A basic block diagram.',
        afterImage: 'https://via.placeholder.com/300x200',
        afterText: 'A detailed technical diagram with labels and annotations.'
    }
];

export const fetchPrompts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockPrompts);
        }, 500);
    });
};
