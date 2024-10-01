import { useReportStore } from '../_providers/report-store-provider'

export const questionHasErrors = (pageId: string, questionId: string) => {

    const { errors, pageSaveState } = useReportStore((state) => state)

    if (pageSaveState[pageId] !== 'saved') return false

    const questionErrors = errors.filter(error => error.questionId === questionId && error.pageId === pageId);

    return questionErrors.length > 0

}

export const pageHasErrors = (pageId: string) => {
    const { errors, pageSaveState } = useReportStore((state) => state)

    if (pageSaveState[pageId] !== 'saved') return false

    const pageErrors = errors.filter(error => error.pageId === pageId)

    return pageErrors.length > 0

}