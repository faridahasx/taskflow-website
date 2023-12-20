import { useEffect } from "react";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { $insertNodes, $getRoot } from "lexical";

const HtmlPlugin = ({ initialHtml, onHtmlChanged }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!initialHtml) return;
    editor.update(() => {
      const content = $getRoot()
        .getChildren()
        .map((n) => n.getTextContent());
      if (content.length === 1 && content[0] === "") {
        const parser = new DOMParser();
        const dom = parser.parseFromString(initialHtml, "text/html");
        const nodes = $generateNodesFromDOM(editor, dom);
        $insertNodes(nodes);
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <OnChangePlugin
      onChange={(editorState) => {
        editorState.read(() => {
          onHtmlChanged($generateHtmlFromNodes(editor));
        });
      }}
    />
  );
};

export default HtmlPlugin;
