/// <reference path="../typings/tsd.d.ts" />
import * as http from 'http';

import { Inject, Injector, Annotable } from 'stimpack';
import { default as pathToRegexp, PathToRegExpKey } from 'path-to-regexp';

import Context from './Context';
export { Context };

export interface RequestHandler {
    handleRequest(ctx: Context): Promise<any>;
}

export interface RequestHandlerConstructor extends Annotable {
    prototype: RequestHandler;
}

export interface Logger {
    info(message:string);
    warn(message:string);
    error(message:string);
}

@Inject
export class Garcon {

    private server: http.Server;

    private routes: Map<RegExp, [RequestHandler, PathToRegExpKey[]]> = new Map<RegExp, [RequestHandler, PathToRegExpKey[]]>();

    constructor(private injector: Injector, private logger?: Logger) {
        this.server = new http.Server();
        this.server.on('request', (req: http.ServerRequest, res: http.ServerResponse) => {
            this.handleRequest(req, res);
        });
    }

    listen(port: number, hostname?: string, backlog?: number) {
        this.server.listen(port, hostname, backlog, (...args) => {
            this.info(`Listening on ${port}`);
            console.log(1);
        });
        this.server.once('listening', (...args) => {
            this.info(`Listening on ${port}`);
            console.log(...args);
        });
        console.log(2);
    }

    get(route: string, handler: RequestHandlerConstructor) {
        const keys = [];
        const re = pathToRegexp(route, keys, { sensitive: true });
        const hndl = this.injector.get(handler);
        this.routes.set(re, [hndl, keys]);
    }

    private async handleRequest(req: http.ServerRequest, res: http.ServerResponse) {
        const ctx = new Context(req, res);
        try {
            for (let [route, [handler, keys]] of this.routes) {
                if (route.test(req.url)) {
                    await handler.handleRequest(ctx);
                }
            }
        } catch (e) {
            res.statusCode = 500;
            res.end(e.stack);
        }
    }

    private info(message: string) {
        this.logger && this.logger.info(message);
    }
    private warn(message: string) {
        this.logger && this.logger.warn(message);
    }
    private error(message: string) {
        this.logger && this.logger.error(message);
    }
}