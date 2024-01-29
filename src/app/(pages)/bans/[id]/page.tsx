import { Badge } from "@/app/components/ui/badge";
import { createTranslation } from "@/app/i18n/server";
import Image from "next/image";

export default async function page() {
    const { t } = await createTranslation('common');
    return (
        <div className="max-w-screen-md m-auto py-4">
            <p className="text-4xl font-bold text-center">{t('pages.ban.ban', { id: 1 })}</p>
            <p className="text-lg text-center dark:text-gray-400">{t('pages.ban.date', { date: "01/29/2024 12:34:56 UTC" })}</p>
            <div className="grid grid-cols-3 max-md:grid-cols-1 mt-8">
                <div className="col-span-1 flex items-center justify-center">
                    <div className="text-center">
                        <Image alt="player_body" src={`https://minotar.net/body/Lookis/120`} height={120} width={120} className="max-md:hidden rounded-sm" />
                        <Image alt="player_body" src={`https://minotar.net/avatar/Lookis/120`} height={120} width={120} className="md:hidden rounded-sm" />
                        <p className="text-2xl mt-2 mb-2">Lookis</p>
                    </div>
                </div>
                <div className="col-span-2">
                    <table className="w-full bg-slate-200 dark:bg-slate-900 rounded-lg">
                        <tbody>
                            <tr>
                                <td className="w-32 text-right px-4 py-1 text-gray-700 dark:text-gray-400">{t('pages.ban.status')}</td>
                                <td className="py-2">
                                    <div className="flex gap-1">
                                        <Badge variant="green">Badge</Badge>
                                        <Badge variant="destructive">Badge</Badge>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="w-32 text-right px-4 py-1 text-gray-700 dark:text-gray-400">{t('pages.operator')}</td>
                                <td className="flex items-center gap-2 py-1">
                                    <Image alt="operator" src={`https://minotar.net/avatar/Console/100`} height={25} width={25} className="rounded-sm" /> Server
                                </td>
                            </tr>
                            <tr>
                                <td className="w-32 text-right px-4 py-1 text-gray-700 dark:text-gray-400">{t('pages.reason')}</td>
                                <td className="py-1 align-text-top">Test</td>
                            </tr>
                            <tr>
                                <td className="w-32 text-right px-4 py-1 text-gray-700 dark:text-gray-400">{t('pages.expire')}</td>
                                <td>Test</td>
                            </tr>
                            <tr>
                                <td className="w-32 text-right px-4 py-1 text-gray-700 dark:text-gray-400">{t('pages.ban.server')}</td>
                                <td>Test</td>
                            </tr>
                            <tr className="">
                                <td className="w-32 text-right px-4 py-1 text-gray-700 dark:text-gray-400">{t('pages.removed_reason')}</td>
                                <td className="py-1 align-text-top">Test</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}