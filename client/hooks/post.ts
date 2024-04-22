import { graphqlClient } from "@/clients/api"

import { useMutation, useQuery, QueryClient, useQueryClient } from '@tanstack/react-query';
import { getAllPostsQuery } from '@/graphql/query/post';
import { createPostMutation } from "@/graphql/mutations/post";
import { CreatePostData } from "@/gql/graphql";
import toast from "react-hot-toast";

export const useCreatePost = () =>{
     const queryClient = useQueryClient();
     const mutation = useMutation({
          mutationFn: (payload: CreatePostData) =>graphqlClient.request(createPostMutation,{payload}),
          onMutate: (payload) =>toast.loading('Creating post',{id:'1'}),
          onSuccess:async (payload) => {queryClient.invalidateQueries(["all-posts"])
          toast.success('Post successfull'),{id:'1'}},
     })
     return mutation;
}

export const useGetAllPosts = () =>{
     const query = useQuery({
          queryKey: ["all-posts"],
          queryFn:() => graphqlClient.request(getAllPostsQuery),
     })
     return {...query,posts: query.data?.getAllPosts}
}