"use client";

import Image from "next/image";
import { useTranslation } from "../i18n/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { cn } from "@/lib/utils";
import { minecraft } from "@/lib/fonts";
import { config } from "@/lib/config";
import { useRouter } from "next/navigation";

export const CPlayer: TListColumn = { id: "player", string: "pages.player" };
export const COperator: TListColumn = { id: "operator", string: "pages.operator" };
export const CReason: TListColumn = { id: "reason", string: "pages.reason" };
export const CDate: TListColumn = { id: "date", string: "pages.date" };
export const CExpire: TListColumn = { id: "expire", string: "pages.expire" };

export const punishment = ['bans','mutes','warnings','kicks'];
export type Punishment = (typeof punishment)[number];

export type TListColumn = {
    id: string,
    string: string,
}

type TListData = {
    id: number,
    player: string,
    operator: string,
    reason: string,
    time: number,
    until?: number,
    active?: boolean,
}

export default function ListTable({ type, columns, data }: { type: Punishment, columns: TListColumn[], data: TListData[] }) {
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
                                    <span className={cn(minecraft.className, "text-lg text-gray-400 hover:text-gray-400/80")}>{n.player}</span>
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
                                    <span className={cn(minecraft.className, "text-lg text-gray-400 hover:text-gray-400/80")}>{n.operator}</span>
                                </div>
                            </TableCell>
                            <TableCell>{n.reason}</TableCell>
                            <TableCell className="text-center">{(new Date(n.time)).toLocaleString()}</TableCell>
                            <TableCell className="text-center">{n.active ? n.until && n.until != -1 ? (new Date(n.until)).toLocaleString() : t('pages.permanent') : t('pages.expired')}</TableCell>
                        </TableRow>
                    )
                })
            }
            </TableBody>
        </Table>
    )
}