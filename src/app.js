const STORAGE_KEYS = {
  words: "dictation.words.v1",
  history: "dictation.history.v1",
  settings: "dictation.settings.v1",
  game: "dictation.game.v1",
};

const DEFAULT_SETTINGS = {
  voiceLang: "en-US",
  speechRate: "1",
  autoSpeak: true,
  shuffleWords: false,
  ieltsDailyCount: "10",
};

const IELTS_TARGET_OPTIONS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200];

const IELTS_LEVELS = [
  {
    band: "1",
    cefr: "A1 入门",
    vocabSize: "约 300-500 词",
    daily: "每天 5 个新词 + 5 分钟复习",
    note: "先掌握最常见的生活词和简单动作。",
    words: [
      ["name", "名字", "My name is Lily."],
      ["home", "家", "I am going home."],
      ["food", "食物", "This food is good."],
      ["water", "水", "I need some water."],
      ["happy", "开心的", "I feel happy today."],
      ["school", "学校", "She goes to school."],
    ],
  },
  {
    band: "2",
    cefr: "A1-A2 基础",
    vocabSize: "约 800-1,000 词",
    daily: "每天 8 个新词 + 8 分钟复习",
    note: "能表达非常简单的个人和家庭信息。",
    words: [
      ["family", "家庭", "My family lives here."],
      ["friend", "朋友", "He is my best friend."],
      ["morning", "早晨", "I study in the morning."],
      ["market", "市场", "We buy fruit at the market."],
      ["listen", "听", "Please listen carefully."],
      ["clean", "干净的；清理", "I clean my room every week."],
    ],
  },
  {
    band: "3",
    cefr: "A2 初级",
    vocabSize: "约 1,200-1,800 词",
    daily: "每天 10 个新词 + 10 分钟复习",
    note: "开始积累常见场景词，比如交通、购物、学习。",
    words: [
      ["travel", "旅行", "I travel by train."],
      ["weather", "天气", "The weather is nice today."],
      ["library", "图书馆", "I borrowed a book from the library."],
      ["question", "问题", "Can I ask a question?"],
      ["answer", "回答", "Please write your answer here."],
      ["healthy", "健康的", "Eating vegetables is healthy."],
    ],
  },
  {
    band: "4",
    cefr: "A2-B1 进阶",
    vocabSize: "约 2,000-2,800 词",
    daily: "每天 12 个新词 + 12 分钟复习",
    note: "重点练习校园、工作、兴趣和简单观点表达。",
    words: [
      ["opinion", "观点", "In my opinion, reading is useful."],
      ["improve", "提高", "Practice can improve your spelling."],
      ["culture", "文化", "Food is part of local culture."],
      ["habit", "习惯", "Good habits help students learn."],
      ["reason", "原因", "What is the reason for this change?"],
      ["simple", "简单的", "The rule is simple to follow."],
    ],
  },
  {
    band: "5",
    cefr: "B1 中级",
    vocabSize: "约 3,000-4,000 词",
    daily: "每天 15 个新词 + 15 分钟复习",
    note: "开始积累雅思常见话题词，能表达基本观点。",
    words: [
      ["environment", "环境", "We should protect the environment."],
      ["education", "教育", "Education changes a person's future."],
      ["technology", "科技", "Technology makes life more convenient."],
      ["community", "社区", "The community needs a new library."],
      ["benefit", "好处", "Exercise has many health benefits."],
      ["problem", "问题", "Traffic is a serious problem in big cities."],
    ],
  },
  {
    band: "5.5",
    cefr: "B1-B2 中高级",
    vocabSize: "约 4,000-5,000 词",
    daily: "每天 18 个新词 + 15 分钟复习",
    note: "加入更多抽象词和连接表达，减少重复用词。",
    words: [
      ["advantage", "优势", "One advantage of cycling is low cost."],
      ["disadvantage", "劣势", "The main disadvantage is the time it takes."],
      ["increase", "增加", "Online learning may increase flexibility."],
      ["reduce", "减少", "Public transport can reduce pollution."],
      ["choice", "选择", "Students need more choices at school."],
      ["support", "支持", "Parents should support children's interests."],
    ],
  },
  {
    band: "6",
    cefr: "B2 上中级",
    vocabSize: "约 5,000-6,000 词",
    daily: "每天 20 个新词 + 20 分钟复习",
    note: "重点提升话题词准确性，能写出更自然的句子。",
    words: [
      ["consume", "消费；消耗", "People consume more energy in winter."],
      ["efficient", "高效的", "This is an efficient way to learn words."],
      ["solution", "解决方案", "The city needs a long-term solution."],
      ["pressure", "压力", "Students often face exam pressure."],
      ["influence", "影响", "Friends can influence our choices."],
      ["essential", "必要的", "Sleep is essential for good health."],
    ],
  },
  {
    band: "6.5",
    cefr: "B2 稳定",
    vocabSize: "约 6,000-7,000 词",
    daily: "每天 22 个新词 + 20 分钟复习",
    note: "适合冲刺多数留学申请要求，强化同义替换和搭配。",
    words: [
      ["sustainable", "可持续的", "Cities need sustainable transport systems."],
      ["priority", "优先事项", "Health should be a top priority."],
      ["impact", "影响", "Tourism has an impact on local culture."],
      ["challenge", "挑战", "Learning a language is a long-term challenge."],
      ["appropriate", "合适的", "Choose appropriate words for formal writing."],
      ["significant", "显著的", "There was a significant improvement."],
    ],
  },
  {
    band: "7",
    cefr: "C1 初阶",
    vocabSize: "约 7,500-8,500 词",
    daily: "每天 25 个新词 + 25 分钟复习",
    note: "目标是表达更精准，避免简单词反复出现。",
    words: [
      ["considerable", "相当大的", "The policy had a considerable effect."],
      ["perspective", "视角", "From my perspective, the plan is practical."],
      ["contribute", "贡献；促成", "Volunteers contribute to the community."],
      ["maintain", "维持", "It is hard to maintain a healthy lifestyle."],
      ["potential", "潜在的", "The idea has great potential."],
      ["evidence", "证据", "There is strong evidence for this view."],
    ],
  },
  {
    band: "7.5",
    cefr: "C1 熟练",
    vocabSize: "约 9,000-10,000 词",
    daily: "每天 28 个新词 + 25 分钟复习",
    note: "加入学术词、精准动词和更自然的短语搭配。",
    words: [
      ["phenomenon", "现象", "This phenomenon is common in urban areas."],
      ["allocate", "分配", "Governments should allocate funds wisely."],
      ["substantial", "大量的；实质的", "The project requires substantial investment."],
      ["interpret", "解读", "People may interpret the data differently."],
      ["implement", "实施", "Schools can implement new learning methods."],
      ["complicated", "复杂的", "The issue is more complicated than it seems."],
    ],
  },
  {
    band: "8",
    cefr: "C1-C2 高级",
    vocabSize: "约 10,000-12,000+ 词",
    daily: "每天 30 个新词 + 30 分钟复习",
    note: "强化高级搭配、抽象表达和学术场景迁移能力。",
    words: [
      ["comprehensive", "全面的", "A comprehensive plan is needed."],
      ["intricate", "错综复杂的", "The relationship is intricate and sensitive."],
      ["mitigate", "缓解", "More trees can mitigate air pollution."],
      ["implication", "影响；含义", "The decision has serious implications."],
      ["sophisticated", "复杂精密的；老练的", "The system is highly sophisticated."],
      ["indispensable", "不可或缺的", "Communication is indispensable in teamwork."],
    ],
  },
];

