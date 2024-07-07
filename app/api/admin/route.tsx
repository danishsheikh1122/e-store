import { NextRequest, NextResponse } from "next/server";
import { addProductSchema } from "@/app/components/allzodschemas/zodAddProductSchema";
import prisma from "@/prisma/client";

// Function to add product to db from admin side
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Transform string fields to their correct types
    const transformedData = {
      productName: data.productName,
      price: parseFloat(data.price),
      MRP: parseFloat(data.MRP),
      description: data.description,
      images: data.images, // Assuming images are already correctly structured as per Image model
      adminId: parseInt(data.adminId, 10),
    };

    // Validate the transformed data
    const isValid = addProductSchema.safeParse(transformedData);
    if (!isValid.success) {
      return NextResponse.json({
        status: 400,
        message: "Invalid data",
        data: transformedData,
        error: isValid.error.errors,
      });
    }

    // Create a new product using Prisma
    const newProduct = await prisma.product.create({
      data: {
        productName: transformedData.productName,
        price: transformedData.price,
        MRP: transformedData.MRP,
        description: transformedData.description,
        images: {
          create: transformedData.images.map((image: { public_id: string; url: string; }) => ({
            public_id: image.public_id,
            url: image.url,
          })),
        },
        admin: { connect: { id: transformedData.adminId } }, // Connect to Admin by adminId
      },
      include: {
        admin: true, // Include the admin object in the response
        images: true, // Include the images related to the product in the response
      },
    });

    if (!newProduct) {
      return NextResponse.json({
        status: 500,
        message: "Failed to add product to the database",
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Product added successfully",
      data: transformedData, // Return the transformed data or adjust as per your needs
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
