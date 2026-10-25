export type LegalSection = {
  title: string
  paragraphs?: string[]
  list?: string[]
}

export type LegalContent = {
  slug: string
  title: string
  intro: string
  updated: string
  sections: LegalSection[]
}
