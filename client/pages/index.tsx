
import FeedCard from "@/components/FeedCard";

import { useCreatePost, useGetAllPosts } from "@/hooks/post";
import { Post } from "@/gql/graphql";

import AppLayout from "@/components/Layout/AppLayout";

import { GetServerSideProps } from "next";
import { graphqlClient } from "@/clients/api";
import { getAllPostsQuery, getSignedURLForPostQuery } from "@/graphql/query/post";


interface HomeProps {
  posts?: Post[]
}


export default function Home(props: HomeProps) {



  const {posts = props.posts as Post[]} = useGetAllPosts();



  return (
    <AppLayout>
    
      {
        posts?.map(post => post ? <FeedCard key={post?.id} data={post as Post} /> : null)
      }
    </AppLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const allPosts = await graphqlClient.request(getAllPostsQuery);
  return {
    props: {
      posts: allPosts.getAllPosts as Post[],
    }
  }
}


