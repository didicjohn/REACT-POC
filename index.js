import { SingleProcessHosting } from './hosting';
const DEFAULT_APP_PORT = 9090;
class MainClass {
    static async main() {
        try {
            let portNumber = process.env.APP_PORT || DEFAULT_APP_PORT;
            let host = new SingleProcessHosting(portNumber);
            await host.startServer();
            console.log('Product API Server started..');
            let stopServer = async () => {
                await host.stopServer();
                console.log("server stopped");
            }
            process.on('exit', stopServer);
            process.on('SIGINT', stopServer);
        }
        catch (error) {
            console.log(error);
        }
    }
}

MainClass.main();