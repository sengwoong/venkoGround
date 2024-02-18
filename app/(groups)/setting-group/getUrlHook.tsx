"use client"

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { reFetchSettingGroup } from '@/actions/rerodePath';
import { usePageNation } from '@/app/store/use-pagenation';

interface ReFlashUrlHookProps {
  children: React.ReactNode;
}

function GetUrlHook({ children }: ReFlashUrlHookProps) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const { setUrl ,page,reload,url} = usePageNation();

  // url 산입
  useEffect(() => {
    params.set('page', page.toString());
    setUrl(params.toString());
    reFetchSettingGroup(params.toString());
  }, [params, setUrl, page, reload, url]);


  return <>{children}</>;
}

export default GetUrlHook;
