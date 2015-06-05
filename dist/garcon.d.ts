import { Injector, Annotable } from 'stimpack';
import Context from './Context';
export interface RequestHandler {
    handleRequest(ctx: Context): Promise<any>;
}
export interface RequestHandlerConstructor extends Annotable {
    prototype: RequestHandler;
}
export default class Server {
    private injector;
    static Context: typeof Context;
    private server;
    private routes;
    constructor(injector: Injector);
    listen(port: number, hostname?: string, backlog?: number): void;
    get(route: string, handler: RequestHandlerConstructor): void;
    private handleRequest(req, res);
}
