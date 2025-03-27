/**
 * Coleção de casos de detetive disponíveis no jogo
 * @type {Array<Object>}
 */
const gameCases = [
    {
        id: 1,
        title: "O Mistério do Hotel Luxor",
        difficulty: 1,
        initialHours: 72,
        victim: {
            name: "Jonathan Blackwell",
            age: 42,
            occupation: "Empresário",
            description: "Conhecido por seus negócios questionáveis no setor de tecnologia. Tinha vários inimigos no mundo dos negócios."
        },
        crimeScene: {
            location: "Hotel Luxor, Nova York",
            time: "02:15 AM",
            description: "O corpo foi encontrado no quarto 314 do hotel. Vítima apresentava múltiplas facadas e sinais de luta. Objeto cortante não encontrado no local.",
            clues: [
                "Impressões digitais na maçaneta",
                "Cabelo loiro encontrado na cena",
                "Relógio de pulso quebrado - hora parou em 2:15",
                "Recebimento de mensagem ameaçadora no celular"
            ]
        },
        suspects: [
            {
                id: 1,
                name: "Victoria Sterling",
                age: 38,
                occupation: "Sócia de negócios",
                location: "Nova York",
                description: "Ex-sócia da vítima em uma startup que faliu após desentendimentos. Tinha conhecimento do quarto do hotel.",
                alibi: "Afirma estar dormindo em casa, mas não há testemunhas.",
                motive: "Vingança pela falência da empresa que eles tinham juntos.",
                relationship: "Ex-parceira de negócios com quem teve uma queda.",
                guilty: false,
                clues: [
                    "Tinha acesso ao quarto do hotel",
                    "Foi vista discutindo com a vítima no dia anterior",
                    "Seu número estava nos contatos recentes da vítima"
                ]
            },
            {
                id: 2,
                name: "Marcus Riddle",
                age: 29,
                occupation: "Garçom do hotel",
                location: "Nova York",
                description: "Funcionário do hotel com acesso a todos os quartos. Tinha problemas financeiros.",
                alibi: "Diz estar na área de serviço no horário do crime.",
                motive: "Possível chantagem - a vítima poderia tê-lo visto roubando de outros hóspedes.",
                relationship: "Conhecia a vítima como hóspede frequente do hotel.",
                guilty: true,
                clues: [
                    "Impressões digitais coincidem com as encontradas",
                    "Faltou ao trabalho no dia seguinte",
                    "Depósito recente em sua conta sem explicação"
                ]
            },
            {
                id: 3,
                name: "Eleanor Graves",
                age: 45,
                occupation: "Repórter investigativa",
                location: "Boston",
                description: "Estava investigando os negócios escusos da vítima para uma matéria.",
                alibi: "Em Boston, gravando um programa de TV na hora do crime.",
                motive: "Impedir que suas investigações fossem publicadas.",
                relationship: "Perseguidora profissional da vítima.",
                guilty: false,
                clues: [
                    "E-mails ameaçadores enviados à vítima",
                    "Passagem aérea para NY no dia anterior",
                    "Conhecimento detalhado dos hábitos da vítima"
                ]
            }
        ],
        cities: [
            { name: "Nova York", travelTime: 0, clues: ["Câmeras de segurança do hotel", "Registros de entrada/saída"] },
            { name: "Boston", travelTime: 4, clues: ["Estúdio de TV onde estava a suspeita", "Registros de hotel"] },
            { name: "Washington", travelTime: 6, clues: ["Registros corporativos", "Contatos políticos"] }
        ],
        solution: "Marcus Riddle, o garçom do hotel, matou Jonathan Blackwell após ser descoberto roubando pertences de hóspedes. Jonathan o ameaçou de expor seus crimes, levando Marcus a cometê-lo para se proteger."
    },
    {
        id: 2,
        title: "O Enigma do Museu",
        difficulty: 2,
        initialHours: 68,
        victim: {
            name: "Dra. Isabella Monteiro",
            age: 56,
            occupation: "Curadora do Museu",
            description: "Especialista em artefatos egípcios, estava trabalhando em uma descoberta controversa."
        },
        crimeScene: {
            location: "Museu de Arte Antiga, Chicago",
            time: "11:30 PM",
            description: "Encontrada morta em seu escritório, aparentemente envenenada. Um valioso artefato egípcio estava faltando.",
            clues: [
                "Copo com resíduos de veneno",
                "Nota cifrada no computador",
                "Pequeno fragmento de tecido azul",
                "Sistema de segurança desativado"
            ]
        },
        suspects: [
            {
                id: 1,
                name: "Dr. Richard Vance",
                age: 48,
                occupation: "Arqueólogo",
                location: "Chicago",
                description: "Colega de trabalho que discordava dos métodos da vítima. Especialista em venenos antigos.",
                alibi: "Afirma estar em casa trabalhando em um artigo.",
                motive: "Ciúmes profissionais e disputa por crédito em descobertas.",
                relationship: "Rival acadêmico por muitos anos.",
                guilty: false,
                clues: [
                    "Acesso ao veneno usado",
                    "Histórico de conflitos com a vítima",
                    "Chave mestra do museu"
                ]
            },
            {
                id: 2,
                name: "Clara Bennett",
                age: 32,
                occupation: "Assistente de curadoria",
                location: "Chicago",
                description: "Assistente pessoal da vítima, recentemente demitida sob acusações de roubo.",
                alibi: "Diz estar em um bar na hora do crime.",
                motive: "Vingança pela demissão humilhante.",
                relationship: "Ex-funcionária com acesso a todas as áreas.",
                guilty: false,
                clues: [
                    "Impressões digitais no copo",
                    "Vista perto do museu naquela noite",
                    "Contato com compradores de arte ilegais"
                ]
            },
            {
                id: 3,
                name: "Victor Kensington",
                age: 60,
                occupation: "Colecionador",
                location: "Los Angeles",
                description: "Bilionário conhecido por sua coleção de artefatos ilegais. Tinha interesse no artefato roubado.",
                alibi: "Em sua casa em LA, segundo seus empregados.",
                motive: "Obter o artefato a qualquer custo.",
                relationship: "Comprador em potencial para o artefato.",
                guilty: true,
                clues: [
                    "Transferência bancária suspeita no dia anterior",
                    "Jet particular em Chicago naquela noite",
                    "Tecido azul coincide com seu lenço personalizado"
                ]
            }
        ],
        cities: [
            { name: "Chicago", travelTime: 0, clues: ["Registros do museu", "Gravações de câmeras externas"] },
            { name: "Los Angeles", travelTime: 8, clues: ["Registros do aeroporto privado", "Provedor de alibi"] },
            { name: "Nova Orleans", travelTime: 6, clues: ["Contatos do mercado negro", "Especialista em venenos"] }
        ],
        solution: "Victor Kensington contratou um profissional para obter o artefato e eliminar a Dra. Monteiro quando ela se recusou a vendê-lo. O fragmento de tecido era de seu lenço personalizado, deixado pelo assassino."
    },
    {
        id: 3,
        title: "O Segredo da Mansão Blackwood",
        difficulty: 3,
        initialHours: 64,
        victim: {
            name: "Sir Reginald Blackwood",
            age: 72,
            occupation: "Industrial aposentado",
            description: "Patriarca da família Blackwood, conhecido por seu temperamento difícil e testamento controverso."
        },
        crimeScene: {
            location: "Mansão Blackwood, San Francisco",
            time: "09:45 PM",
            description: "Encontrado morto em seu escritório, aparentemente por overdose de medicamentos. Suspeita-se de homicídio devido à quantidade e às circunstâncias.",
            clues: [
                "Copo de uísque com resíduos de medicamento",
                "Testamento recentemente alterado",
                "Carta ameaçadora sem assinatura",
                "Pegadas de lama no carpete"
            ]
        },
        suspects: [
            {
                id: 1,
                name: "Eleanor Blackwood",
                age: 45,
                occupation: "Filha mais velha",
                location: "San Francisco",
                description: "Herdeira direta que discordava das decisões do pai. Tinha acesso aos seus medicamentos.",
                alibi: "Em seu quarto, segundo sua afirmação.",
                motive: "Herança e anos de abuso emocional.",
                relationship: "Filha ressentida com o pai.",
                guilty: false,
                clues: [
                    "Histórico de conflitos recentes",
                    "Acesso aos medicamentos do pai",
                    "Beneficiária no testamento original"
                ]
            },
            {
                id: 2,
                name: "Dr. Jonathan Pryce",
                age: 52,
                occupation: "Médico da família",
                location: "San Francisco",
                description: "Prescrevia os medicamentos para Sir Reginald. Tinha dívidas de jogo.",
                alibi: "Em casa, segundo seu registro de chamadas.",
                motive: "Pagamento para alterar o testamento.",
                relationship: "Médico pessoal por 15 anos.",
                guilty: true,
                clues: [
                    "Presença na mansão naquela tarde",
                    "Grande depósito em sua conta no dia anterior",
                    "Conhecimento detalhado da dosagem letal"
                ]
            },
            {
                id: 3,
                name: "Thomas Gallagher",
                age: 38,
                occupation: "Jardineiro",
                location: "San Francisco",
                description: "Trabalhava na mansão há anos. Tinha um caso secreto com a governanta.",
                alibi: "Diz estar no bar local.",
                motive: "Medo de ser demitido e descoberto.",
                relationship: "Funcionário leal mas com segredos.",
                guilty: false,
                clues: [
                    "Pegadas coincidem com suas botas",
                    "Visto perto do escritório naquela noite",
                    "Conflito recente com a vítima"
                ]
            }
        ],
        cities: [
            { name: "San Francisco", travelTime: 0, clues: ["Registros da mansão", "Testemunhas locais"] },
            { name: "Las Vegas", travelTime: 10, clues: ["Cassinos frequentados pelo médico", "Agiotas"] },
            { name: "Seattle", travelTime: 8, clues: ["Advogado da família", "Cópia do testamento original"] }
        ],
        solution: "Dr. Jonathan Pryce foi pago por um membro não revelado da família para garantir que Sir Reginald não alterasse o testamento. A overdose foi administrada no uísque, sua bebida favorita."
    },
    {
        id: 4,
        title: "O Caso do Comissário",
        difficulty: 4,
        initialHours: 60,
        victim: {
            name: "Comissário Álvaro Mendez",
            age: 58,
            occupation: "Comissário de Polícia",
            description: "Conhecido por sua luta contra o crime organizado. Recebeu várias ameaças de morte recentemente."
        },
        crimeScene: {
            location: "Sua residência, Miami",
            time: "07:30 PM",
            description: "Assassinado a tiros em sua casa. O sistema de segurança foi desativado e não há sinais de arrombamento.",
            clues: [
                "Projétil calibre .45",
                "Chamada não atendida de um número desconhecido",
                "Agenda com iniciais 'J.R.' marcadas para o dia",
                "Relatório confidencial desaparecido"
            ]
        },
        suspects: [
            {
                id: 1,
                name: "Capitã Sofia Reyes",
                age: 42,
                occupation: "Subcomandante",
                location: "Miami",
                description: "Segunda em comando, seria a sucessora natural. Conhecia o sistema de segurança da casa.",
                alibi: "Em uma reunião com outros oficiais.",
                motive: "Ambição profissional e possíveis divergências.",
                relationship: "Colega de trabalho e protegida.",
                guilty: false,
                clues: [
                    "Acesso aos relatórios confidenciais",
                    "Última pessoa a falar com ele",
                    "Conhecimento do sistema de segurança"
                ]
            },
            {
                id: 2,
                name: "Jorge 'El Lobo' Ramirez",
                age: 49,
                occupation: "Líder do cartel",
                location: "Cidade do México",
                description: "Principal alvo das investigações do comissário. Conhecido por métodos violentos.",
                alibi: "Preso em uma prisão mexicana.",
                motive: "Impedir que suas operações fossem expostas.",
                relationship: "Inimigo mortal.",
                guilty: false,
                clues: [
                    "Ameaças recentes",
                    "Contatos dentro do departamento",
                    "Arma do mesmo calibre em crimes anteriores"
                ]
            },
            {
                id: 3,
                name: "Detetive Ryan Carter",
                age: 37,
                occupation: "Detetive da equipe",
                location: "Miami",
                description: "Membro da equipe próxima ao comissário. Problemas financeiros recentes.",
                alibi: "Diz estar em um bar na hora do crime.",
                motive: "Pagamento por informações confidenciais.",
                relationship: "Subordinado de confiança.",
                guilty: true,
                clues: [
                    "Iniciais 'J.R.' eram seu codinome no esquema",
                    "Grande depósito em sua conta",
                    "Ausência no bar na hora alegada"
                ]
            }
        ],
        cities: [
            { name: "Miami", travelTime: 0, clues: ["Registros policiais", "Gravações de segurança"] },
            { name: "Cidade do México", travelTime: 12, clues: ["Registros prisionais", "Contatos do cartel"] },
            { name: "Nova York", travelTime: 10, clues: ["Rastreamento de pagamentos", "Contato do intermediário"] }
        ],
        solution: "Detetive Ryan Carter, corrompido pelo cartel, assassinou o comissário para impedir que uma investigação crucial prosseguisse. As iniciais 'J.R.' eram seu codinome no esquema de corrupção."
    },
    {
        id: 5,
        title: "O Último Voo",
        difficulty: 5,
        initialHours: 56,
        victim: {
            name: "Dra. Evelyn Cross",
            age: 39,
            occupation: "Cientista aeronáutica",
            description: "Trabalhava em um projeto ultrassecreto de propulsão. Desapareceu durante um voo de teste."
        },
        crimeScene: {
            location: "Área 51, Nevada",
            time: "02:00 AM",
            description: "Seu corpo foi encontrado no deserto, longe do local do acidente. A autópsia revelou que ela morreu antes da queda.",
            clues: [
                "Injeção letal no braço",
                "Nota codificada em seu bolso",
                "Dispositivo de armazenamento danificado",
                "Marcas de luta no cockpit"
            ]
        },
        suspects: [
            {
                id: 1,
                name: "Coronel Jack Mitchell",
                age: 52,
                occupation: "Comandante do projeto",
                location: "Nevada",
                description: "Responsável pela segurança do projeto. Relacionamento complicado com a vítima.",
                alibi: "Em uma reunião no Pentágono.",
                motive: "Impedir que ela vazasse segredos.",
                relationship: "Superior hierárquico.",
                guilty: false,
                clues: [
                    "Acesso ao avião antes do voo",
                    "Conflito recente sobre ética do projeto",
                    "Histórico de métodos brutais"
                ]
            },
            {
                id: 2,
                name: "Dr. Leonard Zhou",
                age: 47,
                occupation: "Cientista chefe",
                location: "Nevada",
                description: "Rival científico da vítima. Descoberta recente poderia lhe render fama e fortuna.",
                alibi: "No laboratório principal, segundo registros.",
                motive: "Eliminar a competição por crédito científico.",
                relationship: "Colega e rival acirrado.",
                guilty: false,
                clues: [
                    "Última pessoa a vê-la viva",
                    "Conhecimento de substâncias letais",
                    "Beneficiário direto de sua morte"
                ]
            },
            {
                id: 3,
                name: "Agente Daniel Fisher",
                age: 34,
                occupation: "Agente de segurança",
                location: "Nevada",
                description: "Designado para proteger a Dra. Cross. Histórico militar obscuro.",
                alibi: "Em patrulha na área externa.",
                motive: "Pago por uma organização rival para sabotar o projeto.",
                relationship: "Guarda-costas designado.",
                guilty: true,
                clues: [
                    "Registros de chamadas para um número suspeito",
                    "Treinamento em injeções letais",
                    "Foi visto perto do avião fora de seu horário",
                    "Conta bancária com depósitos não explicados"
                ]
            }
        ],
        cities: [
            { name: "Nevada", travelTime: 0, clues: ["Registros da base", "Relatórios de segurança"] },
            { name: "Washington D.C.", travelTime: 14, clues: ["Registros do Pentágono", "Contatos militares"] },
            { name: "Los Alamos", travelTime: 12, clues: ["Especialistas em armas químicas", "Registros de pesquisa"] }
        ],
        solution: "Agente Daniel Fisher foi subornado por uma organização estrangeira para eliminar a Dra. Cross e destruir sua pesquisa. A injeção foi administrada antes do voo, e ele simulou um acidente."
    }
];

