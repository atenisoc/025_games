// src/app/scenarios/page.tsx
import fs from 'fs';
import path from 'path';
import { ScenarioCard } from '@/components/ScenarioCard';

export interface Scenario {
  title: string;
  summary: string;
  image: string;
  file?: string;
  href?: string;
  external?: boolean;
  prompt?: string;         // ← 追加 & オプショナルに
  englishPrompt?: string;  // ← 追加 & オプショナルに
}

const rawScenarios = [
{
  title: 'クトゥルフ神話TRPG',
  summary: 'あなたは探索者。GPTがキーパーとして、恐怖と謎に満ちた物語を紡ぎます。',
  image: '/images/coc.jpg',
  href: 'https://gpt-coc-addon.vercel.app/scenarios',        // 日本語版
  hrefEn: 'https://gpt-coc-addon.vercel.app/scenarios_en',  // ✅ 英語版
  external: true,
},
{
  title: 'ウミガメのスープ（Lateral Thinking Puzzle）',
  summary: 'Yes/No質問で真相に迫る水平思考ゲーム。GPTが出題者となり、あなたが探偵役に！',
  file: 'umigame-session.txt',
  englishPrompt: 'umigame-session_en.txt',
  image: '/images/umigame.jpg',
},
{
  title: 'コードネーム (Code Name)',
  summary: '言葉で推理する対戦型スパイゲーム。GPTが進行役を務め、1人でも本格プレイが可能！',
  file: 'codenames-session.txt',
  englishPrompt: 'codenames-session_en.txt',
  image: '/images/codenames.jpg',
},
  {
    title: 'GPT人狼（※調整中）',
    summary: '哲学・推論を行うNPCと対話する思考型人狼ゲーム。',
    file: 'gpt-jinro-session.txt',
    image: '/images/jinro.jpg',
    englishPrompt: 'Jinro game prompt in English',
  },

];




export default function ScenarioListPage() {
  const basePath = path.join(process.cwd(), 'public', 'data');

  const scenarios: Scenario[] = rawScenarios.map((s) => {
    let prompt = '';
    let englishPrompt = '';

    try {
      if (s.file) {
        // 日本語プロンプト読み込み
        prompt = fs.readFileSync(path.join(basePath, s.file), 'utf8');

        // 英語プロンプト読み込み（同名ファイルの_en.txt）
        const enFile = s.file.replace(/\.txt$/, '_en.txt');
        const enPath = path.join(basePath, enFile);

        if (fs.existsSync(enPath)) {
          englishPrompt = fs.readFileSync(enPath, 'utf8');
        }
      }
    } catch (e) {
      prompt = '⚠️ 読み込みエラー';
    }

    return { ...s, prompt, englishPrompt };
  });

  // ※ return のJSX部分は変えずにそのままでOKです


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
  <h3 className="text-2xl text-white font-bold mb-2">📋 利用手順 <span className="text-sm text-gray-300">/ How to Use</span></h3>

  <ol className="list-decimal pl-6 space-y-1 text-white">
    <li>
      気になるゲームのボタンを押して、
      <span className="font-semibold text-green-500">「テキストをコピー」</span>
      してください。
      <br />
      <span className="text-sm text-gray-300">→ Click the button to <strong>copy the prompt text</strong>.</span>
    </li>
    <li>
      <a
        href="https://chat.openai.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 mt-1 text-white bg-blue-500 rounded hover:bg-blue-700 transition"
      >
        💬 ChatGPTを開く（貼り付けてEnterを押してください！）<br />
        <span className="text-sm text-white/70">→ Open ChatGPT and paste the prompt</span>
      </a>
    </li>
  </ol>

  <ul className="mt-3 text-sm text-white space-y-1">
    <li>
      ※１．チャット欄が表示されない場合、<br />
      　　 中央の「今すぐ始める」をクリック
    </li>
    <li>
      ※２．GPT-4o（有料版）推奨。<br />
      　　 より没入感ある体験に
    </li>
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