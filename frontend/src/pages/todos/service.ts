import { usePagination } from "@/hooks/usePagination";
import { type BaseResponse, instance } from "@/service/axios";
import { useQuery } from "@tanstack/react-query";
import { useGlobalMutation } from "@/hooks/useGlobalMutation";
export type TodoStatus = "created" | "on_going" | "completed" | "problem";
export interface Todo {
  id?: string;
  title: string;
  status: TodoStatus;
  problem_desc: string;
  ai_recommendation?: string;
  created_at?: Date | any;
}

interface TodoResponse extends BaseResponse {
  data: Todo[];
}

const todoService = {
  list: async (params: { search: string }): Promise<TodoResponse> => {
    return instance.get("todos", { params }).then((n) => n.data);
  },
  create: async (title: string) => {
    return instance
      .post("/todos", {
        title,
      })
      .then((n) => n.data);
  },

  update: async (id: string, payload: Todo) => {
    return instance.patch(`/todos/${id}`, payload).then((n) => n.data);
  },
};

export const useGetList = () => {
  const { handleSearch, filterParams, params, search } = usePagination({
    page: 1,
    page_size: 10,
    search: "",
  });
  const { data, isFetching, error } = useQuery({
    queryFn: () =>
      todoService.list({
        search,
      }),
    queryKey: ["list/todos", { filterParams }],
    staleTime: 60 * 1000,
  });

  return { data, isFetching, handleSearch, params, search, error };
};

export const useCreate = () => {
  const create = useGlobalMutation(
    (title: string) => todoService.create(title),
    {
      onSuccess: async (_, __, ___, queryClient) => {
        queryClient.invalidateQueries({ queryKey: ["list/todos"] });
      },
    },
    "Berhasil Dibuat"
  );

  return create;
};

export const useUpdate = () => {
  const update = useGlobalMutation(
    (payload: Todo) => todoService.update(payload.id!, payload),
    {
      onSuccess: async (_, __, ___, queryClient) => {
        queryClient.invalidateQueries({ queryKey: ["list/todos"] });
      },
    },
    "Berhasil Diperharui"
  );

  return update;
};
