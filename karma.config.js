process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function (config) {
    config.set({
        frameworks: ['mocha', 'chai'], 
        files: [
            'test/*.spec.js',
        ],
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test/*.spec.js': ['webpack'],
        },
        webpack: {
            // karma watches the test entry points
            // (you don't need to specify the entry option)
            // webpack watches dependencies
      
            // webpack configuration
            mode: 'production'
          },
        // list of files to exclude
        exclude: [
        ],
        reporters: ['progress'],
        port: 9876,  // karma web server port
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['HeadlessChrome'], // just for now; eventually: 'ChromeHeadless', Firefox', 'FirefoxDeveloper', 'FirefoxNightly', 'IE'],
        // enable / disable watching file and executing tests whenever any file changes
        /* just for now:
        customLaunchers: {
            FirefoxHeadless: {
                base: 'Firefox',
                flags: ['-headless'],
            },
        },
        */
       customLaunchers: {
        HeadlessChrome: {
                base: 'Chrome',
                flags: [
                    '--headless',
                    '--disable-gpu',
                    // Without a remote debugging port, Google Chrome exits immediately.
                    '--remote-debugging-port=9222'
                ],
            },
        },
        autoWatch: false,
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,
        // Concurrency level: how many browser should be started simultaneous
        concurrency: Infinity,
       
    })
}