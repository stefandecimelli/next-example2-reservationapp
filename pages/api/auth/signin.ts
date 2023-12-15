import { NextApiRequest, NextApiResponse } from "next"
import validator from "validator"
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import * as jose from "jose";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;
    const errors: string[] = [];

    [
        {
            valid: validator.isEmail(email),
            errorMessage: "Email is invalid"
        },
        {
            valid: validator.isLength(password, {min: 1}),
            errorMessage: "Password is invalid"
        }
    ].forEach(({ valid, errorMessage }) => !valid && errors.push(errorMessage));

    if (errors.length) {
        return res.status(400).json({
            errorMessage: errors[0]
        })
    }

    const userWithEmail = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!userWithEmail) {
        return res.status(400).json({ errorMessage: "Email or password is incorrect" })
    }

    const isMatched = await bcrypt.compare(password, userWithEmail.password);

    if (!isMatched) {
        return res.status(400).json({ errorMessage: "Email or password is incorrect" })
    }

    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({ email: email })
        .setProtectedHeader({ alg })
        .setExpirationTime("24h")
        .sign(secret);

    if (req.method === "POST") {
        res.status(200).json({
            access_token: token
        })
    }

    return res.status(404).json("Unknown endpoint");
}