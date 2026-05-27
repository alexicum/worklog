import { Type, Static } from '@sinclair/typebox';

export const WorkLogSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  doneAt: Type.String({ format: 'date-time' }),
  workTypeName: Type.String(),
  volume: Type.Number(),
  workTypeUnit: Type.String(),
  workerName: Type.String(),
  workerTypeName: Type.String()
});
export type WorkLog = Static<typeof WorkLogSchema>;

export const CreateWorkLogSchema = Type.Object({
  doneAt: Type.String({ format: 'date-time' }),
  workTypeName: Type.String(),
  volume: Type.Number(),
  workTypeUnit: Type.String(),
  workerName: Type.String(),
  workerTypeName: Type.String()
});
export type CreateWorkLog = Static<typeof CreateWorkLogSchema>;

export const UpdateWorkLogSchema = Type.Partial(CreateWorkLogSchema);
export type UpdateWorkLog = Static<typeof UpdateWorkLogSchema>;

export const ParamsWithIdSchema = Type.Object({
  id: Type.String({ format: 'uuid', description: 'Строковый UUID записи журнала' })
});
export type ParamsWithId = Static<typeof ParamsWithIdSchema>;

export const ErrorResponseSchema = Type.Object({
  message: Type.String()
});
export type ErrorResponse = Static<typeof ErrorResponseSchema>;
