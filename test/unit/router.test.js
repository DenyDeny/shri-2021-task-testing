import React from "react";
import { Router } from 'react-router';
import { Provider } from "react-redux";
import { render } from '@testing-library/react';
import { createMemoryHistory } from "history";
import { Application } from "../../src/client/Application";
import { initStore } from "../../src/client/store";
import { MockExampleApi, CartApi } from './mocks';

const store = initStore(new MockExampleApi('/hw/store'), new CartApi());

describe('Роутинг', () => {
    it('открывается главная страница => /', () => {
        const history = createMemoryHistory({
            initialEntries: ['/'],
            initialIndex: 0
        });

        const application = (
            <Router history={history}>
                <Provider store={store}>
                    <Application/>
                </Provider>
            </Router>
        );

        const { getByRole } = render(application);
        const home = getByRole('link', { name: /Example store/i });
        expect(home.textContent).toBe('Example store');
    });

    it('открывается каталог => /catalog', () => {
        const history = createMemoryHistory({
            initialEntries: ['/catalog'],
            initialIndex: 0
        });

        const application = (
            <Router history={history}>
                <Provider store={store}>
                    <Application/>
                </Provider>
            </Router>
        );

        const { container } =  render(application);
        const catalogTitle = container.querySelector('h1');
        expect(catalogTitle.textContent).toBe('Catalog');
    });

    it('открывается корзина => /cart', () => {
        const history = createMemoryHistory({
            initialEntries: ['/cart'],
            initialIndex: 0
        });

        const application = (
            <Router history={history}>
                <Provider store={store}>
                    <Application/>
                </Provider>
            </Router>
        );

        const { container } =  render(application);
        const cartTitle = container.querySelector('h1');
        expect(cartTitle.textContent).toBe('Shopping cart');
    });

    it('открывается страница о доставке => /delivery', () => {
        const history = createMemoryHistory({
            initialEntries: ['/delivery'],
            initialIndex: 0
        });

        const application = (
            <Router history={history}>
                <Provider store={store}>
                    <Application/>
                </Provider>
            </Router>
        );

        const { container } =  render(application);
        const deliveryTitle = container.querySelector('h1');
        expect(deliveryTitle.textContent).toBe('Delivery');
    });

    it('открываются контакты => /contacts', () => {
        const history = createMemoryHistory({
            initialEntries: ['/contacts'],
            initialIndex: 0
        });

        const application = (
            <Router history={history}>
                <Provider store={store}>
                    <Application/>
                </Provider>
            </Router>
        );

        const { container } = render(application);
        const contactsTitle = container.querySelector('h1');
        expect(contactsTitle.textContent).toBe('Contacts');
    });
});