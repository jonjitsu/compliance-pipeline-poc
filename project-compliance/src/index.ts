import {
  logger,
  type Character,
  type IAgentRuntime,
  type Project,
  type ProjectAgent,
} from '@elizaos/core';
import starterPlugin from './plugin.ts';
import { elizaAgent } from './agents/eliza.ts';
import { dreddAgent } from './agents/dredd.ts';

const project: Project = {
  agents: [elizaAgent, dreddAgent],
};

export default project;
