"use client"

import { H2 } from "@/components/H2";
import { Button, Container, TextField, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { AddSites, DelSites, GetSites } from "./server";
import Link from "next/link";

export default function Page() {
    const [sites, setSites] = useState<string[]>([])
    const [site, setSite] = useState<string>("")

    useEffect(() => {
        GetSites().then(i => setSites(i))
    }, [])

    return <Container sx={{ pt: 1, textAlign: "center" }}>
        <H2>
            SITE
        </H2>
        <Stack justifyContent="center" alignItems="center"
            spacing={2} direction="row" useFlexGap flexWrap="wrap" sx={{ pt: 2 }}>
            {sites.map(s => <Button LinkComponent={Link} href={`/list/${s}`} key={s} variant="outlined" size="large">
                {s}
            </Button>)}
        </Stack>
        <Stack justifyContent="center" alignItems="center"
            spacing={2} direction="row" useFlexGap flexWrap="wrap" sx={{ pt: 2 }}>
            <TextField label="Site" variant="outlined" value={site}
                onChange={(e) => setSite(e.target.value)} />
            <Button variant="contained" color="success"
                onClick={async () => {
                    await AddSites(site)
                    setSites(await GetSites())
                }}>
                ADD SITE
            </Button>
            <Button variant="contained" color="error"
                onClick={async () => {
                    await DelSites(site)
                    setSites(await GetSites())
                }}>
                DELETE SITE
            </Button>
        </Stack>
    </Container>
}