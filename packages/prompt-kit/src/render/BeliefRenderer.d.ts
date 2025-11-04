import { IRenderer } from '../contracts/PromptContracts';
import { BeliefOverlay } from '../types';
export declare class BeliefRenderer implements IRenderer<BeliefOverlay> {
    render(input: BeliefOverlay): string;
}
