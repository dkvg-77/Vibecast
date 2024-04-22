import { prismaClient } from "../clients/db";
import { redisClient } from "../clients/redis";

export interface CreatePostPayload {
     content: string;
     imageURL?: string
     userId: string
}


class PostService {
     public static async createPost(data: CreatePostPayload) {

          const post =  prismaClient.post.create({
               data: {
                    content: data.content,
                    imageURL: data.imageURL,
                    author: { connect: { id: data.userId } },
               }

          })
          await redisClient.del('ALL_POSTS');
          return post;
     }

     public static async getAllPosts(){
          const cachedPosts = await redisClient.get('ALL_POSTS');
          if(cachedPosts) {
               return JSON.parse(cachedPosts); 
          }
          const posts = await prismaClient.post.findMany({orderBy:{createdAt:"desc"}});
          await redisClient.set('ALL_POSTS', JSON.stringify(posts))
          return posts;
     }
}
export default PostService