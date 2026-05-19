import { isAuthenticated } from "@/lib/middleware";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request:NextRequest) {
    if (!await isAuthenticated(request)) {
        return NextResponse.json({error: "Unauthorized"}, {
            status: 401
        })
    }
    const orders = await prisma.order.findMany({
        include: {book: true},
        orderBy: {createdAt: "desc"}
    })

    return NextResponse.json(orders)
}

