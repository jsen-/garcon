import * as http from 'http';

export default class Context {

    constructor(public req: http.ServerRequest, public res: http.ServerResponse) {

    }
}