import { PromptAssemblyInput, ChatAssembly } from './types';
export declare function assembleChat(i: PromptAssemblyInput): Promise<ChatAssembly>;
/**
 * @deprecated Use assembleChat instead.
 */
export declare function assemblePrompt(i: PromptAssemblyInput): Promise<{
    prompt: string;
    meta: ChatAssembly['meta'];
}>;
