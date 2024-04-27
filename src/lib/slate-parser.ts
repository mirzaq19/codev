import { Descendant, Text } from 'slate';
import escapeHtml from 'escape-html';

const serialize = (node: Descendant): string => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    if (node.code) {
      string = `<code>${string}</code>`;
    }
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    if (node.italic) {
      string = `<em>${string}</em>`;
    }
    if (node.underline) {
      string = `<u>${string}</u>`;
    }
    return string;
  }

  const children = node.children.map((n) => serialize(n)).join('');

  switch (node.type) {
    case 'block-quote':
      return `<blockquote><p>${children}</p></blockquote>`;
    case 'paragraph':
      return `<p>${children}</p>`;
    case 'bulleted-list':
      return `<ul>${children}</ul>`;
    case 'list-item':
      return `<li>${children}</li>`;
    case 'heading-two':
      return `<h2>${children}</h2>`;
    default:
      return children;
  }
};

export default {
  serialize,
};
