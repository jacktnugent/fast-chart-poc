import * as express from "express";
import * as helmet from "helmet";
import * as morgan from "morgan";
import * as compression from "compression";
import * as request from "request";
import * as bodyParser from "body-parser";

import { MicroAppNavMenu } from "./microapp-nav-menu";
import { VcapServices } from "./vcap-services";

export class Server {
    constructor(private app: express.Express, private port: number, private vcapServices: VcapServices) {
        this.configureMiddleware();
        this.configureMicroAppTab();
        this.configureRoutes();
    }

    private configureMiddleware() {
        console.info("Configuring middleware...");

        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(express.static('public'));
        this.app.use(morgan('dev'));
    }

    private configureMicroAppTab() {
        console.info("Configuring microapp tab...");

        this.app.get('/nav', (req, response) => {
            let navMenu: MicroAppNavMenu = {
                label: 'Chart Performance',
                icon: 'fa-wrench',
                path: '/#/'
            };

            response.send([navMenu]);
        });
    }

    private configureRoutes() {
        console.info("Configuring routes...");

        const advisoryUrl: string = 'advisory';
        const assetsUrl: string = 'assets';
        const tagsUrl: string = 'tags';
        const modesUrl: string = 'modes';
        const modelsUrl: string = 'models';
        const modelTagsUrl: string = 'modeltags';
        const downloadTransferFileUrl: string = 'exporttransferfile';
        const jobsUrl: string = 'jobs';

        // Ping request to determine if this service is still alive.
        this.app.get('/ping', (request, response) => {
            response.sendStatus(200);
        });

        this.app.get(`/tagInfo`, (req, res) => {
            this.getItemData(req.originalUrl, req, res);
        });
    }

    private getItemData(endpoint: string, req: express.Request, response: express.Response, baseUrl?: string, formatAsJson: boolean = true) {
        try {
            //let url = baseUrl || this.vcapServices.getSsAssetUrl();
            let url = "http://localhost:7781";

            let options = {
                url: url + endpoint,
                headers: {
                    tenant: req.get("tenant"),
                    authorization: req.get("authorization")
                },
                json: true
            };

            if (formatAsJson) {
                options['json'] = true;
            }

            console.log(`==> GET ${options.url}`);

            request.get(options, (error, itemsResponse, body) => {
                if (error) {
                    console.error(error);
                    let status = (itemsResponse && itemsResponse.statusCode) ? itemsResponse.statusCode : 500;
                    response.status(status).send(body);
                } else {
                    response.status(itemsResponse.statusCode).send(body);
                }
            });
        } catch (exception) {
            console.error(`General exception when calling ${endpoint}:`);
            console.error(exception);
            response.status(500).send({ error: exception });
        }
    }

    private putItemData(endpoint: string, req: express.Request, response: express.Response, baseUrl?: string,) {
        try {
            let url = baseUrl || this.vcapServices.getSsAssetUrl();

            let options = {
                url: url + endpoint,
                headers: {
                    tenant: req.get('tenant'),
                    authorization: req.get('authorization')
                },
                json: true,
                body: req.body
            };

            console.log(`==> PUT ${options.url}`);
            console.log('==> PUT body: ' + JSON.stringify(options.body));

            request.put(options, (error, itemsResponse, body) => {
                if (error) {
                    console.error(error);
                    let status = (itemsResponse && itemsResponse.statusCode) ? itemsResponse.statusCode : 500;
                    response.status(status).send(body);
                } else {
                    response.status(itemsResponse.statusCode).send(body);
                }
            });

        } catch (exception) {
            console.error(`General exception when calling ${endpoint}:`);
            console.error(exception);
            response.status(500).send({ error: exception });
        }
    }

    private postItemData(endpoint: string, req: express.Request, response: express.Response, baseUrl: string) {
        try {
            let options = {
                url: baseUrl + endpoint,
                headers: {
                    tenant: req.get("tenant"),
                    authorization: req.get("authorization")
                },
                json: true,
                body: req.body
            };

            console.log(`==> POST ${options.url}`);
            console.log("==> POST body: " + JSON.stringify(options.body));

            request.post(options, (error, itemsResponse, body) => {
                if (error) {
                    console.error(error);
                    let status = (itemsResponse && itemsResponse.statusCode) ? itemsResponse.statusCode : 500;
                    response.status(status).send(body);
                } else {
                    response.status(itemsResponse.statusCode).send(body);
                }
            });

        } catch (exception) {
            console.error(`General exception when calling ${endpoint}:`);
            console.error(exception);
            response.status(500).send({ error: exception });
        }
    }

    public start() {
        this.app.listen(this.port, () => console.log(`${process.env.npm_package_name} is listening on port ${this.port}...`));
    }
}
