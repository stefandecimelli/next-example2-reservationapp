import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const bearerToken: string = req.headers["authorization"] as string;
    const token = bearerToken.split(" ")[1]
    const payload = jwt.decode(token) as {email: string};

    const user = await prisma.user.findUnique( {
        where: {
            email: payload.email
        },
        select: {
            id: true,
            last_name: true,
            firt_name: true,
            city: true
        }
    })

    return res.json({user})
}