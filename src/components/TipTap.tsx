// src/Tiptap.tsx
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useState } from "react";
import MenuBar from "./TiptapToolbar";

// define your extension array
const extensions = [
  StarterKit,
  Placeholder.configure({
    placeholder: "Write news content here...",
    emptyEditorClass:
      "cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-3 before:left-3 before:text-mauve-11 before:opacity-50 before-pointer-events-none",
  }),
];

const Tiptap = () => {
  const [contentValue, setContentValue] = useState("");

  const editor = useEditor({
    extensions,
    content: contentValue,
    immediatelyRender: true,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        class:
          "prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc min-h-[300px] max-h-[300px] outline-none border-2 rounded-md p-2 font-normal text-black marker:text-black",
      },
    },
    onUpdate({ editor }) {
      setContentValue(editor.getHTML());
    },
  });

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
