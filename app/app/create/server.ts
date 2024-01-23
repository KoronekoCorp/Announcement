"use server"
import type { RedisClientType } from 'redis';
import { UseRedis } from "@/Data/Redis"
import { cookies } from 'next/headers';


export async function GetSites(_r?: RedisClientType) {
    const r = _r ?? await UseRedis()
    const l = await r.LLEN(`${process.env.prefix ?? ""}SITE`)
    return r.LRANGE(`${process.env.prefix ?? ""}SITE`, 0, l)
}

export async function AddSites(site: string) {
    if (cookies().get("au")?.value !== process.env.security) {
        return -999
    }
    const r = await UseRedis()
    const l = await GetSites(r)
    if (l.includes(site)) {
        return -1
    } else {
        return r.RPUSH(`${process.env.prefix ?? ""}SITE`, site)
    }
}

export async function DelSites(site: string) {
    if (cookies().get("au")?.value !== process.env.security) {
        return -999
    }
    const r = await UseRedis()
    return r.LREM(`${process.env.prefix ?? ""}SITE`, 0, site)
}