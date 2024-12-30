export { GET, POST } from "@/auth";

// Prisma by default do not support edge
// export const runtime = "edge";

// Ensure this API route runs in a Node.js environment

/*
This line ensures that the API route is executed in a Node.js environment
rather than an Edge Runtime
*/
export const runtime = "nodejs";
