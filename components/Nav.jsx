'use client';

import { useState,useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {signIn,signOut,getProviders,useSession} from "next-auth/react"

const Nav = () => {
  const isUserLoggedIn=true;
  const [providers,setProviders]=useState(null);
  const [toggleDropdown,setToggleDropdown]=useState(false);
  useEffect(
    ()=>{
      const setProviders=async()=>{
        const response =await getProviders();
        setProviders(response);
      }
    },[]
  );

  return (
   <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
      <Image src="/assets/images/logo.svg"
      alt="Promp logo"
      width={30}
      height={30}
      className="object-contain"/>
      <p className="logo_text">Promptopia</p>
      </Link>
      <div className="sm:flex hidden">
       {
        isUserLoggedIn?(
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt"
            className="black_btn">
            Create Post</Link>
            <button type="button" className="outline_btn" onClick={signOut}>
              Sign Out
            </button>
            <Link>
            <Image
            src="/assets/images/logo.svg"
            width={37}
            height={37}
            alt="profile"
            className="rounded-full"/>
            </Link>
          </div>
        )
        :(
          <>
         {providers && (
  providers.map((provider) => (
    <button
      type="button"
      key={provider.name}
      className="black_btn"
      onClick={() => signIn(provider.id)}
    >
      Sign In
    </button>
  ))
)}
          </>
        )
       }
      </div>
      /*for mobile */
      <div className="sm:hidden flex relative">
        {
          isUserLoggedIn?(
            <div className="flex">
              <Image
            src="/assets/images/logo.svg"
            width={37}
            height={37}
            alt="profile"
            className="rounded-full"
            onClick={setToggleDropdown(
              (prev)=>{!prev}
            )} />
            {toggleDropdown &&(
              <div className="dropdown">
                <Link
                href="/profile"
                className="dropdown_link"
                onClick={()=>setToggleDropdown(false)}>
                  My Profile
                </Link>
                <Link
                href="/create-prompt"
                className="dropdown_link"
                onClick={()=>setToggleDropdown(false)}>
                  Create Prompt
                </Link>
                <button
                type="button"
                className="mt-5 w-full black_btn"
                onClick={()=>{
                  setToggleDropdown(false);
                  signOut();
                }}>
                  Sign Out
                </button>
              </div>
            )}
            </div>
          ):(
            <>
           {providers && (
  providers.map((provider) => (
    <button
      type="button"
      key={provider.name}
      className="black_btn"
      onClick={() => signIn(provider.id)}
    >
      Sign In
    </button>
  ))
)}
            </>
          )
          
        }
      </div>
   </nav>
  )
}

export default Nav