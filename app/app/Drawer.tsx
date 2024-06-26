"use client"
import { useState, type ReactNode, useEffect } from 'react';
import Link from 'next/link';

import { ListItemIcon, SwipeableDrawer, Box, IconButton, AppBar, Drawer, Toolbar, Typography, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useRouter } from 'next/navigation';
import { getTheme } from './Theme';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import BugReportIcon from '@mui/icons-material/BugReport';

const DRAWER_WIDTH = 240;

const LINKS = [
    { text: 'Create', href: '/create', icon: AddCircleOutlineIcon },
    { text: 'Test', href: '/example', icon: BugReportIcon },
];

const PLACEHOLDER_LINKS = [
    { text: 'Settings', href: '/settings', icon: SettingsIcon },
];

export function Root({ darkmode, children }: { darkmode?: boolean, children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const [dark, setdark] = useState(darkmode ?? false);
    const [PLACEHOLDER_LINKS, setlist] = useState<{ text: string, href: string, icon: JSX.ElementType }[]>([])
    useEffect(() => {
        fetch("/api/all").then((r) => r.json()).then((r: string[]) => setlist(r.map(i => {
            return {
                text: i, href: `/list/${i}`, icon: SettingsIcon
            }
        })))
    }, [])
    const router = useRouter()
    const theme = getTheme(dark ? "dark" : "light")

    useEffect(() => {
        const d = document.cookie.match(/dark=(true|false)/)
        if (d) setdark(d[1] === "true")
    }, [typeof document !== "undefined" ? document.cookie : ""])

    return <ThemeProvider theme={theme}>
        <AppBar position="fixed" sx={{ zIndex: 1205, minHeight: '64px' }} color='inherit'>
            <Toolbar sx={{ backgroundColor: 'palette.main', minHeight: '64px' }}>
                {/* <IconButton onClick={() => { setOpen(!open) }}>
                <MenuIcon sx={{ color: '#444', transform: 'translateY(-2px)' }} />
              </IconButton> */}
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                    onClick={() => { setOpen(!open) }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" color="inherit" onClick={() => { router.push("/") }}>
                    Announcement Center
                </Typography>
                {/* <MenuItem> */}
                <Box sx={{ flexGrow: 1 }} />
                <IconButton sx={{ ml: 1 }} onClick={() => {
                    document.cookie = `dark=${!dark}; max-age=604800; path=/; domain=${document.location.hostname.replace(/.*?\./, ".")}`;
                    setdark(!dark)
                }} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                {/* </MenuItem> */}
            </Toolbar>
        </AppBar>
        <SwipeableDrawer onClose={() => { setOpen(false) }} onOpen={() => { setOpen(true) }} open={open}>
            <Drawer
                sx={{
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                        boxSizing: 'border-box',
                        top: ['56px', '64px'],
                        height: 'auto',
                        bottom: 0,
                    },
                    // display: { xs: 'none', sm: 'block' },
                }}
                variant="permanent"
                anchor="left"
                open={open}
            >
                <Divider />
                <List>
                    {LINKS.map(({ text, href, icon: Icon }) => (
                        <ListItem key={href} disablePadding>
                            <ListItemButton component={Link} href={href}>
                                <ListItemIcon>
                                    <Icon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider sx={{ mt: 'auto' }} />
                <List>
                    {PLACEHOLDER_LINKS.map(({ text, href, icon: Icon }) => (
                        <ListItem key={href} disablePadding>
                            <ListItemButton component={Link} href={href}>
                                <ListItemIcon>
                                    <Icon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </SwipeableDrawer>

        <Box
            component="main"
            sx={{
                flexGrow: 1,
                bgcolor: 'background.default',
                // ml: `${DRAWER_WIDTH}px`,
                mt: ['48px', '56px', '64px'],
                pb: ['48px', '56px', '64px'],
                // p: 3,
                pt: 3,
                minHeight: "100vh",
                "img": { maxWidth: "100%" }
            }}
        >
            {children}
        </Box>
    </ThemeProvider>
}