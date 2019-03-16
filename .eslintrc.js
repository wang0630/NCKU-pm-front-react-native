module.exports = {
    "env": {
        "node": true, // this is the best starting point
        "browser": true, // for react web
        "es6": true // enables es6 features
    },
    "parser": "babel-eslint", // needed to make babel stuff work properly
    "extends": "airbnb",
    'rules': {
        'comma-dangle': 'off',
        'import/prefer-default-export': 'off',
        "import/no-extraneous-dependencies": 'off',
        'no-use-before-define': 'off',
        'react/destructuring-assignment': 'off',
        'react/jsx-filename-extension': 'off',
        'react/prop-types': 'off',
        'react/no-access-state-in-setstate': 'off',
        "react/jsx-boolean-value": 'off'
    },
}