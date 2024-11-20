'use client'

import React, { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
    type ReportStore,
    createReportStore,
    initReportStore,
} from '../_stores/report-store'

export type ReportStoreApi = ReturnType<typeof createReportStore>

export const ReportStoreContext = createContext<ReportStoreApi | undefined>(
    undefined,
)

export interface ReportStoreProviderProps {
    children: ReactNode
}

export const ReportStoreProvider = ({
    children,
}: ReportStoreProviderProps) => {
    const storeRef = useRef<ReportStoreApi>()
    if (!storeRef.current) {
        storeRef.current = createReportStore(initReportStore())
    }

    return (
        <ReportStoreContext.Provider value={storeRef.current}>
            {children}
        </ReportStoreContext.Provider>
    )
}

export const useReportStore = <T,>(
    selector: (store: ReportStore) => T,
): T => {
    const reportStoreContext = useContext(ReportStoreContext)

    if (!reportStoreContext) {
        throw new Error(`useReportStore must be used within ReportStoreProvider`)
    }

    return useStore(reportStoreContext, selector)
}
