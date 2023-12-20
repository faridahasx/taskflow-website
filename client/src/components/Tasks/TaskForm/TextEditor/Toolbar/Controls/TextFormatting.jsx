import { FORMAT_TEXT_COMMAND } from "lexical";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";

const TextFormatting = (props) => {
  const { editor, isBold, isItalic, isUnderline, isStrikethrough } = props;
  const handleClick = (e, command) => {
    e.preventDefault();
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, command);
  };

  return (
    <div className="toolbar-items-group-contrainer">
      <button
        onClick={(e) => {
          handleClick(e, "bold");
        }}
        className={"toolbar-item " + (isBold ? "active" : "")}
        aria-label="Format Bold"
      >
        <FormatBoldIcon />
      </button>
      <button
        onClick={(e) => {
          handleClick(e, "italic");
        }}
        className={"toolbar-item " + (isItalic ? "active" : "")}
        aria-label="Format Italics"
      >
        <FormatItalicIcon />
      </button>
      <button
        onClick={(e) => {
          handleClick(e, "underline");
        }}
        className={"toolbar-item " + (isUnderline ? "active" : "")}
        aria-label="Format Underline"
      >
        <FormatUnderlinedIcon />
      </button>
      <button
        onClick={(e) => {
          handleClick(e, "strikethrough");
        }}
        className={"toolbar-item " + (isStrikethrough ? "active" : "")}
        aria-label="Format Strikethrough"
      >
        <FormatStrikethroughIcon />
      </button>
    </div>
  );
};

export default TextFormatting;
