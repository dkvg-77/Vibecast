import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import { User } from './user'
import cors from 'cors';
import { GraphqlContext } from '../interfaces';
import JWTService from '../services/jwt';
import { Post } from './post';



export async function initServer() {
     const app = express();
     app.use(bodyParser.json())
     app.use(cors());
     const graphqlServer = new ApolloServer<GraphqlContext>({
          typeDefs: `
          
               ${User.types}
               ${Post.types}

               type Query{
                    ${User.queries}
                    ${Post.queries}
               }
               type Mutation{
                    ${Post.mutations}
                    ${User.mutations}
               }
          `,
          resolvers: {
               Query: {
                    ...User.resolvers.queries,
                    ...Post.resolvers.queries,
                    
               },
               Mutation:{
                    ...Post.resolvers.mutations,
                    ...User.resolvers.mutations,
               },
               ...Post.resolvers.extraResolvers,
               ...User.resolvers.extraResolvers,
          },

     });

     await graphqlServer.start()

     app.use('/graphql', expressMiddleware(graphqlServer
          , {
               context: async ({ req, res }) => {
                    return {
                         user: req.headers.authorization ? JWTService.decodeToken(req.headers.authorization.split('Bearer ')[1]) : undefined,
                    }
               }
          }
     ));

     return app;
}

