const STORAGE_KEYS = {
  words: "dictation.words.v1",
  history: "dictation.history.v1",
  settings: "dictation.settings.v1",
};

const DEFAULT_SETTINGS = {
  voiceLang: "en-US",
  speechRate: "1",
  autoSpeak: true,
  shuffleWords: false,
};

const state = {
  words: loadJson(STORAGE_KEYS.words, []),
  history: loadJson(STORAGE_KEYS.history, []),
  settings: { ...DEFAULT_SETTINGS, ...loadJson(STORAGE_KEYS.settings, {}) },
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
    settings: document.querySelector("#settingsView"),
  },
  importText: document.querySelector("#importText"),
  fileInput: document.querySelector("#fileInput"),
  fileName: document.querySelector("#fileName"),
  importButton: document.querySelector("#importButton"),
  startButton: document.querySelector("#startButton"),
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
  retryAllButton: document.querySelector("#retryAllButton"),
  retryWrongButton: document.querySelector("#retryWrongButton"),
  exportWrongButton: document.querySelector("#exportWrongButton"),
  backHomeButton: document.querySelector("#backHomeButton"),
  resultWrongList: document.querySelector("#resultWrongList"),
  voiceLang: document.querySelector("#voiceLang"),
  speechRate: document.querySelector("#speechRate"),
  autoSpeak: document.querySelector("#autoSpeak"),
  shuffleWords: document.querySelector("#shuffleWords"),
};

init();

function init() {
  bindEvents();
  loadVoices();
  renderHome();
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

  const titles = {
    home: "英语单词听写工具",
    practice: "听写练习",
    result: "听写结果",
    settings: "设置",
  };
  els.pageTitle.textContent = titles[viewName] || titles.home;

  if (viewName === "home") {
    renderHome();
  }
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
  els.importText.value = "";
  state.fileText = "";
  els.fileInput.value = "";
  els.fileName.textContent = "未选择文件";
  els.importMessage.textContent = `导入完成：新增 ${added} 个，跳过重复 ${duplicated} 个。`;
  renderHome();
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
  renderWordList();
  renderHistory();
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
    showCorrectFeedback();
    setTimeout(goNextWord, 450);
    return;
  }

  practice.streak = 0;
  recordWrong(current, answer || "未填写");
  showWrongFeedback(current, answer || "未填写");
}

function handleSkip() {
  const practice = state.practice;
  if (!practice || practice.waitingForNext) return;

  const current = practice.words[practice.index];
  practice.streak = 0;
  recordWrong(current, "已跳过");
  showWrongFeedback(current, "已跳过");
}

function showCorrectFeedback() {
  const practice = state.practice;
  practice.waitingForNext = true;
  els.feedbackBox.className = "feedback correct";
  els.feedbackBox.innerHTML = `<strong>✅ 答对啦！</strong><p>连对 ${practice.streak} 个，继续保持。</p>`;
  els.answerInput.disabled = true;
  els.skipButton.disabled = true;
}

function showWrongFeedback(wordItem, answer) {
  const practice = state.practice;
  practice.waitingForNext = true;
  els.feedbackBox.className = "feedback wrong";
  els.feedbackBox.innerHTML = `
    <strong>💡 差一点，再听一次</strong>
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
    wrongItems: practice.wrongItems,
  };

  state.lastResult = result;
  state.history.unshift(result);
  state.history = state.history.slice(0, 50);
  saveHistory();
  state.practice = null;
  renderResult();
  showView("result");
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
    return `太棒了，本轮 ${result.total} 个词全部答对，最高连对 ${result.bestStreak || result.correct} 个。`;
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
}

function saveSettingsFromForm() {
  state.settings = {
    voiceLang: els.voiceLang.value,
    speechRate: els.speechRate.value,
    autoSpeak: els.autoSpeak.checked,
    shuffleWords: els.shuffleWords.checked,
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
