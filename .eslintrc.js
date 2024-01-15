module.exports = {
    extends: [
        'react-app',
        'react-app/jest',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    ignorePatterns: ['.eslintrc.js'],
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
    },
};
