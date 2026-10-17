import type { Lesson } from '../lib/types';

// 練習題格式：漢字 拼音(數字標調,多音節用逗號) 注音(不含聲調,逗號分隔)；「-」代表只考注音符號
export const LESSONS: Lesson[] = [
  { id: 'vowel', title: '單韻母', sub: 'ㄚㄛㄜㄧㄨㄩ',
    intro: '注音的 ㄚㄛㄜㄧㄨㄩ，在拼音裡就是 a o e i u ü。所有拼音都由它們組成，先把這六個記熟。',
    rows: [
      { z: 'ㄚ', p: 'a', ex: '阿 a1 ㄚ' },
      { z: 'ㄛ', p: 'o', ex: '喔 o1 ㄛ' },
      { z: 'ㄜ', p: 'e', ex: '鵝 e2 ㄜ', note: '拼音的 e 唸 ㄜ，不是英文的 e。' },
      { z: 'ㄧ', p: 'i', ex: '衣 yi1 ㄧ', note: '單獨成字時寫成 yi。' },
      { z: 'ㄨ', p: 'u', ex: '屋 wu1 ㄨ', note: '單獨成字時寫成 wu。' },
      { z: 'ㄩ', p: 'ü', ex: '魚 yu2 ㄩ', note: '鍵盤打 v；單獨成字時寫成 yu。' },
    ],
    traps: ['鍵盤上沒有 ü，拼音輸入法一律用 v 代替。', 'ㄧ ㄨ ㄩ 單獨成一個字時，要寫成 yi、wu、yu。第 9 到 11 步會再細講。', '這一步先不打聲調，只練字母。'],
    items: `- a ㄚ
- o ㄛ
- e ㄜ
- i ㄧ
- u ㄨ
- v ㄩ
阿 a1 ㄚ
鵝 e2 ㄜ
衣 yi1 ㄧ
屋 wu1 ㄨ
魚 yu2 ㄩ` },

  { id: 'lips', title: '第一批聲母', sub: 'ㄅㄆㄇㄈ ㄉㄊㄋㄌ',
    intro: '聲母就是注音開頭那一排。這 8 個和英文字母很像，最好上手。拼法跟注音一樣是「聲母＋韻母」：ㄅ＋ㄚ ＝ b＋a ＝ ba。',
    rows: [
      { z: 'ㄅ', p: 'b', ex: '爸 ba4 ㄅㄚ' }, { z: 'ㄆ', p: 'p', ex: '爬 pa2 ㄆㄚ' },
      { z: 'ㄇ', p: 'm', ex: '媽 ma1 ㄇㄚ' }, { z: 'ㄈ', p: 'f', ex: '發 fa1 ㄈㄚ' },
      { z: 'ㄉ', p: 'd', ex: '大 da4 ㄉㄚ' }, { z: 'ㄊ', p: 't', ex: '他 ta1 ㄊㄚ' },
      { z: 'ㄋ', p: 'n', ex: '拿 na2 ㄋㄚ' }, { z: 'ㄌ', p: 'l', ex: '拉 la1 ㄌㄚ' },
    ],
    traps: ['拼音的 b、d 唸 ㄅ、ㄉ（不送氣），p、t 才是送氣的 ㄆ、ㄊ。', 'ㄋㄩ、ㄌㄩ 要保留 ü，打成 nv、lv（女 nv、綠 lv）。', '這一步先不打聲調，只練字母。'],
    items: `爸 ba4 ㄅㄚ
爬 pa2 ㄆㄚ
媽 ma1 ㄇㄚ
發 fa1 ㄈㄚ
大 da4 ㄉㄚ
他 ta1 ㄊㄚ
拿 na2 ㄋㄚ
拉 la1 ㄌㄚ
波 bo1 ㄅㄛ
摸 mo1 ㄇㄛ
佛 fo2 ㄈㄛ
得 de2 ㄉㄜ
特 te4 ㄊㄜ
樂 le4 ㄌㄜ
筆 bi3 ㄅㄧ
皮 pi2 ㄆㄧ
米 mi3 ㄇㄧ
地 di4 ㄉㄧ
你 ni3 ㄋㄧ
力 li4 ㄌㄧ
不 bu4 ㄅㄨ
木 mu4 ㄇㄨ
父 fu4 ㄈㄨ
讀 du2 ㄉㄨ
土 tu3 ㄊㄨ
路 lu4 ㄌㄨ
女 nv3 ㄋㄩ
綠 lv4 ㄌㄩ` },

  { id: 'velar', title: '舌根音', sub: 'ㄍㄎㄏ',
    intro: 'ㄍㄎㄏ 寫成 g k h。g 在拼音裡永遠唸 ㄍ，不會變成英文 gin 那種 ㄐ 的音。',
    rows: [
      { z: 'ㄍ', p: 'g', ex: '哥 ge1 ㄍㄜ' }, { z: 'ㄎ', p: 'k', ex: '渴 ke3 ㄎㄜ' }, { z: 'ㄏ', p: 'h', ex: '喝 he1 ㄏㄜ' },
    ],
    traps: ['ge、ke、he 的 e 都唸 ㄜ。', 'h 是 ㄏ，比英文的 h 用力，有摩擦聲。'],
    items: `哥 ge1 ㄍㄜ
個 ge4 ㄍㄜ
渴 ke3 ㄎㄜ
課 ke4 ㄎㄜ
喝 he1 ㄏㄜ
河 he2 ㄏㄜ
嘎 ga1 ㄍㄚ
卡 ka3 ㄎㄚ
哈 ha1 ㄏㄚ
古 gu3 ㄍㄨ
哭 ku1 ㄎㄨ
湖 hu2 ㄏㄨ
苦 ku3 ㄎㄨ
父 fu4 ㄈㄨ
特 te4 ㄊㄜ` },

  { id: 'tone', title: '四聲與輕聲', sub: 'ˉ ˊ ˇ ˋ ˙',
    intro: '注音的 ˉ ˊ ˇ ˋ ˙，拼音改成標在母音上的符號 ā á ǎ à，輕聲不標。學拼音時常用「數字標調」：在音節後面加 1 到 5，例如 ma3。這一步的練習一定要打聲調，之後的步驟可以在練習畫面上方自己決定要不要打開「打聲調」。',
    rows: [
      { z: 'ˉ', p: 'ā · 1', ex: '媽 ma1 ㄇㄚ', note: '一聲' }, { z: 'ˊ', p: 'á · 2', ex: '麻 ma2 ㄇㄚ', note: '二聲' },
      { z: 'ˇ', p: 'ǎ · 3', ex: '馬 ma3 ㄇㄚ', note: '三聲' }, { z: 'ˋ', p: 'à · 4', ex: '罵 ma4 ㄇㄚ', note: '四聲' },
      { z: '˙', p: '不標 · 5', ex: '嗎 ma5 ㄇㄚ', note: '輕聲' },
    ],
    traps: ['聲調標在哪：有 a 標 a，沒有 a 就找 o 或 e，iu、ui 標在後面那個。例：hǎo、duō、liù、duì。', '真正的拼音輸入法不用打聲調，只打字母再選字；空白鍵是選第一個候選字，不是一聲。這裡的數字只是練習用的數字標調。', '輕聲打 5，或乾脆不打也算對。', '注音的輕聲 ˙ 寫在最前面，拼音的輕聲什麼都不標。'],
    items: `媽 ma1 ㄇㄚ
麻 ma2 ㄇㄚ
馬 ma3 ㄇㄚ
罵 ma4 ㄇㄚ
嗎 ma5 ㄇㄚ
八 ba1 ㄅㄚ
拔 ba2 ㄅㄚ
把 ba3 ㄅㄚ
姨 yi2 ㄧ
椅 yi3 ㄧ
意 yi4 ㄧ
呼 hu1 ㄏㄨ
虎 hu3 ㄏㄨ
戶 hu4 ㄏㄨ
的 de5 ㄉㄜ
了 le5 ㄌㄜ
呢 ne5 ㄋㄜ
魚 yu2 ㄩ` },

  { id: 'jqx', title: '舌面音', sub: 'ㄐㄑㄒ',
    intro: 'ㄐㄑㄒ 寫成 j q x。它們只會接 ㄧ 或 ㄩ。接 ㄩ 的時候，ü 上的兩點省略，寫成 u。',
    rows: [
      { z: 'ㄐ', p: 'j', ex: '雞 ji1 ㄐㄧ' }, { z: 'ㄑ', p: 'q', ex: '七 qi1 ㄑㄧ' }, { z: 'ㄒ', p: 'x', ex: '西 xi1 ㄒㄧ' },
      { z: 'ㄐㄩ', p: 'ju', ex: '句 ju4 ㄐㄩ', note: '這個 u 其實是 ü。' },
    ],
    traps: ['ju、qu、xu 的 u 唸 ㄩ，因為 ㄐㄑㄒ 不會接 ㄨ。打字打 u，不用打 v。', 'q 唸 ㄑ，x 唸 ㄒ，跟英文完全不同，多打幾次就記住了。', 'ㄧㄚ 是 ia、ㄧㄝ 是 ie，第 9 步會完整整理。'],
    items: `雞 ji1 ㄐㄧ
幾 ji3 ㄐㄧ
七 qi1 ㄑㄧ
起 qi3 ㄑㄧ
西 xi1 ㄒㄧ
洗 xi3 ㄒㄧ
句 ju4 ㄐㄩ
局 ju2 ㄐㄩ
去 qu4 ㄑㄩ
取 qu3 ㄑㄩ
需 xu1 ㄒㄩ
許 xu3 ㄒㄩ
家 jia1 ㄐㄧㄚ
下 xia4 ㄒㄧㄚ
姐 jie3 ㄐㄧㄝ
謝 xie4 ㄒㄧㄝ` },

  { id: 'retro', title: '翹舌與平舌', sub: 'ㄓㄔㄕㄖ ㄗㄘㄙ',
    intro: '翹舌音 ㄓㄔㄕㄖ 寫成 zh ch sh r，平舌音 ㄗㄘㄙ 寫成 z c s。注音可以只寫一個 ㄓ，拼音不行，一定要補一個 i。',
    rows: [
      { z: 'ㄓ', p: 'zh', ex: '知 zhi1 ㄓ' }, { z: 'ㄔ', p: 'ch', ex: '吃 chi1 ㄔ' },
      { z: 'ㄕ', p: 'sh', ex: '詩 shi1 ㄕ' }, { z: 'ㄖ', p: 'r', ex: '日 ri4 ㄖ' },
      { z: 'ㄗ', p: 'z', ex: '字 zi4 ㄗ' }, { z: 'ㄘ', p: 'c', ex: '次 ci4 ㄘ' }, { z: 'ㄙ', p: 's', ex: '四 si4 ㄙ' },
    ],
    traps: ['單獨的 ㄓㄔㄕㄖㄗㄘㄙ 要寫成 zhi chi shi ri zi ci si，這個 i 不唸 ㄧ。', '多一個 h 就是翹舌：z→zh、c→ch、s→sh。', 'c 唸 ㄘ，不是 k；r 唸 ㄖ，不是英文的 r。'],
    items: `知 zhi1 ㄓ
紙 zhi3 ㄓ
吃 chi1 ㄔ
尺 chi3 ㄔ
詩 shi1 ㄕ
十 shi2 ㄕ
是 shi4 ㄕ
日 ri4 ㄖ
字 zi4 ㄗ
次 ci4 ㄘ
四 si4 ㄙ
炸 zha4 ㄓㄚ
茶 cha2 ㄔㄚ
沙 sha1 ㄕㄚ
熱 re4 ㄖㄜ
雜 za2 ㄗㄚ
擦 ca1 ㄘㄚ
色 se4 ㄙㄜ
豬 zhu1 ㄓㄨ
書 shu1 ㄕㄨ
租 zu1 ㄗㄨ
粗 cu1 ㄘㄨ` },

  { id: 'diph', title: '複韻母', sub: 'ㄞㄟㄠㄡ ㄦ',
    intro: '複韻母就是兩個母音連在一起：ㄞ ＝ ai、ㄟ ＝ ei、ㄠ ＝ ao、ㄡ ＝ ou，捲舌的 ㄦ 寫成 er。',
    rows: [
      { z: 'ㄞ', p: 'ai', ex: '愛 ai4 ㄞ' }, { z: 'ㄟ', p: 'ei', ex: '黑 hei1 ㄏㄟ' },
      { z: 'ㄠ', p: 'ao', ex: '好 hao3 ㄏㄠ' }, { z: 'ㄡ', p: 'ou', ex: '口 kou3 ㄎㄡ' }, { z: 'ㄦ', p: 'er', ex: '二 er4 ㄦ' },
    ],
    traps: ['ㄠ 是 ao，不是 au。', 'ㄡ 是 ou，不是 o 或 ow。', 'ㄟ 是 ei，不要打成 ay。'],
    items: `愛 ai4 ㄞ
白 bai2 ㄅㄞ
來 lai2 ㄌㄞ
菜 cai4 ㄘㄞ
黑 hei1 ㄏㄟ
給 gei3 ㄍㄟ
美 mei3 ㄇㄟ
飛 fei1 ㄈㄟ
好 hao3 ㄏㄠ
高 gao1 ㄍㄠ
跑 pao3 ㄆㄠ
少 shao3 ㄕㄠ
口 kou3 ㄎㄡ
走 zou3 ㄗㄡ
手 shou3 ㄕㄡ
都 dou1 ㄉㄡ
二 er4 ㄦ
兒 er2 ㄦ
耳 er3 ㄦ` },

  { id: 'nasal', title: '鼻音韻母', sub: 'ㄢㄣㄤㄥ',
    intro: '鼻音韻母：ㄢ an、ㄣ en、ㄤ ang、ㄥ eng。ㄨㄥ 比較特別，寫成 ong。',
    rows: [
      { z: 'ㄢ', p: 'an', ex: '安 an1 ㄢ' }, { z: 'ㄣ', p: 'en', ex: '門 men2 ㄇㄣ' },
      { z: 'ㄤ', p: 'ang', ex: '糖 tang2 ㄊㄤ' }, { z: 'ㄥ', p: 'eng', ex: '風 feng1 ㄈㄥ' },
      { z: 'ㄨㄥ', p: 'ong', ex: '東 dong1 ㄉㄨㄥ', note: '不是 ung。' },
    ],
    traps: ['結尾是 n 的是 ㄢㄣ，結尾是 ng 的是 ㄤㄥ。', 'ㄨㄥ 寫 ong：東 dōng、紅 hóng、中 zhōng。', 'ㄅㄥ ㄆㄥ ㄇㄥ ㄈㄥ 寫成 beng peng meng feng。'],
    items: `安 an1 ㄢ
山 shan1 ㄕㄢ
看 kan4 ㄎㄢ
飯 fan4 ㄈㄢ
門 men2 ㄇㄣ
人 ren2 ㄖㄣ
很 hen3 ㄏㄣ
本 ben3 ㄅㄣ
忙 mang2 ㄇㄤ
糖 tang2 ㄊㄤ
上 shang4 ㄕㄤ
長 chang2 ㄔㄤ
風 feng1 ㄈㄥ
冷 leng3 ㄌㄥ
等 deng3 ㄉㄥ
朋 peng2 ㄆㄥ
東 dong1 ㄉㄨㄥ
紅 hong2 ㄏㄨㄥ
中 zhong1 ㄓㄨㄥ
龍 long2 ㄌㄨㄥ` },

  { id: 'yi', title: 'ㄧ 開頭的韻母', sub: 'ㄧㄚ ㄧㄝ ㄧㄡ ㄧㄢ…',
    intro: 'ㄧ 開頭的韻母有兩種寫法：前面有聲母時照拼（ㄒㄧㄚ ＝ xia），前面沒有聲母時把 i 改成 y（ㄧㄚ ＝ ya）。',
    rows: [
      { z: 'ㄧㄚ', p: 'ia / ya', ex: '家 jia1 ㄐㄧㄚ' }, { z: 'ㄧㄝ', p: 'ie / ye', ex: '鞋 xie2 ㄒㄧㄝ' },
      { z: 'ㄧㄠ', p: 'iao / yao', ex: '小 xiao3 ㄒㄧㄠ' },
      { z: 'ㄧㄡ', p: 'iu / you', ex: '六 liu4 ㄌㄧㄡ', note: '有聲母時縮寫成 iu。' },
      { z: 'ㄧㄢ', p: 'ian / yan', ex: '天 tian1 ㄊㄧㄢ' },
      { z: 'ㄧㄣ', p: 'in / yin', ex: '心 xin1 ㄒㄧㄣ', note: '不是 ien。' },
      { z: 'ㄧㄤ', p: 'iang / yang', ex: '想 xiang3 ㄒㄧㄤ' }, { z: 'ㄧㄥ', p: 'ing / ying', ex: '名 ming2 ㄇㄧㄥ' },
      { z: 'ㄩㄥ', p: 'iong / yong', ex: '熊 xiong2 ㄒㄩㄥ', note: '注音是 ㄩ，拼音卻寫 io。' },
    ],
    traps: ['ㄧㄡ 有聲母時寫 iu（六 liù），沒有聲母寫 you（有 yǒu）。', 'ㄧㄣ、ㄧㄥ 沒聲母時寫 yin、ying，不是 yien、yieng。', 'ㄧㄝ 的 ㄝ 用 e 表示：ie、ye。'],
    items: `牙 ya2 ㄧㄚ
也 ye3 ㄧㄝ
要 yao4 ㄧㄠ
有 you3 ㄧㄡ
眼 yan3 ㄧㄢ
音 yin1 ㄧㄣ
羊 yang2 ㄧㄤ
英 ying1 ㄧㄥ
用 yong4 ㄩㄥ
鞋 xie2 ㄒㄧㄝ
小 xiao3 ㄒㄧㄠ
六 liu4 ㄌㄧㄡ
九 jiu3 ㄐㄧㄡ
天 tian1 ㄊㄧㄢ
錢 qian2 ㄑㄧㄢ
林 lin2 ㄌㄧㄣ
心 xin1 ㄒㄧㄣ
兩 liang3 ㄌㄧㄤ
想 xiang3 ㄒㄧㄤ
名 ming2 ㄇㄧㄥ
聽 ting1 ㄊㄧㄥ
窮 qiong2 ㄑㄩㄥ
熊 xiong2 ㄒㄩㄥ` },

  { id: 'wu', title: 'ㄨ 開頭的韻母', sub: 'ㄨㄚ ㄨㄛ ㄨㄟ ㄨㄣ…',
    intro: 'ㄨ 開頭也一樣：有聲母照拼（ㄏㄨㄚ ＝ hua），沒有聲母把 u 改成 w（ㄨㄚ ＝ wa）。另外有兩個縮寫要特別記。',
    rows: [
      { z: 'ㄨㄚ', p: 'ua / wa', ex: '花 hua1 ㄏㄨㄚ' }, { z: 'ㄨㄛ', p: 'uo / wo', ex: '說 shuo1 ㄕㄨㄛ' },
      { z: 'ㄨㄞ', p: 'uai / wai', ex: '快 kuai4 ㄎㄨㄞ' },
      { z: 'ㄨㄟ', p: 'ui / wei', ex: '對 dui4 ㄉㄨㄟ', note: '有聲母時縮寫成 ui。' },
      { z: 'ㄨㄢ', p: 'uan / wan', ex: '短 duan3 ㄉㄨㄢ' },
      { z: 'ㄨㄣ', p: 'un / wen', ex: '春 chun1 ㄔㄨㄣ', note: '有聲母時縮寫成 un。' },
      { z: 'ㄨㄤ', p: 'uang / wang', ex: '光 guang1 ㄍㄨㄤ' },
    ],
    traps: ['ㄨㄟ 有聲母寫 ui（水 shuǐ），沒聲母寫 wei（為 wèi）。', 'ㄨㄣ 有聲母寫 un（春 chūn），沒聲母寫 wen（問 wèn）。', 'ㄅㄆㄇㄈ 後面只寫 o（波 bō），其他聲母後面的 ㄨㄛ 寫 uo（多 duō）。'],
    items: `蛙 wa1 ㄨㄚ
我 wo3 ㄨㄛ
外 wai4 ㄨㄞ
為 wei4 ㄨㄟ
晚 wan3 ㄨㄢ
問 wen4 ㄨㄣ
王 wang2 ㄨㄤ
花 hua1 ㄏㄨㄚ
說 shuo1 ㄕㄨㄛ
多 duo1 ㄉㄨㄛ
快 kuai4 ㄎㄨㄞ
對 dui4 ㄉㄨㄟ
水 shui3 ㄕㄨㄟ
會 hui4 ㄏㄨㄟ
短 duan3 ㄉㄨㄢ
船 chuan2 ㄔㄨㄢ
春 chun1 ㄔㄨㄣ
順 shun4 ㄕㄨㄣ
光 guang1 ㄍㄨㄤ
床 chuang2 ㄔㄨㄤ` },

  { id: 'yu', title: 'ㄩ 開頭的韻母', sub: 'ㄩㄝ ㄩㄢ ㄩㄣ',
    intro: 'ㄩ 開頭有三種情況：沒有聲母寫 yu（ㄩㄝ ＝ yue），接 ㄐㄑㄒ 寫 u（ㄒㄩㄝ ＝ xue），只有接 ㄋㄌ 才保留 ü（ㄌㄩㄝ ＝ lüe，打 lve）。',
    rows: [
      { z: 'ㄩㄝ', p: 'üe / yue', ex: '月 yue4 ㄩㄝ' }, { z: 'ㄩㄢ', p: 'üan / yuan', ex: '遠 yuan3 ㄩㄢ' },
      { z: 'ㄩㄣ', p: 'ün / yun', ex: '雲 yun2 ㄩㄣ' },
      { z: 'ㄒㄩㄝ', p: 'xue', ex: '學 xue2 ㄒㄩㄝ', note: 'ㄐㄑㄒ 後面寫 u。' },
      { z: 'ㄌㄩㄝ', p: 'lüe', ex: '略 lve4 ㄌㄩㄝ', note: '打字打 lve。' },
    ],
    traps: ['只有 ㄋㄩ、ㄌㄩ 這一系列要打 v：nv、lv、nve、lve。', 'ㄐㄑㄒ 和 y 後面的 ü 一律寫 u：jue、quan、xun、yuan。'],
    items: `魚 yu2 ㄩ
月 yue4 ㄩㄝ
遠 yuan3 ㄩㄢ
雲 yun2 ㄩㄣ
學 xue2 ㄒㄩㄝ
覺 jue2 ㄐㄩㄝ
缺 que1 ㄑㄩㄝ
全 quan2 ㄑㄩㄢ
選 xuan3 ㄒㄩㄢ
卷 juan3 ㄐㄩㄢ
軍 jun1 ㄐㄩㄣ
群 qun2 ㄑㄩㄣ
訓 xun4 ㄒㄩㄣ
略 lve4 ㄌㄩㄝ
虐 nve4 ㄋㄩㄝ
女 nv3 ㄋㄩ` },

  { id: 'words', title: '詞語實戰', sub: '一次打一整個詞',
    intro: '把前面學的組起來，一次打一個詞。音節之間不用空格，打對了會自動換下一題。',
    rows: [
      { z: '三聲連讀', p: 'nǐ hǎo', ex: '你好 ni3,hao3 ㄋㄧ,ㄏㄠ', note: '唸的時候會變調，拼音照原來的聲調寫。' },
      { z: '隔音符號', p: "zǎo'ān", ex: '早安 zao3,an1 ㄗㄠ,ㄢ', note: "a o e 開頭的音節前面加 '，打字時不用打。" },
      { z: 'ü 不變', p: 'lǜsè', ex: '綠色 lv4,se4 ㄌㄩ,ㄙㄜ', note: '詞裡的 ㄌㄩ 一樣打 lv。' },
    ],
    traps: ['一個詞的音節連著寫：Táiwān、diànnǎo。', '打開「打聲調」時，每個音節後面加數字，例如 tai2wan1。'],
    items: `台灣 tai2,wan1 ㄊㄞ,ㄨㄢ
你好 ni3,hao3 ㄋㄧ,ㄏㄠ
朋友 peng2,you3 ㄆㄥ,ㄧㄡ
喜歡 xi3,huan1 ㄒㄧ,ㄏㄨㄢ
學習 xue2,xi2 ㄒㄩㄝ,ㄒㄧ
中文 zhong1,wen2 ㄓㄨㄥ,ㄨㄣ
拼音 pin1,yin1 ㄆㄧㄣ,ㄧㄣ
電腦 dian4,nao3 ㄉㄧㄢ,ㄋㄠ
手機 shou3,ji1 ㄕㄡ,ㄐㄧ
珍珠奶茶 zhen1,zhu1,nai3,cha2 ㄓㄣ,ㄓㄨ,ㄋㄞ,ㄔㄚ
捷運 jie2,yun4 ㄐㄧㄝ,ㄩㄣ
便利商店 bian4,li4,shang1,dian4 ㄅㄧㄢ,ㄌㄧ,ㄕㄤ,ㄉㄧㄢ
吃飯 chi1,fan4 ㄔ,ㄈㄢ
下雨 xia4,yu3 ㄒㄧㄚ,ㄩ
綠色 lv4,se4 ㄌㄩ,ㄙㄜ
女生 nv3,sheng1 ㄋㄩ,ㄕㄥ
再見 zai4,jian4 ㄗㄞ,ㄐㄧㄢ
早安 zao3,an1 ㄗㄠ,ㄢ
夜市 ye4,shi4 ㄧㄝ,ㄕ
颱風 tai2,feng1 ㄊㄞ,ㄈㄥ
我愛你 wo3,ai4,ni3 ㄨㄛ,ㄞ,ㄋㄧ
熱水 re4,shui3 ㄖㄜ,ㄕㄨㄟ
春天 chun1,tian1 ㄔㄨㄣ,ㄊㄧㄢ
月亮 yue4,liang4 ㄩㄝ,ㄌㄧㄤ` },

  { id: 'mix', title: '隨機挑戰', sub: '從走過的步驟出題',
    intro: '從你已經完成的步驟裡隨機抽 15 題，混在一起考。適合每天打開來暖身。',
    rows: [], traps: [], items: '' },
];
