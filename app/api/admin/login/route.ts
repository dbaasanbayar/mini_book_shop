import { signToken } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"


export async function POST(request: Request) {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
        return NextResponse.json({error: "Missing fields"}, {
            status: 400})
    }

    const admin = await prisma.admin.findUnique({
        where: {email},
    })
    if (!admin) {
        return NextResponse.json({ error: "Invalid credentials"}, {status: 401})
    }

    const valid = await bcrypt.compare(password, admin.passwordHash)

    if (!valid) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }

    const token = signToken({adminId: admin.id, email: admin.email})

    return NextResponse.json({token})
}