const IELTS_EXTRA_WORDS = [
  ["access", "使用权；通道"], ["achieve", "实现"], ["adapt", "适应"], ["adequate", "足够的"],
  ["adjust", "调整"], ["affect", "影响"], ["alternative", "替代的；选择"], ["analyze", "分析"],
  ["approach", "方法；接近"], ["area", "区域；领域"], ["aspect", "方面"], ["assess", "评估"],
  ["assume", "假设"], ["attitude", "态度"], ["available", "可获得的"], ["aware", "意识到的"],
  ["balance", "平衡"], ["barrier", "障碍"], ["behavior", "行为"], ["category", "类别"],
  ["cause", "原因；导致"], ["complex", "复杂的"], ["concept", "概念"], ["concern", "担忧；涉及"],
  ["conduct", "进行；行为"], ["connect", "连接"], ["consequence", "后果"], ["consistent", "一致的"],
  ["construct", "建造"], ["context", "背景；语境"], ["contrast", "对比"], ["create", "创造"],
  ["culture", "文化"], ["data", "数据"], ["debate", "辩论"], ["decline", "下降"],
  ["define", "定义"], ["demand", "需求"], ["demonstrate", "证明；展示"], ["depend", "依赖"],
  ["design", "设计"], ["develop", "发展"], ["difference", "差异"], ["discuss", "讨论"],
  ["economy", "经济"], ["effect", "影响；效果"], ["emphasis", "重点"], ["enable", "使能够"],
  ["encourage", "鼓励"], ["energy", "能源"], ["engage", "参与"], ["enhance", "提高"],
  ["ensure", "确保"], ["establish", "建立"], ["evaluate", "评价"], ["evolve", "演变"],
  ["expand", "扩大"], ["experience", "经历；经验"], ["factor", "因素"], ["feature", "特征"],
  ["finance", "金融"], ["focus", "焦点；集中"], ["function", "功能"], ["generate", "产生"],
  ["global", "全球的"], ["growth", "增长"], ["identify", "识别"], ["ignore", "忽视"],
  ["illustrate", "说明"], ["individual", "个人"], ["industry", "产业"], ["innovation", "创新"],
  ["insight", "洞察"], ["involve", "涉及"], ["issue", "问题"], ["legal", "法律的"],
  ["method", "方法"], ["modern", "现代的"], ["network", "网络"], ["obtain", "获得"],
  ["occur", "发生"], ["option", "选项"], ["participate", "参与"], ["percent", "百分比"],
  ["period", "时期"], ["policy", "政策"], ["positive", "积极的"], ["process", "过程"],
  ["produce", "生产；产生"], ["project", "项目"], ["promote", "促进"], ["provide", "提供"],
  ["purchase", "购买"], ["range", "范围"], ["region", "地区"], ["regulate", "监管"],
  ["relationship", "关系"], ["research", "研究"], ["resource", "资源"], ["respond", "回应"],
  ["restrict", "限制"], ["role", "角色"], ["sector", "部门；领域"], ["select", "选择"],
  ["similar", "相似的"], ["source", "来源"], ["specific", "具体的"], ["strategy", "策略"],
  ["structure", "结构"], ["survey", "调查"], ["target", "目标"], ["task", "任务"],
  ["theory", "理论"], ["transfer", "转移"], ["trend", "趋势"], ["vary", "变化"],
  ["vehicle", "交通工具"], ["welfare", "福利"], ["urban", "城市的"], ["rural", "乡村的"],
  ["migration", "迁移"], ["population", "人口"], ["employment", "就业"], ["income", "收入"],
  ["poverty", "贫困"], ["inequality", "不平等"], ["crime", "犯罪"], ["security", "安全"],
  ["privacy", "隐私"], ["media", "媒体"], ["advertising", "广告"], ["consumer", "消费者"],
  ["transport", "交通"], ["infrastructure", "基础设施"], ["housing", "住房"], ["climate", "气候"],
  ["pollution", "污染"], ["conservation", "保护"], ["biodiversity", "生物多样性"], ["recycling", "回收"],
  ["renewable", "可再生的"], ["emission", "排放"], ["healthcare", "医疗保健"], ["medicine", "药物；医学"],
  ["nutrition", "营养"], ["disease", "疾病"], ["treatment", "治疗"], ["prevention", "预防"],
  ["academic", "学术的"], ["curriculum", "课程"], ["qualification", "资格"], ["literacy", "读写能力"],
  ["motivation", "动力"], ["discipline", "纪律；学科"], ["creativity", "创造力"], ["critical", "批判性的；关键的"],
  ["automation", "自动化"], ["artificial", "人工的"], ["digital", "数字的"], ["device", "设备"],
  ["platform", "平台"], ["virtual", "虚拟的"], ["remote", "远程的"], ["flexible", "灵活的"],
  ["collaboration", "合作"], ["leadership", "领导力"], ["management", "管理"], ["investment", "投资"],
  ["competition", "竞争"], ["productivity", "生产力"], ["distribution", "分配"], ["export", "出口"],
  ["import", "进口"], ["tax", "税"], ["budget", "预算"], ["profit", "利润"],
  ["loss", "损失"], ["risk", "风险"], ["insurance", "保险"], ["contract", "合同"],
  ["tourism", "旅游业"], ["heritage", "遗产"], ["tradition", "传统"], ["identity", "身份"],
  ["diversity", "多样性"], ["minority", "少数群体"], ["gender", "性别"], ["generation", "一代人"],
  ["elderly", "老年人"], ["youth", "青年"], ["volunteer", "志愿者"], ["charity", "慈善"],
  ["responsibility", "责任"], ["ethics", "伦理"], ["justice", "公正"], ["freedom", "自由"],
  ["conflict", "冲突"], ["cooperation", "合作"], ["negotiation", "谈判"], ["agreement", "协议"],
  ["analysis", "分析"], ["criterion", "标准"], ["scheme", "方案"], ["framework", "框架"],
  ["principle", "原则"], ["outcome", "结果"], ["indicator", "指标"], ["capacity", "能力；容量"],
  ["valid", "有效的"], ["reliable", "可靠的"], ["accurate", "准确的"], ["precise", "精确的"],
  ["approximately", "大约"], ["frequently", "频繁地"], ["gradually", "逐渐地"], ["dramatically", "显著地"],
  ["relatively", "相对地"], ["primarily", "主要地"], ["previous", "以前的"], ["current", "当前的"],
  ["initial", "最初的"], ["final", "最终的"], ["major", "主要的"], ["minor", "次要的"],
  ["external", "外部的"], ["internal", "内部的"], ["visible", "可见的"], ["stable", "稳定的"],
  ["declining", "下降的"], ["increasing", "增加的"], ["widespread", "广泛的"], ["rare", "罕见的"],
  ["practical", "实际的"], ["theoretical", "理论的"], ["formal", "正式的"], ["informal", "非正式的"],
];

