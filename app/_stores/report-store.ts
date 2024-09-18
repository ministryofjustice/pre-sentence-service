// src/stores/counter-store.ts
import { createStore } from 'zustand/vanilla'
import { persist, createJSONStorage } from 'zustand/middleware'


export type ReportState = {
    questions: { [id: string]: any }
    pageSaveState: { [id: string]: any }
}

export type ReportActions = {
    updateQuestion: (id: string, page: string, data: any) => void
    updatePageSaveState: (page: string, saveState: 'saved' | 'visited' | 'unvisited') => void
}

export type ReportStore = ReportState & ReportActions

export const initReportStore = (): ReportState => {
    return { questions: {}, pageSaveState: {} }
}

export const defaultInitState: ReportState = {
    questions: {},
    pageSaveState: {}
}

export const createReportStore = (
    initState: ReportState = defaultInitState,
) => {
    return createStore<ReportStore>()(persist((set) => ({
        ...initState,
        updateQuestion: (id: string, page: string, data: any) => set((state) => {
            const newState = { ...state }
            newState.questions[id] = data
            newState.pageSaveState[page] = 'visited'
            return newState;
        }),
        updatePageSaveState: (page: string, saveState: 'saved' | 'visited' | 'unvisited') => set((state) => {
            const newState = { ...state }
            newState.pageSaveState[page] = saveState
            return newState;
        })
    }),
        {
            name: 'report-store', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    ))
}
