"use client";

import Image from "next/image";
import { Badge } from "./ui/badge";
import { useTranslation } from "../i18n/client";
import { minecraft } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { config } from "@/lib/config";

export type TPunishData = {
    id: number,
    player: string,
    operator: string,
    reason: string,
    time: number,
    until?: number,
    server: string,
    ipban?: boolean,
    active?: boolean,
    expired?: boolean,
    removed_operator?: string,
    removed_reason?: string,
}

export default function DataTable({ data } : { data: TPunishData }) {
    const { t } = useTranslation('common');
    return (
        <div className="grid grid-cols-3 max-md:grid-cols-1 mt-8">
            <div className="col-span-1 flex items-center justify-center">
                <div className="text-center">
                    <Image alt="player_body" src={`https://minotar.net/body/${data.player}/120`} height={120} width={120} className="max-md:hidden rounded-sm m-auto" />
                    <Image alt="player_body" src={`https://minotar.net/avatar/${data.player}/120`} height={120} width={120} className="md:hidden rounded-sm m-auto" />
                    <p className={cn(minecraft.className,"text-2xl mt-2 mb-2 text-slate-600 hover:text-slate-600/80 dark:text-gray-400 dark:hover:text-gray-400/80")}>{data.player}</p>
                </div>
            </div>
            <div className="col-span-2">
                <table className="w-full bg-slate-200 dark:bg-slate-900 rounded-lg">
                    <tbody>
                        <tr>
                            <td className="w-32 text-right px-4 py-1 text-gray-700 dark:text-gray-400">{t('pages.status')}</td>
                            <td className="py-2">
                                <div className="flex gap-1">
                                    <Badge variant={data.active ? "destructive" : "green"}>{t(data.active ? 'pages.active' : 'pages.inactive')}</Badge>
                                    {data.ipban ? <Badge variant="destructive">{t('pages.ban.ip_ban')}</Badge> : ""}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="w-32 text-right px-4 py-1 text-gray-700 dark:text-gray-400">{t('pages.operator')}</td>
                            <td className="flex items-center gap-2 py-1">
                                <Image 
                                    alt="operator" 
                                    src={config.console.name.includes(data.operator) ? config.console.image : `https://minotar.net/avatar/${data.operator}/25`} 
                                    height={25} 
                                    width={25} 
                                    className="rounded-sm" 
                                />
                                <span className={cn(minecraft.className,"text-slate-600 hover:text-slate-600/80 dark:text-gray-400 dark:hover:text-gray-400/80")}>{data.operator}</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="w-32 text-right align-text-top px-4 py-1 text-gray-700 dark:text-gray-400">{t('pages.reason')}</td>
                            <td className="py-1 align-text-top">{data.reason}</td>
                        </tr>

                        <tr>
                            <td className="w-32 text-right px-4 py-1 text-gray-700 dark:text-gray-400">{t('pages.expire')}</td>
                            <td className="flex items-center gap-x-2 py-1">
                                <span className={data.removed_operator || data.expired ? "line-through text-slate-500" : ""}>{(new Date(data.until ? data.until : 0)).toLocaleString()}</span>
                                <span className="text-green-500">{data.expired ? `(${t('pages.expired')})` : ""}</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="w-32 text-right px-4 py-1 text-gray-700 dark:text-gray-400">{t('pages.server')}</td>
                            <td>{data.server}</td>
                        </tr>
                        {data.removed_operator ? (
                            <>
                            <tr>
                                <td className="w-32 text-right px-4 py-1 text-gray-700 dark:text-gray-400">{t('pages.removed')}</td>
                                <td className="flex items-center gap-2 py-1 align-text-top">
                                    <Image 
                                        alt="operator" 
                                        src={config.console.name.includes(data.removed_operator) ? config.console.image : `https://minotar.net/avatar/${data.removed_operator}/25`} 
                                        height={25} 
                                        width={25} 
                                        className="rounded-sm" 
                                    />
                                    <span className={cn(minecraft.className,"text-slate-600 hover:text-slate-600/80 dark:text-gray-400 dark:hover:text-gray-400/80")}>{data.removed_operator}</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="w-32 text-right align-text-top px-4 py-1 text-gray-700 dark:text-gray-400">{t('pages.removed_reason')}</td>
                                <td className="py-1 align-text-top">{data.removed_reason}</td>
                            </tr>
                            </>
                        ) : ""}
                    </tbody>
                </table>
            </div>
        </div>
        
    )
}