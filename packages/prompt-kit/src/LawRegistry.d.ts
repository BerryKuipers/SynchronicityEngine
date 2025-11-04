import { IPromptRegistry } from './contracts/PromptContracts';
import { Layer } from './types';
export declare class LawRegistry implements IPromptRegistry<{
    layer: Layer;
}, {
    version: string;
}> {
    private basePath;
    constructor(basePath: string);
    load(key: {
        layer: Layer;
    }, version: {
        version: string;
    }): Promise<{
        path: string;
        body: string;
    }>;
}
