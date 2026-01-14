import MarkdownIt from "markdown-it";
import DOMPurify from "dompurify";

const md = new MarkdownIt();
const html = DOMPurify.sanitize(md.render(markdown));
