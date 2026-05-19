import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
    const books = await prisma.book.findMany({
        where: {status: "available"},
        orderBy: {createdAt: "desc"}
    })

    return NextResponse.json(books)
}