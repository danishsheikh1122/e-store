import { loginschema } from "@/app/components/allzodschemas/zodloginschema";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const data = await req.json();
  const isValidate = loginschema.safeParse(data);
  if (!isValidate.success)
    return NextResponse.json(isValidate.error.errors, { status: 404});

  // implementing authentication logic here

    console.log(data)


  return NextResponse.json({status: 200,message:'user logged in successfully'});
}
