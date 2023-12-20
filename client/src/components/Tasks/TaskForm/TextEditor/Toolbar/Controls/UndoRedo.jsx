import { REDO_COMMAND, UNDO_COMMAND } from "lexical";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

const UndoRedo = ({ editor, canUndo, canRedo }) => {
  const handleUndo = (e) => {
    e.preventDefault();
    editor.dispatchCommand(UNDO_COMMAND);
  };
  const handleRedo = (e) => {
    e.preventDefault();
    editor.dispatchCommand(REDO_COMMAND);
  };

  return (
    <div className="toolbar-items-group-contrainer">
      <button
        disabled={!canUndo}
        onClick={handleUndo}
        className="toolbar-item"
        aria-label="Undo"
      >
        <UndoIcon />
      </button>
      <button
        disabled={!canRedo}
        onClick={handleRedo}
        className="toolbar-item"
        aria-label="Redo"
      >
        <RedoIcon />
      </button>
    </div>
  );
};

export default UndoRedo;
