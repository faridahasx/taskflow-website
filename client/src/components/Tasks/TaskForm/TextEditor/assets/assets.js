export const supportedBlockTypes = new Set([
  "paragraph",
  "h1",
  "h2",
  "ul",
  "ol",
]);

export const blockTypeToBlockName = {
  h1: "Large Heading",
  h2: "Small Heading",
  ol: "Numbered List",
  paragraph: "Normal",
  ul: "Bulleted List",
};

export const LowPriority = 1;
