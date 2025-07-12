document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            contents.forEach(content => {
                content.style.display = 'none';
            });
            document.getElementById(tab.dataset.tab).style.display = 'block';
        });
    });

    const classificationGame = {
        cardsData: [
            { text: "친구의 키", type: "정량" },
            { text: "좋아하는 색깔", type: "정성" },
            { text: "어제 먹은 점심 메뉴", type: "정성" },
            { text: "한 달 용돈", type: "정량" },
            { text: "하루 평균 수면 시간", type: "정량" },
            { text: "가장 감명 깊게 본 영화 제목", type: "정성" },
            { text: "체육 시간 100m 달리기 기록", type: "정량" },
            { text: "장래 희망", type: "정성" }
        ],
        sourceContainer: document.getElementById('source-cards'),
        qualitativeZone: document.getElementById('qualitative-cards'),
        quantitativeZone: document.getElementById('quantitative-cards'),
        feedbackEl: document.getElementById('classification-game-feedback'),
        resetBtn: document.getElementById('reset-game-btn'),

        init() {
            this.renderCards();
            this.resetBtn.addEventListener('click', () => this.init());
        },

        renderCards() {
            this.sourceContainer.innerHTML = '';
            this.qualitativeZone.innerHTML = '';
            this.quantitativeZone.innerHTML = '';
            this.feedbackEl.textContent = '';
            this.feedbackEl.style.color = '';
            this.cardsData
                .sort(() => 0.5 - Math.random())
                .forEach(cardData => {
                    const cardEl = this.createCard(cardData);
                    this.sourceContainer.appendChild(cardEl);
                });
        },

        createCard(cardData) {
            const cardEl = document.createElement('div');
            cardEl.className = 'card bg-white p-3 rounded-lg shadow cursor-pointer border border-gray-200';
            cardEl.textContent = cardData.text;
            cardEl.dataset.type = cardData.type;
            cardEl.addEventListener('click', () => this.classifyCard(cardEl));
            return cardEl;
        },

        classifyCard(cardEl) {
            const userChoice = prompt(`'${cardEl.textContent}'은(는) 어떤 데이터일까요?\n1. 정성 데이터\n2. 정량 데이터\n(숫자 1 또는 2를 입력하세요)`);
            if (userChoice === '1') {
                this.checkAnswer(cardEl, '정성');
                this.qualitativeZone.appendChild(cardEl);
            } else if (userChoice === '2') {
                this.checkAnswer(cardEl, '정량');
                this.quantitativeZone.appendChild(cardEl);
            } else {
                alert("1 또는 2를 입력해주세요.");
                return;
            }
            cardEl.style.pointerEvents = 'none';
            if (this.sourceContainer.children.length === 0 && this.qualitativeZone.children.length + this.quantitativeZone.children.length === this.cardsData.length) {
                 this.feedbackEl.textContent = "분류 완료! 모든 카드를 맞췄어요. 대단해요! 🎉";
                 this.feedbackEl.style.color = 'green';
            }
        },
        
        checkAnswer(cardEl, chosenType) {
            const correctType = cardEl.dataset.type;
            if (correctType === chosenType) {
                this.feedbackEl.textContent = "정답이에요! 🎉";
                this.feedbackEl.style.color = 'green';
                cardEl.style.backgroundColor = '#dcfce7';
            } else {
                this.feedbackEl.textContent = "아쉬워요, 다시 생각해볼까요? 🤔";
                cardEl.style.backgroundColor = '#fee2e2';
            }
        }
    };
    classificationGame.init();

    const dataCleaningChallenge = {
        tableBody: document.querySelector('#data-cleaning-table tbody'),
        checkBtn: document.getElementById('check-data-btn'),
        feedbackEl: document.getElementById('cleaning-feedback'),
        initialData: [
            { name: '김정보', age: 18, gender: '남자', participated: 'Y' },
            { name: '이분석', age: 17, gender: '여', participated: '' },
            { name: '박시각', age: 18, gender: '남', participated: 'Y' },
            { name: '최데이터', age: 17, gender: '여자', participated: 'N' },
            { name: '정클린', age: 18, gender: 'M', participated: '' }
        ],

        init() {
            this.renderTable();
            this.checkBtn.addEventListener('click', () => this.checkData());
        },

        renderTable() {
            this.tableBody.innerHTML = '';
            this.feedbackEl.textContent = '';
            this.feedbackEl.style.color = '';
            this.initialData.forEach((row, rowIndex) => {
                const tr = document.createElement('tr');
                tr.className = rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50';
                Object.entries(row).forEach(([key, value]) => {
                    const td = document.createElement('td');
                    td.className = 'data-cell border p-2';
                    td.textContent = value;
                    td.dataset.row = rowIndex;
                    td.dataset.key = key;
                    if (key === 'gender' || key === 'participated') {
                        td.addEventListener('click', () => this.editCell(td));
                    }
                    tr.appendChild(td);
                });
                this.tableBody.appendChild(tr);
            });
        },

        editCell(cell) {
            const currentValue = cell.textContent;
            const newValue = prompt(`새로운 값을 입력하세요:`, currentValue);
            if (newValue !== null) {
                cell.textContent = newValue;
                cell.classList.remove('highlight-error');
            }
        },

        checkData() {
            let isCorrect = true;
            const rows = this.tableBody.querySelectorAll('tr');
            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                const genderCell = cells[2];
                const participatedCell = cells[3];

                const gender = genderCell.textContent.trim();
                const participated = participatedCell.textContent.trim();

                genderCell.classList.remove('highlight-error');
                participatedCell.classList.remove('highlight-error');

                if (gender !== '남' && gender !== '여') {
                    isCorrect = false;
                    genderCell.classList.add('highlight-error');
                }
                if (participated !== 'Y' && participated !== 'N') {
                    isCorrect = false;
                    participatedCell.classList.add('highlight-error');
                }
            });

            if (isCorrect) {
                this.feedbackEl.textContent = "완벽해요! 데이터가 깨끗해졌습니다. ✨";
                this.feedbackEl.style.color = 'green';
            } else {
                this.feedbackEl.textContent = "아직 수정할 부분이 남았어요. 규칙을 다시 확인해주세요! (빨간색 셀을 확인하세요)";
                this.feedbackEl.style.color = 'red';
            }
        }
    };
    dataCleaningChallenge.init();

    const vizualization = {
        ctx: document.getElementById('myChart').getContext('2d'),
        chart: null,
        feedbackEl: document.getElementById('chart-feedback'),
        data: {
            labels: ['운동 (축구, 농구 등)', '악기 연주', '코딩/프로그래밍', '미술 및 공예 활동', '독서 토론'],
            values: [28, 15, 22, 18, 9]
        },
        chartColors: ['#FF6B6B', '#FFD166', '#06D6A0', '#118AB2', '#073B4C'],
        
        init() {
            document.querySelectorAll('.viz-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    document.querySelectorAll('.viz-btn').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    this.createChart(e.target.dataset.chart);
                });
            });
            this.createChart('bar'); // Default chart on load
            document.querySelector('.viz-btn[data-chart="bar"]').classList.add('active');
        },

        wrapLabels(labels, maxWidth) {
            return labels.map(label => {
                if (Array.isArray(label)) return label; 
                if (label.length <= maxWidth) return label;
                
                const words = label.split(' ');
                const lines = [];
                let currentLine = '';
                
                words.forEach(word => {
                    if ((currentLine + word).length > maxWidth && currentLine.length > 0) {
                        lines.push(currentLine.trim());
                        currentLine = word + ' ';
                    } else {
                        currentLine += word + ' ';
                    }
                });
                lines.push(currentLine.trim());
                return lines;
            });
        },

        createChart(type) {
            if (this.chart) {
                this.chart.destroy();
            }
            let config;
            let feedbackText = '';
            
            const baseConfig = {
                data: {
                    labels: this.wrapLabels(this.data.labels, 16),
                    datasets: [{
                        label: '학생 수',
                        data: this.data.values,
                        backgroundColor: this.chartColors,
                        borderColor: '#FFFFFF',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: { display: true, text: '우리 반 학생들이 좋아하는 운동' },
                        tooltip: {
                            callbacks: {
                                title: function(tooltipItems) {
                                    const item = tooltipItems[0];
                                    let label = item.chart.data.labels[item.dataIndex];
                                    return Array.isArray(label) ? label.join(' ') : label;
                                }
                            }
                        }
                    }
                }
            };

            switch (type) {
                case 'bar':
                    config = { ...baseConfig, type: 'bar' };
                    config.options.scales = { y: { beginAtZero: true } };
                    feedbackText = "막대그래프는 각 항목의 크기를 비교할 때 아주 좋아요. 어떤 운동이 가장 인기 있는지 한눈에 보이죠?";
                    break;
                case 'pie':
                    config = { ...baseConfig, type: 'pie' };
                    config.options.plugins.legend = { display: true, position: 'right' };
                    feedbackText = "원그래프는 전체에서 각 항목이 차지하는 비율을 보여줄 때 유용해요. 전체 학생 중 축구를 좋아하는 비율이 얼마인지 쉽게 알 수 있어요.";
                    break;
                case 'line':
                    config = { ...baseConfig, type: 'line' };
                    config.options.scales = { y: { beginAtZero: true } };
                    config.data.datasets[0].borderColor = '#118AB2';
                    config.data.datasets[0].backgroundColor = 'rgba(17, 138, 178, 0.2)';
                    config.data.datasets[0].pointBackgroundColor = '#118AB2';
                    config.data.datasets[0].pointRadius = 5;
                    feedbackText = "꺾은선그래프는 보통 시간의 흐름에 따른 데이터 변화를 보여줄 때 사용해요. 항목을 비교하는 데는 조금 어색할 수 있지만, 데이터의 높낮이는 볼 수 있네요!";
                    break;
            }
            this.chart = new Chart(this.ctx, config);
            this.feedbackEl.textContent = feedbackText;
        }
    };
    vizualization.init();
});