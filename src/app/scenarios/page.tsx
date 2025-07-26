// src/app/scenarios/page.tsx
import fs from 'fs';
import path from 'path';
import { ScenarioCard } from '@/components/ScenarioCard';


interface Scenario {
  title: string;
  summary: string;
  file: string;
  prompt: string;
}

const rawScenarios = [
  {
    title: 'コードネーム：GPT進行版',
    summary: '言葉で推理する対戦型スパイゲーム。GPTが進行役を務め、1人でも本格プレイが可能！',
    file: 'codenames-session.txt',
    image: '/images/codenames.jpg',
  },
  {
    title: 'GPT人狼（※調整中）',
    summary: '哲学・推論を行うNPCと対話する思考型人狼ゲーム。',
    file: 'gpt-jinro-session.txt',
    image: '/images/jinro.jpg',
  },
  {
    title: 'クトゥルフ神話TRPG',
    summary: 'あなたは探索者。GPTがキーパーとして、恐怖と謎に満ちた物語を紡ぎます。',
    file: 'coc-session.txt',
    image: '/images/coc.jpg',
    href: 'https://gpt-coc-addon.vercel.app/scenarios', // ★外部リンクに変更
    external: true,
  },
];





export default function ScenarioListPage() {
  const basePath = path.join(process.cwd(), 'public', 'data');

  const scenarios: Scenario[] = rawScenarios.map((s) => {
    let prompt = '';
    try {
      prompt = fs.readFileSync(path.join(basePath, s.file), 'utf8');
    } catch (e) {
      prompt = '⚠️ 読み込みエラー';
    }
    return { ...s, prompt };
  });

return (
  <main
    className="min-h-screen bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: 'url("/bg/common.jpg")' }}
  >
    {/* 📋 固定表示される利用手順セクション */}
<section
  className="sticky top-0 z-20 w-full max-w-3xl mx-auto px-4 py-3
             bg-transparent backdrop-blur-md border-b border-white/20"
>

      <h3 className="text-2xl text-white font-bold mb-2">📋 利用手順</h3>
      <ol className="list-decimal pl-6 space-y-1 text-white">
        <li>
          気になるゲームのボタンを押して、
          <span className="font-semibold text-green-500">「テキストをコピー」</span>
          してください。
        </li>
        <li>
          <a
            href="https://chat.openai.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 mt-1 text-white bg-blue-500 rounded hover:bg-blue-700 transition"
          >
            💬 ChatGPTを開く（貼り付けてEnterを押してください！）
          </a>
        </li>
      </ol>
      <ul className="mt-3 text-sm text-white space-y-1">
        <li>※１．チャット欄が表示されない場合、<br />　　 中央の「今すぐ始める」をクリック</li>
        <li>※２．GPT-4o（有料版）推奨。<br />　　 より没入感ある体験に</li>
      </ul>
    </section>

    {/* 📦 本文コンテンツ */}
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-serif font-bold text-center text-white tracking-wide mb-6">
        【GPT対話型ゲーム】
      </h1>

      <div className="flex flex-col items-center gap-8 mt-6">
        {scenarios.map((scenario, index) => (
          <div key={index} className="w-full max-w-xl">
            <ScenarioCard {...scenario} />
          </div>
        ))}
      </div>
    </div>
  </main>
);
}