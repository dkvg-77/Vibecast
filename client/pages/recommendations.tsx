import AppLayout from '../components/Layout/AppLayout';
import Image from "next/image";

import { useCurrentUser } from '@/hooks/user';

import Link from 'next/link';

const recommendationsPage:any = () => {
     const { user } = useCurrentUser();
     return (
          <div>
               <AppLayout>
                    
                    <div className='px-4 py-3 rounded-lg'>
                         <h1 className='text-4xl mb-10 mt-8'> Users you may know</h1>
                         {user?.recommendedUsers?.map((el) => (
                              <div className='flex items-center gap-3 my-10' key={el?.id}>
                                   {
                                        el?.profileImageURL && (
                                             <Image src={el?.profileImageURL} alt='user-image' className='rounded-full' width={60} height={60}
                                             />
                                        )
                                   }
                                   <div>
                                        <div className='text-lg'>
                                             {el?.firstName} {el?.lastName}
                                        </div>
                                        <Link href={`/${el?.id}`} className='bg-white text-black text-sm px-3 py-1 w-full rounded-lg'>View</Link>
                                   </div>



                              </div>

                         ))}
                    </div>
                    
               </AppLayout>
          </div>
     )
}


export default recommendationsPage;