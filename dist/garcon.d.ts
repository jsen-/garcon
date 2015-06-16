declare module 'garcon/context' {
	import * as http from 'http';
	export default class Context {
	    req: http.ServerRequest;
	    res: http.ServerResponse;
	    constructor(req: http.ServerRequest, res: http.ServerResponse);
	}

}
declare module 'garcon/garcon' {
	/// <reference path="../typings/tsd.d.ts" />
	import { Injector, Annotable } from 'stimpack';
	import Context from './Context';
	export { Context };
	export interface RequestHandler {
	    handleRequest(ctx: Context): Promise<any>;
	}
	export interface RequestHandlerConstructor extends Annotable {
	    prototype: RequestHandler;
	}
	export interface Logger {
	    info(message: string): any;
	    warn(message: string): any;
	    error(message: string): any;
	}
	export class Garcon {
	    private injector;
	    private logger;
	    private server;
	    private routes;
	    constructor(injector: Injector, logger?: Logger);
	    listen(port: number, hostname?: string, backlog?: number): void;
	    get(route: string, handler: RequestHandlerConstructor): void;
	    private handleRequest(req, res);
	    private info(message);
	    private warn(message);
	    private error(message);
	}

}
declare module 'garcon' {
	export * from 'garcon/garcon';
}
