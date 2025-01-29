export default {
  root: "src",
  server: {
    port: 3000,
    overlay: false,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
