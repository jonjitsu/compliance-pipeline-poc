import { describe, expect, it } from 'vitest';
import { elizaCharacter } from '../src/agents/eliza';

describe('Character Configuration', () => {
  it('should have all required fields', () => {
    expect(elizaCharacter).toHaveProperty('name');
    expect(elizaCharacter).toHaveProperty('bio');
    expect(elizaCharacter).toHaveProperty('plugins');
    expect(elizaCharacter).toHaveProperty('system');
    expect(elizaCharacter).toHaveProperty('messageExamples');
  });

  it('should have the correct name', () => {
    expect(elizaCharacter.name).toBe('Eliza');
  });

  it('should have plugins defined as an array', () => {
    expect(Array.isArray(elizaCharacter.plugins)).toBe(true);
  });

  it('should have conditionally included plugins based on environment variables', () => {
    // This test is a simple placeholder since we can't easily test dynamic imports in vitest
    // The actual functionality is tested at runtime by the starter test suite

    // Save the original env values
    const originalOpenAIKey = process.env.OPENAI_API_KEY;
    const originalAnthropicKey = process.env.ANTHROPIC_API_KEY;

    try {
      // Verify if plugins array includes the core plugin
      expect(elizaCharacter.plugins).toContain('@elizaos/plugin-sql');

      // Plugins array should have conditional plugins based on environment variables
      if (process.env.OPENAI_API_KEY) {
        expect(elizaCharacter.plugins).toContain('@elizaos/plugin-openai');
      }

      if (process.env.ANTHROPIC_API_KEY) {
        expect(elizaCharacter.plugins).toContain('@elizaos/plugin-anthropic');
      }
    } finally {
      // Restore original env values
      process.env.OPENAI_API_KEY = originalOpenAIKey;
      process.env.ANTHROPIC_API_KEY = originalAnthropicKey;
    }
  });

  it('should have a non-empty system prompt', () => {
    expect(elizaCharacter.system).toBeTruthy();
    if (elizaCharacter.system) {
      expect(typeof elizaCharacter.system).toBe('string');
      expect(elizaCharacter.system.length).toBeGreaterThan(0);
    }
  });

  it('should have personality traits in bio array', () => {
    expect(Array.isArray(elizaCharacter.bio)).toBe(true);
    if (elizaCharacter.bio && Array.isArray(elizaCharacter.bio)) {
      expect(elizaCharacter.bio.length).toBeGreaterThan(0);
      // Check if bio entries are non-empty strings
      elizaCharacter.bio.forEach((trait) => {
        expect(typeof trait).toBe('string');
        expect(trait.length).toBeGreaterThan(0);
      });
    }
  });

  it('should have message examples for training', () => {
    expect(Array.isArray(elizaCharacter.messageExamples)).toBe(true);
    if (elizaCharacter.messageExamples && Array.isArray(elizaCharacter.messageExamples)) {
      expect(elizaCharacter.messageExamples.length).toBeGreaterThan(0);

      // Check structure of first example
      const firstExample = elizaCharacter.messageExamples[0];
      expect(Array.isArray(firstExample)).toBe(true);
      expect(firstExample.length).toBeGreaterThan(1); // At least a user message and a response

      // Check that messages have name and content
      firstExample.forEach((message) => {
        expect(message).toHaveProperty('name');
        expect(message).toHaveProperty('content');
        expect(message.content).toHaveProperty('text');
      });
    }
  });
});
