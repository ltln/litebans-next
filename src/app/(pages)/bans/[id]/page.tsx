"use client";

import DataTable from "@/app/components/DataTable";
import LoadingRipple from "@/app/components/LoadingRipple";
import { useTranslation } from "@/app/i18n/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";

export default function Page() {
    const { t } = useTranslation('common');
    const { id } = useParams();

    const { data, error, isLoading } = useQuery({
        queryKey: ['bans/' + id],
        queryFn: () => axios.get(`/api/bans?id=${id}`),
        enabled: !!id,
    });

    return (
        <div className="max-w-screen-md m-auto py-4">
            <p className="text-4xl max-md:text-2xl font-bold text-center">{t('pages.ban.ban', { id: id })}</p>
            <p className="text-lg max-md:text-sm text-center dark:text-gray-400">{t('pages.date')}: {isLoading ? t('pages.loading') : (new Date(data?.data.time)).toLocaleString()}</p>
            { isLoading ? <LoadingRipple /> : <DataTable data={data?.data} /> }
        </div>
    )
}