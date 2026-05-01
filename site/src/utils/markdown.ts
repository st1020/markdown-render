import MarkdownIt from "markdown-it";

export class MarkdownService {
  private _md: MarkdownIt;

  constructor() {
    this._md = new MarkdownIt({
      html: true
    });
  }

  public renderResume(md: string) {
    return this._md.render(md);
  }
}

export const markdownService = new MarkdownService();
