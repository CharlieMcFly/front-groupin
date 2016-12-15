/**
 * Created by charlie on 15/12/16.
 */
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['todo-spec.js'],
    capabilities: {
        'browserName': 'firefox' // or 'safari'
    },
};