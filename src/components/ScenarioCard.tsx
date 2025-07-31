'use client';

import React, { useState } from 'react';

interface ScenarioCardProps {
  title: string;
  summary: string;
  prompt?: string;
  englishPrompt?: string;
  href?: string;         // 日本語リンク
  hrefEn?: string;       // ✅ 英語リンクを追加
  external?: boolean;
  image?: string;
}

export function ScenarioCard({
  title,
  summary,
  prompt,
  englishPrompt,
  href,
  hrefEn,                // ✅ 追加
  external,
  image,
}: ScenarioCardProps) {
  const [copied, setCopied] = useState(false);
  const [copiedEn, setCopiedEn] = useState(false);

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
    } catch (err) {
      console.error('フォールバックコピーに失敗しました', err);
      alert('コピーに失敗しました');
    }
    document.body.removeChild(textarea);
  };

  const handleCopy = async () => {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      fallbackCopy(prompt);
    }
  };

  const handleCopyEn = async () => {
    try {
      if (englishPrompt) {
        await navigator.clipboard.writeText(englishPrompt);
        setCopiedEn(true);
        setTimeout(() => setCopiedEn(false), 2000);
      }
    } catch {
      fallbackCopy(englishPrompt || '');
    }
  };

  return (
    <div className="w-full bg-gray-900/60 text-white rounded-lg shadow-lg flex flex-row overflow-hidden border border-white/40">
      {image && (
        <div className="w-1/4 min-w-[80px] max-w-[120px]">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-red-400 mb-1 font-serif">{title}</h3>
          <p className="text-sm whitespace-pre-line">{summary}</p>
        </div>
        <div className="mt-4 flex gap-2 flex-wrap">
          {external ? (
            <>
              {href && (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
                >
                  🌐 外部リンク（日本語）
                </a>
              )}
              {hrefEn && (
                <a
                  href={hrefEn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-600 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700"
                >
                  🌐 English Version
                </a>
              )}
            </>
          ) : (
            <>
              <button
                onClick={handleCopy}
                className="bg-green-600 text-white text-sm px-4 py-2 rounded hover:bg-green-700"
              >
                {copied ? '✅ コピー済' : '📋 コピー'}
              </button>

              {englishPrompt && (
                <button
                  onClick={handleCopyEn}
                  className="bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-800"
                >
                  {copiedEn ? '✅ Copied EN' : '📋 Copy EN'}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
