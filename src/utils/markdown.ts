import MarkdownIt from "markdown-it"

export class MarkdownService {
  private md: MarkdownIt

  constructor() {
    this.md = new MarkdownIt({
      html: true,
    })
  }

  public renderDocument(md: string) {
    return this.md.render(md)
  }
}

export const markdownService = new MarkdownService()
