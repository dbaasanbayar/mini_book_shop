import { NextRequest } from "next/server";
import { verifyToken } from "./auth";


export function isAuthenticated(request: NextRequest) {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return false
    }

    const token = authHeader.split(" ")[1]
    const payload = verifyToken(token)

    return payload !== null
}

