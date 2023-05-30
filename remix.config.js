/** @type {import('@remix-run/dev').AppConfig} */

const {
  createRequestHandler,
} = require("@remix-run/vercel");

module.exports = createRequestHandler({
  build: require("./build"),
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  future: {
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
    unstable_tailwind: true,
  },
});
