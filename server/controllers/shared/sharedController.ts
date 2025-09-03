import { Request, Response } from 'express'
import { format } from 'date-fns'

import { FormValidation, ValidatedForm, validateForm } from '../../utils/formValidation'

import Report from '../../repositories/entities/report'
import ReportService, { IFieldValue, SourceOfInformation } from '../../services/reportService'
import EventService from '../../services/eventService'
import CommunityService from '../../services/communityService'
import PreSentenceToDeliusService, { IContext } from '../../services/preSentenceToDeliusService'

import formatAddress from '../../utils/formatAddress'
import formatKey from '../../utils/formatKey'
import formatOffences from '../../utils/formatOffences'
// import logger from '../../../logger'
import validateUUID from '../../utils/reportValidation'

enum RiskLevel {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  VeryHigh = 'very_high',
}

const RiskLevelLabels: Record<RiskLevel, string> = {
  [RiskLevel.Low]: 'Low risk',
  [RiskLevel.Medium]: 'Medium risk',
  [RiskLevel.High]: 'High risk',
  [RiskLevel.VeryHigh]: 'Very high risk',
}

const riskOptions = [
  { value: '', text: 'Choose an option' },
  ...Object.entries(RiskLevelLabels).map(([value, text]) => ({
    value,
    text,
  })),
]

export interface TemplateValues {
  preSentenceType: string
  reportPath: string
  reportId?: string
  data?: Record<string, unknown>
  formValidation?: ValidatedForm
  riskOptions?: { value: string; text: string }[]
  sourcesOfInformation?: SourceOfInformation[]
  isEditing?: boolean
  removedSources?: string[]
  tempSources?: { key: string; value: string }[]
}

interface InclusionExclusion {
  hasAccess: boolean
  disallowedMessage?: string
  disallowedStack?: string
  status?: number
}

export type SharedData = {
  crn?: string
  name?: string
  age?: number
  dateOfBirth?: string
} & { [key: string]: unknown }

export default class SharedController {
  private persistentData: Array<string> = ['crn', 'name']

  path = ''

  templatePath = ''

  redirectPath = ''

  data: SharedData = {}

  defaultTemplateData = {}

  pageFields: Array<string> = []

  templateValues: TemplateValues = {
    reportId: '',
    reportPath: '',
    preSentenceType: '',
    riskOptions,
    isEditing: false,
  }

  formValidation: FormValidation = {
    required: [],
  }

  updateReport: () => void

  additionalPostAction: () => void

  correctFormData: (req: Request) => object

  constructor(
    protected readonly reportService: ReportService = null,
    protected readonly communityService: CommunityService = null,
    protected readonly eventService: EventService = null,
    protected readonly preSentenceToDeliusService: PreSentenceToDeliusService = null,
    protected report: Report = null
  ) {}

  protected renderTemplate(res: Response, templateValues: TemplateValues) {
    if (this.templatePath === 'risk-analysis') {
      templateValues.riskOptions = riskOptions
    }

    if (this.templatePath === 'sources-of-information') {
      const sourcesToDisplay: SourceOfInformation[] = [
        ...templateValues.sourcesOfInformation.filter(x => !(templateValues.removedSources ?? []).includes(x.key)),
        ...(templateValues.tempSources ?? []).map(x => ({
          ...x,
          isCustom: true,
        })),
      ].sort((a, b) => a.value.toLowerCase().localeCompare(b.value.toLowerCase()))
      const selectedSources = (this.data['sourcesOfInformation'] as string[]) ?? []
      templateValues.sourcesOfInformation = sourcesToDisplay.map(x => ({
        ...x,
        checked: selectedSources.some(v => v === x.key),
      }))
    }
    res.render(`${this.path}/${this.templatePath}`, templateValues)
  }

  private checkInclusionExclusion = async (_crn: string, _user: string): Promise<InclusionExclusion> => {
    // try {
    //   await this.communityService.getUserAccess(crn, user)
    //   return {
    //     hasAccess: true,
    //   }
    // } catch (error) {
    //   let disallowedMessage: string
    //   let disallowedStack: string
    //   if (error.data?.userExcluded) {
    //     disallowedMessage = 'User Excluded'
    //     disallowedStack = error.data.exclusionMessage
    //   } else if (error.data?.userRestricted) {
    //     disallowedMessage = 'User Restricted'
    //     disallowedStack = error.data.restrictionMessage
    //   } else {
    //     disallowedMessage = 'Error'
    //     disallowedStack = 'Unable to check restriction / exclusion'
    //   }
    //   return {
    //     hasAccess: false,
    //     disallowedMessage,
    //     disallowedStack,
    //     status: error?.status,
    //   }
    // }

    return {
      hasAccess: true,
    }
  }

