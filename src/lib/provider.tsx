"use client"
import Header from '@/components/Layouts/Header';
import React, { useEffect, useCallback, useState, useContext } from 'react'
import { api } from '../../convex/_generated/api';
import { useMutation } from 'convex/react';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/context/UserDetailContext';
import { UserDetails } from '@/types';
import { Loader2 } from 'lucide-react';

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const createUser = useMutation(api.user.createNewUser);

  const { user, isLoaded } = useUser();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const createNewUser = useCallback(async () => {
    if (!user) return null;

    const result = await createUser({
      email: user.primaryEmailAddress?.emailAddress ?? "",
      imageUrl: user.imageUrl,
      name: user.fullName ?? "",
    });

    return (result ?? null) as UserDetails | null;
  }, [user, createUser]);

  useEffect(() => {
    if (!isLoaded || !user) return;

    createNewUser().then(result => {
      if (result) setUserDetails(result);
    });
  }, [isLoaded, user, createNewUser, setUserDetails]);

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
        <>
          <Header />
          <main className="mt-10">
            {!isLoaded ? (
              <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              children
            )}
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