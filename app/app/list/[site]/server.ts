"use server"

import { UseRedis } from "@/Data/Redis";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";

export async function Random() {
    return randomUUID()
}

export async function Getlist(site: string) {
    const r = await UseRedis()
    return JSON.parse(await r.GET(`${process.env.prefix ?? ""}${site}`) ?? "[]")
}

export async function Setlist(site: string, data: string) {
    if (cookies().get("au")?.value !== process.env.security) {
        return null
    }
    const r = await UseRedis()
    return r.SET(`${process.env.prefix ?? ""}${site}`, data)
}