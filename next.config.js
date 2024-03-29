/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // SVGR
    {
      // Grab the existing rule that handles SVG imports
      const fileLoaderRule = config.module.rules.find(rule =>
        rule.test?.test?.('.svg'),
      );

      config.module.rules.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        // Convert all other *.svg imports to React components
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          resourceQuery: { not: /url/ }, // exclude if *.svg?url
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                svgoConfig: {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                        },
                      },
                    },
                    {
                      name: 'prefixIds',
                      active: true,
                    },
                    {
                      name: 'removeDimensions',
                      active: true,
                    },
                    {
                      name: 'removeViewBox',
                      active: false,
                    },
                  ],
                  removeViewBox: false,
                  removeDimensions: true,
                  typescript: true,
                  ref: true,
                },
              },
            },
          ],
        },
      );

      // Modify the file loader rule to ignore *.svg, since we have it handled now.
      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },

  // SASS
  sassOptions: {
    prependData: `@import "@/styles/variables.scss";`,
  },

  // Images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // ...other config
};

module.exports = nextConfig;
