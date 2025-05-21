import { getToken } from "next-auth/jwt";
import {
  NextRequest,
  NextResponse,
  NextMiddleware,
  NextFetchEvent,
} from "next/server";

const onlyAdmin = ["admin"];
const authPage = ["/auth/login", "auth/register"];

export default function WithAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    // 1. Perbaikan pengecekan path yang membutuhkan autentikasi
    const requiresAuth = requireAuth.some((path) => pathname.startsWith(path));

    if (requiresAuth) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      // 2. Redirect ke login jika tidak ada token
      if (!token) {
        const url = new URL("/auth/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      // 3. Redirect jika sudah login tapi mengakses halaman auth
      if (authPage.some((path) => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      // 4. Cek role admin
      if (
        onlyAdmin.some((path) => pathname.startsWith(path)) &&
        token.role !== "admin"
      ) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return middleware(req, event);
  };
}
