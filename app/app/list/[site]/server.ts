"use server"

import { UseRedis } from "@/Data/Redis";
import { randomUUID } from "crypto";

export async function Random() {
    return randomUUID()
}

export async function Getlist(site: string) {
    const r = await UseRedis()
    return JSON.parse(await r.GET(`${process.env.prefix ?? ""}${site}`) ?? "[]")
}

export async function Setlist(site: string, data: string) {
    const r = await UseRedis()
    return r.SET(`${process.env.prefix ?? ""}${site}`, data)
}