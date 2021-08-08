import React from "react";

const Text = ({ text, style }) => {
  if (!text) {
    return null;
  }
  return text.map((val) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = val;

    return (
      <span
        className={[
          "py-2",
          bold ? "font-bold" : "",
          code
            ? "font-mono text-sm p-1 rounded-sm text-red-400 bg-gray-100"
            : "",
          italic ? "font-italic" : "",
          strikethrough ? "font-strikethrough" : "",
          underline ? "underline" : "",
          style ? style : "",
        ].join(" ")}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    );
  });
};

export default Text;
