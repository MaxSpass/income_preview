const SOURCES = [
    {
        title: 'audiojungle',
        url: 'https://audiojungle.net',
    },
    {
        title: 'motionarray',
        url: 'https://motionarray.com/',
    },
    {
        title: 'pond5',
        url: 'https://www.pond5.com/',
    },
    {
        title: 'gettyimages',
        url: 'https://www.gettyimages.com/',
    },
    {
        title: 'vfinemusic',
        url: 'https://www.vfinemusic.com/',
    },
    {
        title: 'motionelements',
        url: 'https://www.motionelements.com/',
    },
    {
        title: 'shutterstock',
        url: 'https://www.shutterstock.com/',
    },
    {
        title: 'premiumbeat',
        url: 'https://www.premiumbeat.com/',
    },
    {
        title: 'tunetank',
        url: 'https://tunetank.com/',
    },
    {
        title: 'musicvine',
        url: 'https://musicvine.com/',
    },
    {
        title: 'addmusic',
        url: 'https://addmusic.tw/',
    },
    {
        title: '123rf',
        url: 'https://123rf.com/',
    },
    {
        title: 'dreamstime',
        url: 'https://www.dreamstime.com/',
    },
    {
        title: '100audio',
        url: 'https://100audio.com',
    },
    {
        title: 'jamendo',
        url: 'https://jamendo.com/',
    },
    {
        title: 'musicbed',
        url: 'https://www.musicbed.com/',
    },
    {
        title: 'marmosetmusic',
        url: 'https://www.marmosetmusic.com/',
    },
    {
        title: 'fliktrax',
        url: 'https://www.fliktrax.com/',
    },
    {
        title: 'storyblocks',
        url: 'https://www.storyblocks.com/',
    },
    {
        title: 'filmstro',
        url: 'https://filmstro.com/',
    },
    {
        title: 'themusicase',
        url: 'https://www.themusicase.com/',
    },
    {
        title: 'audiosparx',
        url: 'https://www.audiosparx.com/',
    },
    {
        title: 'audiomicro',
        url: 'https://www.audiomicro.com/',
    },
];
// Валюта+
const CURRENCIES = [
    {title: 'USD'},
    {title: 'EUR'},
    {title: 'CNY'},
    {title: 'TWD'},
    {title: 'GBP'},
    {title: 'UAH'},
    {title: 'RUB'},
];
// Жанр+
const GENRES = [
    {title: 'Epic'},
    {title: 'Cinematic'},
    {title: 'Corporate'},
    {title: 'Ambient'},
    {title: 'Ethnic'},
    {title: 'Hybrid'},
    {title: 'Dubstep'},
    {title: 'Horror'},
    {title: 'Future Bass'},
    {title: 'Experimental'},
    {title: 'Rock'},
    {title: 'Techno'},
    {title: 'Synthwave'},
    {title: '8bit'},
    {title: 'Classic'},
    {title: 'Metal'},
    {title: 'Hip-Hop'},
    {title: 'World'},
    {title: 'Jazz'},
    {title: 'Funk'},
    {title: 'Drum and Bass'},
    {title: 'Industrial'},
    {title: 'EDM'},
];
// Тэги+
const TAGS = [
    {title: 'Fantastic'},
    {title: 'Cinematic'},
    {title: 'Epic'},
    {title: 'Brave'},
    {title: 'Dark'},
    {title: 'Inspirational'},
    {title: 'Heroic'},
    {title: 'Dramatic'},
    {title: 'Corporate'},
    {title: 'Film'},
    {title: 'Movie'},
    {title: 'Visuals'},
    {title: 'Soundtrack'},
    {title: 'Background'},
    {title: 'SFX'},
    {title: 'Hybrid'},
    {title: 'Dark'},
    {title: 'Horror'},
    {title: 'Agressive'},
    {title: 'Scary'},
    {title: 'Creepy'},
    {title: 'Business'},
    {title: 'Commercial'},
    {title: 'Motivational'},
    {title: 'Presentation'},
    {title: 'Technology'},
    {title: 'Emotional'},
    {title: '80s'},
    {title: 'Neon'},
    {title: 'Retro'},
    {title: 'Night'},
    {title: 'Drive'},
    {title: 'Synth'},
    {title: 'Montage'},
    {title: 'Energetic'},
    {title: 'Blockbuster'},
    {title: 'VHS'},
    {title: 'Action'},
    {title: 'Sport'},
    {title: 'Wave'},
    {title: 'Suspense'},
    {title: 'Thrill'},
    {title: 'Futuristic'},
    {title: 'Powerful'},
    {title: 'Extreme'},
    {title: 'Battle'},
    {title: 'Intense'},
    {title: 'Percussion'},
    {title: 'Drums'},
    {title: 'Design'},
    {title: 'Teaser'},
    {title: 'Opener'},
    {title: 'Intro'},
    {title: 'Short'},
];
// Приходы+
const INCOMES = [
    {
        title: 'Epic Trailer',
        price: 49,
        source: 'audiojungle',
        date: '12.03.2020',
        currency: 'USD',
        genre: 'Cinematic',
        tags: [
            'Epic',
            'Dark',
            'Heroic',
            'Film',
            'Movie',
            'Action',
            'Agressive',
            'Drums',
            'Dramatic',
            'Percussion',
        ]
    },
    {
        title: 'Synthwave 80s',
        date: '16.03.2020',
        price: 15,
        source: 'motionarray',
        currency: 'USD',
        genre: 'Synthwave',
        tags: [
            '80s',
            'Drive',
            'Sport',
            'Synth',
            'Wave',
            'Neon',
            'Action',
            'Intense',
            'Montage',
            'VHS',
        ]
    },
    {
        title: 'Horror Trailer',
        date: '28.03.2020',
        price: 25,
        source: 'pond5',
        currency: 'USD',
        genre: 'Horror',
        tags: [
            'Hybrid',
            'Dark',
            'Suspense',
            'Trailer',
            'Thrill',
            'Drums',
            'Blockbuster',
            'Intense',
            'Agressive',
            'Cinematic',
        ]
    },
    {
        title: 'Action Future Bass',
        date: '29.03.2020',
        price: 149,
        source: 'gettyimages',
        currency: 'USD',
        genre: 'Future Bass',
        tags: [
            'Future Bass',
            'Bass',
            'Action',
            'Sport',
            'Powerful',
            'Wave',
            'Synth',
            'Commercial',
            'Drive',
            'Business',
        ]
    },
    {
        title: 'Dark Ambient',
        date: '31.03.2020',
        price: 129,
        source: 'vfinemusic',
        currency: 'USD',
        genre: 'Ambient',
        tags: [
            'Ambient',
            'Ethnic',
            'Experimental',
            'Dark',
            'Percussion',
            'Film',
            'Movie',
            'Montage',
            'Soundtrack',
            'Background',
        ]
    },
];
// Users
const USERS = [
    {
        username: 'Max Spassky',
    },
    {
        username: 'Alex Balyk',
    },
    {
        username: 'Till Lindemann',
    },
    {
        username: 'Rob Dougan',
    },
    {
        username: 'Max Richter',
    },
];

module.exports = {
    // USERS,
    // INCOMES,
    TAGS,
    SOURCES,
    CURRENCIES,
    GENRES,
};