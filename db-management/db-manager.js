import Mongoose from 'mongoose'
import { ProductSchema } from '../schemas'

class DbManager {
    constructor() {
        this.connection = Mongoose;
        this.connection.Promise = global.Promise;
        this.productModel = this.connection.model("products",Mongoose.Schema(ProductSchema));
    }
}

export {
    Mongoose,
    DbManager
};