const IELTS_WORD_DETAILS = {
  name: ["/neim/", "我的名字叫 Lily。"],
  home: ["/hoʊm/", "我要回家。"],
  food: ["/fuːd/", "这个食物很好吃。"],
  water: ["/ˈwɔːtər/", "我需要一些水。"],
  happy: ["/ˈhæpi/", "我今天感觉很开心。"],
  school: ["/skuːl/", "她去学校上学。"],
  family: ["/ˈfæməli/", "我的家人住在这里。"],
  friend: ["/frend/", "他是我最好的朋友。"],
  morning: ["/ˈmɔːrnɪŋ/", "我早上学习。"],
  market: ["/ˈmɑːrkɪt/", "我们在市场买水果。"],
  listen: ["/ˈlɪsən/", "请认真听。"],
  clean: ["/kliːn/", "我每周打扫我的房间。"],
  travel: ["/ˈtrævəl/", "我乘火车旅行。"],
  weather: ["/ˈweðər/", "今天天气很好。"],
  library: ["/ˈlaɪbreri/", "我从图书馆借了一本书。"],
  question: ["/ˈkwestʃən/", "我可以问一个问题吗？"],
  answer: ["/ˈænsər/", "请把你的答案写在这里。"],
  healthy: ["/ˈhelθi/", "吃蔬菜是健康的。"],
  opinion: ["/əˈpɪnjən/", "在我看来，阅读很有用。"],
  improve: ["/ɪmˈpruːv/", "练习可以提高你的拼写。"],
  culture: ["/ˈkʌltʃər/", "食物是当地文化的一部分。"],
  habit: ["/ˈhæbɪt/", "好习惯能帮助学生学习。"],
  reason: ["/ˈriːzən/", "这个变化的原因是什么？"],
  simple: ["/ˈsɪmpəl/", "这个规则很容易遵守。"],
  environment: ["/ɪnˈvaɪrənmənt/", "我们应该保护环境。"],
  education: ["/ˌedʒuˈkeɪʃən/", "教育改变一个人的未来。"],
  technology: ["/tekˈnɑːlədʒi/", "科技让生活更方便。"],
  community: ["/kəˈmjuːnəti/", "这个社区需要一个新图书馆。"],
  benefit: ["/ˈbenɪfɪt/", "锻炼有很多健康好处。"],
  problem: ["/ˈprɑːbləm/", "交通是大城市里的严重问题。"],
  advantage: ["/ədˈvæntɪdʒ/", "骑自行车的一个优势是成本低。"],
  disadvantage: ["/ˌdɪsədˈvæntɪdʒ/", "主要缺点是它花费的时间。"],
  increase: ["/ɪnˈkriːs/", "在线学习可能会增加灵活性。"],
  reduce: ["/rɪˈduːs/", "公共交通可以减少污染。"],
  choice: ["/tʃɔɪs/", "学生在学校需要更多选择。"],
  support: ["/səˈpɔːrt/", "父母应该支持孩子的兴趣。"],
  consume: ["/kənˈsuːm/", "人们冬天会消耗更多能源。"],
  efficient: ["/ɪˈfɪʃənt/", "这是一种高效的背单词方法。"],
  solution: ["/səˈluːʃən/", "这座城市需要一个长期解决方案。"],
  pressure: ["/ˈpreʃər/", "学生经常面临考试压力。"],
  influence: ["/ˈɪnfluəns/", "朋友会影响我们的选择。"],
  essential: ["/ɪˈsenʃəl/", "睡眠对健康很必要。"],
  sustainable: ["/səˈsteɪnəbəl/", "城市需要可持续的交通系统。"],
  priority: ["/praɪˈɔːrəti/", "健康应该是首要任务。"],
  impact: ["/ˈɪmpækt/", "旅游业会影响当地文化。"],
  challenge: ["/ˈtʃælɪndʒ/", "学习一门语言是一项长期挑战。"],
  appropriate: ["/əˈproʊpriət/", "正式写作要选择合适的词。"],
  significant: ["/sɪɡˈnɪfɪkənt/", "有了显著的进步。"],
  considerable: ["/kənˈsɪdərəbəl/", "这项政策产生了相当大的影响。"],
  perspective: ["/pərˈspektɪv/", "从我的角度看，这个计划很实际。"],
  contribute: ["/kənˈtrɪbjuːt/", "志愿者为社区做贡献。"],
  maintain: ["/meɪnˈteɪn/", "保持健康的生活方式很难。"],
  potential: ["/pəˈtenʃəl/", "这个想法有很大潜力。"],
  evidence: ["/ˈevɪdəns/", "有强有力的证据支持这个观点。"],
  phenomenon: ["/fəˈnɑːmɪnən/", "这种现象在城市地区很常见。"],
  allocate: ["/ˈæləkeɪt/", "政府应该明智地分配资金。"],
  substantial: ["/səbˈstænʃəl/", "这个项目需要大量投资。"],
  interpret: ["/ɪnˈtɜːrprət/", "人们可能会用不同方式解读数据。"],
  implement: ["/ˈɪmplɪment/", "学校可以实施新的学习方法。"],
  complicated: ["/ˈkɑːmplɪkeɪtɪd/", "这个问题比看起来更复杂。"],
  comprehensive: ["/ˌkɑːmprɪˈhensɪv/", "需要一个全面的计划。"],
  intricate: ["/ˈɪntrɪkət/", "这种关系错综复杂且敏感。"],
  mitigate: ["/ˈmɪtɪɡeɪt/", "更多树木可以缓解空气污染。"],
  implication: ["/ˌɪmplɪˈkeɪʃən/", "这个决定有严重影响。"],
  sophisticated: ["/səˈfɪstɪkeɪtɪd/", "这个系统非常复杂精密。"],
  indispensable: ["/ˌɪndɪˈspensəbəl/", "沟通在团队合作中不可或缺。"],
};

const state = {
  words: loadJson(STORAGE_KEYS.words, []),
  history: loadJson(STORAGE_KEYS.history, []),
  settings: { ...DEFAULT_SETTINGS, ...loadJson(STORAGE_KEYS.settings, {}) },
  game: {
    xp: 0,
    stars: 0,
    rounds: 0,
    bestCombo: 0,
    ...loadJson(STORAGE_KEYS.game, {}),
  },
  fileText: "",
  practice: null,
  lastResult: null,
  timerId: null,
  voices: [],
};

