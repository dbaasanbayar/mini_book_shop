import { isAuthenticated } from "@/lib/middleware";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {
    if (!await isAuthenticated(request)) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    const books = await prisma.book.findMany({
        orderBy: {createdAt: "desc"},
    })

    return NextResponse.json(books)
}

export async function POST(request: NextRequest) {
    if (!await isAuthenticated(request)) {
        return NextResponse.json({error: "Unauthorized"}, { status: 401})
    }

    const body = await request.json()
    const { title, author, price, condition, imageUrl} = body

    if (!title || !author || !price || !condition || !imageUrl) {
        return NextResponse.json({error: "Missing fields"}, {status: 400})
    }

    const book = await prisma.book.create({
        data: {
            title,
            author,
            price: Number(price),
            condition,
            imageUrl,
        },
    })

    return NextResponse.json(book, { status: 201 })
}