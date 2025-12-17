import React from 'react';
import { Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  return (
    <div className="my-4 bg-black rounded border border-slate-700 overflow-hidden shadow-inner">
      <div className="bg-slate-800 px-3 py-1 flex items-center gap-2 border-b border-slate-700">
        <Terminal size={14} className="text-emerald-400" />
        <span className="text-xs text-slate-400 font-mono">python_script.py</span>
      </div>
      <pre className="p-4 font-mono text-sm sm:text-base text-emerald-300 overflow-x-auto whitespace-pre-wrap">
        <code>{code}</code>
      </pre>
    </div>
  );
};