const els = {
  pageTitle: document.querySelector("#pageTitle"),
  views: {
    home: document.querySelector("#homeView"),
    practice: document.querySelector("#practiceView"),
    result: document.querySelector("#resultView"),
    ielts: document.querySelector("#ieltsView"),
    settings: document.querySelector("#settingsView"),
  },
  importText: document.querySelector("#importText"),
  fileInput: document.querySelector("#fileInput"),
  fileName: document.querySelector("#fileName"),
  importButton: document.querySelector("#importButton"),
  startButton: document.querySelector("#startButton"),
  heroGameLevel: document.querySelector("#heroGameLevel"),
  heroGameTitle: document.querySelector("#heroGameTitle"),
  gameSummary: document.querySelector("#gameSummary"),
  gameLevelText: document.querySelector("#gameLevelText"),
  gameXpText: document.querySelector("#gameXpText"),
  gameXpBar: document.querySelector("#gameXpBar"),
  gameStarsText: document.querySelector("#gameStarsText"),
  gameBestComboText: document.querySelector("#gameBestComboText"),
  gameRoundsText: document.querySelector("#gameRoundsText"),
  importMessage: document.querySelector("#importMessage"),
  wordCount: document.querySelector("#wordCount"),
  recentRate: document.querySelector("#recentRate"),
  bestLevel: document.querySelector("#bestLevel"),
  recentWrongCount: document.querySelector("#recentWrongCount"),
  wordList: document.querySelector("#wordList"),
  clearWordsButton: document.querySelector("#clearWordsButton"),
  historyList: document.querySelector("#historyList"),
  clearHistoryButton: document.querySelector("#clearHistoryButton"),
  speechSupportMessage: document.querySelector("#speechSupportMessage"),
  practiceModeText: document.querySelector("#practiceModeText"),
  stagePill: document.querySelector("#stagePill"),
  streakText: document.querySelector("#streakText"),
  masteredText: document.querySelector("#masteredText"),
  livesText: document.querySelector("#livesText"),
  scoreText: document.querySelector("#scoreText"),
  comboText: document.querySelector("#comboText"),
  progressText: document.querySelector("#progressText"),
  progressBar: document.querySelector("#progressBar"),
  timerText: document.querySelector("#timerText"),
  speakButton: document.querySelector("#speakButton"),
  speakStatus: document.querySelector("#speakStatus"),
  answerForm: document.querySelector("#answerForm"),
  answerInput: document.querySelector("#answerInput"),
  skipButton: document.querySelector("#skipButton"),
  exitPracticeButton: document.querySelector("#exitPracticeButton"),
  feedbackBox: document.querySelector("#feedbackBox"),
  resultTitle: document.querySelector("#resultTitle"),
  totalStat: document.querySelector("#totalStat"),
  correctStat: document.querySelector("#correctStat"),
  wrongStat: document.querySelector("#wrongStat"),
  rateStat: document.querySelector("#rateStat"),
  durationStat: document.querySelector("#durationStat"),
  masteryMessage: document.querySelector("#masteryMessage"),
  levelBadge: document.querySelector("#levelBadge"),
  rewardBox: document.querySelector("#rewardBox"),
  retryAllButton: document.querySelector("#retryAllButton"),
  retryWrongButton: document.querySelector("#retryWrongButton"),
  exportWrongButton: document.querySelector("#exportWrongButton"),
  backHomeButton: document.querySelector("#backHomeButton"),
  resultWrongList: document.querySelector("#resultWrongList"),
  ieltsBandSelect: document.querySelector("#ieltsBandSelect"),
  ieltsBandTitle: document.querySelector("#ieltsBandTitle"),
  ieltsVocabSize: document.querySelector("#ieltsVocabSize"),
  ieltsCefr: document.querySelector("#ieltsCefr"),
  ieltsDailyCount: document.querySelector("#ieltsDailyCount"),
  ieltsNote: document.querySelector("#ieltsNote"),
  dailyPlanList: document.querySelector("#dailyPlanList"),
  ieltsWordSummary: document.querySelector("#ieltsWordSummary"),
  ieltsWordCards: document.querySelector("#ieltsWordCards"),
  addIeltsWordsButton: document.querySelector("#addIeltsWordsButton"),
  startIeltsStudyButton: document.querySelector("#startIeltsStudyButton"),
  voiceLang: document.querySelector("#voiceLang"),
  speechRate: document.querySelector("#speechRate"),
  autoSpeak: document.querySelector("#autoSpeak"),
  shuffleWords: document.querySelector("#shuffleWords"),
};

init();

function init() {
  bindEvents();
  loadVoices();
  renderIeltsOptions();
  renderHome();
  renderIeltsPlan();
  renderSettings();
  checkSpeechSupport();
}

function bindEvents() {
  document.querySelectorAll("[data-view-button]").forEach((button) => {
    button.addEventListener("click", () => showView(button.dataset.viewButton));
  });

  els.fileInput.addEventListener("change", handleFileSelect);
  els.importButton.addEventListener("click", handleImport);
  els.startButton.addEventListener("click", () => startPractice(state.words, false));
  els.clearWordsButton.addEventListener("click", clearWords);
  els.clearHistoryButton.addEventListener("click", clearHistory);
  els.wordList.addEventListener("click", handleWordListClick);
  els.historyList.addEventListener("click", handleHistoryClick);

  els.speakButton.addEventListener("click", () => speakCurrentWord());
  els.answerForm.addEventListener("submit", handleSubmitAnswer);
  els.skipButton.addEventListener("click", handleSkip);
  els.exitPracticeButton.addEventListener("click", exitPractice);

  els.retryAllButton.addEventListener("click", () => startPractice(state.words, false));
  els.retryWrongButton.addEventListener("click", retryWrongWords);
  els.exportWrongButton.addEventListener("click", exportWrongWords);
  els.backHomeButton.addEventListener("click", () => showView("home"));
  els.resultWrongList.addEventListener("click", handleResultWrongClick);
  els.ieltsBandSelect.addEventListener("change", renderIeltsPlan);
  els.ieltsDailyCount.addEventListener("change", () => {
    state.settings.ieltsDailyCount = els.ieltsDailyCount.value;
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(state.settings));
    renderIeltsPlan();
  });
  els.addIeltsWordsButton.addEventListener("click", addSelectedIeltsWords);
  els.startIeltsStudyButton.addEventListener("click", startSelectedIeltsPractice);

  [els.voiceLang, els.speechRate, els.autoSpeak, els.shuffleWords].forEach((input) => {
    input.addEventListener("change", saveSettingsFromForm);
  });

  if ("speechSynthesis" in window) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

function showView(viewName) {
  Object.entries(els.views).forEach(([name, node]) => {
    node.classList.toggle("active", name === viewName);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });

  const titles = {
    home: "英语单词听写工具",
    practice: "听写练习",
    result: "听写结果",
    ielts: "雅思词汇计划",
    settings: "设置",
  };
  els.pageTitle.textContent = titles[viewName] || titles.home;

  if (viewName === "home") {
    renderHome();
  }
}

