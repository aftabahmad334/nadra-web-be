import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Styles props
// interface StyleProps {
//   error?: boolean;
// }

// const useStyles = makeStyles((theme) => ({
//   editorContainer: {
//     margin: theme.spacing(2, 0),
//   },
//   errorText: {
//     color: theme.palette.error.main,
//     fontSize: "0.75rem",
//     marginTop: theme.spacing(0.5),
//   },
//   editorWrapper: (props) => ({
//     border: props.error ? `1px solid ${theme.palette.error.main}` : "none",
//     borderRadius: theme.shape.borderRadius,
//   }),
// }));

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "background",
  "align",
  "code-block",
];

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
    [{ color: [] }, { background: [] }],
    [{ align: ["justify", "center", "right"] }],
    ["code-block"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const RichTextEditor = ({
  value = "",
  onChange,
  id,
  label,
  error = false,
  errorMessage = "This field is required",
  height = "200px",
}) => {
  const [editorValue, setEditorValue] = useState("");
  //   const classes = useStyles({ error });

  useEffect(() => {
    if (value !== editorValue) {
      setEditorValue(value);
    }
  }, [value]);

  const handleChange = (content, delta, source, editor) => {
    const htmlContent = editor.getHTML();
    setEditorValue(htmlContent);
    onChange({
      target: {
        value: htmlContent,
        id,
      },
    });
  };

  return (
    <div className="w-full h-full">
      {label && <label htmlFor={id}>{label}</label>}
      <ReactQuill
        theme="snow"
        value={editorValue}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        style={{ minHeight: height, fontFamily: "Inter" }}
      />
    </div>
  );
};

export default RichTextEditor;