  private getStoredData = () => {
    this.data = {}
    if (this.report && this.report.fieldValues) {
      this.report.fieldValues.forEach(item => {
        if (this.pageFields.includes(item.field.name)) {
          if (item.field.name === 'sourcesOfInformation') {
            this.data[item.field.name] = item.value.split(',')
          } else {
            this.data[item.field.name] = item.value
          }
        }
      })
    }
  }

  private getPersistentData = (): object => {
    const data: { [key: string]: unknown } = {}
    if (this.report && this.report.fieldValues) {
      this.report.fieldValues.forEach(item => {
        if (this.persistentData.includes(item.field.name)) {
          data[item.field.name] = item.value
        }
      })
    }
    return data
  }

  private populateFieldValuesAndGetName = async (): Promise<string> => {
    if (this.preSentenceToDeliusService) {
      const context: IContext = await this.preSentenceToDeliusService.getContext(this.report.id)
      const formattedName = `${context.name.forename} ${context.name.middleName ? context.name.middleName : ''} ${
        context.name.surname
      }`
      await this.updateFields(
        {
          name: formattedName,
          dateOfBirth: format(new Date(context.dateOfBirth), 'dd/MM/yyyy'),
          pnc: context.pnc,
          address: formatAddress(context.address),
          court: context.court.name,
          mainOffence: context.mainOffence.description,
          otherOffences: formatOffences(context.otherOffences),
        },
        true
      )
      return formattedName
    }
    return undefined
  }