function renderIeltsOptions() {
  els.ieltsBandSelect.innerHTML = IELTS_LEVELS.map(
    (level) => `<option value="${level.band}">雅思 ${level.band}</option>`,
  ).join("");
  els.ieltsBandSelect.value = "6.5";
  els.ieltsDailyCount.innerHTML = IELTS_TARGET_OPTIONS.map(
    (count) => `<option value="${count}">${count} 个</option>`,
  ).join("");
  const savedCount = IELTS_TARGET_OPTIONS.includes(Number(state.settings.ieltsDailyCount))
    ? state.settings.ieltsDailyCount
    : DEFAULT_SETTINGS.ieltsDailyCount;
  els.ieltsDailyCount.value = savedCount;
}

function getSelectedIeltsLevel() {
  return IELTS_LEVELS.find((level) => level.band === els.ieltsBandSelect.value) || IELTS_LEVELS[7];
}

function getSelectedIeltsDailyWords() {
  const level = getSelectedIeltsLevel();
  const selectedIndex = IELTS_LEVELS.findIndex((item) => item.band === level.band);
  const dailyCount = Number(els.ieltsDailyCount.value || state.settings.ieltsDailyCount || 10);
  const levelWords = IELTS_LEVELS.slice(0, selectedIndex + 1)
    .flatMap((item) =>
      item.words.map(([word, meaning, phrase]) => ({
        band: item.band,
        word,
        meaning,
        phrase,
        translation: IELTS_WORD_DETAILS[word]?.[1] || "",
      })),
    );
  const extraWords = IELTS_EXTRA_WORDS.map(([word, meaning], index) => ({
    band: level.band,
    word,
    meaning,
    phrase: createIeltsPhrase(word),
    translation: createIeltsPhraseTranslation(meaning),
    order: index,
  }));

  return uniqueWords([...levelWords, ...extraWords]).slice(0, dailyCount);
}

