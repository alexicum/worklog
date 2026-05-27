import { CrudService } from '#api/services/crud.service.js';
import { prisma, WorkLog } from '@repo/database';
import { CreateWorkLog, UpdateWorkLog } from '@repo/schemas';

export class WorkLogService extends CrudService<WorkLog, CreateWorkLog, UpdateWorkLog> {
  protected model = prisma.workLog;
}
export const workLogService = new WorkLogService();
