const { assert } = require('chai');

describe('главная страница', async function() {
    it('главная страница десктоп скриншот', async function() {
        await this.browser.url('/hw/store/');
        await this.browser.assertView('plain', '.Home', {
            compositeImage: true,
            allowViewportOverflow: true,
            selectorToScroll: '.Application',
        });
    });
});

describe('страница доставки', async function() {
    it('страница доставки десктоп скриншот', async function() {
        await this.browser.url('/hw/store/delivery');
        await this.browser.assertView('plain', '.Delivery', {
            compositeImage: true,
            allowViewportOverflow: true,
            selectorToScroll: '.Application',
        });
    });
});

describe('страница контакты', async function() {
    it('страницы контакты десктоп скриншот', async function() {
        await this.browser.url('/hw/store/contacts');
        await this.browser.assertView('plain', '.Contacts', {
            compositeImage: true,
            allowViewportOverflow: true,
            selectorToScroll: '.Application',
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
        // await this.browser.url('https://google.ru/');
        await this.browser.url('/hw/store/cart');

        await this.browser.assertView('plain', '.Cart', {
            compositeImage: true,
            allowViewportOverflow: true,
            selectorToScroll: '.Application',
        });
    });

    it('очищается', async function() {
        await this.browser.url('/hw/store/catalog/1');
        await this.browser.$('.Product button').click();

        await this.browser.url('/hw/store/cart');

        await this.browser.$('.Cart-Clear').click();

        assert.equal(await this.browser.$('.table').isDisplayed(), false);
    });

    it('сбрасывается счетчик', async function() {
        const navbar = await this.browser.$('.navbar-nav');
        await this.browser.url('/hw/store/catalog/1');
        await this.browser.$('.Product button').click();

        await this.browser.url('/hw/store/cart');

        await this.browser.$('.Cart-Clear').click();

        assert.equal(await navbar.$$('a')[3].getText(), 'Cart');
    });
});
