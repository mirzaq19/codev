// import Html, { Rule } from 'slate-html-serializer';

import { Descendant, Text } from 'slate';
import escapeHtml from 'escape-html';

// const BLOCK_TAGS = {
//   blockquote: 'quote',
//   p: 'paragraph',
//   pre: 'code',
// };

// // Add a dictionary of mark tags.
// const MARK_TAGS = {
//   em: 'italic',
//   strong: 'bold',
//   u: 'underline',
// };

// const rules: Rule[] = [
//   {
//     deserialize(el, next) {
//       const type =
//         BLOCK_TAGS[el.tagName.toLowerCase() as keyof typeof BLOCK_TAGS];
//       if (type) {
//         return {
//           object: 'block',
//           type,
//           data: {
//             className: el.getAttribute('class'),
//           },
//           nodes: next(el.childNodes),
//         };
//       }
//       // Add a default return statement
//       return null;
//     },
//     serialize(obj, children) {
//       if (obj.object === 'block') {
//         switch (obj.type) {
//           case 'code':
//             return `<pre><code>${children}</code></pre>`;
//           case 'paragraph':
//             return `<p className={obj.data.get('className')}>${children}</p>`;
//           case 'quote':
//             return `<blockquote>${children}</blockquote>`;
//           default:
//             return null;
//         }
//       }
//       // Add a default return statement
//       return null;
//     },
//   },
//   {
//     deserialize(el, next) {
//       const type =
//         MARK_TAGS[el.tagName.toLowerCase() as keyof typeof MARK_TAGS];
//       if (type) {
//         return {
//           object: 'mark',
//           type,
//           nodes: next(el.childNodes),
//         };
//       }
//       // Add a default return statement
//       return null;
//     },
//     serialize(obj, children) {
//       if (obj.object === 'mark') {
//         switch (obj.type) {
//           case 'bold':
//             return `<strong>${children}</strong>`;
//           case 'italic':
//             return `<em>${children}</em>`;
//           case 'underline':
//             return `<u>${children}</u>`;
//           default:
//             return null;
//         }
//       }
//       // Add a default return statement
//       return null;
//     },
//   },
// ];

// export const html = new Html({ rules });

// const BLOCK_TAGS = {
//   blockquote: 'quote',
//   p: 'paragraph',
//   pre: 'code',
//   h2: 'heading-two',
//   ul: 'bulleted-list',
//   li: 'list-item',
// };

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
