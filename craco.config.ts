import path from "path"

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias '@' trỏ đến thư mục 'src'
    },
  },
};
