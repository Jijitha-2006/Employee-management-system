import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),
  // keepUnusedDataFor: 0,

  endpoints: (builder) => ({
    // Get users for name and email matching
    getUserByName: builder.query({
      query: () => "users?limit=0",
    }),

    // Get all users with pagination and search
//     getUser: builder.query({
//   async queryFn(
//     {
//       search = "",
//       age = "",
//       limit = 10,
//       skip = 0,
//       sortBy = "firstName",
//       order = "asc",
//     },
//     _api,
//     _extraOptions,
//     fetchWithBQ
//   ) {
//     // 1. Fetch all users or search results
//     const endpoint = search.trim()
//       ? `/users/search?q=${encodeURIComponent(search.trim())}&limit=0`
//       : `/users?limit=0`;

//     const result = await fetchWithBQ(endpoint);

//     if (result.error) {
//       return { error: result.error };
//     }

//     let users = [...result.data.users];

//     // 2. Apply age filter
//     if (age !== "") {
//       users = users.filter(
//         (user) => user.age === Number(age)
//       );
//     }

//     // 3. Apply sorting
//     users.sort((a, b) => {
//       const valueA = a[sortBy];
//       const valueB = b[sortBy];

//       if (valueA < valueB) {
//         return order === "asc" ? -1 : 1;
//       }

//       if (valueA > valueB) {
//         return order === "asc" ? 1 : -1;
//       }

//       return 0;
//     });

//     // 4. Calculate total after filtering
//     const total = users.length;

//     // 5. Apply pagination
//     const paginatedUsers = users.slice(
//       skip,
//       skip + limit
//     );

//     return {
//       data: {
//         users: paginatedUsers,
//         total,
//         skip,
//         limit,
//       },
//     };
//   },
// }),

    getUser: builder.query({
  query: ({ limit , skip  }) =>
    `/users?limit=${limit}&skip=${skip}`,
}),
    // Get one user by ID
    getUserById: builder.query({
      query: (id) => `users/${id}`,
    }),

    // Add a user
    addUser: builder.mutation({
      query: (newUser) => ({
        url: "users/add",
        method: "POST",
        body: newUser,
      }),
    }),

    deleteUser: builder.mutation({
  query: (id) => ({
    url: `/users/${id}`,
    method: "DELETE",
  }),
}),
  }),
});

export const {
  useGetUserByNameQuery,
  useGetUserQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useDeleteUserMutation,
} = api;