import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { it, expect, describe } from '@jest/globals';
import events from '@testing-library/user-event';
import { ProductDetails } from '../../src/client/components/ProductDetails'
import { initStore } from '../../src/client/store';
import { MockExampleApi, CartApi } from './mocks';

describe('карта товара', () => {
    it("кнопка с именем Add to Cart присутствует", async () => {
        const basename = "/hw/store";
        const api = new MockExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);

        const product = await api.getProductById(0);

        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <ProductDetails product={product} />
                </Provider>
            </BrowserRouter>
        );

        const { container } = render(application);
        const button = container.querySelector('button');

        expect(button.textContent).toContain('Add to Cart');
    });

    it("после клика на Add to Cart появляется текст, что продукт добавлен", async () => {
        const basename = "/hw/store";
        const api = new MockExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);

        const product = await api.getProductById(0);

        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <ProductDetails product={product} />
                </Provider>
            </BrowserRouter>
        );

        const { container } = render(application);
        const button = container.querySelector('button');
        events.click(button);
        const badge = container.querySelector('.CartBadge');

        expect(badge).toBeTruthy();
    });
})