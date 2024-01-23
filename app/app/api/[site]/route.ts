import { UseRedis } from "@/Data/Redis"
import type { AnnouncementData } from "@/components/Announcement"

export async function GET(request: Request, { params: { site } }: { params: { site: string } }) {
    const r = await UseRedis()
    const d = JSON.parse(await r.GET(`${process.env.prefix ?? ""}${site}`) ?? "[]") as AnnouncementData[]
    const fin: AnnouncementData[] = []
    d.forEach(i => {
        if (!i.option.disable) fin.push(i)
    })
    return Response.json(
        fin,
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Vercel-CDN-Cache-Control": "max-age=600",
                "CDN-Cache-Control": "max-age=600"
            }
        }
    )
}