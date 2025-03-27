import { SoundManager, StorageManager, Utilities } from './utilities.js';
import { gameCases, gameCities, getCaseById, getRandomClue, getCityInfo } from './cases.js';

class DetectiveNoirGame {
    constructor() {
        // Verificar se os elementos DOM existem
        if (!document.getElementById('game-container')) {
            console.error('Elementos do DOM não encontrados!');
            return;
        }

        try {
            this.soundManager = new SoundManager();
            this.storageManager = new StorageManager();
        } catch (error) {
            console.error('Falha ao inicializar módulos:', error);
            return;
        }

        // Elementos do DOM
        this.domElements = {
            loadingScreen: document.getElementById('loading-screen'),
            mainMenu: document.getElementById('main-menu'),
            gameContainer: document.getElementById('game-container'),
            caseTitle: document.getElementById('case-title'),
            caseSubtitle: document.getElementById('case-subtitle'),
            dayDisplay: document.getElementById('day'),
            hoursDisplay: document.getElementById('hours'),
            cluesDisplay: document.getElementById('clues'),
            totalCluesDisplay: document.getElementById('total-clues'),
            caseDetails: document.getElementById('case-details'),
            suspectsContainer: document.getElementById('suspects-container'),
            clueLog: document.getElementById('clue-log'),
            worldMap: document.getElementById('world-map'),
            difficultyMeter: document.querySelectorAll('.difficulty-meter .level'),
            
            // Botões
            newGameBtn: document.getElementById('new-game'),
            continueBtn: document.getElementById('continue-game'),
            tutorialBtn: document.getElementById('tutorial'),
            creditsBtn: document.getElementById('credits'),
            travelBtn: document.getElementById('travel-btn'),
            interrogateBtn: document.getElementById('interrogate-btn'),
            analyzeBtn: document.getElementById('analyze-btn'),
            accuseBtn: document.getElementById('accuse-btn'),
            pauseBtn: document.getElementById('pause-btn'),
            playBtn: document.getElementById('play-btn'),
            fastForwardBtn: document.getElementById('fast-forward-btn'),
            
            // Modais
            travelModal: document.getElementById('travel-modal'),
            interrogateModal: document.getElementById('interrogate-modal'),
            accuseModal: document.getElementById('accuse-modal'),
            caseCompleteModal: document.getElementById('case-complete-modal'),
            tutorialModal: document.getElementById('tutorial-modal'),
            
            // Elementos de modal
            cityGrid: document.querySelector('.city-grid'),
            confirmTravel: document.getElementById('confirm-travel'),
            travelTime: document.getElementById('travel-time'),
            suspectInterview: document.getElementById('suspect-interview'),
            accuseSuspects: document.getElementById('accuse-suspects'),
            confirmAccuse: document.getElementById('confirm-accuse'),
            resultTitle: document.getElementById('result-title'),
            resultContent: document.getElementById('result-content'),
            nextCaseBtn: document.getElementById('next-case'),
            returnHqBtn: document.getElementById('return-hq'),
            
            // Tutorial
            tutorialSteps: document.querySelectorAll('.tutorial-step'),
            prevTutorialBtn: document.getElementById('prev-tutorial'),
            nextTutorialBtn: document.getElementById('next-tutorial'),
            finishTutorialBtn: document.getElementById('finish-tutorial')
        };

        // Estado do jogo
        this.gameState = {
            currentCase: null,
            currentCaseId: 1,
            currentCity: null,
            selectedSuspect: null,
            collectedClues: [],
            usedHours: 0,
            gameTime: 0,
            gameTimer: null,
            gameSpeed: 1, // 1x, 2x, 0 (pausado)
            caseSolved: false,
            currentTutorialStep: 0
        };

        // Inicialização
        this.init();
    }

    init() {
        // Simular carregamento
        this.simulateLoading();
        
        // Configurar event listeners
        this.setupEventListeners();
        
        // Verificar se há jogo salvo
        if (this.storageManager.hasSave()) {
            this.domElements.continueBtn.disabled = false;
        }
    }

