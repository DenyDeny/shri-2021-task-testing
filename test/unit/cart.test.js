import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { it, expect, describe } from '@jest/globals';
import { Cart } from '../../src/client/pages/Cart'
import { initStore, addToCart } from '../../src/client/store';
import { MockExampleApi, CartApi } from './mocks';

describe('корзина', () => {
    it("продукт добавляется в корзину", async () => {
        const basename = "/hw/store";
        const api = new MockExampleApi(basename);
        const cart = new CartApi();
        const product = await api.getProductById(0);

        const store = initStore(api, cart);

        store.dispatch(addToCart(product.data))

        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        );

        addToCart(product.data);

        render(application);

        expect(store.getState().cart).toStrictEqual({
            [product.data.id]: {
                name: product.data.name,
                price: product.data.price,
                count: 1,
            }
        })
    });

    it("продукт добавляется в корзину повторно", async () => {
        const basename = "/hw/store";
        const api = new MockExampleApi(basename);
        const cart = new CartApi();
        const product = await api.getProductById(0);

        const store = initStore(api, cart);

        store.dispatch(addToCart(product.data));
        store.dispatch(addToCart(product.data));

        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        );

        addToCart(product.data);

        render(application);

        expect(store.getState().cart).toStrictEqual({
            [product.data.id]: {
                name: product.data.name,
                price: product.data.price,
                count: 2,
            }
        })
    });
})