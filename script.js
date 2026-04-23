const zhBtn = document.getElementById("zhBtn");
const jaBtn = document.getElementById("jaBtn");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const homeScreen = document.getElementById("homeScreen");
const quizScreen = document.getElementById("quizScreen");

const homeTitle = document.getElementById("homeTitle");
const homeDesc = document.getElementById("homeDesc");

const progressText = document.getElementById("progressText");
const questionText = document.getElementById("questionText");
const resultDesc = document.getElementById("resultDesc");
const resultCharacter = document.getElementById("resultCharacter");

const optionButtons = document.querySelectorAll(".optionBtn");
const optionBox = document.querySelector(".options");

let currentLang = "zh";
let currentQuestion = 0;
let finalType = null;

const uiText = {
    zh: {
        homeTitle: "欢迎来到我的测试网页",
        homeDesc: "这是一个简单的 FF14 角色倾向测试网页。",
        startBtn: "开始测试",
        restartBtn: "再来一次",
        resultLabel: "测试结果"
    },
    ja: {
        homeTitle: "FF14キャラクター診断へようこそ",
        homeDesc: "これはシンプルな FF14 キャラクター傾向診断ページです。",
        startBtn: "診断スタート",
        restartBtn: "もう一度",
        resultLabel: "診断結果"
    }
};

