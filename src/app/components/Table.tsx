"use client";

import Image from "next/image";
import { useTranslation } from "../i18n/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { cn } from "@/lib/utils";
import { minecraft } from "@/lib/fonts";
import { config } from "@/lib/config";
import { useRouter } from "next/navigation";

export const CPlayer: TPunishColumn = { id: "player", string: "pages.player" };
export const COperator: TPunishColumn = { id: "operator", string: "pages.operator" };
export const CReason: TPunishColumn = { id: "reason", string: "pages.reason" };
export const CDate: TPunishColumn = { id: "date", string: "pages.date" };
export const CExpire: TPunishColumn = { id: "expire", string: "pages.expire" };

export const punishment = ['bans','mutes','warnings','kicks'];
export type Punishment = (typeof punishment)[number];

export type TPunishColumn = {
    id: string,
    string: string,
}

type TPunishData = {
    id: number,
    player: string,
    operator: string,
    reason: string,
    time: number,
    until?: number,
}

export default function DataTable({ type, columns, data }: { type: Punishment, columns: TPunishColumn[], data: TPunishData[] }) {
    const { t } = useTranslation('common');
    const { push } = useRouter();
    return (
        <Table>
            <TableHeader>
                <TableRow>
                {
                    columns.map((n,i) => {
                        return <TableHead key={i} className="text-center">{t(n.string)}</TableHead>
                    })
                }
                </TableRow>
            </TableHeader>
            <TableBody>
            {
                data.map((n,i) => {
                    return (
                        <TableRow key={i} className="cursor-pointer" onClick={() => push(`/${type}/${n.id}`)}>
                            <TableCell>
                                <div className="flex gap-2 items-center">
                                    <Image alt="player" src={`https://minotar.net/avatar/${n.player}/25`} height={25} width={25} className="rounded-sm" />
                                    <span className={cn(minecraft.className, "text-lg")}>{n.player}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2 items-center">
                                    <Image 
                                        alt="operator" 
                                        src={config.console.name.includes(n.operator) ? config.console.image : `https://minotar.net/avatar/${n.operator}/25`} 
                                        height={25} 
                                        width={25} 
                                        className="rounded-sm" 
                                    />
                                    <span className={cn(minecraft.className, "text-lg")}>{n.operator}</span>
                                </div>
                            </TableCell>
                            <TableCell>{n.reason}</TableCell>
                            <TableCell className="text-center">{(new Date(n.time)).toLocaleString()}</TableCell>
                            <TableCell className="text-center">{n.until && n.until != -1 ? (new Date(n.until)).toLocaleString() : t('pages.permanent')}</TableCell>
                        </TableRow>
                    )
                })
            }
            </TableBody>
        </Table>
    )
}