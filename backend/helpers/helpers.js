const declension = (n, t) => {
    return t[
        (n %= 100, 20 > n && n > 4) ? 2
            : [2, 0, 1, 1, 1, 2][(n %= 10, n < 5) ? n : 5]
        ]
};

module.exports = {
    declension,
};