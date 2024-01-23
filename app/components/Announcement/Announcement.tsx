"use client"
import { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import type { AnnouncementData } from './Type'


export function Announcement({ data, onClose }: { data: AnnouncementData, onClose?: (data: AnnouncementData) => void }) {
    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (data.option?.every) setOpen(true)
        if (localStorage.getItem(data.key) !== data.value) {
            setOpen(true)
        }
    }, [data.key])

    const handleClose = () => {
        setOpen(false);
        localStorage.setItem(data.key, data.value)
        if (onClose) onClose(data)
    }

    return <Dialog open={open} onClose={data.option.mustAgree ? () => { } : handleClose} maxWidth={data.option.maxWidth} fullWidth={data.option.Fullwidth}>
        <DialogTitle>
            {data.title}
        </DialogTitle>
        <DialogContent sx={{ margin: "auto" }}>
            {data.body}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                {data.option.mustAgree ? "我同意" : "我已知晓"}
            </Button>
        </DialogActions>
    </Dialog>
}
