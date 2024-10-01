// src/stores/counter-store.ts
import { createStore } from 'zustand/vanilla'
import { persist, createJSONStorage } from 'zustand/middleware'


export type ReportState = {
    questions: { [id: string]: any }
    pageSaveState: { [id: string]: 'saved' | 'visited' | 'unvisited' }
    errors: { pageId: string, questionId: string, errorText: string }[]
}

export type ReportActions = {
    updateQuestion: (id: string, page: string, data: any) => void
    updatePageSaveState: (page: string, saveState: 'saved' | 'visited' | 'unvisited') => void
    addError: (pageId: string, questionId: string, errorText: string) => void
    removeError: (pageId: string, questionId: string) => void
}

export type ReportStore = ReportState & ReportActions

export const initReportStore = (): ReportState => {
    return { questions: {}, pageSaveState: {}, errors: [] }
}

export const defaultInitState: ReportState = {
    questions: {},
    pageSaveState: {},
    errors: []
}

export const createReportStore = (
    initState: ReportState = defaultInitState,
) => {
    return createStore<ReportStore>()(persist((set, get) => ({
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
        }),
        addError: (pageId: string, questionId: string, errorText: string) => set((state) => {
            console.log("🚀 ~ addError: ~ questionId:", questionId)
            console.log("🚀 ~ addError: ~ pageId:", pageId)
            const newState = { ...state }
            newState.errors.push({ pageId, questionId, errorText })
            return newState;
        }),
        removeError: (pageId: string, questionId: string) => set((state) => {
            const newState = { ...state }

            const removalIndex = newState.errors.findIndex(p => p.pageId === pageId && p.questionId === questionId)

            if (removalIndex >= 0) {
                newState.errors.splice(removalIndex, 1);
            }

            return newState;
        })
    }),
        {
            name: 'report-store', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    ))
}
