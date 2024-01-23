"use client"

import { enqueueSnackbar } from "notistack"
import { useEffect, useState } from "react"
import type { AnnouncementData } from "./Type"
import { Announcement } from "."

export function AnnouncementProvider({ endpoint }: { endpoint: string }) {
    const [ann, setann] = useState<AnnouncementData[]>([])

    useEffect(() => {
        console.log("?")
        fetch(new URL(`${endpoint}/api/${location.hostname}`))
            .then(r => r.json().then((f) => setann(f)))
            .catch(() => {
                enqueueSnackbar("公告信息获取失败，页面将在5秒后刷新", { variant: "error" })
                setTimeout(() => {
                    location.href = location.href
                }, 5000);
            })
    }, [])

    return <>
        {ann.length !== 0 && <Announcement data={ann[0]} onClose={() => {
            setann(ann.slice(1))
        }} />}
    </>
}