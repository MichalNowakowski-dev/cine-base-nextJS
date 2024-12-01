import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/app/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { userId } = req.query;
    const favorites = await prisma.favoriteMovie.findMany({
      where: { userId: Number(userId) },
    });
    res.status(200).json(favorites);
  }
}
