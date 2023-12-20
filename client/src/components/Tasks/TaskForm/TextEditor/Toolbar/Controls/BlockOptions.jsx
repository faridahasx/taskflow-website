import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { $createHeadingNode } from "@lexical/rich-text";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

export default function BlockOptions({ editor, blockType }) {
  const formatParagraph = (e) => {
    e.preventDefault();
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createParagraphNode());
        }
      });
    }
  };

  const formatHeading = (e, tag) => {
    e.preventDefault();
    if (blockType !== tag) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(tag));
        }
      });
    }
  };

  const formatBulletList = (e) => {
    e.preventDefault();
    if (blockType !== "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND);
    }
  };

  const formatNumberedList = (e) => {
    e.preventDefault();
    if (blockType !== "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND);
    }
  };

  return (
    <div className="toolbar-items-group-contrainer">
      <button
        className={"toolbar-item text " + (blockType === "h1" ? "active" : "")}
        onClick={(e) => formatHeading(e, "h1")}
      >
        H1
      </button>
      <button
        className={"toolbar-item text " + (blockType === "h2" ? "active" : "")}
        onClick={(e) => formatHeading(e, "h2")}
      >
        H2
      </button>
      <button
        className={
          "toolbar-item text " + (blockType === "paragraph" ? "active" : "")
        }
        onClick={formatParagraph}
      >
        A
      </button>
      <button
        className={"toolbar-item " + (blockType === "ul" ? "active" : "")}
        onClick={formatBulletList}
      >
        <FormatListBulletedIcon />
      </button>
      <button
        className={"toolbar-item " + (blockType === "ol" ? "active" : "")}
        onClick={formatNumberedList}
      >
        <FormatListNumberedIcon />
      </button>
    </div>
  );
}
