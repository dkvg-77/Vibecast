import React, { useMemo } from 'react';
import Image from "next/image";
import { TbShare } from "react-icons/tb";
import { SlUserFollow } from "react-icons/sl";
import { BiHomeCircle, BiMoney, BiUser, } from "react-icons/bi"
import { useCurrentUser } from '@/hooks/user';

import { GoogleLogin } from '@react-oauth/google'
import { CredentialResponse } from '@react-oauth/google';
import { useCallback, useState } from "react";
import toast from 'react-hot-toast';
import { graphqlClient } from '@/clients/api';
import { verifyUserGoogleTokenQuery } from '@/graphql/query/user';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { GetServerSideProps } from 'next';

interface AppLayoutProps {
     children: React.ReactNode
}

interface AppSidebarButton {
     title: String;
     icon: React.ReactNode;
     link: string;
}


const AppLayout: React.FC<AppLayoutProps> = (props) => {
     const { user } = useCurrentUser();
     const sideBarMenuItems: AppSidebarButton[] = useMemo(() => [
          {
               title: "Home",
               icon: <BiHomeCircle />,
               link: '/'
          },
          {
               title: 'Profile',
               icon: <BiUser />,
               link: `/${user?.id}`
          },
          {
               title: 'Users to follow',
               icon: <SlUserFollow />,
               link: '/recommendations'
          },
          {
               title: 'Share a Vibe',
               icon: <TbShare />,
               link: '/post'
          }
     ], [user?.id])


     const queryClient = useQueryClient();
     const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
          const googleToken = cred.credential;
          if (!googleToken) {
               return toast.error(`Google token not found`);

          }
          const { verifyGoogleToken } = await graphqlClient.request(verifyUserGoogleTokenQuery, { token: googleToken })

          toast.success('Verified Success');
          console.log(verifyGoogleToken);
          if (verifyGoogleToken) {
               window.localStorage.setItem('_app_token', verifyGoogleToken)
          }
     }, [queryClient])
     return (
          <div className='overflow-hidden pr-12'>
               <div className="grid grid-rows-12 h-screen w-screen ">
                    <div className="row-span-2 px-2 relative border-b-[1px] border-gray-600">
                         <div className='grid grid-cols-12'>
                              <div className="col-span-3 text-2xl h-fit w-fit ">
                                   <h1 className='text-5xl pl-24 pt-3' >
                                        <div className='hover:bg-gray-800 rounded-full cursor-pointer transition-all p-4'>VibeCast</div>


                                   </h1>
                              </div>
                              <div className="col-span-9 text-lg px-20">
                                   <div className='grid grid-cols-8' >
                                        {/* <ul> */}
                                        {sideBarMenuItems.map((item) => (
                                             <div className='col-span-2 justify-center'>
                                                  <Link href={item.link} className=""  >
                                                       <div className='hover:bg-gray-800 rounded-lg  cursor-pointer transition-all  px-2 py-2 mt-4'>
                                                            <div className="text-2xl text-center">{item.icon}</div>
                                                            <div className='text-center'>{item.title}</div>
                                                       </div>

                                                  </Link>
                                             </div>

                                        ))}

                                   </div>


                              </div>
                         </div>


                    </div>
                    <div className="row-span-10 " >
                         <div className='grid grid-cols-12'>
                              <div className='col-span-3 ml-16'>
                                   {

                                        user &&
                                        <div className='px-8 '>
                                             <div className=" bottom-5 flex-col gap-2 items-center text-center rounded-full" >

                                                  {user && user.profileImageURL &&
                                                       <div className='mt-12 pl-12'>
                                                            <Image src={user?.profileImageURL} alt={"user-image"} height={150} width={150} className='rounded-full' />
                                                       </div>
                                                  }
                                                  <div>
                                                       <h3 className="pl-6 text-2xl mt-8">{user.firstName} {user.lastName}</h3>

                                                  </div>

                                             </div>
                                        </div>

                                   }
                                   {!user &&

                                        <div className='mx-2 my-8'>
                                             <div className="ml-6 my-2 py-4 px-4 bg-slate-700 rounded-lg">
                                                  <h1 className="pb-3 text-2xl">New to my app?</h1>
                                                  <GoogleLogin onSuccess={handleLoginWithGoogle} />
                                             </div>
                                        </div>

                                   }

                              </div>
                              <div className='col-span-9 px-20
                               '>
                                   <div className='overflow-y-scroll h-screen'>
                                        {props.children}
                                   </div>

                              </div>

                         </div>

                    </div>

               </div>
          </div>
     )
}
// Below is code for server side rendering


export default AppLayout;