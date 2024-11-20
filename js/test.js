const questions = [
    {
        id: 1,
        question: "Koji HTML element omogućava integraciju zvuka na web stranici?",
        answers: [
            {
                id: 0,
                at: "a",
                text: "<video>",
                correct: false,
            },
            { id: 1, at: "b", text: "<audio>", correct: true },
            { id: 2, at: "c", text: "<canvas>", correct: false },
            { id: 3, at: "d", text: "<media>", correct: false },
        ],
    },
    {
        id: 2,
        question: "Koji atribut omogućava automatsko pokretanje audio sadržaja kada se stranica učita?",
        answers: [
            {
                id: 4,
                at: "a",
                text: "loop",
                correct: false,
            },
            { id: 5, at: "b", text: "autoplay", correct: true },
            {
                id: 6,
                at: "c",
                text: "src",
                correct: false,
            },
            {
                id: 7,
                at: "d",
                text: "controls",
                correct: false,
            },
        ],
    },
    {
        id: 3,
        question:
            "Koja metoda u JavaScript-u pokreće reprodukciju zvuka?",
        answers: [
            { id: 8, at: "a", text: "start()", correct: false },
            { id: 9, at: "b", text: "begin()", correct: false },
            { id: 10, at: "c", text: "run()", correct: false },
            { id: 11, at: "d", text: "play()", correct: true },
        ],
    },
    {
        id: 4,
        question: "Koji atribut <video> elementa omogućava prikaz osnovnih kontrola za reprodukciju?",
        answers: [
            {
                id: 12,
                at: "a",
                text: "controls",
                correct: true,
            },
            { id: 13, at: "b", text: "autoplay", correct: false },
            {
                id: 14,
                at: "c",
                text: "volume",
                correct: false,
            },
            {
                id: 15,
                at: "d",
                text: "loop",
                correct: false,
            },
        ],
    },
    {
        id: 5,
        question: "Šta omogućava Canvas API u JavaScript-u?",
        answers: [
            {
                id: 16,
                at: "a",
                text: "Kreiranje 3D grafike",
                correct: false,
            },
            { id: 17, at: "b", text: "Manipulaciju zvukom", correct: false },
            {
                id: 18,
                at: "c",
                text: "Crtanje 2D grafike",
                correct: true,
            },
            {
                id: 19,
                at: "d",
                text: "Validaciju formi",
                correct: false,
            },
        ],
    },
    {
        id: 6,
        question:
            "Koja biblioteka omogućava rad sa zvukom u JavaScript-u?",
        answers: [
            { id: 20, at: "a", text: "React.js", correct: false },
            { id: 21, at: "b", text: "Howler.js", correct: true },
            { id: 22, at: "c", text: "Angular.js", correct: false },
            { id: 23, at: "d", text: "Video.js", correct: false },
        ],
    },
    {
        id: 7,
        question: "Šta omogućava atribut poster u <video> elementu?",
        answers: [
            { id: 24, at: "a", text: "Prikaz slike pre reprodukcije videa", correct: true },
            { id: 25, at: "b", text: "Kontrolu glasnoće", correct: false },
            {
                id: 26,
                at: "c",
                text: "Prigušivanje zvuka",
                correct: false,
            },
            { id: 27, at: "d", text: "Automatsko ponavljanje videa", correct: false },
        ],
    },
    {
        id: 8,
        question: "Koji od sledećih atributa omogućava kontinuirano ponavljanje zvuka ili videa?",
        answers: [
            {
                id: 28,
                at: "a",
                text: "autoplay",
                correct: false,
            },
            {
                id: 29,
                at: "b",
                text: "repeat",
                correct: false,
            },
            {
                id: 30,
                at: "c",
                text: "duration",
                correct: false,
            },
            { id: 31, at: "d", text: "loop", correct: true },
        ],
    },
    {
        id: 9,
        question:
            "Koji JavaScript metod se koristi za pauziranje video sadržaja?",
        answers: [
            { id: 33, at: "a", text: "pause()", correct: true },
            { id: 34, at: "b", text: "stop()", correct: false },
            {
                id: 35,
                at: "c",
                text: "halt()",
                correct: false,
            },
            { id: 36, at: "d", text: "break()", correct: false },
        ],
    }
    ,
    {
        id: 10,
        question:
            "Koja biblioteka omogućava kreiranje 3D grafike u web pregledaču?",
        answers: [
            { id: 37, at: "a", text: "Canvas.js", correct: false },
            { id: 38, at: "b", text: "Howler.js", correct: false },
            {
                id: 39,
                at: "c",
                text: "Three.js",
                correct: true,
            },
            { id: 40, at: "d", text: "Video.js", correct: false },
        ],
    },
];

class State {
    currentIndex = 0;
    answers = {};
    result = 0;

    increaseCurrentIndex() {
        if (this.currentIndex === questions.length - 1) return;
        ++this.currentIndex;
    }

    decreaseCurrentIndex() {
        if (this.currentIndex === 0) return;
        --this.currentIndex;
    }

    setAnswer(questionId, answer) {
        this.answers[questionId] = answer;
    }

