"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useParams } from 'next/navigation';
import { useReportStore } from '../_providers/report-store-provider'
import { useRouter } from "next/navigation";
import { pageHasErrors } from '../_lib/store-utils'
import { getRoutePath, reportPageFlow } from '../report/_lib/util/routes';

function SidebarItem(params: { title: string, path: string }) {
    const router = useRouter();
    const pathname = usePathname()

    const { pageSaveState } = useReportStore((state) => state)


    const isCurrent = () => {
        return pathname === params.path
    }

    const isUnsaved = () => {
        const saveState = pageSaveState[params.path];
        const unsaved = saveState === 'visited' ? true : false
        return unsaved;
    }

    const isUnsavedOrHasErrors = () => {
        return isUnsaved() || pageHasErrors(params.path)
    }

    const updateSavedState = async (path: string, e: any) => {
        e.preventDefault()
        const saveState = pageSaveState[pathname];
        if (saveState !== 'saved') {
            //updatePageSaveState(pathname, 'visited')
        }

        await router.push(path);
    }

    return (
        <li className={`moj-side-navigation__item ${isCurrent() ? 'moj-side-navigation__item--active' : ''} `}>
            <Link onClick={(e) => updateSavedState(params.path, e)} className='flex items-center' href={params.path} aria-current={isCurrent() ? 'location' : false}>
                {params.title}
            </Link>
        </li>
    )
}

function Sidebar() {
    const pathname = usePathname()
    const params = useParams<{ id: string}>()

    return pathname.includes('landing') ? <></> : (
    <div className="col-span-1">
        <nav className="moj-side-navigation !pt-0" aria-label="Side navigation">
            <ul className="moj-side-navigation__list">
                {reportPageFlow.map(page => <SidebarItem key={page.routeKey} title={page.displayName} path={getRoutePath(page.routeKey, {id: params.id})} />)}
            </ul>
        </nav>
    </div>
    )
}

export { Sidebar, SidebarItem }
