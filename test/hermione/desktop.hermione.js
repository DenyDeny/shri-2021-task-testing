const { assert } = require('chai');

describe('статичная отрисовка главной страницы', async function() {
    it('desktop', async function() {
        await this.browser.url('/hw/store/');
        await this.browser.assertView('plain', '.Application', {
            compositeImage: true,
        });
    });

    it('mobile', async function() {
        await this.browser.setWindowSize(480, 920);
        await this.browser.url('/hw/store/');
        await this.browser.assertView('plain', '.Application', {
            compositeImage: true,
        });
    });
});

describe('статичная отрисовка страницы доставки', async function() {
    it('desktop', async function() {
        await this.browser.url('/hw/store/delivery');
        await this.browser.assertView('plain', '.Application', {
            compositeImage: true,
        });
    });

    it('mobile', async function() {
        await this.browser.setWindowSize(480, 920);
        await this.browser.url('/hw/store/delivery');
        await this.browser.assertView('plain', '.Application', {
            compositeImage: true,
        });
    });
});

describe('статичная отрисовка страницы контакты', async function() {
    it('desktop', async function() {
        await this.browser.url('/hw/store/contacts');
        await this.browser.assertView('plain', '.Application', {
            compositeImage: true,
        });
    });

    it('mobile', async function() {
        await this.browser.setWindowSize(480, 920);
        await this.browser.url('/hw/store/contacts');
        await this.browser.assertView('plain', '.Application', {
            compositeImage: true,
        });
    });
});

describe('корзина', async function() {
    it('содержимое сохраняется после перезагрузки', async function() {
        // Add item to a cart for start
        await this.browser.url('/hw/store/catalog/1');
        await this.browser.$('.Product button').click();

        // Go to the cart
        await this.browser.url('/hw/store/cart');

        // Reload page
        await this.browser.url('https://google.ru/');
        await this.browser.url('/hw/store/cart');

        this.browser.waitUntil(async () => {
            await this.browser.assertView('plain', '.Cart', {
                compositeImage: true,
            });
        }, 5000, 'waiting 5s');
    });
});