/**
 * Cidades disponíveis no jogo
 * @type {Array<Object>}
 */
const gameCities = [
    { name: "Nova York", country: "EUA", region: "Norte" },
    { name: "Boston", country: "EUA", region: "Norte" },
    { name: "Washington", country: "EUA", region: "Norte" },
    { name: "Chicago", country: "EUA", region: "Centro" },
    { name: "Los Angeles", country: "EUA", region: "Oeste" },
    { name: "San Francisco", country: "EUA", region: "Oeste" },
    { name: "Miami", country: "EUA", region: "Sul" },
    { name: "Nova Orleans", country: "EUA", region: "Sul" },
    { name: "Las Vegas", country: "EUA", region: "Oeste" },
    { name: "Seattle", country: "EUA", region: "Oeste" },
    { name: "Cidade do México", country: "México", region: "Centro" },
    { name: "Nevada", country: "EUA", region: "Oeste" },
    { name: "Washington D.C.", country: "EUA", region: "Norte" },
    { name: "Los Alamos", country: "EUA", region: "Oeste" }
];

/**
 * Obtém um caso pelo ID
 * @param {number} id - ID do caso desejado
 * @returns {Object|null} O caso encontrado ou null se não existir
 */
function getCaseById(id) {
    if (typeof id !== 'number' || id <= 0) {
        console.error('ID inválido fornecido para getCaseById');
        return null;
    }
    return gameCases.find(caseObj => caseObj.id === id) || null;
}

