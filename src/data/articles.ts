import type { Article } from '../lib/types';

// pinyin 依序對應 text 裡的每個漢字（標點不算），用數字標調、台灣讀音
export const ARTICLES: Article[] = [
  {
    id: 'intro',
    title: '自我介紹',
    level: '入門',
    topic: '生活',
    added: '2026-10-17',
    text: '我叫小明，我住在台北。我喜歡喝珍珠奶茶，也喜歡看電影。週末我常常跟朋友去夜市吃東西。',
    pinyin: `wo3 jiao4 xiao3 ming2 wo3 zhu4 zai4 tai2 bei3
      wo3 xi3 huan1 he1 zhen1 zhu1 nai3 cha2 ye3 xi3 huan1 kan4 dian4 ying3
      zhou1 mo4 wo3 chang2 chang2 gen1 peng2 you3 qu4 ye4 shi4 chi1 dong1 xi5`,
  },
  {
    id: 'breakfast',
    title: '早餐店點餐',
    level: '入門',
    topic: '生活',
    added: '2026-10-17',
    text: '早安！我要一份蛋餅、一杯大冰奶，蛋餅要加起司。內用，謝謝。',
    pinyin: `zao3 an1 wo3 yao4 yi1 fen4 dan4 bing3 yi1 bei1 da4 bing1 nai3
      dan4 bing3 yao4 jia1 qi3 si1 nei4 yong4 xie4 xie5`,
  },
  {
    id: 'weather',
    title: '今天的天氣',
    level: '入門',
    topic: '生活',
    added: '2026-10-17',
    text: '今天的天氣很好，太陽暖暖的。下午可能會下雨，出門記得帶傘。',
    pinyin: `jin1 tian1 de5 tian1 qi4 hen3 hao3 tai4 yang2 nuan3 nuan3 de5
      xia4 wu3 ke3 neng2 hui4 xia4 yu3 chu1 men2 ji4 de5 dai4 san3`,
  },
  {
    id: 'mrt',
    title: '搭捷運',
    level: '進階',
    topic: '台灣',
    added: '2026-10-17',
    text: '搭捷運的時候，請先讓車上的人下車，再排隊上車。車廂裡不能吃東西，也不能喝飲料。',
    pinyin: `da1 jie2 yun4 de5 shi2 hou4 qing3 xian1 rang4 che1 shang4 de5 ren2 xia4 che1
      zai4 pai2 dui4 shang4 che1 che1 xiang1 li3 bu4 neng2 chi1 dong1 xi5
      ye3 bu4 neng2 he1 yin3 liao4`,
  },
  {
    id: 'typhoon',
    title: '颱風要來了',
    level: '進階',
    topic: '台灣',
    added: '2026-10-17',
    text: '颱風快要來了，記得把窗戶關好，準備手電筒跟飲用水。',
    pinyin: `tai2 feng1 kuai4 yao4 lai2 le5 ji4 de5 ba3 chuang1 hu5 guan1 hao3
      zhun3 bei4 shou3 dian4 tong3 gen1 yin3 yong4 shui3`,
  },
  {
    id: 'poem',
    title: '靜夜思',
    level: '挑戰',
    topic: '古詩',
    added: '2026-10-17',
    text: '床前明月光，疑是地上霜。舉頭望明月，低頭思故鄉。',
    pinyin: `chuang2 qian2 ming2 yue4 guang1 yi2 shi4 di4 shang4 shuang1
      ju3 tou2 wang4 ming2 yue4 di1 tou2 si1 gu4 xiang1`,
  },
  {
    id: 'anne-carson-nobel',
    title: '詩人得到諾貝爾獎',
    level: '進階',
    topic: '時事',
    added: '2026-10-18',
    source: { name: '維基百科：安·卡森', url: 'https://zh.wikipedia.org/zh-tw/安·卡森' },
    text: '今年的諾貝爾文學獎，頒給了加拿大詩人安·卡森。她也研究古希臘的文學，常常把古老的故事寫成新的樣子。',
    pinyin: `jin1 nian2 de5 nuo4 bei4 er3 wen2 xue2 jiang3 ban1 gei3 le5 jia1 na2 da4 shi1 ren2 an1 ka3 sen1
      ta1 ye3 yan2 jiu4 gu3 xi1 la4 de5 wen2 xue2 chang2 chang2 ba3 gu3 lao3 de5 gu4 shi5 xie3 cheng2 xin1 de5 yang4 zi5`,
  },
  {
    id: 'daxi-old-house',
    title: '大溪的三合院',
    level: '進階',
    topic: '台灣',
    added: '2026-10-18',
    source: { name: '維基百科：簡送德古宅', url: 'https://zh.wikipedia.org/zh-tw/簡送德古宅' },
    text: '桃園大溪有一座三合院，原本叫做永安居，現在是市定古蹟。它一邊有一排護龍，另一邊有兩排，跟一般的三合院不太一樣。',
    pinyin: `tao2 yuan2 da4 xi1 you3 yi1 zuo4 san1 he2 yuan4 yuan2 ben3 jiao4 zuo4 yong3 an1 ju1
      xian4 zai4 shi4 shi4 ding4 gu3 ji1 ta1 yi1 bian1 you3 yi1 pai2 hu4 long2 ling4 yi1 bian1 you3 liang3 pai2
      gen1 yi1 ban1 de5 san1 he2 yuan4 bu4 tai4 yi1 yang4`,
  },
  {
    id: 'huang-miao',
    title: '遊俠黃苗',
    level: '進階',
    topic: '台灣',
    added: '2026-10-18',
    source: { name: '維基百科：孟春黃苗祠', url: 'https://zh.wikipedia.org/zh-tw/孟春黃苗祠' },
    text: '台中大甲有一座小廟，拜的是傳說中的遊俠黃苗。據說他常常幫助窮人，又懂得醫術。後來有人夢到他幫大家治病，就為他蓋了這座廟。',
    pinyin: `tai2 zhong1 da4 jia3 you3 yi1 zuo4 xiao3 miao4 bai4 de5 shi4 chuan2 shuo1 zhong1 de5 you2 xia2 huang2 miao2
      ju4 shuo1 ta1 chang2 chang2 bang1 zhu4 qiong2 ren2 you4 dong3 de5 yi1 shu4
      hou4 lai2 you3 ren2 meng4 dao4 ta1 bang1 da4 jia1 zhi4 bing4 jiu4 wei4 ta1 gai4 le5 zhe4 zuo4 miao4`,
  },
  {
    id: 'alaska',
    title: '買下阿拉斯加',
    level: '進階',
    topic: '歷史上的今天',
    added: '2026-10-18',
    source: { name: '維基百科：阿拉斯加購地', url: 'https://zh.wikipedia.org/zh-tw/阿拉斯加購地' },
    text: '一八六七年的十月十八日，美國正式從俄國手上接收阿拉斯加，只花了七百二十萬美元。當時很多人笑說這是買了一個大冰箱，後來那裡卻挖到了金礦。',
    pinyin: `yi1 ba1 liu4 qi1 nian2 de5 shi2 yue4 shi2 ba1 ri4
      mei3 guo2 zheng4 shi4 cong2 e2 guo2 shou3 shang4 jie1 shou1 a1 la1 si1 jia1 zhi3 hua1 le5 qi1 bai3 er4 shi2 wan4 mei3 yuan2
      dang1 shi2 hen3 duo1 ren2 xiao4 shuo1 zhe4 shi4 mai3 le5 yi1 ge4 da4 bing1 xiang1 hou4 lai2 na4 li3 que4 wa1 dao4 le5 jin1 kuang4`,
  },
  {
    id: 'octopus-hearts',
    title: '章魚的三顆心臟',
    level: '入門',
    topic: '冷知識',
    added: '2026-10-18',
    source: { name: '維基百科：章魚', url: 'https://zh.wikipedia.org/zh-tw/章魚' },
    text: '章魚有三顆心臟，還有八隻手臂。牠很聰明，手臂也很靈活，甚至可以自己打開瓶蓋。',
    pinyin: `zhang1 yu2 you3 san1 ke1 xin1 zang4 hai2 you3 ba1 zhi1 shou3 bi4
      ta1 hen3 cong1 ming2 shou3 bi4 ye3 hen3 ling2 huo2 shen4 zhi4 ke3 yi3 zi4 ji3 da3 kai1 ping2 gai4`,
  },
  {
    id: 'october-chill',
    title: '秋天變涼了',
    level: '入門',
    topic: '生活',
    added: '2026-10-18',
    text: '十月的台灣，早上跟晚上開始變涼了。出門最好多帶一件外套，回家再喝一碗熱湯，感覺特別舒服。',
    pinyin: `shi2 yue4 de5 tai2 wan1 zao3 shang5 gen1 wan3 shang5 kai1 shi3 bian4 liang2 le5
      chu1 men2 zui4 hao3 duo1 dai4 yi1 jian4 wai4 tao4 hui2 jia1 zai4 he1 yi1 wan3 re4 tang1 gan3 jue2 te4 bie2 shu1 fu5`,
  },
  {
    id: 'mountain-walk',
    title: '山行',
    level: '挑戰',
    topic: '古詩',
    added: '2026-10-18',
    text: '遠上寒山石徑斜，白雲生處有人家。停車坐愛楓林晚，霜葉紅於二月花。',
    pinyin: `yuan3 shang4 han2 shan1 shi2 jing4 xie2 bai2 yun2 sheng1 chu4 you3 ren2 jia1
      ting2 che1 zuo4 ai4 feng1 lin2 wan3 shuang1 ye4 hong2 yu2 er4 yue4 hua1`,
  },
];
