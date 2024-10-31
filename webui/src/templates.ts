export type TemplateMetadata = {
  name: string
  path: string
  language: string
  description?: string
  variables?: Map<string, TemplateVariable>
}

export type TemplateVariable = {
  name: string
  type: string
  regex: string
  options: TemplateVariableOption[]
}

export type TemplateVariableOption = {
  value: string
  label: string
}
