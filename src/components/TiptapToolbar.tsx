import { type Editor } from "@tiptap/react";
import { Toggle } from "./ui/toggle";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Pilcrow,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";

type Props = {
  editor: Editor | null;
};

export default function MenuBar({ editor }: Props) {
  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="border-2 rounded-md mb-2 text-gray-600">
        <Toggle
          title="Bold"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={15} />
        </Toggle>
        <Toggle
          title="italic"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={15} />
        </Toggle>
        <Toggle
          title="Strike"
          pressed={editor.isActive("strike")}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough size={15} />
        </Toggle>
        <Toggle
          title="paragraph"
          pressed={editor.isActive("paragraph")}
          onPressedChange={() => editor.chain().focus().setParagraph().run()}
        >
          <Pilcrow size={15} />
        </Toggle>
        <Toggle
          title="heading 1"
          pressed={editor.isActive("heading", { level: 1 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading1 size={15} />
        </Toggle>
        <Toggle
          title="heading 2"
          pressed={editor.isActive("heading", { level: 2 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 size={15} />
        </Toggle>
        <Toggle
          title="heading 3"
          pressed={editor.isActive("heading", { level: 3 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 size={15} />
        </Toggle>
        <Toggle
          title="heading 4"
          pressed={editor.isActive("heading", { level: 4 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
        >
          <Heading4 size={15} />
        </Toggle>
        <Toggle
          title="heading 5"
          pressed={editor.isActive("heading", { level: 5 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
        >
          <Heading5 size={15} />
        </Toggle>
        <Toggle
          title="heading 6"
          pressed={editor.isActive("heading", { level: 6 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
        >
          <Heading6 size={15} />
        </Toggle>
        <Toggle
          title="bullet list"
          pressed={editor.isActive("bulletList")}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          <List size={15} />
        </Toggle>
        <Toggle
          title="ordered list"
          pressed={editor.isActive("orderedList")}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          <ListOrdered size={15} />
        </Toggle>
        <Toggle
          title="undo"
          onPressedChange={() => editor.chain().focus().undo().run()}
          pressed={false}
        >
          <Undo size={15} />
        </Toggle>
        <Toggle
          title="redo"
          onPressedChange={() => editor.chain().focus().redo().run()}
          pressed={false}
        >
          <Redo size={15} />
        </Toggle>
      </div>
    </>
  );
}
