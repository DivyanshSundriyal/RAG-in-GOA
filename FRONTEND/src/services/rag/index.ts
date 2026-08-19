import type { RagService } from './RagService';
import { MockRagService } from './MockRagService';
import { ApiRagService } from './ApiRagService';

let mockInstance: RagService | null = null;

/**
 * Prefer the real FastAPI backend unless demo/mock mode is explicitly requested.
 */
export function getRagService(useRealBackend: boolean = true, fastDemo: boolean = false): RagService {
  if (!useRealBackend || fastDemo) {
    if (!mockInstance) {
      mockInstance = new MockRagService(fastDemo);
    }
    return mockInstance;
  }

  return new ApiRagService();
}

export type { RagService };
export * from './MockRagService';
export * from './ApiRagService';
export * from './SarvamService';
