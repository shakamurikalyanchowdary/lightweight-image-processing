export type Tconfig = {
    port: number
}
export type Tupload = {
    flagUrl: boolean,
    url?: string,
    data?: any,
    extension: string,
    name:string
}
export abstract class ILightWeightImp {
    constructor(config: Tconfig) { };
    abstract upload(upload: Tupload): Promise<string>;
    abstract delete(name: String): Promise<string>;
    abstract crop(name: string): Promise<string>;
    abstract resize(name: string): Promise<string>;
    abstract getlist(): Promise<[]>
}