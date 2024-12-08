export { auth as middleware } from "@/app/auth";

// export const config = {
//   matcher: ["/dashboard/:path*"], // Tylko te trasy są chronione
// };

// export default auth((req) => {
//   if (!req.auth) {
//     const newUrl = new URL("/sign-in", req.nextUrl.origin);
//     return Response.redirect(newUrl);
//   }
// });
