import type { Article } from '../lib/types';

// pinyin 依序對應 text 裡的每個漢字（標點不算），用數字標調、台灣讀音
export const ARTICLES: Article[] = [
  {
    id: 'intro',
    title: '自我介紹',
    level: '入門',
    text: '我叫小明，我住在台北。我喜歡喝珍珠奶茶，也喜歡看電影。週末我常常跟朋友去夜市吃東西。',
    pinyin: `wo3 jiao4 xiao3 ming2 wo3 zhu4 zai4 tai2 bei3
      wo3 xi3 huan1 he1 zhen1 zhu1 nai3 cha2 ye3 xi3 huan1 kan4 dian4 ying3
      zhou1 mo4 wo3 chang2 chang2 gen1 peng2 you3 qu4 ye4 shi4 chi1 dong1 xi1`,
  },
  {
    id: 'breakfast',
    title: '早餐店點餐',
    level: '入門',
    text: '早安！我要一份蛋餅、一杯大冰奶，蛋餅要加起司。內用，謝謝。',
    pinyin: `zao3 an1 wo3 yao4 yi1 fen4 dan4 bing3 yi1 bei1 da4 bing1 nai3
      dan4 bing3 yao4 jia1 qi3 si1 nei4 yong4 xie4 xie4`,
  },
  {
    id: 'weather',
    title: '今天的天氣',
    level: '入門',
    text: '今天的天氣很好，太陽暖暖的。下午可能會下雨，出門記得帶傘。',
    pinyin: `jin1 tian1 de5 tian1 qi4 hen3 hao3 tai4 yang2 nuan3 nuan3 de5
      xia4 wu3 ke3 neng2 hui4 xia4 yu3 chu1 men2 ji4 de2 dai4 san3`,
  },
  {
    id: 'mrt',
    title: '搭捷運',
    level: '進階',
    text: '搭捷運的時候，請先讓車上的人下車，再排隊上車。車廂裡不能吃東西，也不能喝飲料。',
    pinyin: `da1 jie2 yun4 de5 shi2 hou4 qing3 xian1 rang4 che1 shang4 de5 ren2 xia4 che1
      zai4 pai2 dui4 shang4 che1 che1 xiang1 li3 bu4 neng2 chi1 dong1 xi1
      ye3 bu4 neng2 he1 yin3 liao4`,
  },
  {
    id: 'typhoon',
    title: '颱風要來了',
    level: '進階',
    text: '颱風快要來了，記得把窗戶關好，準備手電筒跟飲用水。',
    pinyin: `tai2 feng1 kuai4 yao4 lai2 le5 ji4 de2 ba3 chuang1 hu4 guan1 hao3
      zhun3 bei4 shou3 dian4 tong3 gen1 yin3 yong4 shui3`,
  },
  {
    id: 'poem',
    title: '靜夜思',
    level: '挑戰',
    text: '床前明月光，疑是地上霜。舉頭望明月，低頭思故鄉。',
    pinyin: `chuang2 qian2 ming2 yue4 guang1 yi2 shi4 di4 shang4 shuang1
      ju3 tou2 wang4 ming2 yue4 di1 tou2 si1 gu4 xiang1`,
  },
];
