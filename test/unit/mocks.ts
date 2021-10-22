import { AxiosResponse } from "axios";
import { CartState, CheckoutFormData, CheckoutResponse, Product, ProductShortInfo } from "../../src/common/types";
import { ExampleApi } from "../../src/client/api";

function getShortInfo(product: Product): ProductShortInfo {
    const { id, name, price } = product;
    return { id, name, price };
}

export class MockExampleApi extends ExampleApi {
    private products: Product[] = [
        {
            id: 0,
            name: 'a',
            price: 100,
            description: 'About',
            material: 'wood',
            color: 'red',
        },
        {
            id: 1,
            name: 'b',
            price: 200,
            description: 'About',
            material: 'wood',
            color: 'red',
        },
    ];

    async getProducts() {
        return { data: this.products.map(getShortInfo) } as AxiosResponse<ProductShortInfo[]>;
    }

    async getProductById(id: number) {
        const product = this.products.find((product) => product.id === id);
        return { data: product } as unknown as AxiosResponse<Product>;
    }

    async checkout(form: CheckoutFormData, cart: CartState) {
        const response = { id: 0 };
        return { data:  response } as unknown as AxiosResponse<CheckoutResponse>
    }
}

export class CartApi {
    storage: CartState = {};

    getState() : CartState {
        return this.storage
    }

    setState(cart: CartState) {
        this.storage = cart
    }
}