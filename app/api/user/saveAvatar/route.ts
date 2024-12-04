import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/prisma";
import { auth } from "@/app/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { imagePath }: { imagePath: string } = await req.json();

  try {
    await prisma.user.update({
      where: {
        email: user?.email as string,
      },
      data: {
        image: imagePath,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Error occured while saving avatar to db" },
      { status: 400 }
    );
  }
}