    getAnswer(questionId) {
        return this.answers[questionId];
    }

    isAnswerCorrect(questionId, answerId) {
        const question = questions.find((q) => q.id === questionId);
        return question.answers.find((a) => a.id === answerId).correct;
    }

    getAnswers() {
        return this.answers;
    }

    getResult() {
        const correctAnswers = Object.values(this.answers).map((value) => {
            return Number(value.correct);
        });

        const result = correctAnswers.reduce((a, b) => a + b, 0);

        this.result = (result / 10) * 100;
        return this.result;
    }

    resetState() {
        this.currentIndex = 0;
        this.answers = {};
        this.result = 0;
        window.location.reload();
    }
}

const state = new State();

function renderAllButtons() {
    const card = document.querySelector(".card");
    const btnsWrapper = document.createElement("div");
    const testControlls = document.createElement("div");
    const exitBtn = document.createElement("button");
    const nextBtn = document.createElement("button");
    const prevBtn = document.createElement("button");

    const buttonStyle = (btnType = "primary") =>
        btnType === "primary" ? ["btn", "btn-primary"] : ["btn", `btn-${btnType}`];
    const btnsWrapperStyle = [
        "btns-wrapper",
        "d-flex",
        "justify-content-between",
        "p-3",
    ];

    const testControllsStyle = ["d-flex", "gap-2"];

    nextBtn.classList.add(...buttonStyle("primary"));
    nextBtn.dataset.dir = "next";
    nextBtn.textContent = "Dalje";

    prevBtn.classList.add(...buttonStyle("primary"));
    prevBtn.dataset.dir = "prev";
    prevBtn.textContent = "Nazad";

    if (state.currentIndex === 0) {
        prevBtn.classList.add("disabled");
    }

    exitBtn.classList.add(...buttonStyle("danger"));
    exitBtn.dataset.dir = "exit";
    exitBtn.textContent = "Izađi";
    exitBtn.dataset.bsToggle = "modal";
    exitBtn.dataset.bsTarget = "#confirmationExitModal";

    btnsWrapper.classList.add(...btnsWrapperStyle);

    testControlls.classList.add(...testControllsStyle);
    testControlls.appendChild(prevBtn);
    testControlls.appendChild(nextBtn);

    btnsWrapper.appendChild(testControlls);
    btnsWrapper.appendChild(exitBtn);

    card.insertAdjacentElement("beforeend", btnsWrapper);
}

function deleteCurrentAnswers() {
    const options = document.querySelector("ul.options");
    while (options.firstChild) {
        options.removeChild(options.firstChild);
    }
}

function renderQuestionAndAnswers(currentIndex) {
    const cardTitle = document.querySelector("h5.card-title");
    const options = document.querySelector("ul.options");

    cardTitle.style.minHeight = 80;
    cardTitle.style.margin = 0;
    cardTitle.textContent = `${currentIndex + 1}. ${questions[currentIndex].question}`;

    questions[currentIndex].answers.forEach((answer) => {
        const optionItem = document.createElement("li");
        const optionRadioInput = document.createElement("input");
        const optionRadioLabel = document.createElement("label");
        const itemIndex = questions[currentIndex].id;

        optionItem.classList.add("option-item");
        optionItem.classList.add("form-check");
        optionItem.dataset.question = itemIndex;
        optionRadioInput.type = "radio";
        optionRadioInput.name = "answer";
        optionRadioInput.classList.add("form-check-input");
        optionRadioInput.id = `radio-${answer.id}`;
        optionRadioLabel.classList.add("form-check-label");
        optionRadioLabel.setAttribute("for", `radio-${answer.id}`);
        optionRadioLabel.textContent = `${answer.at}) ${answer.text}`;
        optionItem.appendChild(optionRadioInput);
        optionItem.appendChild(optionRadioLabel);
        options.appendChild(optionItem);
    });

    handleTestAnswers();
}

function handleTestControlls(dir, state) {
    if (dir === "next") {
        state.increaseCurrentIndex();
        return;
    }

    state.decreaseCurrentIndex();
}

function renderDivider() {
    const card = document.querySelector(".card");
    const hr = document.createElement("hr");
    hr.classList.add("m-0");
    card.insertAdjacentElement("beforeend", hr);
}

function setModalDefaultConfigs() {
    const modal = document.querySelector("#resultModal");
    modal.classList.add("pe-none");
}

function createFinishBtnElement() {
    const finishBtn = document.createElement("button");
    finishBtn.dataset.dir = "finish";
    finishBtn.dataset.bsToggle = "modal";
    finishBtn.dataset.bsTarget = "#resultModal";
    finishBtn.classList.add("btn", "btn-success", "d-none");
    finishBtn.textContent = "Potvrdi";

    return finishBtn;
}

function initApp(state) {
    renderQuestionAndAnswers(state.currentIndex);
    renderDivider();
    renderAllButtons();
    setModalDefaultConfigs();
}

