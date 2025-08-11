import { withAuth } from "next-auth/middleware";

export default withAuth(
  // 1️⃣ Optional custom handler (you can add logic here if needed)
  function middleware(req) {
    // e.g. console.log("Request for protected route:", req.nextUrl.pathname)
  },
  // 2️⃣ Unified config: pages + callbacks
  {
    pages: {
      signIn: "/login",        
    },
    callbacks: {
      authorized: ({ token }) => {
        // allow only if a session token exists
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/patients/:path*",
    "/professionals/:path*", 
    "/schedule/:path*",
    "/invoices/:path*",
    "/api/patients/:path*",
    "/api/professionals/:path*",
    "/api/appointments/:path*",
    "/api/invoices/:path*"
  ]
}