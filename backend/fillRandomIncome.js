const axios = require('axios');
const {chunk,shuffle,cloneDeep} = require('lodash');

const items = [
    {
        title: 'Action Future Bass',
        price: 149,
        source: 'gettyimages',
        currency: 'USD',
        genre: 'Future Bass',
        date: '29.03.2020',
        probability: 3,
    },
    {
        title: 'Dark Ambient',
        price: 129,
        source: 'vfinemusic',
        currency: 'USD',
        genre: 'Ambient',
        date: '31.03.2020',
        probability: 7,
    },
    {
        title: 'Epic Trailer',
        price: 49,
        source: 'audiojungle',
        currency: 'USD',
        genre: 'Cinematic',
        date: '12.03.2020',
        probability: 21,
    },
    {
        title: 'Horror Trailer',
        price: 25,
        source: 'pond5',
        currency: 'USD',
        genre: 'Horror',
        date: '28.03.2020',
        probability: 29,
    },
    {
        title: 'Synthwave 80s',
        price: 15,
        source: 'motionarray',
        currency: 'USD',
        genre: 'Synthwave',
        date: '16.03.2020',
        probability: 40,
    },
];

function arrayShuffle(array) {
    for ( var i = 0, length = array.length, swap = 0, temp = ''; i < length; i++ ) {
        swap        = Math.floor(Math.random() * (i + 1));
        temp        = array[swap];
        array[swap] = array[i];
        array[i]    = temp;
    }
    return array;
};

function percentageChance(values, chances) {
    for ( var i = 0, pool = []; i < chances.length; i++ ) {
        for ( var i2 = 0; i2 < chances[i]; i2++ ) {
            pool.push(i);
        }
    }
    return values[arrayShuffle(pool)['0']];
};

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

function ArrayByLength(length) {
    return Array.apply(null, {length: length});
}

function generateMochByYears(length = 3, itemsPerMonth = 30, spread = 0) {
    const [monthMin, monthMax] = [1, 12];
    const [dayMin, dayMax] = [1, 28];
    const currentYear = new Date().getFullYear();

    let years = ArrayByLength(length)
        .map((el, i) => currentYear - i)
        .reverse();
    let result = [];

    years.forEach((year, year_i) => {
        // year
        const monthArray = ArrayByLength(monthMax);
        monthArray.forEach((month, month_i) => {
            // month
            const perMonthArray = ArrayByLength(between(itemsPerMonth - spread, itemsPerMonth + spread));

            perMonthArray.forEach((item, item_i) => {
                // items
                const randomSource = percentageChance(items, items.map(el=>el.probability));
                const randomDayString = between(dayMin, dayMax) + '';
                const randomMonthString = month_i + 1 + '';
                const randomDay = randomDayString.length > 1 ? randomDayString : `0${randomDayString}`;
                const randomMonth = randomMonthString.length > 1 ? randomMonthString : `0${randomMonthString}`;

                const clonedSource = cloneDeep(randomSource);

                delete clonedSource.probability;
                clonedSource.date = `${randomMonth}.${randomDay}.${year}`;

                result.push(clonedSource)
            });


        })
    });

    return result;
}


const fillDataSet = () => {
    const chunkSize = 15;
    const items = shuffle(generateMochByYears(3, 5, 1));
    const mochItems = chunk(items, chunkSize);

    console.log('ITEMS SIZE', items.length);
    console.log('CHUNKS SIZE', mochItems.length);

    mochItems.forEach((el) => {
        axios.post(`http://localhost:5000/incomes/add`, el)
            .catch(el => el);
    });

};

fillDataSet();