const questions = [
    {
        text: {
            zh: "第一题：刚到一个陌生地方时，你更可能？",
            ja: "第1問：見知らぬ場所に着いたとき、あなたはまずどうする？"
        },
        options: [
            {
                text: {
                    zh: "先安静观察，把情况摸清楚",
                    ja: "まず静かに観察して、状況を把握する"
                },
                type: "YSHTOLA"
            },
            {
                text: {
                    zh: "先主动接触人和事，边走边看",
                    ja: "まず人や出来事に関わりながら動いてみる"
                },
                type: "ALISAIE"
            }
        ]
    },
    {
        text: {
            zh: "第二题：队伍遇到麻烦时，你更自然会？",
            ja: "第2問：仲間がトラブルに巻き込まれたとき、あなたはどう動く？"
        },
        options: [
            {
                text: {
                    zh: "先顶上去，把人护住",
                    ja: "まず前に出て、仲間を守る"
                },
                type: "THANCRED"
            },
            {
                text: {
                    zh: "先分析局面，想最稳的办法",
                    ja: "まず状況を分析して、最も安定した方法を考える"
                },
                type: "URIANGER"
            }
        ]
    },
    {
        text: {
            zh: "第三题：别人通常觉得你更像？",
            ja: "第3問：周りの人から見たあなたは、どちらに近い？"
        },
        options: [
            {
                text: {
                    zh: "很会顾全大局，也会替大家着想",
                    ja: "全体を見ながら、皆のことも考えられる人"
                },
                type: "ALPHINAUD"
            },
            {
                text: {
                    zh: "说干就干，不喜欢拖泥带水",
                    ja: "決めたらすぐ動く、無駄を嫌う人"
                },
                type: "ESTINIEN"
            }
        ]
    },
    {
        text: {
            zh: "第四题：你更看重哪种力量？",
            ja: "第4問：あなたがより大切だと思う力は？"
        },
        options: [
            {
                text: {
                    zh: "理解他人、感受他人",
                    ja: "人の気持ちを理解し、感じ取る力"
                },
                type: "KRILE"
            },
            {
                text: {
                    zh: "热情与信念，能把人带动起来",
                    ja: "情熱と信念で、人を前向きに動かす力"
                },
                type: "GRAHA"
            }
        ]
    },
    {
        text: {
            zh: "第五题：当朋友心情不好时，你更可能？",
            ja: "第5問：友達が落ち込んでいるとき、あなたはどうする？"
        },
        options: [
            {
                text: {
                    zh: "先陪在旁边，让对方安心",
                    ja: "そばにいて、安心できるようにする"
                },
                type: "THANCRED"
            },
            {
                text: {
                    zh: "直接关心对方，不绕弯子",
                    ja: "まっすぐ気持ちを伝えて励ます"
                },
                type: "ALISAIE"
            }
        ]
    },
    {
        text: {
            zh: "第六题：面对未知问题时，你通常会？",
            ja: "第6問：未知の問題に直面したとき、あなたはどうする？"
        },
        options: [
            {
                text: {
                    zh: "很想弄明白背后的真相",
                    ja: "その奥にある真実を知りたくなる"
                },
                type: "YSHTOLA"
            },
            {
                text: {
                    zh: "会先从线索里慢慢推演答案",
                    ja: "手がかりを整理しながら答えを導く"
                },
                type: "URIANGER"
            }
        ]
    },
    {
        text: {
            zh: "第七题：你在团队里更容易担当？",
            ja: "第7問：チームの中で、あなたが担いやすい役割は？"
        },
        options: [
            {
                text: {
                    zh: "协调者，把大家往同一方向带",
                    ja: "調整役として、皆を同じ方向へ導く"
                },
                type: "ALPHINAUD"
            },
            {
                text: {
                    zh: "执行者，认准了就直接做",
                    ja: "実行役として、決めたことをすぐやる"
                },
                type: "ESTINIEN"
            }
        ]
    },
    {
        text: {
            zh: "第八题：你最打动人的地方更像？",
            ja: "第8問：あなたの魅力はどちらに近い？"
        },
        options: [
            {
                text: {
                    zh: "能够感受到别人没说出口的东西",
                    ja: "相手が言葉にしない気持ちにも気づける"
                },
                type: "KRILE"
            },
            {
                text: {
                    zh: "很真诚地相信未来会变好",
                    ja: "未来がきっと良くなると素直に信じられる"
                },
                type: "GRAHA"
            }
        ]
    },
    {
        text: {
            zh: "第九题：遇到危险时，你更愿意？",
            ja: "第9問：危険な場面では、あなたはどう動く？"
        },
        options: [
            {
                text: {
                    zh: "自己先上，给别人留余地",
                    ja: "自分が前に出て、仲間に余裕を作る"
                },
                type: "THANCRED"
            },
            {
                text: {
                    zh: "冷静判断，再出最有效的一手",
                    ja: "冷静に見極めて、最も有効な一手を打つ"
                },
                type: "YSHTOLA"
            }
        ]
    },
    {
        text: {
            zh: "第十题：别人和你交流时，最容易感受到？",
            ja: "第10問：人があなたと接するとき、最も感じやすいのは？"
        },
        options: [
            {
                text: {
                    zh: "你很稳，很有分寸",
                    ja: "落ち着いていて、節度がある"
                },
                type: "URIANGER"
            },
            {
                text: {
                    zh: "你有理想，也真的想帮到别人",
                    ja: "理想があり、本気で人を助けたいと思っている"
                },
                type: "ALPHINAUD"
            }
        ]
    },
    {
        text: {
            zh: "第十一题：如果看见不合理的事，你通常会？",
            ja: "第11問：理不尽なことを見たとき、あなたはどうする？"
        },
        options: [
            {
                text: {
                    zh: "当场就想出手，不太忍得住",
                    ja: "その場で動きたくなって、黙っていられない"
                },
                type: "ALISAIE"
            },
            {
                text: {
                    zh: "不说太多，直接把问题解决掉",
                    ja: "多くは語らず、さっさと片づける"
                },
                type: "ESTINIEN"
            }
        ]
    },
    {
        text: {
            zh: "第十二题：你更喜欢哪种陪伴方式？",
            ja: "第12問：あなたが心地よいと思う寄り添い方は？"
        },
        options: [
            {
                text: {
                    zh: "安静但可靠，关键时刻一定在",
                    ja: "静かだけど頼れて、必要な時には必ずいてくれる"
                },
                type: "KRILE"
            },
            {
                text: {
                    zh: "热情而投入，让人觉得不孤单",
                    ja: "明るく熱心で、一緒にいると孤独を感じない"
                },
                type: "GRAHA"
            }
        ]
    },
    {
        text: {
            zh: "第十三题：做重要决定时，你更倾向于？",
            ja: "第13問：大事な決断をするとき、あなたは何を優先する？"
        },
        options: [
            {
                text: {
                    zh: "先看现实条件和可行性",
                    ja: "現実的な条件と実現性を見る"
                },
                type: "YSHTOLA"
            },
            {
                text: {
                    zh: "先看这件事对人的影响",
                    ja: "それが人に与える影響を考える"
                },
                type: "ALPHINAUD"
            }
        ]
    },
    {
        text: {
            zh: "第十四题：你的行动风格更像？",
            ja: "第14問：あなたの行動スタイルはどちらに近い？"
        },
        options: [
            {
                text: {
                    zh: "会隐藏锋芒，但一直在保护别人",
                    ja: "鋭さを表に出さず、それでも人を守っている"
                },
                type: "THANCRED"
            },
            {
                text: {
                    zh: "平时话不多，但一出手就很强硬",
                    ja: "普段は多くを語らないが、動くときは強い"
                },
                type: "ESTINIEN"
            }
        ]
    },
    {
        text: {
            zh: "第十五题：你更容易被哪种事驱动？",
            ja: "第15問：あなたを強く動かすものはどちらに近い？"
        },
        options: [
            {
                text: {
                    zh: "想知道真相、接近答案",
                    ja: "真実に近づき、答えを知りたい気持ち"
                },
                type: "URIANGER"
            },
            {
                text: {
                    zh: "想和重要的人一起走到更远的地方",
                    ja: "大切な人たちと、もっと先へ進みたい気持ち"
                },
                type: "GRAHA"
            }
        ]
    },
    {
        text: {
            zh: "第十六题：你最想成为哪种人？",
            ja: "第16問：あなたがなりたいのはどんな人？"
        },
        options: [
            {
                text: {
                    zh: "能读懂别人，也能坚定支持别人",
                    ja: "人を理解し、しっかり支えられる人"
                },
                type: "KRILE"
            },
            {
                text: {
                    zh: "明知道艰难也会继续向前的人",
                    ja: "困難でも前に進み続ける人"
                },
                type: "ALISAIE"
            }
        ]
    }
];

