import { useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { FiCheck, FiCopy, FiChevronDown } from 'react-icons/fi';
import './QuickStart.css';

const TOOLS = ['shadcn', 'jsrepo'];
const RUNNERS = ['npx', 'pnpm dlx', 'bunx --bun', 'yarn dlx'];

const COMMANDS = {
  shadcn: (runner) => `${runner} shadcn@latest add @react-bits/Aurora-TS-TW`,
  jsrepo: (runner) => `${runner} jsrepo@latest add github/davidhaz/react-bits Aurora-TS-TW`,
};

const QuickStart = () => {
  const [tool, setTool] = useState(0);
  const [runner, setRunner] = useState(0);
  const [copied, setCopied] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const timerRef = useRef(null);

  const command = COMMANDS[TOOLS[tool]](RUNNERS[runner]);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  }, [command]);

  return (
    <section className="ln-qs-section">
      <div className="ln-qs-inner">
        <motion.div
          className="ln-qs-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <h2 className="ln-qs-title">Get started in seconds</h2>
        </motion.div>

        <motion.div
          className="ln-qs-terminal-wrap"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="ln-qs-glow" />
          <div className="ln-qs-terminal">
          {/* tab bar with tool selector + runner dropdown */}
          <div className="ln-qs-tab-bar">
            <div className="ln-qs-tabs">
              {TOOLS.map((t, i) => (
                <button
                  key={t}
                  className={`ln-qs-tab${tool === i ? ' ln-qs-tab--active' : ''}`}
                  onClick={() => setTool(i)}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="ln-qs-tab-bar-right">
              <div className="ln-qs-runner-dropdown">
                <button
                  className="ln-qs-runner-trigger"
                  onClick={() => setDropOpen((v) => !v)}
                >
                  {RUNNERS[runner]}
                  <FiChevronDown
                    size={11}
                    className={`ln-qs-caret${dropOpen ? ' open' : ''}`}
                  />
                </button>
                <div className={`ln-qs-runner-menu${dropOpen ? ' open' : ''}`}>
                  {RUNNERS.map((r, i) => (
                    <button
                      key={r}
                      className={`ln-qs-runner-item${runner === i ? ' active' : ''}`}
                      onClick={() => { setRunner(i); setDropOpen(false); }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* command line */}
          <div className="ln-qs-cmd-area">
            <div className="ln-qs-cmd-line">
              <span className="ln-qs-prompt">~</span>
              <code className="ln-qs-cmd-text">{command}</code>
            </div>
            <button
              className={`ln-qs-copy${copied ? ' ln-qs-copy--done' : ''}`}
              onClick={copy}
              aria-label="Copy command"
            >
              {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
            </button>
          </div>
        </div>
          <p className="ln-qs-hint">Works with any React project. Components are copied into your codebase.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickStart;
