// import { NextRequest, NextResponse } from "next/server";
// import { withAuth } from "next-auth/middleware"

export { default } from "next-auth/middleware"

// export default withAuth({
//   callbacks: {
//     authorized({ token }) {
//       console.log({token})
//       return !!token
//     },
//   },
// })



export const config = { matcher: ["/dashboard/:path*", "/project/:path*"] }
