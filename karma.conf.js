module.exports = function(config) {
  config.set({

    frameworks: ['mocha'],

    // list of files / patterns to load in the browser
    files: [
      'karma.tests.js'
    ],

    preprocessors: {
      'karma.tests.js': ['webpack']
    },

    webpack: {
      module: {
        loaders: [
          {test: /\.json$/, loader: "json"}
        ]
      }
    },

    reporters: ['mocha', 'growl'],

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-growl'
    ]

  });
};