/**
 * Obtém uma pista aleatória de um caso, opcionalmente filtrada por suspeito
 * @param {Object} caseObj - O objeto do caso
 * @param {number|null} [suspectId=null] - ID opcional do suspeito para filtrar pistas
 * @returns {string} Uma pista aleatória ou mensagem de fallback
 */
function getRandomClue(caseObj, suspectId = null) {
    if (!caseObj || typeof caseObj !== 'object') {
        console.error('Objeto de caso inválido fornecido para getRandomClue');
        return "Nenhuma pista encontrada";
    }

    if (suspectId) {
        const suspect = caseObj.suspects?.find(s => s.id === suspectId);
        if (suspect?.clues?.length > 0) {
            return suspect.clues[Math.floor(Math.random() * suspect.clues.length)];
        }
    }
    
    const allClues = [
        ...(caseObj.crimeScene?.clues || []),
        ...(caseObj.suspects?.flatMap(s => s.clues) || []),
        ...(caseObj.cities?.flatMap(c => c.clues) || [])
    ];
    
    return allClues.length > 0 
        ? allClues[Math.floor(Math.random() * allClues.length)]
        : "Nenhuma pista encontrada";
}

/**
 * Obtém informações sobre uma cidade pelo nome
 * @param {string} cityName - Nome da cidade
 * @returns {Object|null} Informações da cidade ou null se não encontrada
 */
function getCityInfo(cityName) {
    if (typeof cityName !== 'string') {
        console.error('Nome de cidade inválido fornecido para getCityInfo');
        return null;
    }
    return gameCities.find(city => city.name === cityName) || null;
}

export { gameCases, gameCities, getCaseById, getRandomClue, getCityInfo };