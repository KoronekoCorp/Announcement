"use client"

import { H2 } from "@/components/H2";
import { Container, Stack, TextField, Button, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem, Table, TableHead, TableCell, TableRow, TableBody } from "@mui/material";
import type { DialogProps } from '@mui/material/Dialog';
import { useEffect, useState } from "react";
import { Getlist, Random, Setlist } from "./server";
import { Announcement, type AnnouncementData } from "@/components/Announcement";

export default function Page({ params }: { params: { site: string }, }) {
    const [key, setKey] = useState("")
    const [value, setValue] = useState("")
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [option, setoption] = useState<boolean[]>(new Array(4).fill(false))
    const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('sm');
    const [data, setdata] = useState<AnnouncementData>()
    const [datas, setdatas] = useState<AnnouncementData[]>([])

    const changeoption = (v: number) => {
        const t = option.slice()
        t[v] = !t[v]
        setoption(t)
    }

    const Getdata = (): AnnouncementData => {
        return {
            key: key,
            value: value,
            title: title,
            body: body,
            option: {
                mustAgree: option[0],
                disable: option[1],
                every: option[2],
                Fullwidth: option[3],
                maxWidth: maxWidth
            }
        }
    }

    useEffect(() => {
        Getlist(params.site).then(i => setdatas(i as AnnouncementData[]))
    }, [params.site])

    const Del = async (key: string) => {
        const ds = datas.slice()
        const r = ds.findIndex(i => i.key === key)
        if (r !== -1) {
            ds.splice(r, 1)
            await Setlist(params.site, JSON.stringify(ds))
            setdatas(ds)
        }
    }

    return <Container>
        <H2>
            Announcement for {params.site}
        </H2>
        <Table sx={{ textAlign: "center" }}>
            <TableHead>
                <TableRow>
                    <TableCell>Key</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Edit</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {datas.map((row) => (
                    <TableRow
                        key={row.key}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.key}
                        </TableCell>
                        <TableCell>
                            {row.title}
                        </TableCell>
                        <TableCell sx={{ "& > button": { m: 1 } }}>
                            <Button variant="contained" color="info" onClick={() => {
                                setKey(row.key); setValue(row.value); setTitle(row.title); setBody(row.body);
                                setoption([row.option.mustAgree, row.option.disable, row.option.every, row.option.Fullwidth]);
                                setMaxWidth(row.option.maxWidth);
                            }}>
                                EDIT
                            </Button>
                            <Button variant="outlined" color={row.option.disable ? "error" : "success"} onClick={async () => {
                                const newDatas = datas.slice()
                                const r = newDatas.findIndex(i => i.key === row.key)
                                if (r !== -1) {
                                    newDatas[r].option.disable = !newDatas[r].option.disable
                                    await Setlist(params.site, JSON.stringify(newDatas))
                                    setdatas(newDatas)
                                }
                            }}>
                                {row.option.disable ? "已禁用" : "已启用"}
                            </Button>
                            <Button variant="contained" color="error" onClick={() => Del(row.key)}>
                                DELETE
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <H2 sx={{ mt: 2 }}>
            Add or Edit Announcement
        </H2>

        <Stack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={2} sx={{ pt: 2 }} color="text.primary">
            <Stack justifyContent="center" alignItems="center" spacing={2} direction="row" useFlexGap flexWrap="wrap">
                公告唯一键
                <TextField label="key" variant="outlined" value={key} onChange={(e) => setKey(e.target.value)} />
                <Button variant="contained" color="info" onClick={() => { Random().then(i => setKey(i)) }}>
                    RANDOM
                </Button>
            </Stack>

            <Stack justifyContent="center" alignItems="center" spacing={2} direction="row" useFlexGap flexWrap="wrap">
                公告校对值
                <TextField label="value" variant="outlined" value={value} onChange={(e) => setValue(e.target.value)} />
                <Button variant="contained" color="info" onClick={() => { Random().then(i => setValue(i)) }}>
                    RANDOM
                </Button>
                <Button variant="contained" color="info" onClick={() => { setValue(new Date().getTime().toString()) }}>
                    TIME
                </Button>
            </Stack>
            <TextField label="title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
            <TextField label="body" variant="outlined" multiline rows={4} value={body} onChange={(e) => setBody(e.target.value)} />
            <Stack justifyContent="center" alignItems="center" spacing={2} direction="row" useFlexGap flexWrap="wrap">
                <FormControlLabel control={<Checkbox checked={option[0]} onChange={() => changeoption(0)} />} label="必须同意" />
                <FormControlLabel control={<Checkbox checked={option[1]} onChange={() => changeoption(1)} />} label="是否禁用" />
                <FormControlLabel control={<Checkbox checked={option[2]} onChange={() => changeoption(2)} />} label="每次显示" />
            </Stack>
            <Stack justifyContent="center" alignItems="center" spacing={2} direction="row" useFlexGap flexWrap="wrap">
                <FormControlLabel control={<Checkbox checked={option[3]} onChange={() => changeoption(3)} />} label="Full width" />
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel htmlFor="max-width">maxWidth</InputLabel>
                    <Select
                        autoFocus
                        value={maxWidth}
                        onChange={(e) => setMaxWidth(e.target.value as DialogProps['maxWidth'])}
                        label="maxWidth"
                        inputProps={{
                            name: 'max-width',
                            id: 'max-width',
                        }}
                    >
                        <MenuItem value={false as any}>false</MenuItem>
                        <MenuItem value="xs">xs</MenuItem>
                        <MenuItem value="sm">sm</MenuItem>
                        <MenuItem value="md">md</MenuItem>
                        <MenuItem value="lg">lg</MenuItem>
                        <MenuItem value="xl">xl</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
            <Stack justifyContent="center" alignItems="center" spacing={2} direction="row" useFlexGap flexWrap="wrap">
                <Button variant="contained" color="success" onClick={async () => {
                    const ds = datas.slice()
                    const s = Getdata()
                    const r = ds.findIndex(i => i.key === s.key)
                    if (r !== -1) {
                        ds[r] = s
                    } else {
                        ds.push(s)
                    }
                    await Setlist(params.site, JSON.stringify(ds))
                    setdatas(ds)
                }}>
                    SAVE
                </Button>
                <Button variant="contained" color="primary" onClick={() => {
                    const d = Getdata();
                    localStorage.removeItem(d.key);
                    setdata(d);
                }}>
                    PREVIEW
                </Button>
                <Button variant="contained" color="error" onClick={() => Del(key)}>
                    DELETE
                </Button>
            </Stack>
        </Stack>
        {data && <Announcement data={data} onClose={() => setdata(undefined)} />}
    </Container>
}