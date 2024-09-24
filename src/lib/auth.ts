import { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { CookieOptions } from 'hono/utils/cookie';
import { SignJWT, jwtVerify } from "jose";

const cookieOptions: CookieOptions = {
  secure: true,
  httpOnly: true,
  maxAge: 60 * 60,
  sameSite: "Strict"
};

export async function isAuthenticated(ctx: Context) {
  const token = getCookie(ctx, "token");
  if (!token) return false;

  const secret = new TextEncoder().encode(ctx.env.PRIVATE_KEY);
  const result = await jwtVerify(token, secret);
  const { exp } = result.payload;
  if (!exp) return false;

  const now = Math.floor(Date.now() / 1000);
  return exp > now;
}

export async function authenticate(ctx: Context) {
  const secret = new TextEncoder().encode(ctx.env.PRIVATE_KEY);
  const token = await new SignJWT()
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
  setCookie(ctx, 'token', token, cookieOptions);
}
