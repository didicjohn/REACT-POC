import express from 'express';
import { ProductService } from '../services';
import { Product } from '../models/product';

class ProductRouting {
    constructor(socketIOServer) {
        this.socketIOServer = socketIOServer
        this.router = express.Router();
        this.productService = new ProductService();
        this.initializeRouting();
        this.counter = 100;

    }
    initializeRouting() {
        this.router.get('/', async (request, response) => {
            try {
                let products = await this.productService.getProducts();
                if (products) {
                    response.header("Access-Control-Allow-Origin", "*").status(200).send(products);
                }
            } catch (error) {
                console.log(error);
                if (this.socketIOServer) {
                    this.socketIOServer.emit("ServerError:ConnectionFailed", { error });
                }
                throw error;
            }

        });
        this.router.get('/detail/:id', async (request, response) => {

            try {
                let productId = parseInt(request.params.id);
                if (!productId) {
                    response.header("Access-Control-Allow-Origin", "*").status(400).send(error);
                }
                let product = await this.productService.getProductDetail(productId);
                if (product) {
                    response.header("Access-Control-Allow-Origin", "*").status(200).send(product)
                }
            } catch (error) {
                console.log(error);
                response.status(400).send(error);
            }

        });
        this.router.get('/delete/:id', async (request, response) => {

            try {
                let productId = parseInt(request.params.id);
                if (!productId) {
                    response.header("Access-Control-Allow-Origin", "*").status(400).send(error);
                }
                let product = await this.productService.delteProduct(productId);
                if (product) {
                    response.header("Access-Control-Allow-Origin", "*").status(200).send(product)
                }
            } catch (error) {
                console.log(error);
                response.status(400).send(error);
            }

        });
        this.router.get('/search/:name', async (request, response) => {

            try {
                let title = request.params.name;
                if (!title) {
                    response.status(400).send(error);
                }
                let product = await this.productService.getProductByName(title);
                if (product) {

                    response.header("Access-Control-Allow-Origin", "*").status(200).send(product)
                }
            } catch (error) {
                console.log(error);
                response.status(400).send(error);
            }

        });
        this.router.post('/', async (request, response) => {
            try {
                console.log(request.body);
                let body = request.body;
                let product = new Product(body.ProductId, body.Title, body.Description, body.UnitPrice, body.SellingPrice, body.UnitsInStock, body.Remarks, body.ProductPhotoURL)
                product.ProductId = this.counter++;
                let saved = await this.productService.addNewProduct(product);
                if (saved) {
                    if (this.socketIOServer) {
                        this.socketIOServer.emit("NewProductRecordCreated", saved);
                    }
                    response.header("Access-Control-Allow-Origin", "*").status(200).send(saved);
                }
            } catch (error) {
                console.log(error);
                throw error;
            }

        });
    }
    get Router() {
        return this.router;
    }
}


export {
    ProductRouting
};
