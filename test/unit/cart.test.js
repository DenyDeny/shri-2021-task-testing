import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen, within } from '@testing-library/react';
import { it, expect, describe } from '@jest/globals';
import events from '@testing-library/user-event';
import { Application } from '../../src/client/Application';
import { Cart } from '../../src/client/pages/Cart'
import { initStore, addToCart, clearCart } from '../../src/client/store';
import { MockExampleApi, CartApi } from './mocks';

function cartApplication(store) {
    const basename = "/hw/store";
    return (
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                <Cart />
            </Provider>
        </BrowserRouter>
    )
}

describe('Корзина', () => {
    it("продукт добавляется в корзину", async () => {
        const basename = "/hw/store";
        const api = new MockExampleApi(basename);
        const cart = new CartApi();
        const product = await api.getProductById(0);

        const store = initStore(api, cart);

        store.dispatch(addToCart(product.data));

        const application = cartApplication(store);

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

        const application = cartApplication(store);

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

        const application = cartApplication(store);

        const { container } = render(application);
        const buttonSubmit = screen.getByRole('button', { name: /Clear shopping cart/i });
        await events.click(buttonSubmit)
        const table = container.querySelector('table');

        expect(table).toBe(null);
    });

    it('пустая корзина имеет ссылку на каталог', function () {
        const basename = "/hw/store";
        const api = new MockExampleApi(basename);
        const cart = new CartApi();

        const store = initStore(api, cart);

        const application = cartApplication(store);

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

        const application = cartApplication(store);

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

        const application = cartApplication(store);

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

        const application = cartApplication(store);

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

        const application = cartApplication(store);

        const { container } = render(application);
        const table = container.querySelector('table');
        const total = table.querySelector('.Cart-Total').textContent.replace(/[^+\d]/g, '');
        expect(Number(total)).toBe(product.data.price);
    });
});

describe('чекаут', () => {
    it('есть возможность оформления', async () => {
        const basename = "/hw/store";
        const api = new MockExampleApi(basename);
        const cart = new CartApi();

        const store = initStore(api, cart);

        const product = await api.getProductById(0);

        store.dispatch(addToCart(product.data));

        const application = cartApplication(store);

        const { container } = render(application);
        const isForm = !!container.querySelector('.Form');

        expect(isForm).toBeTruthy();
    });

    it('пустая форма не сабмитится', async () => {
        const basename = "/hw/store";
        const api = new MockExampleApi(basename);
        const cart = new CartApi();

        const store = initStore(api, cart);

        const product = await api.getProductById(0);

        store.dispatch(addToCart(product.data));

        const application = cartApplication(store);

        const { container } = render(application);

        const buttonSubmit = screen.getByRole('button', { name: /Checkout/i });

        await events.click(buttonSubmit);

        expect(!!container.querySelector('.Form .Form-Field.is-invalid')).toBeTruthy();
    });
});