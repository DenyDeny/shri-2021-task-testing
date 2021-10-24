import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { it, expect, describe } from '@jest/globals';
import { Application } from '../../src/client/Application';
import { initStore } from '../../src/client/store';
import { MockExampleApi, CartApi } from './mocks';

describe('панель навигации', () => {
    it("название магазина является ссылкой на /home", async () => {
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
        const brand = container.querySelector('.navbar-brand');

        expect(brand.href).toContain(`${window.origin}/hw/store`);
    });
})