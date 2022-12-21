import express from 'express';
import thread from 'threads';
import { ILightWeightImp } from 'light-weight-imp-common'
const app = express()
import zx from 'zx';

export class LWII extends ILightWeightImp {
    async getlist(): Promise<[]> {
        let data: any = await zx.$`cd ../storage && ls`
        let fileList: [] = data['stdout'].split('\n')
        return fileList
    }
    async upload(): Promise<string> {
        throw new Error('Method not implemented.');
    }
    async delete(name: String): Promise<string> {
        throw new Error('Method not implemented.');
    }
    async crop(name: string): Promise<string> {
        throw new Error('Method not implemented.');
    }
    async resize(name: string): Promise<string> {
        throw new Error('Method not implemented.');
    }
}