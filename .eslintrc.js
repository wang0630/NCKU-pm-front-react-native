module.exports = {
    "env": {
        "node": true, // this is the best starting point
        "browser": true, // for react web
        "es6": true // enables es6 features
    },
    "parser": "babel-eslint", // needed to make babel stuff work properly
    "extends": "airbnb",
    'rules': {
        'no-use-before-define': 'off',
        'react/jsx-filename-extension': 'off',
        'react/prop-types': 'off',
        'comma-dangle': 'off'
    },
}