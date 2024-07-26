const path = require("path");

module.exports = {
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
    "@storybook/addon-docs",
    "@storybook/addon-essentials",
    "@storybook/addon-knobs",
    "@storybook/addon-links",
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          // test: [/\.stories\.jsx?$/], This is default
          include: [path.resolve(__dirname, './src')],
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
        }
      }
    },
    "@storybook/addon-viewport",
    "storybook-react-intl"
  ],
  stories: [
    "../packages/**/*.story.mdx",
    "../packages/**/*.story.@(js|jsx|ts|tsx)"
  ],
  webpackFinal: async (config, { configType }) => {
    // This method is for altering Storybook's webpack configuration.
    // Add support for importing image files
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg)$/,
      use: [
        {
          loader: 'file-loader',
        },
      ],
      include: path.resolve(__dirname, './packages/transitive-overlay/src/images'),
    });
    // Add support for importing YAML files.
    config.module.rules.push({
      test: /\.(yml|yaml)$/,
      loader: ["json-loader", "yaml-loader"]
    });

    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    config.module.rules.push({
      test: /uFuzzy/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: 'defaults' }]
          ]
        }
      }
    })

    // Return the altered config
    return config;
  }
}