function handlePrevButtonOnClick({
    state,
    finishBtn,
    exitBtn,
    prevBtn,
    nextBtn,
}) {
    nextBtn.classList.remove("disabled");

    handleTestControlls("prev", state);
    deleteCurrentAnswers();
    renderQuestionAndAnswers(state.currentIndex);
    findAndCheckAnswer();

    if (state.currentIndex === 0) {
        prevBtn.classList.add("disabled");
        return;
    }

    finishBtn.classList.add("d-none");
    exitBtn.classList.remove("d-none");
}

function handleNextButtonOnClick({
    state,
    finishBtn,
    exitBtn,
    prevBtn,
    nextBtn,
}) {
    prevBtn.classList.remove("disabled");

    handleTestControlls("next", state);
    deleteCurrentAnswers();
    renderQuestionAndAnswers(state.currentIndex);
    findAndCheckAnswer();

    if (state.currentIndex === questions.length - 1) {
        nextBtn.classList.add("disabled");
        exitBtn.classList.add("d-none");
        finishBtn.classList.remove("d-none");

        if (Object.keys(state.getAnswers()).length === 0) {
            finishBtn.classList.add("disabled");
            return;
        }
    }
}

function handleFinishButtonOnClick({ state }) {
    const resultModal = document.querySelector("#resultModal");
    const resultModalActions = resultModal.querySelectorAll("button");
    const resultModalParagraph = document.createElement("p");
    const resultModalLoader = new Image();
    const resultModalImage = new Image();
    const base = window.location.pathname.split("/test.html")[0];

    const imageClasses = ["img-fluid", "d-block", "mx-auto"];

    resultModalParagraph.classList.add("fst-italic", "fs-3", "text-center");
    resultModalParagraph.textContent = `Procenat uspešnosti: ${state.getResult()}%`;

    resultModalLoader.src = `${base}/assets/img/spinner.gif`;
    resultModalLoader.classList.add(...imageClasses);
    resultModalLoader.style.minHeight = "200px";

    resultModalImage.src =
        state.getResult() >= 50
            ? `${base}/assets/img/congrats.gif`
            : `${base}/assets/img/babyknowle-memes.gif`;
    resultModalImage.classList.add(...imageClasses);
    resultModalImage.style.minHeight = "200px";

    resultModal.querySelector(".modal-body").appendChild(resultModalLoader);

    resultModalActions.forEach((button) => {
        button.classList.add("disabled");
    });

    setTimeout(() => {
        resultModalLoader.parentNode.removeChild(resultModalLoader);
        resultModal.querySelector(".modal-body").appendChild(resultModalParagraph);
        resultModal.querySelector(".modal-body").appendChild(resultModalImage);
        resultModalActions.forEach((button) => {
            button.classList.remove("disabled");
        });
    }, 2500);

    resultModalActions.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.dataset.dir === "exitTest") {
                window.location = "index.html";
                return;
            }

            window.location.reload();
        });
    });
}

function handleExitFromTestButtonOnClick() {
    window.location = "index.html";
}

function updateTestView(state) {
    const nextBtn = document.querySelector("button[data-dir='next']");
    const prevBtn = document.querySelector("button[data-dir='prev']");
    const exitBtn = document.querySelector("button[data-dir='exit']");
    const finishBtn = createFinishBtnElement();
    const btnsWrapper = document.querySelector(".btns-wrapper");
    const exitFromTestBtn = document.querySelector(
        "button[data-dir='exitFromTest']"
    );

    btnsWrapper.appendChild(finishBtn);

    prevBtn.addEventListener("click", () => {
        handlePrevButtonOnClick({ state, finishBtn, exitBtn, prevBtn, nextBtn });
    });

    nextBtn.addEventListener("click", () => {
        handleNextButtonOnClick({ state, finishBtn, exitBtn, prevBtn, nextBtn });
    });

    finishBtn.addEventListener("click", () => {
        handleFinishButtonOnClick({ state });
    });

    exitFromTestBtn.addEventListener("click", () => {
        handleExitFromTestButtonOnClick();
    });

    handleTestAnswers();
}

function handleTestAnswers() {
    const options = document.querySelector("ul.options");
    const finishBtn = document.querySelector("button[data-dir='finish']");

    let questionId;
    let answerId;

    options.querySelectorAll("input").forEach((input) => {
        input.addEventListener("change", () => {
            questionId = +input.parentNode.dataset.question;
            answerId = +input.id.split("-")[1];

            const answer = {
                answerId,
                correct: state.isAnswerCorrect(questionId, answerId),
            };
            state.setAnswer(questionId, answer);

            if (Object.keys(state.getAnswers()).length) {
                finishBtn?.classList.remove("disabled");
            }
        });
    });
}

function findAndCheckAnswer() {
    const optionItem = document.querySelectorAll(
        `.option-item[data-question='${state.currentIndex + 1}']`
    );

    optionItem.forEach((item) => {
        item.querySelectorAll("input[type=radio]").forEach((input) => {
            const answer = state.getAnswer(state.currentIndex + 1);
            const radioId = +input.id.split("-")[1];

            if (answer?.answerId === radioId) {
                input.checked = true;
            }
        });
    });
}

function app() {
    initApp(state);
    updateTestView(state);
}

document.addEventListener("DOMContentLoaded", () => {
    app();
});
