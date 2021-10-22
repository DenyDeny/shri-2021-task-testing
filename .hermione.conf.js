module.exports = {
    baseUrl: 'https://shri.yandex/hw/store',
    gridUrl: 'http://10.5.48.18:4444',
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome',
            }
        }
    },
    plugins: {
        'html-reporter/hermione': {
            path: 'hermione-html-report'
        }
    }
}