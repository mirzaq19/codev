/* eslint-disable no-nested-ternary */
import {
  forwardRef,
  useCallback,
  useMemo,
  type ComponentProps,
  type PropsWithChildren,
  type Ref,
} from 'react';
import isHotkey from 'is-hotkey';
import {
  Editable,
  withReact,
  useSlate,
  Slate,
  type RenderElementProps,
  type RenderLeafProps,
} from 'slate-react';
import {
  Node,
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
  type Descendant,
} from 'slate';
import {
  Code,
  Bold,
  Italic,
  Underline,
  Heading,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
} from 'lucide-react';
import { withHistory } from 'slate-history';
import type { CustomElement, CustomText } from '@/types/slate';
import { cn } from '@/lib/utils';

type Format =
  | CustomElement['type']
  | ListTypes
  | TextAlignTypes
  | TextFormatTypes;

const HOTKEYS: Record<string, Format> = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const TEXT_FORMAT_TYPES = ['bold', 'italic', 'underline', 'code'] as const;
const LIST_TYPES = ['bulleted-list'] as const;
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'] as const;

type TextFormatTypes = (typeof TEXT_FORMAT_TYPES)[number];
type ListTypes = (typeof LIST_TYPES)[number];
type TextAlignTypes = (typeof TEXT_ALIGN_TYPES)[number];

interface BaseProps extends ComponentProps<'span'> {}

const Button = forwardRef(
  (
    {
      className,
      active,
      reversed = false,
      ...props
    }: PropsWithChildren<
      {
        active: boolean;
        reversed?: boolean;
      } & BaseProps
    >,
    ref: Ref<HTMLSpanElement>,
  ) => (
    <span
      {...props}
      ref={ref}
      className={cn(
        className,
        `block cursor-pointer ${reversed ? (active ? 'text-white' : 'text-zinc-800') : active ? 'bg-blue-200 text-blue-800' : 'text-zinc-800'} transition-colors`,
      )}
    />
  ),
);

const Menu = forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<HTMLDivElement>,
  ) => (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}
      className={cn(className, 'flex gap-3 justify-around flex-wrap')}
    />
  ),
);

const Toolbar = forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<HTMLDivElement>,
  ) => (
    <Menu
      {...props}
      ref={ref}
      className={cn(
        className,
        'bg-grey-100 px-3 py-2 border-b border-b-gray-300',
      )}
    />
  ),
);

const isMarkActive = (editor: Editor, format: Format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format as never] === true : false;
};

const toggleMark = (editor: Editor, format: Format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor: Editor, format: Format, blockType = 'type') => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType as keyof CustomElement] === format,
    }),
  );

  return !!match;
};

const toggleBlock = (editor: Editor, format: Format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format as TextAlignTypes) ? 'align' : 'type',
  );
  const isList = LIST_TYPES.includes(format as ListTypes);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type as ListTypes) &&
      !TEXT_ALIGN_TYPES.includes(format as TextAlignTypes),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format as TextAlignTypes)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive
        ? 'paragraph'
        : isList
          ? 'list-item'
          : (format as CustomElement['type']),
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] } as CustomElement;
    Transforms.wrapNodes(editor, block);
  }
};

function Element({
  attributes,
  children,
  element,
}: PropsWithChildren<{
  attributes: RenderElementProps['attributes'];
  element: CustomElement & { align?: string };
}>) {
  const style = { textAlign: element.align as AlignSetting | undefined };
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
}

function Leaf({ attributes, leaf, children }: RenderLeafProps) {
  if ((leaf as CustomText).bold) {
    children = <strong>{children}</strong>;
  }

  if ((leaf as CustomText).code) {
    children = <code>{children}</code>;
  }

  if ((leaf as CustomText).italic) {
    children = <em>{children}</em>;
  }

  if ((leaf as CustomText).underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
}

function BlockButton({ format, Icon }: { format: Format; Icon: typeof Bold }) {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format as TextAlignTypes) ? 'align' : 'type',
      )}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon className="size-5 align-bottom" />
    </Button>
  );
}

function MarkButton({ format, Icon }: { format: Format; Icon: typeof Bold }) {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon className="size-5 align-bottom" />
    </Button>
  );
}

const initialValue: Descendant[] = [
  {
    type: 'heading-two',
    align: 'left',
    children: [{ text: 'Hello World!' }],
  },
];

interface BodyEditorProps {
  currentValue: Descendant[];
  onValueChange: (data: Descendant[]) => void;
}

export default function BodyEditor({
  currentValue,
  onValueChange,
}: BodyEditorProps) {
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    [],
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    [],
  );
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);

  const serializeToTrimmedString = (nodes: Descendant[]) =>
    nodes
      .map((n) => Node.string(n))
      .join('\n')
      .trim();

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={(value) => onValueChange(value)}
    >
      <div className="ring-0 focus-within:ring-1 border border-zinc-300 transition-all rounded-lg overflow-hidden">
        <Toolbar>
          <MarkButton format="bold" Icon={Bold} />
          <MarkButton format="italic" Icon={Italic} />
          <MarkButton format="underline" Icon={Underline} />
          <MarkButton format="code" Icon={Code} />
          <BlockButton format="heading-two" Icon={Heading} />
          <BlockButton format="block-quote" Icon={Quote} />
          <BlockButton format="bulleted-list" Icon={List} />
          <BlockButton format="left" Icon={AlignLeft} />
          <BlockButton format="center" Icon={AlignCenter} />
          <BlockButton format="right" Icon={AlignRight} />
          <BlockButton format="justify" Icon={AlignJustify} />
        </Toolbar>
        <Editable
          className={`px-3 py-4 text-zinc-900 focus:outline-none transition-all duration-200 ease-in-out prose ${serializeToTrimmedString(currentValue).length === 0 ? 'min-h-30' : 'min-h-48'}`}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            Object.keys(HOTKEYS).forEach((hotkey) => {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            });
          }}
        />
      </div>
    </Slate>
  );
}
