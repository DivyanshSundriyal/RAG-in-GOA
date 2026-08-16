import type { RagService } from './RagService';
import { MockRagService } from './MockRagService';
import { ApiRagService } from './ApiRagService';

let serviceInstance: RagService | null = null;

export function getRagService(useRealBackend: boolean = false, fastDemo: boolean = false): RagService {
  if (useRealBackend) {
    return new ApiRagService();
  }
  
  if (!serviceInstance) {
    serviceInstance = new MockRagService(fastDemo);
  }
  
  return serviceInstance;
}

export type { RagService };
export * from './MockRagService';
export * from './ApiRagService';
export * from './SarvamService';