function uniqueWords(words) {
  const seen = new Set();
  return words.filter((item) => {
    const key = normalizeWordKey(item.word);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function createIeltsPhrase(word) {
  return `This word is useful when discussing ${word} in IELTS topics.`;
}

function createIeltsPhraseTranslation(meaning) {
  return `这个词可用于讨论“${meaning}”相关的雅思话题。`;
}

function renderIeltsPlan() {
  const level = getSelectedIeltsLevel();
  const dailyWords = getSelectedIeltsDailyWords();
  const dailyCount = Number(els.ieltsDailyCount.value || state.settings.ieltsDailyCount || 10);
  els.ieltsBandTitle.textContent = `雅思 ${level.band} 目标`;
  els.ieltsVocabSize.textContent = level.vocabSize;
  els.ieltsCefr.textContent = level.cefr;
  els.ieltsNote.textContent = level.note;
  els.dailyPlanList.innerHTML = [
    ["1", `你选择今天学习 ${dailyCount} 个词。`],
    ["2", `本页已生成 ${dailyWords.length} 个今日目标词，加入词库和听写都使用同一批。`],
    ["3", "点击每张卡片的听音，跟读 1 遍。"],
    ["4", "加入今日词库后开始听写，错题当天重练。"],
  ]
    .map((item) => `<div class="daily-step"><strong>${item[0]}</strong><span>${item[1]}</span></div>`)
    .join("");
  els.ieltsWordSummary.innerHTML = `
    <strong>今日 ${dailyWords.length} 个目标词：</strong>
    <div>${dailyWords.map((item) => `<span>${escapeHtml(item.word)}</span>`).join("")}</div>
  `;
  els.ieltsWordCards.innerHTML = dailyWords
    .map(
      ({ band, word, meaning, phrase, translation }) => {
        const [phonetic, savedTranslation] = IELTS_WORD_DETAILS[word] || ["点击听音练发音", ""];
        return `
        <article class="study-card">
          <div>
            <span class="study-band">IELTS ${band}</span>
            <h3>${escapeHtml(word)}</h3>
            <div class="phonetic">${escapeHtml(phonetic)}</div>
            <p>${escapeHtml(meaning)}</p>
          </div>
          <div class="study-phrase">
            <strong>${escapeHtml(phrase)}</strong>
            <span>${escapeHtml(savedTranslation || translation)}</span>
          </div>
          <button class="icon-button" data-study-speak="${escapeHtml(word)}" type="button" title="听音">🔊</button>
        </article>
      `;
      },
    )
    .join("");
}

function addSelectedIeltsWords(showAlert = true) {
  const level = getSelectedIeltsLevel();
  const dailyWords = getSelectedIeltsDailyWords();
  const text = dailyWords.map(({ word, meaning }) => `${word} ${meaning}`).join("\n");
  const before = state.words.length;
  mergeWords(parseWordText(text));
  const added = state.words.length - before;
  if (showAlert) {
    alert(`已加入雅思 ${level.band} 今日目标词：新增 ${added} 个，重复词已自动跳过。`);
  }
}

function startSelectedIeltsPractice() {
  const level = getSelectedIeltsLevel();
  const dailyWords = getSelectedIeltsDailyWords();
  addSelectedIeltsWords(false);
  startPractice(dailyWords.map(({ word, meaning }) => ({
    id: `ielts-${level.band}-${word}`,
    word,
    meaning,
    createdAt: Date.now(),
  })), false);
}

function handleFileSelect(event) {
  const file = event.target.files?.[0];
  if (!file) {
    state.fileText = "";
    els.fileName.textContent = "未选择文件";
    return;
  }

  els.fileName.textContent = file.name;
  const reader = new FileReader();
  reader.onload = () => {
    state.fileText = String(reader.result || "");
    els.importMessage.textContent = "文件已读取，可以点击导入单词。";
  };
  reader.onerror = () => {
    state.fileText = "";
    els.importMessage.textContent = "文件读取失败，请重新选择。";
  };
  reader.readAsText(file);
}

function handleImport() {
  const sourceText = [els.importText.value, state.fileText].filter(Boolean).join("\n");
  const parsedWords = parseWordText(sourceText);

  if (parsedWords.length === 0) {
    els.importMessage.textContent = "没有识别到可导入的单词。";
    return;
  }

  const { added, duplicated } = mergeWords(parsedWords);
  els.importText.value = "";
  state.fileText = "";
  els.fileInput.value = "";
  els.fileName.textContent = "未选择文件";
  els.importMessage.textContent = `导入完成：新增 ${added} 个，跳过重复 ${duplicated} 个。`;
  renderHome();
}

function mergeWords(parsedWords) {
  const existing = new Map(state.words.map((item) => [normalizeWordKey(item.word), item]));
  let added = 0;
  let duplicated = 0;

  parsedWords.forEach((item) => {
    const key = normalizeWordKey(item.word);
    if (!key) return;

    if (existing.has(key)) {
      duplicated += 1;
      const oldItem = existing.get(key);
      if (!oldItem.meaning && item.meaning) {
        oldItem.meaning = item.meaning;
      }
      return;
    }

    const newWord = {
      id: createId(),
      word: item.word.trim(),
      meaning: item.meaning.trim(),
      createdAt: Date.now(),
    };
    state.words.push(newWord);
    existing.set(key, newWord);
    added += 1;
  });

  saveWords();
  renderHome();
  return { added, duplicated };
}

function parseWordText(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const result = [];
  const seen = new Set();

  lines.forEach((line, index) => {
    if (index === 0 && /^word\s*,\s*meaning$/i.test(line)) return;

    const item = line.includes(",") ? parseCsvLine(line) : parsePlainLine(line);
    if (!item.word) return;

    const key = normalizeWordKey(item.word);
    if (seen.has(key)) return;

    seen.add(key);
    result.push(item);
  });

  return result;
}

function parseCsvLine(line) {
  const columns = line.match(/("([^"]|"")*"|[^,]+)/g) || [];
  const clean = columns.map((column) => column.trim().replace(/^"|"$/g, "").replace(/""/g, '"'));
  return {
    word: clean[0] || "",
    meaning: clean.slice(1).join(" ").trim(),
  };
}

function parsePlainLine(line) {
  const match = line.match(/^([A-Za-z][A-Za-z' -]*[A-Za-z]|[A-Za-z])(?:\s+(.+))?$/);
  if (!match) return { word: line, meaning: "" };

  return {
    word: match[1] || "",
    meaning: match[2] || "",
  };
}

function renderHome() {
  els.wordCount.textContent = String(state.words.length);
  renderDashboard();
  renderGamePanel();
  renderWordList();
  renderHistory();
}

function renderGamePanel() {
  const profile = getGameProfile(state.game.xp);
  els.heroGameLevel.textContent = `Lv.${profile.level}`;
  els.heroGameTitle.textContent = profile.title;
  els.gameLevelText.textContent = `Lv.${profile.level} ${profile.title}`;
  els.gameXpText.textContent = `${profile.currentXp} / ${profile.nextXp} XP`;
  els.gameXpBar.style.width = `${profile.percent}%`;
  els.gameStarsText.textContent = `⭐ ${state.game.stars} 星`;
  els.gameBestComboText.textContent = `🔥 最佳连击 ${state.game.bestCombo}`;
  els.gameRoundsText.textContent = `🎮 已完成 ${state.game.rounds} 局`;
  els.gameSummary.textContent =
    profile.level >= 5 ? "已经是高级冒险者了，试试雅思计划里的高阶词。" : "答对单词获得经验和星星，连击越高奖励越多。";
}

function getGameProfile(totalXp) {
  const level = Math.floor(totalXp / 100) + 1;
  const currentXp = totalXp % 100;
  const titles = ["单词新手", "听音勇士", "拼写高手", "连击达人", "词汇冒险家", "雅思挑战者"];
  return {
    level,
    currentXp,
    nextXp: 100,
    percent: currentXp,
    title: titles[Math.min(level - 1, titles.length - 1)],
  };
}

function renderDashboard() {
  const recent = state.history[0];
  const best = state.history.reduce((winner, item) => (item.rate > winner.rate ? item : winner), {
    rate: -1,
  });

  els.recentRate.textContent = recent ? `${recent.rate}%` : "--";
  els.recentWrongCount.textContent = recent ? String(recent.wrong) : "0";
  els.bestLevel.textContent = best.rate >= 0 ? getLevelInfo(best.rate).name : "未开始";
}

function renderWordList() {
  if (state.words.length === 0) {
    els.wordList.className = "word-list empty-state";
    els.wordList.textContent = "还没有导入单词。";
    return;
  }

  els.wordList.className = "word-list";
  els.wordList.innerHTML = state.words
    .map(
      (item) => `
        <div class="word-item">
          <div class="word-main">
            <strong>${escapeHtml(item.word)}</strong>
            <span>${escapeHtml(item.meaning || "无中文释义")}</span>
          </div>
          <div class="word-actions">
            <button class="icon-button" data-speak-word="${item.id}" type="button" title="听音">🔊</button>
            <button class="danger-link" data-delete-word="${item.id}" type="button">删除</button>
          </div>
        </div>
      `,
    )
    .join("");
}

function handleWordListClick(event) {
  const speakId = event.target.dataset.speakWord;
  if (speakId) {
    const word = state.words.find((item) => item.id === speakId);
    if (word) speakWord(word.word);
    return;
  }

  const id = event.target.dataset.deleteWord;
  if (!id) return;

  const word = state.words.find((item) => item.id === id);
  if (!word) return;

  if (!confirm(`确定删除 “${word.word}” 吗？`)) return;
  state.words = state.words.filter((item) => item.id !== id);
  saveWords();
  renderHome();
}

function clearWords() {
  if (state.words.length === 0) return;
  if (!confirm("确定清空整个单词本吗？这个操作不能撤销。")) return;

  state.words = [];
  saveWords();
  renderHome();
  els.importMessage.textContent = "单词本已清空。";
}

function renderHistory() {
  const recent = state.history.slice(0, 10);
  if (recent.length === 0) {
    els.historyList.className = "history-list empty-state";
    els.historyList.textContent = "暂无成绩记录。";
    return;
  }

  els.historyList.className = "history-list";
  els.historyList.innerHTML = recent
    .map(
      (item) => `
        <div class="history-item">
          <div>
            <strong>${formatDateTime(item.createdAt)} ${item.isRetryWrong ? "错题重练" : "全部听写"}</strong>
            <span>${item.total} 词，正确 ${item.correct}，错误 ${item.wrong}，正确率 ${item.rate}%</span>
          </div>
          <button class="ghost-button" data-history-wrong="${item.id}" type="button">错题</button>
        </div>
      `,
    )
    .join("");
}

function handleHistoryClick(event) {
  const id = event.target.dataset.historyWrong;
  if (!id) return;

  const record = state.history.find((item) => item.id === id);
  if (!record?.wrongItems?.length) {
    alert("这次记录没有错题。");
    return;
  }

  startPractice(record.wrongItems.map((item) => item.wordItem), true);
}

function clearHistory() {
  if (state.history.length === 0) return;
  if (!confirm("确定清空全部历史成绩吗？")) return;

  state.history = [];
  saveHistory();
  renderHistory();
}

function startPractice(words, isRetryWrong) {
  if (!words.length) {
    alert("请先导入单词本");
    return;
  }

  const list = state.settings.shuffleWords ? shuffle([...words]) : [...words];
  state.practice = {
    id: createId(),
    words: list,
    isRetryWrong,
    index: 0,
    correct: 0,
    wrongItems: [],
    startedAt: Date.now(),
    elapsedSeconds: 0,
    waitingForNext: false,
    streak: 0,
    bestStreak: 0,
    lives: 3,
    score: 0,
    combo: 1,
    earnedXp: 0,
    earnedStars: 0,
  };

  els.feedbackBox.className = "feedback hidden";
  els.answerInput.value = "";
  showView("practice");
  renderPractice();
  startTimer();

  if (state.settings.autoSpeak) {
    setTimeout(() => speakCurrentWord(), 250);
  }
}

function renderPractice() {
  const practice = state.practice;
  if (!practice) return;

  const current = practice.words[practice.index];
  const currentNumber = Math.min(practice.index + 1, practice.words.length);
  const percent = practice.words.length ? (practice.index / practice.words.length) * 100 : 0;

  els.practiceModeText.textContent = practice.isRetryWrong ? "错题重练" : "全部单词";
  els.stagePill.textContent = `第 ${currentNumber} 关`;
  els.streakText.textContent = `🔥 连对 ${practice.streak} 个`;
  els.masteredText.textContent = `已掌握 ${practice.correct} 个`;
  els.livesText.textContent = `${"❤️".repeat(Math.max(practice.lives, 0))}${"🤍".repeat(Math.max(3 - practice.lives, 0))}`;
  els.scoreText.textContent = `⭐ ${practice.score}`;
  els.comboText.textContent = `⚡ x${practice.combo}`;
  els.progressText.textContent = `第 ${currentNumber} / ${practice.words.length} 个`;
  els.progressBar.style.width = `${percent}%`;
  els.timerText.textContent = formatDuration(practice.elapsedSeconds);
  els.answerInput.disabled = false;
  els.answerInput.focus();
  els.skipButton.disabled = false;
  els.speakButton.disabled = !current;
}

function speakCurrentWord(wordOverride) {
  const practice = state.practice;
  const word = wordOverride || practice?.words[practice.index]?.word;
  if (!word) return;

  speakWord(word);
}

function speakWord(word) {
  if (!("speechSynthesis" in window)) {
    els.speakStatus.textContent = "当前浏览器不支持听音。";
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = state.settings.voiceLang;
  utterance.rate = Number(state.settings.speechRate);

  const preferredVoice = state.voices.find((voice) => voice.lang === state.settings.voiceLang);
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  utterance.onstart = () => {
    els.speakStatus.textContent = "正在播放";
  };
  utterance.onend = () => {
    els.speakStatus.textContent = "";
  };
  utterance.onerror = () => {
    els.speakStatus.textContent = "播放失败，请再试一次。";
  };

  window.speechSynthesis.speak(utterance);
}

function handleSubmitAnswer(event) {
  event.preventDefault();
  const practice = state.practice;
  if (!practice || practice.waitingForNext) return;

  const current = practice.words[practice.index];
  const answer = els.answerInput.value;
  const isCorrect = normalizeAnswer(answer) === normalizeAnswer(current.word);

  if (isCorrect) {
    practice.correct += 1;
    practice.streak += 1;
    practice.bestStreak = Math.max(practice.bestStreak, practice.streak);
    practice.combo = Math.min(5, 1 + Math.floor(practice.streak / 3));
    practice.score += 10 * practice.combo;
    practice.earnedXp += 8 * practice.combo;
    practice.earnedStars += 1 * practice.combo;
    showCorrectFeedback();
    setTimeout(goNextWord, 450);
    return;
  }

  practice.streak = 0;
  practice.combo = 1;
  practice.lives = Math.max(0, practice.lives - 1);
  recordWrong(current, answer || "未填写");
  showWrongFeedback(current, answer || "未填写");
}

function handleSkip() {
  const practice = state.practice;
  if (!practice || practice.waitingForNext) return;

  const current = practice.words[practice.index];
  practice.streak = 0;
  practice.combo = 1;
  practice.lives = Math.max(0, practice.lives - 1);
  recordWrong(current, "已跳过");
  showWrongFeedback(current, "已跳过");
}

function showCorrectFeedback() {
  const practice = state.practice;
  practice.waitingForNext = true;
  els.feedbackBox.className = "feedback correct";
  els.feedbackBox.innerHTML = `<strong>✅ 命中！+${10 * practice.combo} 星分</strong><p>连对 ${practice.streak} 个，当前奖励倍率 x${practice.combo}。</p>`;
  els.answerInput.disabled = true;
  els.skipButton.disabled = true;
}

function showWrongFeedback(wordItem, answer) {
  const practice = state.practice;
  practice.waitingForNext = true;
  els.feedbackBox.className = "feedback wrong";
  els.feedbackBox.innerHTML = `
    <strong>💡 生命 -1，再听一次</strong>
    <p>你的答案：${escapeHtml(answer)}</p>
    <p>正确答案：${escapeHtml(wordItem.word)}</p>
    ${wordItem.meaning ? `<p>中文释义：${escapeHtml(wordItem.meaning)}</p>` : ""}
    <div class="button-row">
      <button id="feedbackSpeakButton" class="ghost-button" type="button">再听一次</button>
      <button id="feedbackNextButton" class="primary-button" type="button">下一个</button>
    </div>
  `;
  els.answerInput.disabled = true;
  els.skipButton.disabled = true;
  document.querySelector("#feedbackSpeakButton").addEventListener("click", () => speakWord(wordItem.word));
  document.querySelector("#feedbackNextButton").addEventListener("click", goNextWord);
}

function recordWrong(wordItem, answer) {
  const practice = state.practice;
  practice.wrongItems.push({
    wordItem,
    answer,
  });
}

function goNextWord() {
  const practice = state.practice;
  if (!practice) return;

  practice.index += 1;
  practice.waitingForNext = false;
  els.answerInput.value = "";
  els.feedbackBox.className = "feedback hidden";
  els.feedbackBox.innerHTML = "";

  if (practice.index >= practice.words.length) {
    finishPractice();
    return;
  }

  renderPractice();
  if (state.settings.autoSpeak) {
    setTimeout(() => speakCurrentWord(), 250);
  }
}

function finishPractice() {
  const practice = state.practice;
  if (!practice) return;

  stopTimer();
  const total = practice.words.length;
  const wrong = practice.wrongItems.length;
  const correct = total - wrong;
  const rate = total ? Math.round((correct / total) * 100) : 0;
  const result = {
    id: practice.id,
    createdAt: Date.now(),
    total,
    correct,
    wrong,
    rate,
    durationSeconds: Math.max(1, Math.round((Date.now() - practice.startedAt) / 1000)),
    isRetryWrong: practice.isRetryWrong,
    bestStreak: practice.bestStreak,
    score: practice.score,
    earnedXp: calculateRoundXp(practice, rate),
    earnedStars: calculateRoundStars(practice, rate),
    remainingLives: practice.lives,
    wrongItems: practice.wrongItems,
  };

  state.lastResult = result;
  applyGameReward(result);
  state.history.unshift(result);
  state.history = state.history.slice(0, 50);
  saveHistory();
  state.practice = null;
  renderResult();
  showView("result");
}

function calculateRoundXp(practice, rate) {
  const clearBonus = rate === 100 ? 30 : 0;
  const lifeBonus = practice.lives * 5;
  return practice.earnedXp + clearBonus + lifeBonus;
}

function calculateRoundStars(practice, rate) {
  const clearBonus = rate === 100 ? 10 : 0;
  return practice.earnedStars + clearBonus;
}

function applyGameReward(result) {
  state.game.xp += result.earnedXp;
  state.game.stars += result.earnedStars;
  state.game.rounds += 1;
  state.game.bestCombo = Math.max(state.game.bestCombo, result.bestStreak || 0);
  saveGame();
}

function renderResult() {
  const result = state.lastResult;
  if (!result) return;

  els.totalStat.textContent = String(result.total);
  els.correctStat.textContent = String(result.correct);
  els.wrongStat.textContent = String(result.wrong);
  els.rateStat.textContent = `${result.rate}%`;
  els.durationStat.textContent = formatDuration(result.durationSeconds);
  const level = getLevelInfo(result.rate);
  els.levelBadge.textContent = level.icon;
  els.levelBadge.style.setProperty("--level-color", level.color);
  els.resultTitle.textContent = `${level.name}`;
  els.masteryMessage.textContent = getResultMessage(result, level);
  els.rewardBox.innerHTML = `
    <div class="reward-item"><span>本局星分</span><strong>⭐ ${result.score || 0}</strong></div>
    <div class="reward-item"><span>获得经验</span><strong>+${result.earnedXp || 0} XP</strong></div>
    <div class="reward-item"><span>获得星星</span><strong>+${result.earnedStars || 0}</strong></div>
    <div class="reward-item"><span>剩余生命</span><strong>${"❤️".repeat(result.remainingLives || 0) || "0"}</strong></div>
  `;
  els.retryWrongButton.disabled = result.wrongItems.length === 0;
  els.exportWrongButton.disabled = result.wrongItems.length === 0;
  renderResultWrongList();
}

function getLevelInfo(rate) {
  if (rate === 100) return { name: "S 级完美掌握", icon: "🏆", color: "#f59e0b" };
  if (rate >= 90) return { name: "A 级状态很好", icon: "⭐", color: "#2563eb" };
  if (rate >= 75) return { name: "B 级大部分掌握", icon: "🌟", color: "#14804a" };
  if (rate >= 60) return { name: "C 级继续加油", icon: "💪", color: "#b45309" };
  return { name: "D 级先练错题", icon: "🧩", color: "#dc2626" };
}

function getResultMessage(result, level) {
  if (result.isRetryWrong && result.wrong === 0) {
    return "这次错题已经全部掌握。";
  }

  if (result.wrong === 0) {
    return `太棒了，本轮 ${result.total} 个词全部答对，最高连对 ${result.bestStreak || result.correct} 个，奖励已到账。`;
  }

  return `${level.name}，本次错了 ${result.wrong} 个词，建议马上点“只听写错题”再巩固一轮。`;
}

function renderResultWrongList() {
  const wrongItems = state.lastResult?.wrongItems || [];
  if (wrongItems.length === 0) {
    els.resultWrongList.className = "wrong-list empty-state";
    els.resultWrongList.textContent = "本次没有错题。";
    return;
  }

  els.resultWrongList.className = "wrong-list";
  els.resultWrongList.innerHTML = wrongItems
    .map(
      (item, index) => `
        <div class="wrong-item">
          <div>
            <strong>${escapeHtml(item.wordItem.word)}</strong>
            <span>${escapeHtml(item.wordItem.meaning || "无中文释义")}；你的答案：${escapeHtml(item.answer)}</span>
          </div>
          <button class="ghost-button" data-speak-wrong="${index}" type="button">听音</button>
        </div>
      `,
    )
    .join("");
}

function handleResultWrongClick(event) {
  const index = Number(event.target.dataset.speakWrong);
  if (Number.isNaN(index)) return;

  const item = state.lastResult?.wrongItems[index];
  if (item) speakWord(item.wordItem.word);
}

document.addEventListener("click", (event) => {
  const studyWord = event.target.dataset.studySpeak;
  if (studyWord) {
    speakWord(studyWord);
  }
});

function retryWrongWords() {
  const wrongItems = state.lastResult?.wrongItems || [];
  if (wrongItems.length === 0) return;

  startPractice(wrongItems.map((item) => item.wordItem), true);
}

function exportWrongWords() {
  const wrongItems = state.lastResult?.wrongItems || [];
  if (wrongItems.length === 0) return;

  const content = ["word,meaning,your_answer"]
    .concat(
      wrongItems.map((item) =>
        [item.wordItem.word, item.wordItem.meaning || "", item.answer].map(toCsvCell).join(","),
      ),
    )
    .join("\n");

  const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `wrong-words-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function exitPractice() {
  if (!state.practice) return;
  if (!confirm("确定退出本次听写吗？当前进度不会保存为成绩。")) return;

  stopTimer();
  state.practice = null;
  window.speechSynthesis?.cancel();
  showView("home");
}

function startTimer() {
  stopTimer();
  state.timerId = window.setInterval(() => {
    if (!state.practice) return;
    state.practice.elapsedSeconds = Math.round((Date.now() - state.practice.startedAt) / 1000);
    els.timerText.textContent = formatDuration(state.practice.elapsedSeconds);
  }, 1000);
}

function stopTimer() {
  if (state.timerId) {
    window.clearInterval(state.timerId);
    state.timerId = null;
  }
}

function renderSettings() {
  els.voiceLang.value = state.settings.voiceLang;
  els.speechRate.value = state.settings.speechRate;
  els.autoSpeak.checked = state.settings.autoSpeak;
  els.shuffleWords.checked = state.settings.shuffleWords;
  els.ieltsDailyCount.value = state.settings.ieltsDailyCount || DEFAULT_SETTINGS.ieltsDailyCount;
}

function saveSettingsFromForm() {
  state.settings = {
    voiceLang: els.voiceLang.value,
    speechRate: els.speechRate.value,
    autoSpeak: els.autoSpeak.checked,
    shuffleWords: els.shuffleWords.checked,
    ieltsDailyCount: els.ieltsDailyCount.value,
  };
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(state.settings));
}

function checkSpeechSupport() {
  if (!("speechSynthesis" in window)) {
    els.speechSupportMessage.textContent = "当前浏览器不支持 speechSynthesis，听音功能可能不可用。";
    return;
  }

  els.speechSupportMessage.textContent = "听音使用浏览器内置英文发音，不会上传单词。";
}

function loadVoices() {
  if (!("speechSynthesis" in window)) return;

  state.voices = window.speechSynthesis.getVoices();
}

function saveWords() {
  localStorage.setItem(STORAGE_KEYS.words, JSON.stringify(state.words));
}

function saveHistory() {
  localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(state.history));
}

function saveGame() {
  localStorage.setItem(STORAGE_KEYS.game, JSON.stringify(state.game));
}

function loadJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function createId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeWordKey(value) {
  return normalizeAnswer(value);
}

function normalizeAnswer(value) {
  return String(value || "").trim().toLowerCase().replace(/\s+/g, " ");
}

function formatDuration(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function formatDateTime(timestamp) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

function shuffle(items) {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
  }
  return items;
}

function toCsvCell(value) {
  const text = String(value || "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
