import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { it, expect, describe } from '@jest/globals';
import events from '@testing-library/user-event';
import { Application } from '../../src/client/Application';
import { initStore } from '../../src/client/store';
import { MockExampleApi, CartApi } from './mocks';

describe('каталог', () => {
    it('во время загрузки отображается лоадер', async function () {
        const basename = "/hw/store";
        const api = new MockExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);

        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </BrowserRouter>
        );

        const { container } = render(application);
        const catalog = container.querySelector('.nav-link:nth-child(1)');

        events.click(catalog);

        const products = container.querySelectorAll('.card-body');
        expect(products.length).toEqual(0);
    });

    it("все товары загружены", async () => {
        const basename = "/hw/store";
        const api = new MockExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);

        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </BrowserRouter>
        );

        const { container } = render(application);
        const catalog = container.querySelector('.nav-link:nth-child(1)');

        events.click(catalog);

        await (function (ms) {
            return new Promise((res) => setTimeout(() => res(1), ms));
        })(100);

        const products = container.querySelectorAll('.card-body');
        expect(products.length).toEqual(2);
    });
})