import { CrudService } from '../services/crud.service.js';
import { prisma, type WorkLog } from '@repo/database';
import type { CreateWorkLog, UpdateWorkLog } from '@repo/schemas';

export class WorkLogService extends CrudService<WorkLog, CreateWorkLog, UpdateWorkLog> {
  protected model = prisma.workLog;
}
export const workLogService = new WorkLogService();
