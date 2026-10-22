import { useState } from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

// "Ask an AI about this page": the visitor types a question, then opens their own assistant with the page address, our
// instructions and that question already in place. Nothing is sent to 5G-MAG and no key or server is involved; the
// assistant reads the public page with the visitor's own account. ChatGPT and Claude take the text in the link;
// Gemini does not, so its button copies the text and opens Gemini for the visitor to paste it.
//   collapsed: show only a one-line link that opens the box (the home page, where the search band is already full).
//   about: what the assistant should read when the page itself is only a doorway (the home page reads llms.txt, the
//   site's own summary of every project, as well as the page).
export default function AskAi({ about, collapsed = false }) {
  const { siteConfig } = useDocusaurusContext();
  const { pathname } = useLocation();
  const [text, setText] = useState('');
  const [note, setNote] = useState('');
  const page = `${siteConfig.url}${pathname}`;
  const sources = about ? `${page} and ${siteConfig.url}${about}` : page;
  const prompt = () =>
    `Read ${sources} and answer my question about it. Use only that page and the pages it links to, give the links you used, ` +
    `and say so when the answer is not there. My question: ${text.trim() || '(please give me a short summary)'}`;
  const link = (base) => `${base}${encodeURIComponent(prompt())}`;

  const gemini = async () => {
    try {
      await navigator.clipboard.writeText(prompt());
      setNote('Your question is copied. Paste it into Gemini with Ctrl+V (Cmd+V on a Mac).');
    } catch (e) {
      setNote('Select your question above, copy it and paste it into Gemini.');
    }
  };

  const box = (
    <div className={styles.row}>
      <label className={styles.label} htmlFor="ask-ai-question">
        {collapsed ? 'Your question' : 'Ask an AI about this page'}
      </label>
      <input
        id="ask-ai-question"
        className={styles.input}
        type="text"
        value={text}
        maxLength={300}
        placeholder="Type your question, for example: which repositories implement glTF?"
        onChange={(e) => setText(e.target.value)}
      />
      <div className={styles.buttons}>
        <a
          className={styles.button}
          href={link('https://chatgpt.com/?q=')}
          target="_blank"
          rel="noopener noreferrer"
        >
          ChatGPT
        </a>
        <a
          className={styles.button}
          href={link('https://claude.ai/new?q=')}
          target="_blank"
          rel="noopener noreferrer"
        >
          Claude
        </a>
        <a
          className={styles.button}
          href="https://gemini.google.com/app"
          target="_blank"
          rel="noopener noreferrer"
          onClick={gemini}
        >
          Gemini
        </a>
      </div>
      <span className={styles.note} role="status">
        {note ||
          'Opens your own assistant with your question typed in; Gemini needs you to paste it. Answers can be wrong, so check the links it gives. 5G-MAG does not receive your question.'}
      </span>
    </div>
  );

  if (!collapsed) return box;
  return (
    <details className={styles.details}>
      <summary className={styles.summary}>
        Or ask an AI {about ? 'about 5G-MAG' : 'about this page'}
      </summary>
      {box}
    </details>
  );
}
