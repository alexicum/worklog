import { baseApi } from '@/shared/api';
import type { WorkLog, CreateWorkLog } from '@repo/schemas';

export const worklogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Получение всех записей журнала работ
     */
    getWorkLogs: builder.query<WorkLog[], void>({
      query: () => '/worklog',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'WorkLog' as const, id })),
              { type: 'WorkLog', id: 'LIST' },
            ]
          : [{ type: 'WorkLog', id: 'LIST' }],
    }),

    /**
     * Создание новой записи в журнале
     */
    createWorkLog: builder.mutation<WorkLog, CreateWorkLog>({
      query: (body) => ({
        url: '/worklog',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'WorkLog', id: 'LIST' }],
    }),

    /**
     * Удаление записи по id (UUID)
     */
    deleteWorkLog: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/worklog/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'WorkLog', id },
        { type: 'WorkLog', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetWorkLogsQuery,
  useCreateWorkLogMutation,
  useDeleteWorkLogMutation,
} = worklogApi;
