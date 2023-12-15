import { NextApiRequest, NextApiResponse } from "next"
import validator from "validator"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { firstname, lastname, email, phone, city, password } = req.body;
    const errors: string[] = [];

    [
        {
            valid: validator.isLength(firstname, { min: 1, max: 20 }),
            errorMessage: "First name is invalid"
        },
        {
            valid: validator.isLength(lastname, { min: 1, max: 20 }),
            errorMessage: "Last name is invalid"
        },
        {
            valid: validator.isEmail(email),
            errorMessage: "Email is invalid"
        },
        {
            valid: validator.isMobilePhone(phone),
            errorMessage: "Phone number is invalid"
        },
        {
            valid: validator.isLength(city, { min: 1, max: 20 }),
            errorMessage: "City is invalid"
        },
        {
            valid: validator.isStrongPassword(password),
            errorMessage: "Password is not strong enough"
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

    if (userWithEmail) {
        return res.status(400).json({ errorMessage: "User with email already exists" })
    }

    if (req.method === "POST") {
        res.status(200).json({
            hello: "there"
        })
    }
}