const scores = {
    THANCRED: 0,
    YSHTOLA: 0,
    URIANGER: 0,
    ALPHINAUD: 0,
    ALISAIE: 0,
    GRAHA: 0,
    KRILE: 0,
    ESTINIEN: 0
};

const resultData = {
    THANCRED: {
        title: {
            zh: "你最像：桑克瑞德",
            ja: "あなたに最も近いのは：サンクレッド"
        },
        desc: {
            zh: "你给人的感觉是可靠、会扛事，而且很懂得在关键时刻保护重要的人。你不一定把情绪都放在脸上，但别人往往会在需要时第一个想到你。",
            ja: "あなたは頼りがいがあり、肝心な場面で大切な人を守れるタイプです。感情をすべて表に出すわけではないけれど、必要なときに真っ先に思い出される存在です。"
        },
        character: {
            zh: "关键词：保护欲、可靠、临场应变强",
            ja: "キーワード：守る力、信頼感、対応力"
        }
    },
    YSHTOLA: {
        title: {
            zh: "你最像：雅·修特拉",
            ja: "あなたに最も近いのは：ヤ・シュトラ"
        },
        desc: {
            zh: "你偏冷静和务实，遇事会先观察、先判断。你对知识、真相和本质问题有天然的兴趣，也很少因为表面的热闹而失去分寸。",
            ja: "あなたは冷静で現実的な判断が得意です。何かが起きても、まず観察し、見極めようとします。知識や真実、本質への関心が強く、雰囲気に流されにくいタイプです。"
        },
        character: {
            zh: "关键词：理性、求知、判断力",
            ja: "キーワード：理性、探究心、判断力"
        }
    },
    URIANGER: {
        title: {
            zh: "你最像：于里昂热",
            ja: "あなたに最も近いのは：ウリエンジェ"
        },
        desc: {
            zh: "你习惯先思考，再表达。你不一定是最外向的那个，但往往看得深、想得远，做事有层次，也很能扛住压力。",
            ja: "あなたはまず深く考えてから言葉を選ぶタイプです。最も外向的ではないかもしれませんが、物事を深く見て、先まで考え、落ち着いて責任を背負える人です。"
        },
        character: {
            zh: "关键词：博学、沉稳、深思熟虑",
            ja: "キーワード：博識、沈着、思慮深さ"
        }
    },
    ALPHINAUD: {
        title: {
            zh: "你最像：阿尔菲诺",
            ja: "あなたに最も近いのは：アルフィノ"
        },
        desc: {
            zh: "你在意理想，也在意他人。你很适合做协调者、组织者，愿意为了更大的目标去沟通、去努力，并且会在经历中不断成长。",
            ja: "あなたは理想を大切にしながら、人のことも真剣に考えられるタイプです。調整役やまとめ役に向いていて、大きな目標のために対話し、努力し、経験を通して成長していけます。"
        },
        character: {
            zh: "关键词：理想、协调、成长型",
            ja: "キーワード：理想、調整力、成長"
        }
    },
    ALISAIE: {
        title: {
            zh: "你最像：阿莉塞",
            ja: "あなたに最も近いのは：アリゼー"
        },
        desc: {
            zh: "你是很典型的行动派。你对重要的人和事会表现得很直接，不太喜欢空谈；一旦认定方向，就会带着很强的韧性往前冲。",
            ja: "あなたはとても行動力のあるタイプです。大切な人や出来事に対してまっすぐで、言葉だけで終わらせたくない人です。進むと決めたら、強い意志で前へ進みます。"
        },
        character: {
            zh: "关键词：直率、行动力、韧性",
            ja: "キーワード：率直さ、行動力、粘り強さ"
        }
    },
    GRAHA: {
        title: {
            zh: "你最像：古·拉哈·提亚",
            ja: "あなたに最も近いのは：グ・ラハ・ティア"
        },
        desc: {
            zh: "你热情、真诚，也很容易因为相信某件事而全力投入。你会给人一种“和你一起前进会更有希望”的感觉。",
            ja: "あなたは情熱的で誠実、そして信じたもののために全力を尽くせる人です。あなたと一緒にいると、前へ進む希望が強くなると感じる人が多いでしょう。"
        },
        character: {
            zh: "关键词：热情、忠诚、希望感",
            ja: "キーワード：情熱、忠誠心、希望"
        }
    },
    KRILE: {
        title: {
            zh: "你最像：库露露",
            ja: "あなたに最も近いのは：クルル"
        },
        desc: {
            zh: "你通常能察觉到别人的情绪和需求，也愿意用自己的方式稳稳支持身边的人。你不张扬，但很容易成为值得信赖的存在。",
            ja: "あなたは人の気持ちや必要としているものに気づきやすく、自分なりのやり方で静かに支えられる人です。目立ちすぎなくても、自然と信頼される存在になれます。"
        },
        character: {
            zh: "关键词：体察、坚定、温柔支持",
            ja: "キーワード：気づき、芯の強さ、やさしい支え"
        }
    },
    ESTINIEN: {
        title: {
            zh: "你最像：埃斯蒂尼安",
            ja: "あなたに最も近いのは：エスティニアン"
        },
        desc: {
            zh: "你不太喜欢拖沓和虚张声势，更习惯用行动解决问题。你给人的感觉很干脆，有锋芒，也有一种强烈的前进感。",
            ja: "あなたは回りくどさや見せかけを好まず、行動で問題を解決したいタイプです。きっぱりしていて鋭さがあり、前へ進む力を強く感じさせます。"
        },
        character: {
            zh: "关键词：果断、强硬、执行力",
            ja: "キーワード：決断力、強さ、実行力"
        }
    }
};

