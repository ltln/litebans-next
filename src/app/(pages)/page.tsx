import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { createTranslation } from '../i18n/server';
import { config } from "@/lib/config";

export default async function Home() {
  const { t } = await createTranslation('common');
  return (
    <>
      <div className="flex flex-col gap-2 items-center justify-center text-center py-20">
        <p className="text-4xl max-md:text-2xl font-bold">{t('pages.index.welcome', { server: config.server_name })}</p>
        <p className="text-xl max-md:text-lg dark:text-gray-300">{t('pages.index.description')}</p>
      </div>
      <div className="px-8 py-4 m-auto max-w-xl rounded-lg">
        <div className="flex w-full items-center space-x-2">
          <Input type="text" placeholder={t('search')} className="border-gray-600 dark:border-gray-400" />
          <Button>
            <MagnifyingGlassIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
