import { $getRoot, $getSelection, EditorState } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import theme from './theme';
import { useCallback } from 'react';

const editorConfig = {
  theme,
  namespace: 'editor',
  onError(error: any) {
    throw error;
  },
  nodes: [
  ]
};

interface EditorProps {
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
}

export default function Editor({ onChange }: EditorProps) {
  const handleChange = useCallback((state: EditorState) => {
    state.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot();
      const selection = $getSelection();

      onChange && onChange(root.__cachedText ?? "")
      console.log(root.__cachedText, selection);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <PlainTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div>Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin onChange={handleChange} />
      <HistoryPlugin />
    </LexicalComposer>
  );
}