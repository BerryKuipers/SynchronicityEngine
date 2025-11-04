import { IRenderer } from '../contracts/PromptContracts';
import { WorldState } from '../types';
export declare class WorldStateRenderer implements IRenderer<WorldState> {
    render(input: WorldState): string;
}
