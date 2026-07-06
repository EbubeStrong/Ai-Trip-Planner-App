"use client"
import Header from '@/components/Layouts/Header';
import React, { useEffect, useCallback, useState, useContext } from 'react'
import { api } from '../../convex/_generated/api';
import { useMutation } from 'convex/react';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/services/context/UserDetailContext';

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //   const CreateUser = useMutation(api.user.createNewUser)

  //   const { user } = useUser()

  // useEffect(() => {
  //   if (!user) return;

  //   // save New User if Not Exist in Convex DB
  //   const createNewUser = async () => {
  //     await CreateUser({
  //       email: user?.primaryEmailAddress?.emailAddress ?? '',
  //       imageUrl: user?.imageUrl,
  //       name: user?.fullName ?? ''
  //     });
  //   };

  //   createNewUser();
  // }, [user, CreateUser]);

  const createUser = useMutation(api.user.createNewUser);

  const { user, isLoaded } = useUser();
  const [userDetails, setUserDetails] = useState<unknown>(null);

  const createNewUser = useCallback(async () => {
    if (!user) return;

    await createUser({
      email: user.primaryEmailAddress?.emailAddress ?? "",
      imageUrl: user.imageUrl,
      name: user.fullName ?? "",
    });
  }, [user, createUser]);

  useEffect(() => {
    if (!isLoaded || !user) return;

    void createNewUser();
  }, [isLoaded, user, createNewUser]);

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <>
        <Header />
        <main className="mt-10">
          {children}
        </main>
      </>
    </UserDetailContext.Provider>
  )
}
export default Provider


export const useUserDetails = () => {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error("useUserDetails must be used within a UserDetailContext.Provider");
  }
  return context;
}