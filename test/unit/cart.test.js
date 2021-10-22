import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { it, expect, describe } from '@jest/globals';
import events from '@testing-library/user-event';
import { Cart } from '../../src/client/pages/Cart'
import { initStore, addToCart } from '../../src/client/store';
import { MockExampleApi, CartApi } from './mocks';

describe('корзина', () => {
    it("в корзине есть товар", async () => {
        const basename = "/hw/store";
        const api = new MockExampleApi(basename);
        const cart = new CartApi();
        const product = await api.getProductById(0);

        // TODO: что происходит :D
        let count = 0;

        cart.setState({
            [product.data.id]: {
                name: product.data.name,
                count,
                price: product.data.price
            }
        });

        cart.storage[product.data.id].count ++;

        const store = initStore(api, cart);

        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        );

        addToCart(product.data);

        const { container } = render(application);
    });
})