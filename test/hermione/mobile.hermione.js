const { assert } = require('chai');

describe('гамбургер', async function() {
    it('скрывается при разрешении больше или равно 576px', async function() {
        await this.browser.url('/hw/store/');
        await this.browser.setWindowSize(800, 800)

        const burger = await this.browser.$('.navbar-toggler');

        assert.equal(await burger.isDisplayed(), false);
    });

    it('появляется при разрешении меньше 576px', async function() {
        await this.browser.url('/hw/store/');
        await this.browser.setWindowSize(575, 800)
        const burger = await this.browser.$('.navbar-toggler');

        assert.equal(await burger.isDisplayed(), true);
    });

    it('при выборе элемента из меню "гамбургера", меню должно закрываться', async function() {
        await this.browser.url('/hw/store/');
        await this.browser.setWindowSize(575, 800)

        const burger = await this.browser.$('.navbar-toggler');
        await burger.waitForExist();
        await burger.click();

        const navBAr = await this.browser.$('.navbar-collapse');
        await navBAr.waitForExist();

        const navLink = await this.browser.$('.nav-link');
        await navLink.waitForExist();

        await navLink.click();

        assert.equal(await navBAr.isDisplayed(), false);
    });
});