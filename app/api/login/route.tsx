import { loginschema } from "@/app/components/allzodschemas/zodloginschema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

// dummy bcrypt
// id:1234523423 pass:danish@1122
// {
//     "userNumber": "1234523423",
//     "password": "danish@1122"
// }
// bcrypt always uses same encryption code
// code to create new suer import { createUser } from '@/path/to/your/createUserFile'; // Replace with actual path

// async function exampleCreateUser() {
//   const userNumber = "1234567890";
//   const password = "mySecurePassword";

//   try {
//     const newUser = await createUser(userNumber, password);
//     console.log("New user created:", newUser);
//   } catch (error) {
//     console.error("Error creating user:", error);
//   }
// }

// exampleCreateUser();

export async function POST(req: NextRequest) {
  try {
    const data: { userNumber: string; password: string } = await req.json();
    const isValidate = loginschema.safeParse(data);
    if (!isValidate.success) {
      return NextResponse.json(isValidate.error.errors, { status: 422 });
    }

    // Find user by mobile number
    const user = await prisma.users.findUnique({
      where: { userNumber: data.userNumber },
    });

    if (!user) {
      return NextResponse.json({ status: 404, message: "User not found" });
    }
    // Compare password
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ status: 401, message: "Invalid password" });
    }

    // If authentication is successful
    return NextResponse.json({
      status: 200,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