const priorityOrder = [
    "THANCRED",
    "YSHTOLA",
    "URIANGER",
    "ALPHINAUD",
    "ALISAIE",
    "GRAHA",
    "KRILE",
    "ESTINIEN"
];

zhBtn.addEventListener("click", function () {
    switchLanguage("zh");
});

jaBtn.addEventListener("click", function () {
    switchLanguage("ja");
});

startBtn.addEventListener("click", function () {
    startQuiz();
});

restartBtn.addEventListener("click", function () {
    quizScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");
    restartBtn.classList.add("hidden");
    finalType = null;
    applyLanguage();
});

optionButtons[0].addEventListener("click", function () {
    chooseAnswer(0);
});

optionButtons[1].addEventListener("click", function () {
    chooseAnswer(1);
});

function switchLanguage(lang) {
    currentLang = lang;
    applyLanguage();
}

function applyLanguage() {
    zhBtn.classList.toggle("active", currentLang === "zh");
    jaBtn.classList.toggle("active", currentLang === "ja");

    homeTitle.textContent = uiText[currentLang].homeTitle;
    homeDesc.textContent = uiText[currentLang].homeDesc;
    startBtn.textContent = uiText[currentLang].startBtn;
    restartBtn.textContent = uiText[currentLang].restartBtn;

    if (!quizScreen.classList.contains("hidden")) {
        if (optionBox.classList.contains("hidden") && finalType) {
            renderResult();
        } else {
            showQuestion();
        }
    }
}

