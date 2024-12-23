import { auth } from "~/auth";
import type { NextRequest } from "next/server";

export default auth((req: NextRequest) => {
  //console.log("REQ", req);
  // if (!req.auth && req.nextUrl.pathname !== "/login") {
  //   const newUrl = new URL("/", req.nextUrl.origin);
  //   return Response.redirect(newUrl);
  // }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
