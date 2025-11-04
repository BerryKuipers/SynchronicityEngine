import { generate } from '../adapters/DirectOpenAIAdapter';

describe('DirectOpenAiAdapter', () => {
  if (process.env.OPENAI_API_KEY && process.env.STRICT_JSON === 'true') {
    it('should throw an error when STRICT_JSON is true and no tool call is returned', async () => {
      // This test is difficult to mock reliably without a mock server,
      // so we'll test the principle with a prompt that's unlikely to trigger a tool call.
      await expect(
        generate('You are a helpful assistant.', 'Tell me a joke.')
      ).rejects.toThrow('STRICT_JSON: No tool call was returned.');
    });
  } else {
    it.skip('Skipping OpenAI tests due to missing API key or STRICT_JSON=false', () => {});
  }
});
