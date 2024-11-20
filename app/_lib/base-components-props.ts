export type BaseComponentProps = {
  questionId: string
  page: string
  validators?: ((e: React.ChangeEvent) => string | null)[]
  required?: boolean
}
