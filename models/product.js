
import { ObjectFormatter } from '../utilities';
const DELIMITER = ',';

class Product {
    constructor(ProductId, Title, Description, UnitPrice, SellingPrice, UnitsInStock, Remarks, ProductPhotoURL) {
        [this.ProductId, this.Title, this.Description,  this.UnitPrice, this.SellingPrice, this.UnitsInStock, this.Remarks, this.ProductPhotoURL] = arguments;
    }

    toString() {
        return ObjectFormatter.format(this);
    }
}

export {
    Product
};
