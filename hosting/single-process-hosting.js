import express from 'express';
import { ProductRouting } from '../routing';
import http from 'http';
import bodyParser from 'body-parser';
import sio from 'socket.io';

const PRODUCT_SERVICE_URL = '/api/products';
class SingleProcessHosting {
    constructor(portNumber) {
        if (!portNumber) {
            throw new Error("Invalid port number");
        }
        this.portNumber = portNumber;
        this.app = express();
        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
          });
          
        this.httpServer = http.createServer(this.app);
        this.socketIOServer = sio.listen(this.httpServer)
        this.productRouting = new ProductRouting(this.socketIOServer );
        this.initializeApp();

    }
    // initializeApp() {
    //     this.app.use(bodyParser.json());
    //     bodyParser.urlencoded({extended:true})
    //     this.app.use(PRODUCT_SERVICE_URL, this.productRouting.Router);
    //     this.app.use(express.static('web-content'));
    // }
    
    initializeApp() {
		this.app.use(this.applyCors);
        this.app.use(bodyParser.json());
        this.app.use(PRODUCT_SERVICE_URL, this.productRouting.Router);
        this.app.use(express.static('web-content'));
    }
	
	applyCors(request, response, next) {
		response.header('Access-Control-Allow-Credentials', 'true');
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        next();		
	}
    startServer() {
        let promise = new Promise((resolve, reject) => {
            this.httpServer.listen(this.portNumber, () => { resolve(); });
        });
        return promise;
    }

    stopServer() {
        let promise = new Promise((resolve, reject) => {
            this.httpServer.close(() => { resolve(); });
        });
        return promise;
    }
}

export {
    SingleProcessHosting
}