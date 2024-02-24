import { UseRedis } from "@/Data/Redis";

export async function GET(request: Request) {
    const r = await UseRedis()
    const l = await r.LLEN(`${process.env.prefix ?? ""}SITE`)
    return Response.json(await r.LRANGE(`${process.env.prefix ?? ""}SITE`, 0, l),
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Vercel-CDN-Cache-Control": "max-age=600",
                "CDN-Cache-Control": "max-age=600"
            }
        })
}