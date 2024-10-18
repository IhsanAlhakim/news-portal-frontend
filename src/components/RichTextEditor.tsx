import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "super" }, { script: "sub" }],
    ["blockquote", "code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["direction", { align: [] }],
    ["link", "image", "video", "formula"],
    ["clean"],
  ],
};

export function RichTextEditor() {
  const [value, setValue] = useState("");

  return (
    <div className="h-[350px] w-[700px]">
      <ReactQuill
        theme="snow"
        modules={modules}
        id="newsContent"
        value={value}
        onChange={(content) => setValue(content)}
        placeholder="Isi Artikel Disini..."
        style={{
          backgroundColor: "white",
          maxWidth: "700px",
          height: "300px",
          maxHeight: "300px",
        }}
      />
    </div>
  );
}
