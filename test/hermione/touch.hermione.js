const { assert } = require('chai');

describe('гамбургер', async function() {
    it('появляется при разрешении меньше 576px', async function() {
        await this.browser.url('/hw/store/');
        await this.browser.setWindowSize(575, 800)
        const burger = await this.browser.$('.navbar-toggler');

        assert.equal(await burger.isDisplayed(), true);
    });

    it('скрывается при разрешении больше или равно 576px', async function() {
        await this.browser.url('/hw/store/');
        await this.browser.setWindowSize(576, 800)
        const burger = await this.browser.$('.navbar-toggler');

        assert.equal(await burger.isDisplayed(), false);
    });
});