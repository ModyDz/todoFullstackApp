import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { todoData } from "../../types";

export const apiSlice = createApi({
  reducerPath: "ApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://todofullstackapp00.herokuapp.com/api/",
  }),
  tagTypes: ["User", "Todos"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query(data) {
        return {
          url: "user/register",
          method: "POST",
          body: data,
        };
      },
    }),
    loginUser: builder.mutation({
      query(data) {
        return {
          url: "user/login",
          method: "POST",
          body: data,
        };
      },
    }),
    updatePicture: builder.mutation({
      query(data) {
        return {
          url: "user/upload",
          method: "PUT",
          body: data,
          headers: { authorization: data.bearer },
        };
      },
    }),
    searchUsers: builder.query({
      query(data) {
        return {
          url: `user/search?q=${data}`,
          method: "GET",
        };
      },
    }),
    getUser: builder.query({
      query(username: string) {
        return {
          url: `user/${username}`,
          method: "GET",
        };
      },
    }),
    getTodos: builder.query({
      query(user: string) {
        return {
          method: "GET",
          url: "todo/me",
          headers: { authorization: `Bearer ${user}` },
        };
      },
      providesTags: ["Todos"],
    }),
    postTodo: builder.mutation({
      query(data: todoData) {
        return {
          method: "POST",
          url: "todo/",
          body: data,
          headers: { authorization: `Bearer ${data.token}` },
        };
      },
      invalidatesTags: ["Todos"],
    }),
    toggleTodo: builder.mutation({
      query(data: todoData) {
        return {
          method: "PUT",
          url: `todo/${data.todoId}`,
          headers: { authorization: `Bearer ${data.token}` },
        };
      },
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query(data: todoData) {
        return {
          method: "DELETE",
          url: `todo/${data.todoId}`,
          headers: { authorization: `Bearer ${data.token}` },
        };
      },
      invalidatesTags: ["Todos"],
    }),
    getUserTodos: builder.query({
      query(username: string) {
        return {
          method: "GET",
          url: `todo/${username}`,
        };
      },
    }),
  }),
});
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdatePictureMutation,
  useLazySearchUsersQuery,
  useGetTodosQuery,
  usePostTodoMutation,
  useToggleTodoMutation,
  useDeleteTodoMutation,
  useGetUserQuery,
  useGetUserTodosQuery,
} = apiSlice;
