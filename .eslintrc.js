module.exports = {
    extends: [
        'react-app',
        'react-app/jest',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:@conarti/feature-sliced/rules'
    ],
    ignorePatterns: ['.eslintrc.js'],
    plugins: [
        '@conarti/feature-sliced'
      ],
    
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'prettier/prettier':    [
                                'error',  
                                    {   semicolons: 'true',
                                        endOfLine: 'auto',  
                                        tabWidth: 4 
                                    }
                                ],
        "@conarti/feature-sliced/layers-slices": "error",
        "@conarti/feature-sliced/absolute-relative": "error",
        "@conarti/feature-sliced/public-api": "error"
    },
};
