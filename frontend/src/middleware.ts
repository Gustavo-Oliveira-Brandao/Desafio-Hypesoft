// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/home", request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  // A rota /produtos foi adicionada aqui para ser protegida pelo middleware.
  matcher: [
    "/",
    "/home",
    "/produtos",
    "/((?!api/auth|_next/static|_next/image|favicon.ico|login|manifest.json).*)",
  ],
};
