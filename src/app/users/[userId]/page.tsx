import Header from '@/components/header';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const UserPublicPage = async ({
  params
}: {
  params: { userId: string }
}) => {

    const { userId } = auth();

    if (!userId) {
        return redirect("/")
    }

    const user = await db.user.findUnique({
      where: {
        id: params.userId,
      }
    })


  return (
    <div>
        <Header />
        <div className='py-4 px-8'>
          <Card>
            <CardHeader>
              <CardTitle className='font-bold'>{user?.name}</CardTitle>
              <CardDescription>{user?.InstitutionName}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge>{user?.skills}</Badge>
              <div className='flex flex-col py-2 justify-center'>
                <div>
                  Education Level: {user?.EducationLevel}
                </div>
                <div>
                  Graduation Date: {user?.GraduationDate ? user.GraduationDate.toDateString() : 'N/A'}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="default">Contact Me</Button>
            </CardFooter>
          </Card>
        </div>        
    </div>
  )
}

export default UserPublicPage