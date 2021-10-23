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

describe('корзина', async function() {
    it('содержимое сохраняется после перезагрузки', async function() {
        // Add item to a cart for start
        await this.browser.url('/hw/store/catalog/1');
        await this.browser.$('.Product button').click();

        // Go to the cart
        await this.browser.url('/hw/store/cart');
        // const stateBeforeReload = await this.browser.$('.Cart tbody tr');
        // Reload page
        await this.browser.url('https://google.ru/');
        await this.browser.url('/hw/store/cart');

        this.browser.waitUntil(async () => {
            await this.browser.assertView('plain', '.Cart', {
                compositeImage: true,
            });
        }, 5000, 'waiting 5s');
        // const stateAfterReload = await this.browser.$('.Cart tbody tr');
        //
        // assert.equal(stateBeforeReload, stateAfterReload, 'состояние корзины не изменилось');
    });
});