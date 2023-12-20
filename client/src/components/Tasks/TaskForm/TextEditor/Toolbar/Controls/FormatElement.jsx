import { FORMAT_ELEMENT_COMMAND } from "lexical";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

const FormatElement = ({ editor }) => {
  const handleClick = (e, command) => {
    e.preventDefault();
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, command);
  };

  return (
    <div className="toolbar-items-group-contrainer">
      <button
        onClick={(e) => handleClick(e, "left")}
        className="toolbar-item"
        aria-label="Left Align"
      >
        <FormatAlignLeftIcon />
      </button>
      <button
        onClick={(e) => handleClick(e, "center")}
        className="toolbar-item"
        aria-label="Center Align"
      >
        <FormatAlignCenterIcon />
      </button>
      <button
        onClick={(e) => handleClick(e, "right")}
        className="toolbar-item"
        aria-label="Right Align"
      >
        <FormatAlignRightIcon />
      </button>
      <button
        onClick={(e) => handleClick(e, "justify")}
        className="toolbar-item"
        aria-label="Justify Align"
      >
        <FormatAlignJustifyIcon />
      </button>
    </div>
  );
};

export default FormatElement;
