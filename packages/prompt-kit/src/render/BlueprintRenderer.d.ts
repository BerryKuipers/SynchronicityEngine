import { IRenderer } from '../contracts/PromptContracts';
import { Blueprint } from '../types';
export declare class BlueprintRenderer implements IRenderer<Blueprint> {
    render(input: Blueprint): string;
}
