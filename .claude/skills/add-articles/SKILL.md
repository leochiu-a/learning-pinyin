---
name: add-articles
description: 為「拼音步道」(learning-pinyin repo) 補一批新的打字短文：從維基百科首頁、新聞找當下有趣的題材，改寫成原創的正體中文短文，標上台灣讀音的數字標調拼音，經萌典與 pinyin-pro 交叉檢查、跑測試後加進 src/data/articles.ts，再 commit 並推上 main 自動部署。使用者說「加新文章」「補短文」「更新今天的短文」「跑 add-articles」或定期呼叫時使用。
---

# 補新短文

網站每天從文章庫輪替 3 篇「今天的短文」（`src/lib/daily.ts`），文章庫越大越不重複。這個 skill 每次加一批新文章。

## 1. 準備

```bash
git pull --ff-only
pnpm install
date +%F   # 今天的日期，填在 added
```

讀 `src/data/articles.ts`，記下已有的 `id`、主題與內容，避免重複。

## 2. 找題材

預設加 **7 篇**（使用者有指定就照指定）。主題混搭，每批至少三種：

- **時事**：最近幾天輕鬆、正面的新聞，例如科學發現、運動賽事、文化活動、台灣在地消息。避開政治爭議、災難傷亡、犯罪。
- **冷知識**、**台灣**、**生活**、**故事**、**古詩**。

題材來源：

- 中文維基百科首頁（台灣正體）：`https://zh.wikipedia.org/w/index.php?title=Wikipedia:首页&variant=zh-tw`，裡面的「新聞動態」「你知道嗎？」「歷史上的今天」都會更新。
- 新聞網站，例如中央社 `https://www.cna.com.tw`、公視新聞網 `https://news.pts.org.tw`。

**只取事實、自己改寫**：新聞與維基內容有著作權，不可複製原句。讀懂後用自己的話寫成簡單的短文，並在 `source` 附上參考的頁面。事實要能在來源裡找到，不要自己補數字。

## 3. 寫短文

每篇的規格：

- 正體中文、台灣用語，口語、好讀、有一點趣味。
- 漢字 **30 到 80 個**（古詩照原詩長度），2 到 4 句，用全形標點。
- **不要有英文字母和阿拉伯數字**，數字寫成中文，例如三千九百五十。外國人名、地名盡量少用，非用不可時一篇最多一個。
- 連接詞「和」改用「跟」（台灣口語常讀 hàn）。
- `level`：句子短、字常見的是「入門」，一般是「進階」，古詩或較長、較難的是「挑戰」。

格式（加在陣列最後面）：

```ts
{
  id: 'otter-hands',            // 英文小寫加連字號，不可跟現有的重複
  title: '海獺手牽手',
  level: '入門',
  topic: '冷知識',
  added: '2026-10-18',          // 今天
  source: { name: '維基百科', url: 'https://zh.wikipedia.org/wiki/…' },  // 有參考來源就填
  text: '海獺睡覺的時候會手牽著手，這樣就不會被海水沖散。',
  pinyin: `hai3 ta4 shui4 jiao4 de5 shi2 hou4 hui4 shou3 qian1 zhe5 shou3
    zhe4 yang4 jiu4 bu4 hui4 bei4 hai3 shui3 chong1 san4`,
},
```

`pinyin` 依序對應每個漢字（標點不算），用數字標調、**台灣讀音**。寫之前讀 [references/taiwan-readings.md](references/taiwan-readings.md)。

## 4. 檢查讀音

1. **查萌典**：把每篇裡的雙字以上詞語、破音字、可能讀輕聲的詞都查一次，照萌典改：

   ```bash
   node .claude/skills/add-articles/scripts/moedict.ts 東西 謝謝 星期 …
   ```

   一個詞有多個讀音時，看解釋挑對的意思。萌典查不到的詞（多半是新詞或專有名詞），拆成單字查。

2. **跟 pinyin-pro 比對**，逐一看差異：

   ```bash
   node .claude/skills/add-articles/scripts/review-pinyin.ts          # 檢查今天加入的
   node .claude/skills/add-articles/scripts/review-pinyin.ts <id> …   # 指定文章
   ```

   pinyin-pro 給的是大陸讀音，正體字的破音字也常錯，所以差異不一定是錯。每個差異都要有根據：萌典的讀音，或 references 裡列的台灣讀音。腳本也會提醒字數不合或混到英數字。

3. **跑專案檢查**，全部要過：

   ```bash
   pnpm test && pnpm lint && pnpm fmt:check && pnpm build
   ```

   `pnpm test` 會確認每個漢字剛好有一個拼音，而且每個拼音都能轉成注音。

## 5. 發布

```bash
git add src/data/articles.ts
git commit -m "feat(articles): add 7 articles for 2026-10-18"
git push
```

推上 `main` 後 GitHub Actions 會測試並部署到 GitHub Pages，用 `gh run list --limit 1` 確認成功。最後跟使用者回報：加了哪幾篇（標題、主題）、參考了哪些來源，以及讀音上做了哪些判斷（例如照萌典改成輕聲的詞）。
