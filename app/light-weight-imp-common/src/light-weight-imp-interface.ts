export type Tconfig = {
    port: number
}
export abstract class ILightWeightImp {
    constructor(config: Tconfig) { };
    abstract upload(): Promise<string>;
    abstract delete(name: String): Promise<string>;
    abstract crop(name: string): Promise<string>;
    abstract resize(name: string): Promise<string>;
}