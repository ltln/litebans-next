import { GitHubLogoIcon, Link2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-4 border-t-[1px] border-t-slate-100 dark:border-t-slate-900">
            <div className="container text-center max-md:text-left">
                <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
                    Built & Designed with ❤️ by @<Link href="https://github.com/ltln" target="_blank" className="font-medium underline underline-offset-2">ltln</Link>
                </p>
                <p className="flex justify-center gap-2 text-sm text-muted-foreground">
                    <Link href="https://www.spigotmc.org/resources/litebans.3715/" target="_blank" className="flex items-center gap-1 font-medium">
                        <Link2Icon />
                        LiteBans Plugin
                    </Link> 
                    •
                    <Link href="https://github.com/ltln/litebans-next" target="_blank" className="flex items-center gap-1 font-medium">
                        <GitHubLogoIcon />
                        Source Code
                    </Link>
                </p>
            </div>
        </footer>
    )
}