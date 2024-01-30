import { ReactElement, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import useMediaQuery from "@/lib/useMediaQuery";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useTranslation } from "../i18n/client";

export default function SearchBox({ children }: { children: ReactElement }) {
    const { t } = useTranslation('common');
    const [open, setOpen] = useState<boolean>(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
          if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            setOpen((open) => !open)
          }
        }
     
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] top-48">
                    <DialogHeader>
                        <DialogTitle>{t('search')}</DialogTitle>
                    </DialogHeader>
                    <div className="flex w-full items-center space-x-2">
                        <Input type="text" placeholder={t('type_search')} className="border-gray-600 dark:border-gray-400" />
                        <Button>
                            <MagnifyingGlassIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                <DrawerTitle>{t('search')}</DrawerTitle>
                </DrawerHeader>
                <div className="flex w-full items-center space-x-2 pt-1 pb-8 px-4">
                    <Input type="text" placeholder={t('type_search')} className="border-gray-600 dark:border-gray-400" />
                    <Button>
                        <MagnifyingGlassIcon className="h-4 w-4" />
                    </Button>
                </div>
            </DrawerContent>
        </Drawer>
    )
}