  protected checkFieldValueVersions = (_req: Request, _report: Report): boolean => {
    const validVersions = true
    // if (report && report.fieldValues && req.session.fieldValues) {
    //   report.fieldValues.forEach(savedValue => {
    //     const compare = req.session.fieldValues.find(currentValue => currentValue.fieldId === savedValue.fieldId)
    //     if ((compare ? compare.version : 1) !== savedValue.version) {
    //       validVersions = false
    //       logger.warn({
    //         versionMismatch: true,
    //         reportId: report.id,
    //         sessionField: { ...compare, value: '***' },
    //         dbField: { ...savedValue, value: '***' },
    //         userName: req.session.userDetails.username,
    //       })
    //     } else {
    //       logger.info({
    //         versionMismatch: false,
    //         reportId: report.id,
    //         sessionField: { ...compare, value: '***' },
    //         dbField: { ...savedValue, value: '***' },
    //         userName: req.session.userDetails.username,
    //       })
    //     }
    //   })
    // }
    return validVersions
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected updateFields = async (fieldData: any, overridePageFields = false) => {
    const fieldValues: Array<IFieldValue> = []
    if (this.report && this.report.reportDefinition && this.report.reportDefinition.fields) {
      this.report.reportDefinition.fields.forEach(item => {
        if (this.pageFields.includes(item.name) || (overridePageFields && Object.keys(fieldData).includes(item.name))) {
          const fieldValue = this.report.fieldValues.find(value => item.name === value.field.name)
          let tmpValue = fieldValue?.value ?? null
          if (fieldData[item.name] && fieldData[item.name] !== '') {
            tmpValue = Array.isArray(fieldData[item.name])
              ? (fieldData[item.name] as []).join(',')
              : (fieldData[item.name] as string)
          }
          fieldValues.push({
            reportId: this.report.id,
            fieldId: item.id,
            value: tmpValue,
            version: fieldValue && fieldValue.version ? fieldValue.version + 1 : 1,
          })
        }
      })
    }
    if (fieldValues.length) {
      await this.reportService.updateFieldValues(fieldValues)
    }
  }

  private setStartedDate = async () => {
    const today = new Date()
    const startDateFields = {
      'startDate-day': `0${today.getDate()}`.slice(-2),
      'startDate-month': `0${today.getMonth() + 1}`.slice(-2),
      'startDate-year': today.getFullYear(),
    }
    await this.updateFields(startDateFields, true)
  }

  public get = async (req: Request, res: Response): Promise<void> => {
    const reportId = req.params.reportId
    const isEditing = req.path.includes('/edit')
    const removeKey = req.query.remove as string | undefined

    if (!isEditing) {
      if (req.session.addedSources) delete req.session.addedSources[reportId]
      if (req.session.removedSources) delete req.session.removedSources[reportId]
    }

    if (isEditing && removeKey) {
      const temp = req.session.addedSources[reportId]
      if (temp && temp.some(x => x.key === removeKey)) {
        req.session.addedSources[reportId] = temp.filter(x => x.key !== removeKey)
      } else {
        req.session.removedSources ||= {}
        req.session.removedSources[reportId] ||= []
        req.session.removedSources[reportId].push(removeKey)
      }
      return res.redirect(`/psr/${reportId}/sources-of-information/edit`)
    }

    if (validateUUID(reportId)) {
      this.report = await this.reportService.getReportById(reportId)
      if (this.report) {
        // if (this.report.status === 'COMPLETED' && !req.url.includes('report-completed')) {
        //   res.redirect(`/${this.path}/${req.params.reportId}/report-completed`)
        //   return
        // }
        this.getStoredData()
        const persistentData: { name?: string; crn?: string } = this.getPersistentData()

        if (!req.session?.isAllowedAccess) {
          const inclusionExclusionCheck = await this.checkInclusionExclusion(
            persistentData.crn,
            res.locals?.user?.username
          )
          if (!inclusionExclusionCheck.hasAccess) {
            res.render('pages/error', {
              message: inclusionExclusionCheck.disallowedMessage,
              stack: inclusionExclusionCheck.disallowedStack,
              status: inclusionExclusionCheck.status,
            })
            return
          }
          req.session.isAllowedAccess = true
        }

        // let formattedName
        // if (!persistentData.name) {
        //   formattedName = await this.populateFieldValuesAndGetName()
        // }
        // if (this.updateReport) {
        //   this.data = {
        //     ...this.data,
        //     ...persistentData,
        //   }
        //   await this.updateReport()
        // }
        req.session.fieldValues = this.report.fieldValues
        const isEditing = req.path.endsWith('/edit') //req.params.mode === 'edit'
        req.session.addedSources ||= {}
        req.session.addedSources[reportId] ||= []
        req.session.removedSources ||= {}
        req.session.removedSources[reportId] ||= []
        const sourcesOfInformation = await this.reportService.getSourcesOfInformation(this.report.id)
        this.renderTemplate(res, {
          isEditing,
          removedSources: isEditing ? req.session.removedSources[reportId] : [],
          tempSources: isEditing ? req.session.addedSources[reportId] : [],
          sourcesOfInformation,
          ...this.templateValues,
          reportId: reportId,
          data: {
            name: persistentData.name,
            ...this.defaultTemplateData,
            ...this.data,
            ...this.report,
            ...persistentData,
          },
        })
      } else {
        res.redirect(`/${this.path}/${reportId}/not-found`)
      }
    } else {
      res.redirect(`/${this.path}/${reportId}/not-found`)
    }
  }

  protected updateReportActions = async (req: Request) => {
    if (this.correctFormData) {
      req.body = {
        ...req.body,
        ...this.correctFormData(req),
      }
    }

    if (this.report && this.report.status === 'NOT_STARTED') {
      await this.reportService.updateReport({ ...this.report, status: 'STARTED' })
      await this.setStartedDate()
    } else {
      await this.reportService.updateReport({ ...this.report, lastUpdated: new Date().toISOString() })
    }

    await this.updateFields(req.body)
  }

  public post = async (req: Request, res: Response): Promise<void> => {
    const reportId = req.params.reportId
    const isEditing = req.path.endsWith('/edit') //req.params.mode === 'edit'
    const isSaving = req.query.save === 'true'
    const { action } = req.body

    if (action === 'save-list') {
      const addedSources = req.session.addedSources[reportId] ?? []
      const removedSources = req.session.removedSources[reportId] ?? []
      if (addedSources.length > 0 || removedSources.length > 0) {
        await this.reportService.saveCustomSourcesOfInformation(reportId, addedSources, removedSources)
        delete req.session.addedSources[reportId]
        delete req.session.removedSources[reportId]
      }
      return res.redirect(`/${this.path}/${reportId}/sources-of-information`)
    }

    if (!isEditing) {
      if (req.session.addedSources) delete req.session.addedSources[reportId]
      if (req.session.removedSources) delete req.session.removedSources[reportId]
    }

    if (isEditing && !isSaving) {
      const customSource = req.body.source?.trim()

      if (customSource) {
        const key = `custom_${formatKey(customSource)}`
        req.session.addedSources ||= {}
        req.session.addedSources[reportId] ||= []
        req.session.addedSources[reportId].push({
          key,
          value: customSource,
        })
        return res.redirect(`/${this.path}/${reportId}/sources-of-information/edit`)
      }
      //what if there is no custom source, or if the custom source is a duplicate?
    }

    this.report = await this.reportService.getReportById(reportId)
    const validatedForm: ValidatedForm = validateForm(req.body, this.formValidation)
    if (validatedForm.isValid || req.query?.redirectPath) {
      await this.updateReportActions(req)

      if (this.additionalPostAction) {
        this.data = {
          ...this.data,
          ...this.getPersistentData(),
        }
        await this.additionalPostAction()
      }
      res.redirect(`/${this.path}/${reportId}/${req.query?.redirectPath || this.redirectPath}`)
    } else {
      const sourcesOfInformation = await this.reportService.getSourcesOfInformation(this.report.id)
      this.renderTemplate(res, {
        ...this.templateValues,
        sourcesOfInformation,
        reportId,
        data: {
          ...this.data,
          ...req.body,
          ...this.getPersistentData(),
        },
        formValidation: validatedForm,
      })
    }
  }
}
