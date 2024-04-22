import React from 'react';
import Image from 'next/image'
import { BiMessageRounded, BiUpload } from 'react-icons/bi'
import { FaRetweet } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { Post } from '@/gql/graphql';
import Link from 'next/link';

interface FeedCardProps{
     data: Post
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
     const {data} = props;
     
     return (
          <div className='p-4 border-b border-gray-600 hover:bg-slate-900 transition-all cursor-pointer'>
               <div className='grid grid-cols-12 gap-3'>
                    <div className='col-span-1'>
                         {
                              data.author?.profileImageURL && <Image src= {data.author.profileImageURL} className='rounded-full' alt='user-image' width={50} height={50} >
                         </Image>
                         }
                         
                    </div>
                    <div className='col-span-11'>
                         <Link href= {`/${data.author?.id}`}>
                              {data.author?.firstName} {data.author?.lastName}
                         </Link>
                         <p>{data.content} </p>
                         {
                              data.imageURL && <Image src = {data.imageURL} alt = 'image' height={300} width={300}/>
                         }
                         <div className='flex justify-between mt-5 text-xl items-center p-2 w-[90%]' >
                              <div>
                                   <BiMessageRounded />
                              </div>
                              <div>
                                   <FaRetweet />
                              </div>
                              <div>
                                   <AiOutlineHeart />
                              </div>
                              <div>
                                   <BiUpload />
                              </div>
                         </div>


                    </div>
               </div>
          </div>
     )
}
export default FeedCard