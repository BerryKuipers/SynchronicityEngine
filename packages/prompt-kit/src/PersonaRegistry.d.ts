import { IPromptRegistry } from './contracts/PromptContracts';
export declare class PersonaRegistry implements IPromptRegistry<null, {
    version: string;
}> {
    private basePath;
    constructor(basePath: string);
    load(key: null, version: {
        version: string;
    }): Promise<{
        path: string;
        body: string;
    }>;
}
