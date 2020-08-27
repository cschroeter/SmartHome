module.exports = {
  presets: [
    '@babel/preset-react',
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: ['@babel/plugin-syntax-import-meta'],
  env: {
    development: {
      plugins: ['react-refresh/babel'],
    },
  },
}
