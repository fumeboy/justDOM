module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: ['plugin:@typescript-eslint/eslint-recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
    },
    rules: {
        semi: 0
    }
}
