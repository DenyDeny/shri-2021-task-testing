import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen, within } from '@testing-library/react';
import { it, expect, describe } from '@jest/globals';
import events from '@testing-library/user-event';
import { Cart } from '../../src/client/pages/Cart'
import { initStore, addToCart, clearCart } from '../../src/client/store';
import { MockExampleApi, CartApi } from './mocks';

describe('Корзина', () => {
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

        render(application);

        expect(store.getState().cart).toStrictEqual({
            [product.data.id]: {
                name: product.data.name,
                price: product.data.price,
                count: 2,
            }
        })
    });

    it('корзина очищается по клику', async function () {
        const basename = "/hw/store";
        const api = new MockExampleApi(basename);
        const cart = new CartApi();

        const product = await api.getProductById(0);

        const store = initStore(api, cart);

        store.dispatch(addToCart(product.data));

        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        );

        render(application);
        const buttonSubmit = screen.getByRole('button', { name: /Clear shopping cart/i });
        await events.click(buttonSubmit)
        const storage = cart.getState();

        expect(Object.keys(storage).length).toBe(0);
    });

    it('пустая корзина имеет ссылку на каталог', function () {
        const basename = "/hw/store";
        const api = new MockExampleApi(basename);
        const cart = new CartApi();

        const store = initStore(api, cart);

        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        );

        const { container } = render(application);
        const link = container.querySelector('a');

        expect(link.href).toBe(`${window.location.origin}/hw/store/catalog`);
    });
})

describe('Каждый товар в корзине имеет', () => {
    it('название', async function () {
        const basename = "/hw/store";
        const api = new MockExampleApi(basename);
        const cart = new CartApi();

        const product = await api.getProductById(0);

        const store = initStore(api, cart);

        store.dispatch(addToCart(product.data));

        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        );

        const { container } = render(application);
        const table = container.querySelector('table');
        const title = table.querySelector('.Cart-Name');
        expect(title.textContent).toBe(product.data.name);
    });

    it('цена', async function () {
        const basename = "/hw/store";
        const api = new MockExampleApi(basename);
        const cart = new CartApi();

        const product = await api.getProductById(0);

        const store = initStore(api, cart);

        store.dispatch(addToCart(product.data));

        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        );

        const { container } = render(application);
        const table = container.querySelector('table');
        const price = table.querySelector('.Cart-Price').textContent.replace(/[^+\d]/g, '');
        expect(Number(price)).toBe(product.data.price);
    });

    it('количество', async function () {
        const basename = "/hw/store";
        const api = new MockExampleApi(basename);
        const cart = new CartApi();

        const product = await api.getProductById(0);

        const store = initStore(api, cart);

        store.dispatch(addToCart(product.data));

        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        );

        const { container } = render(application);
        const table = container.querySelector('table');
        const count = table.querySelector('.Cart-Count').textContent.replace(/[^+\d]/g, '');
        expect(Number(count)).toBe(1);
    });

    it('общая стоимость', async function () {
        const basename = "/hw/store";
        const api = new MockExampleApi(basename);
        const cart = new CartApi();

        const product = await api.getProductById(0);

        const store = initStore(api, cart);

        store.dispatch(addToCart(product.data));

        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        );

        const { container } = render(application);
        const table = container.querySelector('table');
        const total = table.querySelector('.Cart-Total').textContent.replace(/[^+\d]/g, '');
        expect(Number(total)).toBe(product.data.price);
    });
})