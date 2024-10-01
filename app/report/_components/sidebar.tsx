"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useReportStore } from '../../_providers/report-store-provider'
import { useRouter } from "next/navigation";
import { pageHasErrors } from '../../_lib/store-utils'

function Sidebar() {
    const router = useRouter();
    const pathname = usePathname()
    const { updatePageSaveState, pageSaveState } = useReportStore((state) => state)

    const SidebarItem = (params: { title: string, path: string }) => {
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
                    {isUnsavedOrHasErrors() ? <div className="govuk-warning-text__icon !relative !h-[25px] !w-[25px] !max-h-[25px] !max-w-[25px] !min-h-[25px] !min-w-[25px] !text-lg mr-[5px] !bg-red-500 !border-red-500" aria-hidden="true">!</div> : null}
                    {params.title}
                </Link>
            </li>
        )
    }

    return <div className="col-span-1">
        <nav className="moj-side-navigation !pt-0" aria-label="Side navigation">
            <ul className="moj-side-navigation__list">
                <SidebarItem title='Defendant Details' path='/report/1234/defendant-details' />
                <SidebarItem title='Culpability and risk' path='/report/1234/culpability-and-risk' />
                <SidebarItem title='Summary' path='/report/1234/summary' />
            </ul>
        </nav>
    </div>
}

export { Sidebar }