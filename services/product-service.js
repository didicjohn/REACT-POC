import { DbManager } from "../db-management/db-manager";
import {  ConnectionStringBuilder } from '../config';

const INVALID_ARGUMENTS = 'Invalid arguments specified!';

class ProductService {
    constructor() {
        this.dbManager = new DbManager();
    }
    async getProducts() {
        try {
            let connectionString = ConnectionStringBuilder.getConnectionString();
            await this.dbManager.connection.connect(connectionString, { useNewUrlParser: true });
            let products =await this.dbManager.productModel.find();//.limit(10);
            return products;
        }
        catch (error) {
            console.log(error)
            throw error;
        } finally {
            await this.dbManager.connection.disconnect();
        }
    }
    
    async  getProductDetail(productId) {
        if (!productId) {
            throw new Error(INVALID_ARGUMENTS);
        }
        try {
            let connectionString = ConnectionStringBuilder.getConnectionString();
            await this.dbManager.connection.connect(connectionString, { useNewUrlParser: true });
            let products =await this.dbManager.productModel.find({ ProductId: productId });
            return products;
        }
        catch (error) {
            console.log(error)
            throw error;
        } finally {
            await this.dbManager.connection.disconnect();
        }
    }
    
    async  delteProduct(productId) {
        if (!productId) {
            throw new Error(INVALID_ARGUMENTS);
        }
        try {
            let connectionString = ConnectionStringBuilder.getConnectionString();
            await this.dbManager.connection.connect(connectionString, { useNewUrlParser: true });
            let products =await this.dbManager.productModel.remove({ ProductId: productId });
            return products;
        }
        catch (error) {
            console.log(error)
            throw error;
        } finally {
            await this.dbManager.connection.disconnect();
        }
    }
    async  getProductByName(title) {
        if (!title) {
            throw new Error(INVALID_ARGUMENTS);
        }
        try {
            let connectionString = ConnectionStringBuilder.getConnectionString();
            await this.dbManager.connection.connect(connectionString, { useNewUrlParser: true });
            let product =await this.dbManager.productModel.find( { Title: new RegExp('.*'+title+'.*', 'i') } );
            return product;
        }
        catch (error) {
            console.log(error)
            throw error;
        } finally {
            await this.dbManager.connection.disconnect();
        }
    }
    async addNewProduct(product) {
       let validation = product && product.ProductId && product.UnitPrice;
       if(!validation) {
        throw new Error(INVALID_ARGUMENTS);
    }
        try {
            let connectionString = ConnectionStringBuilder.getConnectionString();
            await this.dbManager.connection.connect(connectionString, { useNewUrlParser: true });
            let saved =await this.dbManager.productModel.create(product);
            return saved;
        }
        catch (error) {
            console.log(error)
            throw error;
        } finally {
            await this.dbManager.connection.disconnect();
        }
    }

}
export {
    ProductService
};
