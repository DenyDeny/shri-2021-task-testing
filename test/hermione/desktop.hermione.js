const { assert } = require('chai');

describe('статичная отрисовка страниц', async function() {
    it('главная', async function() {
        await this.browser.url('/hw/store/');
        await this.browser.assertView('plain', '.Application', {
            compositeImage: true,
        });
    });

    it('условия доставки', async function() {
        await this.browser.url('/hw/store/delivery');
        await this.browser.assertView('plain', '.Application', {
            compositeImage: true,
        });
    });

    it('контакты', async function() {
        await this.browser.url('/hw/store/contacts');
        await this.browser.assertView('plain', '.Application', {
            compositeImage: true,
        });
    });
});