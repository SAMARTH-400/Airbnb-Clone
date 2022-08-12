import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { MenuIcon, UserCircleIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function Example() {
  const { data: session } = useSession();
  const router = useRouter();
  if ( session ) {
    return (
    <div className="w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-400 hover:bg-gray-50 hove:down-shadow-lg">
          <MenuIcon className="h-7" />
          <UserCircleIcon className="h-7" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-5 w-56 rounded-md shadow-lg drop-shadow-md bg-gray-100 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 px-1">
          <div className='flex flex-col m-auto px-3 py-2 border-b-2' >
            <p className='text-black'>Signed in as </p>
            <p className=' text-red-400'>{session.user.name} </p>
          </div>
            <Menu.Item> 
            {({ active }) => (
                <div  href="#"
                  className={classNames(
                    active ? 'bg-gray-200 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                  onClick={ () => router.push('/cart') }
                >
                  Your Cart
                </div>
              )}  
            </Menu.Item>
            <Menu.Item> 
            {({ active }) => (
                <div  href="#"
                  className={classNames(
                    active ? 'bg-gray-200 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                  onClick={ () => router.push('/trips') }
                >
                  Trips
                </div>
              )}  
            </Menu.Item>
            <Menu.Item> 
            {({ active }) => (
                <div
                  className={classNames(
                    active ? 'bg-gray-200 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                  onClick={signOut}
                >
                  Log out
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    </div>
  )}
  else{
    return(
      <button type="button" 
      className="flex item text-white bg-red-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded-full text-sm px-7 py-2.5 mr-2"
      onClick={signIn}
      >Login</button>

    ) 
  }
}
