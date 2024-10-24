// src/Tiptap.tsx
import Placeholder from "@tiptap/extension-placeholder";
import { Content, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./TiptapToolbar";
import { newsBody } from "./AddEditNewsForm";
import { useEffect } from "react";

// define your extension array
const extensions = [
  StarterKit,
  Placeholder.configure({
    placeholder: "Write news content here...",
    emptyEditorClass:
      "cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-3 before:left-3 before:text-mauve-11 before:opacity-50 before-pointer-events-none",
  }),
];

interface TiptapProps {
  newsData: newsBody | null;
  setNewsData: (newsData: newsBody) => void;
}

const Tiptap = ({ newsData, setNewsData }: TiptapProps) => {
  const editor = useEditor({
    extensions,
    content: `${newsData?.content}`,
    immediatelyRender: true,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        class:
          "prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc min-h-[300px] max-h-[300px] outline-none border-2 rounded-md p-2 font-normal text-black marker:text-black",
      },
    },
    // Ada bug kalau memakai onupdate
    // spasi tidak terbaca
    onBlur({ editor }) {
      setNewsData({ ...newsData, content: editor.getHTML() });
    },
  });

  useEffect(() => {
    editor.commands.setContent(newsData?.content as Content);
  }, [newsData]);

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