    simulateLoading() {
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Utilities.randomInt(5, 15);
            if (progress >= 100) {
                progress = 100;
                clearInterval(progressInterval);
                
                // Animação de conclusão do carregamento
                setTimeout(() => {
                    this.domElements.loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        this.domElements.loadingScreen.classList.add('hidden');
                        this.soundManager.play('mainTheme');
                    }, 500);
                }, 500);
            }
            
            document.querySelector('.progress').style.width = `${progress}%`;
        }, 200);
    }

    setupEventListeners() {
        // Menu principal
        this.domElements.newGameBtn.addEventListener('click', () => this.startNewGame());
        this.domElements.continueBtn.addEventListener('click', () => this.loadGame());
        this.domElements.tutorialBtn.addEventListener('click', () => this.showTutorial());
        this.domElements.creditsBtn.addEventListener('click', () => this.showCredits());
        
        // Botões de ação
        this.domElements.travelBtn.addEventListener('click', () => this.showTravelModal());
        this.domElements.interrogateBtn.addEventListener('click', () => this.showInterrogateModal());
        this.domElements.analyzeBtn.addEventListener('click', () => this.analyzeClues());
        this.domElements.accuseBtn.addEventListener('click', () => this.showAccuseModal());
        
        // Controles de tempo
        this.domElements.pauseBtn.addEventListener('click', () => this.pauseGame());
        this.domElements.playBtn.addEventListener('click', () => this.playGame());
        this.domElements.fastForwardBtn.addEventListener('click', () => this.fastForwardGame());
        
        // Eventos de modal
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => this.closeAllModals());
        });
        
        this.domElements.confirmTravel.addEventListener('click', () => this.travelToCity());
        this.domElements.confirmAccuse.addEventListener('click', () => this.accuseSuspect());
        
        // Tutorial
        this.domElements.prevTutorialBtn.addEventListener('click', () => this.prevTutorialStep());
        this.domElements.nextTutorialBtn.addEventListener('click', () => this.nextTutorialStep());
        this.domElements.finishTutorialBtn.addEventListener('click', () => this.finishTutorial());
    }

    startNewGame() {
        try {
            this.soundManager.play('click');
            this.storageManager.clearSave();
            
            // Resetar estado do jogo
            this.gameState = {
                currentCase: null,
                currentCaseId: 1,
                currentCity: null,
                selectedSuspect: null,
                collectedClues: [],
                usedHours: 0,
                gameTime: 0,
                gameTimer: null,
                gameSpeed: 1,
                caseSolved: false,
                currentTutorialStep: 0
            };
            
            // Carregar primeiro caso
            this.loadCase(this.gameState.currentCaseId);
            
            // Mostrar tela do jogo
            this.domElements.mainMenu.classList.add('hidden');
            this.domElements.gameContainer.classList.remove('hidden');
            
            // Iniciar timer do jogo
            this.startGameTimer();
        } catch (error) {
            console.error('Erro ao iniciar novo jogo:', error);
            alert('Ocorreu um erro ao iniciar um novo jogo. Por favor, recarregue a página.');
        }
    }

    loadGame() {
        try {
            this.soundManager.play('click');
            const savedGame = this.storageManager.loadGame();
            
            if (savedGame) {
                this.gameState = savedGame;
                this.loadCase(this.gameState.currentCaseId, true);
                
                // Mostrar tela do jogo
                this.domElements.mainMenu.classList.add('hidden');
                this.domElements.gameContainer.classList.remove('hidden');
                
                // Iniciar timer do jogo
                this.startGameTimer();
            } else {
                alert('Nenhum jogo salvo encontrado!');
            }
        } catch (error) {
            console.error('Erro ao carregar jogo:', error);
            alert('Ocorreu um erro ao carregar o jogo salvo. Os dados podem estar corrompidos.');
        }
    }

    saveGame() {
        try {
            this.storageManager.saveGame(this.gameState);
        } catch (error) {
            console.error('Erro ao salvar jogo:', error);
        }
    }

    loadCase(caseId, isLoadedGame = false) {
        try {
            this.gameState.currentCase = getCaseById(caseId);
            if (!this.gameState.currentCase) {
                throw new Error(`Caso com ID ${caseId} não encontrado`);
            }

            this.gameState.currentCity = this.gameState.currentCase.cities[0].name;
            
            if (!isLoadedGame) {
                this.gameState.collectedClues = [];
                this.gameState.usedHours = 0;
                this.gameState.gameTime = 0;
                this.gameState.caseSolved = false;
            }
            
            // Atualizar UI com informações do caso
            this.updateCaseUI();
        } catch (error) {
            console.error('Erro ao carregar caso:', error);
            alert('Ocorreu um erro ao carregar o caso. Por favor, recarregue a página.');
        }
    }

    updateCaseUI() {
        try {
            const caseObj = this.gameState.currentCase;
            
            // Atualizar cabeçalho
            this.domElements.caseTitle.textContent = `Caso #${caseObj.id.toString().padStart(3, '0')}`;
            this.domElements.caseSubtitle.textContent = caseObj.title;
            
            // Atualizar dificuldade
            this.updateDifficultyMeter(caseObj.difficulty);
            
            // Atualizar detalhes do caso
            this.domElements.caseDetails.innerHTML = `
                <p>Vítima: <span class="victim-name">${caseObj.victim.name}</span></p>
                <p>Idade: <span class="victim-age">${caseObj.victim.age}</span></p>
                <p>Ocupação: <span class="victim-occupation">${caseObj.victim.occupation}</span></p>
                <p>Local: <span class="crime-location">${caseObj.crimeScene.location}</span></p>
                <p>Hora: <span class="crime-time">${caseObj.crimeScene.time}</span></p>
                <p class="crime-description">${caseObj.crimeScene.description}</p>
            `;
            
            // Atualizar suspeitos
            this.updateSuspectsList();
            
            // Atualizar registro de pistas
            this.updateClueLog();
            
            // Atualizar tempo restante
            this.updateTimeDisplay();
            
            // Atualizar contagem de pistas
            this.updateCluesCount();
        } catch (error) {
            console.error('Erro ao atualizar UI do caso:', error);
        }
    }

    updateDifficultyMeter(level) {
        try {
            this.domElements.difficultyMeter.forEach((meter, index) => {
                if (index < level) {
                    meter.classList.add('active');
                } else {
                    meter.classList.remove('active');
                }
            });
        } catch (error) {
            console.error('Erro ao atualizar medidor de dificuldade:', error);
        }
    }

    updateSuspectsList() {
        try {
            this.domElements.suspectsContainer.innerHTML = '';
            
            this.gameState.currentCase.suspects.forEach(suspect => {
                const suspectCard = document.createElement('div');
                suspectCard.className = `suspect-card ${this.gameState.selectedSuspect === suspect.id ? 'active' : ''}`;
                suspectCard.dataset.id = suspect.id;
                
                // Adicionar imagem do suspeito se disponível
                const imgSrc = `assets/images/suspects/suspect_${suspect.id}.jpg`;
                const imgFallback = 'assets/images/suspects/default.jpg';
                
                suspectCard.innerHTML = `
                    <div class="suspect-image-container">
                        <img src="${imgSrc}" onerror="this.src='${imgFallback}'" alt="${suspect.name}" class="suspect-image">
                    </div>
                    <div class="suspect-info">
                        <div class="suspect-name">${suspect.name}</div>
                        <div class="suspect-details">${suspect.age} anos, ${suspect.occupation}</div>
                        <div class="suspect-location">${suspect.location}</div>
                    </div>
                `;
                
                suspectCard.addEventListener('click', () => this.selectSuspect(suspect.id));
                this.domElements.suspectsContainer.appendChild(suspectCard);
            });
        } catch (error) {
            console.error('Erro ao atualizar lista de suspeitos:', error);
        }
    }

    updateClueLog() {
        try {
            this.domElements.clueLog.innerHTML = '';
            
            if (this.gameState.collectedClues.length === 0) {
                this.domElements.clueLog.innerHTML = '<p class="no-clues">Nenhuma pista encontrada ainda. Viaje para outros locais e interrogue suspeitos para coletar pistas.</p>';
                return;
            }
            
            this.gameState.collectedClues.forEach((clue, index) => {
                const clueItem = document.createElement('div');
                clueItem.className = 'clue-item';
                if (index === this.gameState.collectedClues.length - 1) {
                    clueItem.classList.add('new');
                }
                clueItem.textContent = clue;
                this.domElements.clueLog.appendChild(clueItem);
            });
            
            // Rolagem automática para a última pista
            this.domElements.clueLog.scrollTop = this.domElements.clueLog.scrollHeight;
        } catch (error) {
            console.error('Erro ao atualizar registro de pistas:', error);
        }
    }

    updateTimeDisplay() {
        try {
            const remainingHours = this.gameState.currentCase.initialHours - this.gameState.usedHours;
            const days = Math.floor(remainingHours / 24);
            const hours = remainingHours % 24;
            
            this.domElements.dayDisplay.textContent = days;
            this.domElements.hoursDisplay.textContent = hours;
        } catch (error) {
            console.error('Erro ao atualizar display de tempo:', error);
        }
    }

    updateCluesCount() {
        try {
            this.domElements.cluesDisplay.textContent = this.gameState.collectedClues.length;
            this.domElements.totalCluesDisplay.textContent = this.getTotalCluesCount();
        } catch (error) {
            console.error('Erro ao atualizar contagem de pistas:', error);
        }
    }

    getTotalCluesCount() {
        try {
            const caseObj = this.gameState.currentCase;
            return (
                caseObj.crimeScene.clues.length +
                caseObj.suspects.reduce((sum, suspect) => sum + suspect.clues.length, 0) +
                caseObj.cities.reduce((sum, city) => sum + city.clues.length, 0)
            );
        } catch (error) {
            console.error('Erro ao calcular total de pistas:', error);
            return 0;
        }
    }

    startGameTimer() {
        if (this.gameState.gameTimer) {
            clearInterval(this.gameState.gameTimer);
        }
        
        this.gameState.gameTimer = setInterval(() => {
            try {
                if (this.gameState.gameSpeed > 0 && !this.gameState.caseSolved) {
                    this.gameState.gameTime += this.gameState.gameSpeed;
                    
                    // Verificar se o tempo acabou
                    if (this.gameState.usedHours >= this.gameState.currentCase.initialHours) {
                        this.caseFailed("Tempo esgotado! O assassino escapou.");
                        return;
                    }
                    
                    // Atualizar display de tempo
                    this.updateTimeDisplay();
                }
            } catch (error) {
                console.error('Erro no game timer:', error);
                clearInterval(this.gameState.gameTimer);
            }
        }, 1000);
    }

    pauseGame() {
        try {
            this.soundManager.play('click');
            this.gameState.gameSpeed = 0;
            this.domElements.pauseBtn.classList.add('active');
            this.domElements.playBtn.classList.remove('active');
            this.domElements.fastForwardBtn.classList.remove('active');
        } catch (error) {
            console.error('Erro ao pausar jogo:', error);
        }
    }

    playGame() {
        try {
            this.soundManager.play('click');
            this.gameState.gameSpeed = 1;
            this.domElements.pauseBtn.classList.remove('active');
            this.domElements.playBtn.classList.add('active');
            this.domElements.fastForwardBtn.classList.remove('active');
        } catch (error) {
            console.error('Erro ao retomar jogo:', error);
        }
    }

    fastForwardGame() {
        try {
            this.soundManager.play('click');
            this.gameState.gameSpeed = 2;
            this.domElements.pauseBtn.classList.remove('active');
            this.domElements.playBtn.classList.remove('active');
            this.domElements.fastForwardBtn.classList.add('active');
        } catch (error) {
            console.error('Erro ao acelerar jogo:', error);
        }
    }

    selectSuspect(suspectId) {
        try {
            this.soundManager.play('click');
            this.gameState.selectedSuspect = suspectId;
            this.updateSuspectsList();
        } catch (error) {
            console.error('Erro ao selecionar suspeito:', error);
        }
    }

    showTravelModal() {
        try {
            this.soundManager.play('click');
            this.domElements.travelModal.classList.remove('hidden');
            
            // Preencher grid de cidades
            this.domElements.cityGrid.innerHTML = '';
            
            this.gameState.currentCase.cities.forEach(city => {
                const cityCard = document.createElement('div');
                cityCard.className = `city-card ${city.name === this.gameState.currentCity ? 'selected' : ''}`;
                cityCard.dataset.city = city.name;
                cityCard.dataset.time = city.travelTime;
                
                cityCard.innerHTML = `
                    <h4>${city.name}</h4>
                    <p>${getCityInfo(city.name).country}</p>
                `;
                
                cityCard.addEventListener('click', () => this.selectCity(city));
                this.domElements.cityGrid.appendChild(cityCard);
            });
            
            // Atualizar tempo de viagem para a cidade selecionada
            const selectedCity = this.gameState.currentCase.cities.find(c => c.name === this.gameState.currentCity);
            this.domElements.travelTime.textContent = selectedCity ? selectedCity.travelTime : '0';
        } catch (error) {
            console.error('Erro ao mostrar modal de viagem:', error);
            alert('Ocorreu um erro ao carregar as cidades disponíveis.');
        }
    }

    selectCity(city) {
        try {
            this.soundManager.play('click');
            document.querySelectorAll('.city-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            const cityCard = document.querySelector(`.city-card[data-city="${city.name}"]`);
            if (cityCard) {
                cityCard.classList.add('selected');
                this.domElements.travelTime.textContent = city.travelTime;
            }
        } catch (error) {
            console.error('Erro ao selecionar cidade:', error);
        }
    }

    travelToCity() {
        try {
            const selectedCityCard = document.querySelector('.city-card.selected');
            if (!selectedCityCard) {
                alert('Selecione uma cidade para viajar!');
                return;
            }
            
            this.soundManager.play('travel');
            const cityName = selectedCityCard.dataset.city;
            const travelTime = parseInt(selectedCityCard.dataset.time);
            
            // Atualizar horas usadas
            this.gameState.usedHours += travelTime;
            this.gameState.currentCity = cityName;
            
            // Coletar pista aleatória da cidade
            const caseObj = this.gameState.currentCase;
            const city = caseObj.cities.find(c => c.name === cityName);
            
            if (city && city.clues.length > 0) {
                const randomClueIndex = Math.floor(Math.random() * city.clues.length);
                const newClue = city.clues[randomClueIndex];
                
                if (!this.gameState.collectedClues.includes(newClue)) {
                    this.gameState.collectedClues.push(newClue);
                    this.soundManager.play('clue');
                }
            }
            
            // Atualizar UI
            this.updateTimeDisplay();
            this.updateClueLog();
            this.updateCluesCount();
            
            // Fechar modal
            this.closeAllModals();
            
            // Salvar jogo
            this.saveGame();
        } catch (error) {
            console.error('Erro ao viajar para cidade:', error);
            alert('Ocorreu um erro durante a viagem.');
        }
    }

    showInterrogateModal() {
        try {
            if (!this.gameState.selectedSuspect) {
                alert("Selecione um suspeito primeiro!");
                return;
            }
            
            this.soundManager.play('click');
            this.domElements.interrogateModal.classList.remove('hidden');
            
            // Carregar informações do suspeito
            const suspect = this.gameState.currentCase.suspects.find(s => s.id === this.gameState.selectedSuspect);
            
            this.domElements.suspectInterview.innerHTML = `
                <div class="suspect-profile">
                    <img src="assets/images/suspects/suspect_${suspect.id}.jpg" onerror="this.src='assets/images/suspects/default.jpg'" alt="${suspect.name}" class="suspect-image">
                    <div class="suspect-info">
                        <h3>${suspect.name}</h3>
                        <p>${suspect.age} anos, ${suspect.occupation}</p>
                        <p><strong>Localização:</strong> ${suspect.location}</p>
                    </div>
                </div>
                <div class="question-buttons">
                    <button class="btn-question" onclick="game.askQuestion('alibi')">Perguntar sobre Alibi</button>
                    <button class="btn-question" onclick="game.askQuestion('motive')">Perguntar sobre Motivo</button>
                    <button class="btn-question" onclick="game.askQuestion('relationship')">Perguntar sobre Relacionamento</button>
                </div>
                <div class="suspect-response" id="suspect-response">
                    <p>Selecione uma pergunta para fazer ao suspeito.</p>
                </div>
            `;
        } catch (error) {
            console.error('Erro ao mostrar modal de interrogatório:', error);
            alert('Ocorreu um erro ao carregar informações do suspeito.');
        }
    }

    askQuestion(questionType) {
        try {
            if (!this.gameState.selectedSuspect) return;
            
            const suspect = this.gameState.currentCase.suspects.find(s => s.id === this.gameState.selectedSuspect);
            if (!suspect) return;
            
            let response = "";
            let clue = "";
            
            switch (questionType) {
                case 'alibi':
                    response = `<p><strong>Alibi:</strong> ${suspect.alibi}</p>`;
                    clue = `Alibi do suspeito ${suspect.name}: ${suspect.alibi}`;
                    break;
                case 'motive':
                    response = `<p><strong>Motivo:</strong> ${suspect.motive}</p>`;
                    clue = `Possível motivo de ${suspect.name}: ${suspect.motive}`;
                    break;
                case 'relationship':
                    response = `<p><strong>Relação com a vítima:</strong> ${suspect.relationship}</p>`;
                    clue = `Relação de ${suspect.name} com a vítima: ${suspect.relationship}`;
                    break;
            }
            
            // Adicionar resposta
            document.getElementById('suspect-response').innerHTML = response;
            
            // Adicionar pista se for nova
            if (!this.gameState.collectedClues.includes(clue)) {
                this.gameState.collectedClues.push(clue);
                this.soundManager.play('clue');
                this.updateClueLog();
                this.updateCluesCount();
                
                // Gastar tempo no interrogatório
                this.gameState.usedHours += 1;
                this.updateTimeDisplay();
                
                // Salvar jogo
                this.saveGame();
            }
        } catch (error) {
            console.error('Erro ao fazer pergunta:', error);
        }
    }

    analyzeClues() {
        try {
            this.soundManager.play('click');
            
            // Verificar se há pistas para analisar
            if (this.gameState.collectedClues.length === 0) {
                alert("Você precisa coletar pistas antes de analisá-las!");
                return;
            }
            
            // Gastar tempo na análise
            this.gameState.usedHours += 2;
            this.updateTimeDisplay();
            
            // Adicionar pista aleatória da análise
            const newClue = getRandomClue(this.gameState.currentCase, this.gameState.selectedSuspect);
            
            if (!this.gameState.collectedClues.includes(newClue)) {
                this.gameState.collectedClues.push(newClue);
                this.soundManager.play('clue');
                
                // Atualizar UI
                this.updateClueLog();
                this.updateCluesCount();
                
                // Salvar jogo
                this.saveGame();
            } else {
                alert("Análise não revelou novas informações.");
            }
        } catch (error) {
            console.error('Erro ao analisar pistas:', error);
            alert("Ocorreu um erro durante a análise das pistas.");
        }
    }

    showAccuseModal() {
        try {
            this.soundManager.play('click');
            this.domElements.accuseModal.classList.remove('hidden');
            
            // Preencher lista de suspeitos para acusação
            this.domElements.accuseSuspects.innerHTML = '';
            
            this.gameState.currentCase.suspects.forEach(suspect => {
                const suspectCard = document.createElement('div');
                suspectCard.className = 'suspect-card';
                suspectCard.dataset.id = suspect.id;
                
                suspectCard.innerHTML = `
                    <div class="suspect-name">${suspect.name}</div>
                    <div class="suspect-details">${suspect.age} anos, ${suspect.occupation}</div>
                    <div class="suspect-location">${suspect.location}</div>
                `;
                
                suspectCard.addEventListener('click', () => {
                    document.querySelectorAll('#accuse-suspects .suspect-card').forEach(card => {
                        card.classList.remove('active');
                    });
                    suspectCard.classList.add('active');
                    this.gameState.selectedSuspect = suspect.id;
                });
                
                this.domElements.accuseSuspects.appendChild(suspectCard);
            });
        } catch (error) {
            console.error('Erro ao mostrar modal de acusação:', error);
            alert('Ocorreu um erro ao carregar os suspeitos para acusação.');
        }
    }

    accuseSuspect() {
        try {
            const selectedSuspectCard = document.querySelector('#accuse-suspects .suspect-card.active');
            if (!selectedSuspectCard) {
                alert("Selecione um suspeito para acusar!");
                return;
            }
            
            this.soundManager.play('click');
            const suspectId = parseInt(selectedSuspectCard.dataset.id);
            const suspect = this.gameState.currentCase.suspects.find(s => s.id === suspectId);
            
            // Verificar se é o culpado
            if (suspect.guilty) {
                this.caseSolved(suspect);
            } else {
                this.caseFailed(`Você acusou a pessoa errada! ${suspect.name} não é o assassino. O verdadeiro culpado escapou.`);
            }
        } catch (error) {
            console.error('Erro ao acusar suspeito:', error);
            alert('Ocorreu um erro ao processar a acusação.');
        }
    }

    caseSolved(suspect) {
        try {
            this.soundManager.play('success');
            this.gameState.caseSolved = true;
            this.pauseGame();
            
            // Mostrar modal de caso resolvido
            this.domElements.caseCompleteModal.classList.remove('hidden');
            this.domElements.resultTitle.textContent = "CASO RESOLVIDO!";
            
            this.domElements.resultContent.innerHTML = `
                <p>Parabéns, detetive! Você prendeu o assassino.</p>
                <p class="suspect-guilty">Culpado: ${suspect.name}</p>
                <p><strong>Método:</strong> ${this.gameState.currentCase.crimeScene.description}</p>
                <p><strong>Motivo:</strong> ${suspect.motive}</p>
                <p><strong>Solução completa:</strong> ${this.gameState.currentCase.solution}</p>
                <p>Você coletou ${this.gameState.collectedClues.length} de ${this.getTotalCluesCount()} pistas possíveis.</p>
            `;
            
            // Atualizar estado do jogo para próximo caso
            if (this.gameState.currentCaseId < gameCases.length) {
                this.domElements.nextCaseBtn.classList.remove('hidden');
            } else {
                this.domElements.nextCaseBtn.classList.add('hidden');
            }
            
            // Salvar jogo
            this.saveGame();
        } catch (error) {
            console.error('Erro ao resolver caso:', error);
        }
    }

    caseFailed(reason) {
        try {
            this.soundManager.play('failure');
            this.gameState.caseSolved = true;
            this.pauseGame();
            
            // Mostrar modal de caso falhou
            this.domElements.caseCompleteModal.classList.remove('hidden');
            this.domElements.resultTitle.textContent = "CASO FECHADO SEM SUCESSO";
            
            this.domElements.resultContent.innerHTML = `
                <p>${reason}</p>
                <p>A solução correta era:</p>
                <p class="suspect-guilty">${this.gameState.currentCase.solution}</p>
                <p>Você coletou ${this.gameState.collectedClues.length} de ${this.getTotalCluesCount()} pistas possíveis.</p>
            `;
            
            this.domElements.nextCaseBtn.classList.add('hidden');
            
            // Salvar jogo
            this.saveGame();
        } catch (error) {
            console.error('Erro ao falhar caso:', error);
        }
    }

    nextCase() {
        try {
            this.soundManager.play('click');
            this.gameState.currentCaseId++;
            
            // Carregar próximo caso
            this.loadCase(this.gameState.currentCaseId);
            
            // Fechar modal
            this.closeAllModals();
            
            // Retomar jogo
            this.playGame();
        } catch (error) {
            console.error('Erro ao avançar para próximo caso:', error);
            alert('Ocorreu um erro ao carregar o próximo caso.');
        }
    }

    showTutorial() {
        try {
            this.soundManager.play('click');
            this.domElements.tutorialModal.classList.remove('hidden');
            this.gameState.currentTutorialStep = 0;
            this.updateTutorialStep();
        } catch (error) {
            console.error('Erro ao mostrar tutorial:', error);
        }
    }

    updateTutorialStep() {
        try {
            this.domElements.tutorialSteps.forEach((step, index) => {
                if (index === this.gameState.currentTutorialStep) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });
            
            // Atualizar visibilidade dos botões
            this.domElements.prevTutorialBtn.disabled = this.gameState.currentTutorialStep === 0;
            this.domElements.nextTutorialBtn.hidden = this.gameState.currentTutorialStep === this.domElements.tutorialSteps.length - 1;
            this.domElements.finishTutorialBtn.hidden = this.gameState.currentTutorialStep !== this.domElements.tutorialSteps.length - 1;
        } catch (error) {
            console.error('Erro ao atualizar passo do tutorial:', error);
        }
    }

    prevTutorialStep() {
        try {
            this.soundManager.play('click');
            if (this.gameState.currentTutorialStep > 0) {
                this.gameState.currentTutorialStep--;
                this.updateTutorialStep();
            }
        } catch (error) {
            console.error('Erro ao voltar passo do tutorial:', error);
        }
    }

    nextTutorialStep() {
        try {
            this.soundManager.play('click');
            if (this.gameState.currentTutorialStep < this.domElements.tutorialSteps.length - 1) {
                this.gameState.currentTutorialStep++;
                this.updateTutorialStep();
            }
        } catch (error) {
            console.error('Erro ao avançar passo do tutorial:', error);
        }
    }

    finishTutorial() {
        try {
            this.soundManager.play('click');
            this.closeAllModals();
        } catch (error) {
            console.error('Erro ao finalizar tutorial:', error);
        }
    }

    showCredits() {
        try {
            this.soundManager.play('click');
            alert("Detective Noir\nDesenvolvido por [Seu Nome]\n© 2023 Unidade de Crimes Especiais\n\nAssets utilizados:\n- Mapa: Freepik\n- Sons: Freesound.org\n- Ícones: Font Awesome");
        } catch (error) {
            console.error('Erro ao mostrar créditos:', error);
        }
    }

    closeAllModals() {
        try {
            this.soundManager.play('click');
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.add('hidden');
            });
        } catch (error) {
            console.error('Erro ao fechar modais:', error);
        }
    }

    // Limpar timer quando o jogo for encerrado
    cleanup() {
        if (this.gameState.gameTimer) {
            clearInterval(this.gameState.gameTimer);
        }
    }
}

// Inicializar o jogo quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    try {
        const game = new DetectiveNoirGame();
        
        // Expor o objeto game globalmente para acesso no console (apenas para desenvolvimento)
        window.game = game;
        
        // Limpar quando a página for fechada
        window.addEventListener('beforeunload', () => game.cleanup());
    } catch (error) {
        console.error('Falha ao inicializar o jogo:', error);
        alert('Ocorreu um erro crítico ao iniciar o jogo. Por favor, recarregue a página.');
    }
});