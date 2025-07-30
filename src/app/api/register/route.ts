import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "@/lib/prisma";
import { RegisterUserSchema } from "@/lib/user";


export async function POST(request: Request) {
  // 1. Parse & validate
  let data;
  try {
    const body = await request.json();
    data = RegisterUserSchema.parse(body);
  } catch (err: any) {
    const message =
      err.errors?.map((e: any) => e.message).join(", ") ||
      "JSON inválido o validación fallida";
    return NextResponse.json({ error: message }, { status: 422 });
  }

  // 2. Check existing user
  const exists = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (exists) {
    return NextResponse.json(
      { error: "Ya existe un usuario con ese email" },
      { status: 400 }
    );
  }

  // 3. Hash password & create user
  const passwordHash = await hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash,
      name: data.name,
      role: data.role,
    },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });

  // 4. Return minimal response
  return NextResponse.json(user, { status: 201 });
}
