import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const { name, institutionName, educationLevel, yearOfGrad, skills } = await req.json();

        if (!userId) {
            return new NextResponse("UnAuthorized", { status: 401 });
        }

        const users = await db.user.create({
            data: {
                userId: userId,
                name: name,
                EducationLevel: educationLevel,
                InstitutionName: institutionName,
                GraduationDate: yearOfGrad,
                skills: skills
            },
        });

        return NextResponse.json(users);

    } catch (error) {
        console.log("[USER CREATION]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const existingUser = await db.user.findUnique({
            where: {
                userId: userId,
            }
        });

        if (!existingUser) {
            return new NextResponse("User Not Found", { status: 404 }); // Return a 404 status if the user doesn't exist
        }

        return new NextResponse(JSON.stringify(existingUser)); // Return the existing user if found

    } catch (error) {
        console.error("[USER RETRIEVAL]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