function startQuiz() {
    homeScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    currentQuestion = 0;
    finalType = null;

    scores.THANCRED = 0;
    scores.YSHTOLA = 0;
    scores.URIANGER = 0;
    scores.ALPHINAUD = 0;
    scores.ALISAIE = 0;
    scores.GRAHA = 0;
    scores.KRILE = 0;
    scores.ESTINIEN = 0;

    optionBox.classList.remove("hidden");
    restartBtn.classList.add("hidden");

    resultDesc.classList.add("hidden");
    resultCharacter.classList.add("hidden");

    resultDesc.textContent = "";
    resultCharacter.textContent = "";

    showQuestion();
}

function showQuestion() {
    progressText.textContent = `${currentQuestion + 1} / ${questions.length}`;
    questionText.textContent = questions[currentQuestion].text[currentLang];
    optionButtons[0].textContent = questions[currentQuestion].options[0].text[currentLang];
    optionButtons[1].textContent = questions[currentQuestion].options[1].text[currentLang];
}

function chooseAnswer(index) {
    const selectedOption = questions[currentQuestion].options[index];
    scores[selectedOption.type]++;
    nextQuestion();
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        calculateResult();
        renderResult();
    }
}

function calculateResult() {
    finalType = priorityOrder[0];
    let maxScore = scores[finalType];

    for (let i = 1; i < priorityOrder.length; i++) {
        const type = priorityOrder[i];
        if (scores[type] > maxScore) {
            maxScore = scores[type];
            finalType = type;
        }
    }
}

function renderResult() {
    optionBox.classList.add("hidden");
    restartBtn.classList.remove("hidden");
    progressText.textContent = uiText[currentLang].resultLabel;

    questionText.textContent = resultData[finalType].title[currentLang];
    resultDesc.textContent = resultData[finalType].desc[currentLang];
    resultCharacter.textContent = resultData[finalType].character[currentLang];

    resultDesc.classList.remove("hidden");
    resultCharacter.classList.remove("hidden");
}

applyLanguage();