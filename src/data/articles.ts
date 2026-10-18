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
  {
    id: 'kaohsiung-bike-tour',
    title: '騎單車逛高雄',
    level: '進階',
    topic: '台灣',
    added: '2026-10-18',
    source: { name: '中央社', url: 'https://www.cna.com.tw/news/aloc/202610180098.aspx' },
    text: '高雄最近辦了單車小旅行，帶大家騎大約八公里，一路經過濕地公園、老車站跟客家文化園區。十月底還有鹹酥雞嘉年華。',
    pinyin: `gao1 xiong2 zui4 jin4 ban4 le5 dan1 che1 xiao3 lv3 xing2 dai4 da4 jia1 qi2 da4 yue1 ba1 gong1 li3
      yi1 lu4 jing1 guo4 shi1 di4 gong1 yuan2 lao3 che1 zhan4 gen1 ke4 jia1 wen2 hua4 yuan2 qu1
      shi2 yue4 di3 hai2 you3 xian2 su1 ji1 jia1 nian2 hua2`,
  },
  {
    id: 'napoleon-cipher',
    title: '兩百年的密碼信',
    level: '進階',
    topic: '時事',
    added: '2026-10-18',
    source: { name: '中央社', url: 'https://www.cna.com.tw/news/ait/202610160331.aspx' },
    text: '拿破崙時代有一封用密碼寫的信，兩百多年來都沒有人看得懂。最近有工程師用人工智慧幫忙，只花了六個小時就解開了。',
    pinyin: `na2 po4 lun2 shi2 dai4 you3 yi1 feng1 yong4 mi4 ma3 xie3 de5 xin4
      liang3 bai3 duo1 nian2 lai2 dou1 mei2 you3 ren2 kan4 de5 dong3
      zui4 jin4 you3 gong1 cheng2 shi1 yong4 ren2 gong1 zhi4 hui4 bang1 mang2
      zhi3 hua1 le5 liu4 ge4 xiao3 shi2 jiu4 jie3 kai1 le5`,
  },
  {
    id: 'mars-moon-sample',
    title: '去火星的衛星撿石頭',
    level: '進階',
    topic: '時事',
    added: '2026-10-18',
    source: { name: '中央社', url: 'https://www.cna.com.tw/news/ait/202610180039.aspx' },
    text: '日本準備發射探測器，去火星的衛星火衛一採集樣本。如果成功，這會是第一次從火星附近帶東西回地球，也許能幫我們了解太陽系是怎麼來的。',
    pinyin: `ri4 ben3 zhun3 bei4 fa1 she4 tan4 ce4 qi4 qu4 huo3 xing1 de5 wei4 xing1 huo3 wei4 yi1 cai3 ji2 yang4 ben3
      ru2 guo3 cheng2 gong1 zhe4 hui4 shi4 di4 yi1 ci4 cong2 huo3 xing1 fu4 jin4 dai4 dong1 xi5 hui2 di4 qiu2
      ye3 xu3 neng2 bang1 wo3 men5 liao3 jie3 tai4 yang2 xi4 shi4 zen3 me5 lai2 de5`,
  },
  {
    id: 'formosat-yushan',
    title: '衛星看見玉山石碑',
    level: '進階',
    topic: '台灣',
    added: '2026-10-18',
    source: { name: '中央社', url: 'https://www.cna.com.tw/news/ait/202610150352.aspx' },
    text: '台灣自己做的福衛八號衛星，已經開始從太空拍照。它拍得非常清楚，連玉山主峰上的石碑都看得出來。',
    pinyin: `tai2 wan1 zi4 ji3 zuo4 de5 fu2 wei4 ba1 hao4 wei4 xing1 yi3 jing1 kai1 shi3 cong2 tai4 kong1 pai1 zhao4
      ta1 pai1 de5 fei1 chang2 qing1 chu3 lian2 yu4 shan1 zhu3 feng1 shang4 de5 shi2 bei1 dou1 kan4 de5 chu1 lai2`,
  },
  {
    id: 'kinmen-tunnel-music',
    title: '坑道裡的音樂會',
    level: '進階',
    topic: '台灣',
    added: '2026-10-18',
    source: { name: '中央社', url: 'https://www.cna.com.tw/news/acul/202610170076.aspx' },
    text: '金門的坑道以前是打仗用的，現在卻變成聽音樂的地方。坑道音樂節已經辦了十八年，累計有超過兩萬五千人來聽。',
    pinyin: `jin1 men2 de5 keng1 dao4 yi3 qian2 shi4 da3 zhang4 yong4 de5 xian4 zai4 que4 bian4 cheng2 ting1 yin1 yue4 de5 di4 fang1
      keng1 dao4 yin1 yue4 jie2 yi3 jing1 ban4 le5 shi2 ba1 nian2 lei3 ji4 you3 chao1 guo4 liang3 wan4 wu3 qian1 ren2 lai2 ting1`,
  },
  {
    id: 'chongyang',
    title: '重陽節',
    level: '入門',
    topic: '生活',
    added: '2026-10-18',
    text: '每年農曆九月九日是重陽節，也是敬老的日子。很多地方會在這天辦活動祝福長輩，也有人會陪家裡的老人去爬山。',
    pinyin: `mei3 nian2 nong2 li4 jiu3 yue4 jiu3 ri4 shi4 chong2 yang2 jie2 ye3 shi4 jing4 lao3 de5 ri4 zi5
      hen3 duo1 di4 fang1 hui4 zai4 zhe4 tian1 ban4 huo2 dong4 zhu4 fu2 zhang3 bei4
      ye3 you3 ren2 hui4 pei2 jia1 li3 de5 lao3 ren2 qu4 pa2 shan1`,
  },
  {
    id: 'ohtani-jersey',
    title: '一件很貴的球衣',
    level: '進階',
    topic: '時事',
    added: '2026-10-18',
    source: { name: '中央社', url: 'https://www.cna.com.tw/news/aspt/202610180139.aspx' },
    text: '日本球星大谷翔平穿過的一件球衣，最近在網路拍賣賣出兩百多萬美元，大約是新台幣六千五百多萬元，創下他球衣拍賣的最高紀錄。',
    pinyin: `ri4 ben3 qiu2 xing1 da4 gu3 xiang2 ping2 chuan1 guo4 de5 yi1 jian4 qiu2 yi1
      zui4 jin4 zai4 wang3 lu4 pai1 mai4 mai4 chu1 liang3 bai3 duo1 wan4 mei3 yuan2
      da4 yue1 shi4 xin1 tai2 bi4 liu4 qian1 wu3 bai3 duo1 wan4 yuan2 chuang4 xia4 ta1 qiu2 yi1 pai1 mai4 de5 zui4 gao1 ji4 lu4`,
  },
];
