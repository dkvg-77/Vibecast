import type { GetServerSideProps, NextPage } from 'next';
import TwitterLayout from '../components/Layout/AppLayout';
import { BsArrowLeftShort } from 'react-icons/bs';
import { useCurrentUser } from '@/hooks/user';
import Image from 'next/image';
import { Post, User } from '@/gql/graphql';
import FeedCard from '@/components/FeedCard';
import { useRouter } from 'next/router';
import { graphqlClient } from '@/clients/api';
import { getUserByIdQuery } from '@/graphql/query/user';
import { useCallback, useMemo } from 'react';
import { followUserMutation, unfollowUserMutation } from '@/graphql/mutations/user';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

interface ServerProps {
     userInfo?: User
}

const UserProfilePage: NextPage<ServerProps> = (props) => {

     const router = useRouter();
     const queryClient = useQueryClient()
     const { user: currentUser } = useCurrentUser();

     const amIFollowing = useMemo(() => {
          if (!props.userInfo) return false;
          return (
               (currentUser?.following?.findIndex((el) => el?.id === props.userInfo?.id) ?? -1) >= 0
          );
     }, [currentUser?.following, props.userInfo])

     const handleFollowUser = useCallback(async () =>{
          if(!props.userInfo?.id) return;
          await graphqlClient.request(followUserMutation, {to:props.userInfo?.id})

          await queryClient.invalidateQueries(['current-user']);
     },[props.userInfo?.id, queryClient])

     const handleUnfollowUser = useCallback(async () =>{
          if(!props.userInfo?.id) return;
          await graphqlClient.request(unfollowUserMutation, {to:props.userInfo?.id})

          await queryClient.invalidateQueries(['current-user']);
     },[props.userInfo?.id, queryClient])

     return (
          <div>
               <TwitterLayout>
                    <div>
                         <nav className='flex items-center gap-3 py-3 px-3'>
                              <Link href={'../'}><BsArrowLeftShort className='text-4xl' />
                              </Link>
                              
                              <div>
                                   <h1 className='text-2xl font-bold'>{props.userInfo?.firstName} {props.userInfo?.lastName} </h1>
                                   <h1 className='text-md font-bold text-slate-500'>{props.userInfo?.posts?.length} shares</h1>
                              </div>

                         </nav>

                         <div className='p-4 border-b border-slate-800'>
                              {props.userInfo?.profileImageURL && (
                                   <Image
                                        src={props.userInfo?.profileImageURL}
                                        alt='user-image'
                                        className='rounded-full'
                                        width={100}
                                        height={100}
                                   />
                              )}
                              <h1 className='text-2xl font-bold mt-5'>{props.userInfo?.firstName} {props.userInfo?.lastName}
                              </h1>
                              <div className='flex justify-between pr-16 items-center'>
                                   <div className='flex gap-4 mt-2 text-sm text-gray-400'>
                                        <span>{props.userInfo?.followers?.length} followers </span>
                                        <span>{props.userInfo?.following?.length} following </span>
                                   </div>
                                   {
                                        currentUser?.id !== props.userInfo?.id && (
                                             <>
                                                  {amIFollowing ? (<button onClick={handleUnfollowUser}className='bg-white text-black px-3 py-1 rounded-full text-sm'>Unfollow</button>) :
                                                  (
                                                       <button onClick={handleFollowUser} className='bg-white text-black px-3 py-1 rounded-full text-sm'>Follow</button>
                                                  )}
                                             </>
                                        )
                                   }

                                   
                              </div>
                         </div>
                         <div>
                              {props.userInfo?.posts?.map((post) =>
                                   <FeedCard data={post as Post} key={post?.id} />
                              )}
                         </div>
                    </div>
               </TwitterLayout>
          </div>
     )
}

// Below is code for server side rendering
export const getServerSideProps: GetServerSideProps = async (context) => {
     const id = context.query.id as string | undefined;
     if (!id) return { notFound: true, props: { userInfo: undefined } }
     const userInfo = await graphqlClient.request(getUserByIdQuery, { id })

     if (!userInfo?.getUserById) return { notFound: true };

     return {
          props: {
               userInfo: userInfo.getUserById as User
          },
     }
}
export default UserProfilePage;