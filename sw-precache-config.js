module.exports = {
  stripPrefix: "build/",
  staticFileGlobs: [
    "build/*.html",
    "build/manifest.json",
    "build/static/**/!(*map*)",
  ],
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: "build/service-worker.js",
  navigateFallback: "index.html",
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/public-api\.wordpress\.com\/rest\/v1\.1\/sites\/foodanquote\.wordpress\.com\/.*/,
      handler: "networkFirst",
    },
    {
      urlPattern: /^https:\/\/foodandquote\.files\.wordpress\.com\/.*/,
      handler: "fastest",
      options: {
        cache: {
          maxEntries: 30,
          name: "images",
        },
      },
    },
  ],
};
