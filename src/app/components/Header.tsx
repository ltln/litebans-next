"use client";

import { cn } from "@/lib/utils";
import { CheckIcon, GitHubLogoIcon, GlobeIcon, HamburgerMenuIcon, MagnifyingGlassIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { switchLocaleAction } from "../actions/switch-locale";
import { useTranslation } from "../i18n/client";
import { supportedLocales } from "../i18n/settings";
import { Gavel } from "lucide-react";
import SearchBox from "./SearchBoxHeader";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { config } from "@/lib/config";

export default function Header() {
    const { theme, setTheme } = useTheme();
    const { i18n, t } = useTranslation('common');

    return (
        <header className={cn("sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60")}>
            <div className="container flex h-14 max-w-screen-xl items-center">
                <div className="flex gap-3">
                    <Popover>
                        <PopoverTrigger>
                            <HamburgerMenuIcon height={25} width={25} className="lg:hidden text-slate-500 hover:text-slate-300 duration-300" />
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col gap-1 w-48">
                            <p className="mb-1 font-bold">{t('nav_menu')}</p>
                            <Link href="/bans" className="transition-colors hover:text-foreground/80 text-foreground/60">
                                {t('bans')}
                            </Link>
                            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
                                {t('mutes')}
                            </Link>
                            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
                                {t('warnings')}
                            </Link>
                            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
                                {t('kicks')}
                            </Link>
                        </PopoverContent>
                    </Popover>
                    <Link href="/" className="flex items-center gap-2 mr-4">
                        <Gavel />
                        <span className="font-bold">
                            {config.server_name}
                        </span>
                    </Link>
                    <nav className="flex items-center gap-6 text-sm max-lg:hidden">
                        <Link href="/bans" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            {t('bans')}
                        </Link>
                        <Link href="/mutes" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            {t('mutes')}
                        </Link>
                        <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            {t('warnings')}
                        </Link>
                        <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            {t('kicks')}
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center space-x-2 justify-end">
                    <SearchBox>
                        <Button variant="outline" className="flex gap-2 justify-between font-normal px-3 h-8 w-full max-sm:w-10 lg:w-64">
                            <p className="flex items-center gap-2">
                                <MagnifyingGlassIcon />
                                <span className="max-sm:hidden">{t('search')}</span>
                            </p>
                            <kbd className="max-md:hidden pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                <span className="text-xs">⌘</span>K
                            </kbd>
                        </Button>
                    </SearchBox>
                    <nav className="flex items-center">
                        <Link href="https://github.com/ltln/litebans-next" target="_blank">
                            <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
                                <GitHubLogoIcon className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </div>
                        </Link>
                        <Dialog>
                            <DialogTrigger>
                                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
                                    <GlobeIcon className="h-5 w-5" />
                                    <span className="sr-only">Change Language</span>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="top-48 max-w-[700px]">
                                <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <GlobeIcon />
                                    {t('change_lang')}
                                </DialogTitle>
                                <DialogDescription>
                                    {t('change_lang_desc')}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {supportedLocales.map((n,i) => 
                                <Button key={i} onClick={() => switchLocaleAction(n)} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <CheckIcon className={i18n.language == n ? "opacity-1" : "opacity-0"} />
                                        <span>{t('locales.original.' + n)}</span>
                                    </div>
                                    <span className="text-xs text-gray-400">{t('locales.' + n)}</span>
                                </Button>
                            )}
                            </div>
                            </DialogContent>
                        </Dialog>
                        <button onClick={() => setTheme(theme == "light" ? "dark" : "light")}>
                            <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
                                <SunIcon className="dark:hidden h-5 w-5" />
                                <MoonIcon className="hidden dark:block h-5 w-5" />
                                <span className="sr-only">Toggle Theme</span>
                            </div>
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    )
}