"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { formUrlQuery } from '@/lib/utils'

type PaginationProbs = {
    page: number | string,
    totalPages: number,
    urlParamName?: string
}

const Pagination = ({page, totalPages, urlParamName}: PaginationProbs) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const onClick = (btnType: string) => {
    const pageValue = btnType === 'next' 
        ? Number(page) + 1 
        : Number(page) - 1;

    const newUrl = formUrlQuery({
        params: searchParams?.toString() || '', // Дефолтное значение, если searchParams = null
        key: urlParamName || 'page',
        value: pageValue.toString(),
    });

    router.push(newUrl, { scroll: false });
    };



  return (
    <div className='flex gap-2'>
        <Button
          size="lg"
          variant="outline"
          className='w-28'
          onClick={() => onClick('prev')}
          disabled={Number(page) <= 1}
        >
          Предыдущая
        </Button>
        <Button
          size="lg"
          variant="outline"
          className='w-28'
          onClick={() => onClick('next')}
          disabled={Number(page) >= totalPages}
        >
          Следующая
        </Button>
    </div>
  )
}

export default Pagination