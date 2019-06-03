import { Injectable } from '@angular/core';
import { Socket } from "ngx-socket-io"

@Injectable()
export class UserSocket extends Socket{
    constructor(domain: string, port: number){
        super({url: domain+port, options: {}})
    }
}