import { Input } from "@/app/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { createTranslation } from "@/app/i18n/server";
import Image from "next/image";

const example_data = [
    {
        name: "Lookis",
        operator: "Console",
        reason: "Test",
        date: 1706522476,
        expire: 1706522480
    },
    {
        name: "Lookis",
        operator: "Console",
        reason: "Test",
        date: 1706522476,
        expire: false
    },
    {
        name: "Lookis",
        operator: "Console",
        reason: "Test",
        date: 1706522476,
        expire: false
    },
]

export default async function Bans() {
    const { t } = await createTranslation('common');
    return (
        <>
            <p className="text-3xl max-md:text-xl py-4 text-center font-bold">{t('pages.ban.title')}</p>
            <p className="text-center dark:text-gray-400">{t('pages.ban.description')}</p>
            <div className="w-full mt-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">{t('pages.player')}</TableHead>
                            <TableHead className="text-center">{t('pages.operator')}</TableHead>
                            <TableHead className="text-center">{t('pages.reason')}</TableHead>
                            <TableHead className="text-center">{t('pages.date')}</TableHead>
                            <TableHead className="text-center">{t('pages.expire')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {
                    example_data.map((n, i) => {
                    return (
                        <TableRow key={i}>
                            <TableCell>
                                <div className="flex gap-2 items-center">
                                    <Image alt="player" src={`https://minotar.net/avatar/${n.name}/100`} height={25} width={25} className="rounded-sm" />
                                    <span>{n.name}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2 items-center">
                                    <Image alt="operator" src={`https://minotar.net/avatar/${n.operator}/100`} height={25} width={25} className="rounded-sm" />
                                    <span>{n.operator}</span>
                                </div>
                            </TableCell>
                            <TableCell>{n.reason}</TableCell>
                            <TableCell className="text-center">{n.date}</TableCell>
                            <TableCell className="text-center">{n.expire != false ? n.expire : t('pages.permanent')}</TableCell>
                        </TableRow>
                    )
                    })
                    }
                    </TableBody>
                </Table>
                <div className="flex gap-2 items-center justify-center mt-4">
                    <span>{t('pages.page')} </span>
                    <Input type="number" className="w-20" min={1} />
                    <span>{t('pages.of')} 1</span>
                </div>
            </div>
        </>
    )
}