import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "./lib/IsValidPassword";


export async function middleware(req: NextRequest){
    if (await IsAuthenticated(req) === false){
        return new NextResponse("Unauthorized", {status: 401, headers: {"WWW-Authenticate": "Basic"}})
    }
}
async function IsAuthenticated(req: NextRequest) {
    const authHeader = req.headers.get("authorization") || req.headers.get("Authorization")

    if (authHeader == null) return false

    const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64").toString().split(":")

    return username === process.env.ADMIN_USERNAME && (await isValidPassword(password, process.env.HASHED_ADMIN_PASSWORD as string))
    
}
export const config = {
    matcher: "/admin/:path*"
}