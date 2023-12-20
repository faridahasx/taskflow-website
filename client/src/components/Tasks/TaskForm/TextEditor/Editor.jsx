import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import HtmlPlugin from "./plugins/HTMLPlugin";
import ToolbarPlugin from "./Toolbar/Toolbar";
import ExampleTheme from "./assets/theme";
import "./styles.css";

const Placeholder = () => {
  return <div className="editor-placeholder">Description...</div>;
};

const editorConfig = {
  theme: ExampleTheme,
  onError(error) {
    throw error;
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    TableNode,
    TableCellNode,
    TableRowNode,
  ],
};

const Editor = ({ description, handleSetDescription }) => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <HtmlPlugin
          initialHtml={description}
          onHtmlChanged={handleSetDescription}
        />
        <ToolbarPlugin />

        <div id="editor" className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <ListPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
        </div>
      </div>
    </LexicalComposer>
  );
};

export default Editor;
