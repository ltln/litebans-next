"use client";

import DataTable from "@/app/components/DataTable";
import ErrorAlert from "@/app/components/ErrorAlert";
import LoadingRipple from "@/app/components/LoadingRipple";
import { useTranslation } from "@/app/i18n/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Error from "next/error";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const { t } = useTranslation('common');
    const { id } = useParams<{id: string}>();

    if (!/^[0-9]*$/.test(id)) return <Error statusCode={404} />

    const { data, error, isLoading } = useQuery({
        queryKey: ['bans/' + id],
        queryFn: () => axios.get(`/api/bans?id=${id}`),
        enabled: !!id,
    });

    return (
        <div className="max-w-screen-md m-auto py-4">
            <p className="text-4xl max-md:text-2xl font-bold text-center">{t('pages.ban.ban', { id: id })}</p>
            <p className="text-lg max-md:text-sm text-center dark:text-gray-400 mb-4">{t('pages.date')}: {isLoading ? t('pages.loading') : (new Date(data?.data.time)).toLocaleString()}</p>
            { isLoading ? 
                <LoadingRipple /> 
            : error == null ?
                <DataTable data={data?.data} />
            :
                <ErrorAlert title={t('error.title')} message={t('error.fetch')} error={error.message} />
            }
        </div>
    )
}