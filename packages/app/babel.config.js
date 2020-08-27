module.exports = {
  presets: ['@babel/preset-react', '@babel/preset-typescript'],
  plugins: ['@babel/plugin-syntax-import-meta'],
  env: {
    development: {
      plugins: ['react-refresh/babel'],
    },
  },
}
