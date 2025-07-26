'use client';

import { useState } from 'react';

interface ScenarioCardProps {
  title: string;
  summary: string;
  prompt: string;
  href?: string;
  external?: boolean;
  image?: string;
}

export function ScenarioCard({
  title,
  summary,
  prompt,
  href,
  external,
  image,
}: ScenarioCardProps) {
  const [copied, setCopied] = useState(false);

  const fallbackCopy = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('フォールバックコピーに失敗しました', err);
      alert('コピーに失敗しました');
    }
    document.body.removeChild(textarea);
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        fallbackCopy(prompt);
      }
    } catch (err) {
      console.error('コピーに失敗しました', err);
      fallbackCopy(prompt);
    }
  };

  return (
    <div className="w-full bg-gray-900/60 text-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden border border-white/40">
      {image && (
        <div className="md:w-1/3 w-full h-40 md:h-auto">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-red-400 mb-1 font-serif">
            {title}
          </h3>
          <p className="text-sm whitespace-pre-line">{summary}</p>
        </div>
        <div className="mt-4">
          {external ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
            >
              🌐 外部リンク
            </a>
          ) : (
            <button
              onClick={handleCopy}
              className="bg-green-600 text-white text-sm px-4 py-2 rounded hover:bg-green-700"
            >
              {copied ? '✅ コピー済' : '📋 コピー'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
