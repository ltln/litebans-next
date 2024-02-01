"use client";

import { Input } from "@/app/components/ui/input";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import ListTable, { CDate, CExpire, COperator, CPlayer, CReason, TListColumn } from "@/app/components/ListTable";
import LoadingRipple from "@/app/components/LoadingRipple";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Bans() {
    const { t } = useTranslation('common');
    const { push } = useRouter();
    const { get } = useSearchParams();
    const page = get("p");

    const { data, error, isLoading } = useQuery({
        queryKey: ['?p=' + page],
        queryFn: () => axios.get(`/api/bans?page=${page}`),
    });
    const columns: TListColumn[] = [CPlayer, COperator, CReason, CDate, CExpire];

    const [cPage, setCPage] = useState<number>(page ? parseInt(page) : 1);
    const handlePageChange = (e: FormEvent) => {
        e.preventDefault();
        let pushPage = data ? cPage > data.data.total_page ? data.data.total_page : cPage : 1;
        setCPage(pushPage);
        push(`?p=${pushPage}`);
    }

    useEffect(() => {
        setCPage(page ? parseInt(page) : 1);
    }, [page])

    return (
        <>
            <p className="text-3xl max-md:text-xl py-4 text-center font-bold">{t('pages.ban.title')}</p>
            <p className="text-center dark:text-gray-400">{t('pages.ban.description')}</p>
            <div className="w-full my-4">
                { isLoading ? <LoadingRipple /> : <ListTable type="bans" columns={columns} data={data?.data.data} />}
                <div className="flex gap-2 items-center justify-center mt-4">
                    <Button variant="outline" className={"mr-4"} disabled={data ? cPage <= 1 ? true : false : true} onClick={() => cPage > 1 ? push(`?p=${cPage - 1}`) : undefined}>
                        <ChevronLeft />
                    </Button>
                    <span className="max-sm:hidden">{t('pages.page')} </span>
                    <form onSubmit={handlePageChange}>
                        <Input 
                            type="number" 
                            className="w-16 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                            min={1}
                            value={cPage}
                            onChange={e => setCPage(parseInt(e.target.value))} 
                        />
                    </form>
                    <span>{t('pages.of')} {data ? data.data.total_page : "0"}</span>
                    <Button variant="outline" className="ml-4" disabled={data ? cPage  >= data.data.total_page ? true : false : true} onClick={() => data ? cPage < data.data.total_page ? push(`?p=${cPage + 1}`) : null : null}>
                        <ChevronRight />
                    </Button>
                </div>
            </div>
        </>
    )
}