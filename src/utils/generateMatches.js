let teams = [
    {id: 1, name: "Team A", players: []},
    {id: 2, name: "Team B", players: []},
    {id: 3, name: "Team C", players: []},
    {id: 4, name: "Team D", players: []},
    {id: 5, name: "Team E", players: []},
    {id: 6, name: "Team F", players: []},
    {id: 7, name: "Team G", players: []},
    {id: 8, name: "Team H", players: []},
    {id: 9, name: "Team I", players: []},
    {id: 10, name: "Team J", players: []},
    {id: 11, name: "Team K", players: []},
    // { id: 12, name: "Team L", players: [] },
    // { id: 13, name: "Team M", players: [] },
    // { id: 14, name: "Team N", players: [] },
    // { id: 15, name: "Team O", players: [] },
    // { id: 16, name: "Team P", players: [] },
    // { id: 17, name: "Team Q", players: [] },
    // { id: 18, name: "Team R", players: [] },
    // { id: 19, name: "Team S", players: [] }
];

const generateKeys = (array) => {
    const keySize = defineKeySize(array.length);
    const timesNoChapeu = (array.length - keySize) * 2;
    const times = shuffle(array);

    if (keySize === 1) {
        console.log('O tamanho da chave é muito grande');
        return {
            times: [],
            tamanhoDaChave: 1,
            quantidadeDeTimesNoChapeu: 1,
            quantidadeDeJogosNoChapeu: 1
        };
    }

    return {
        times: times,
        tamanhoDaChave: keySize,
        quantidadeDeTimesNoChapeu: timesNoChapeu,
        quantidadeDeJogosNoChapeu: Math.floor(timesNoChapeu / 2)
    };
};

const defineKeySize = (size) => {

    if (size <= 3) {
        return 2;
    } else if (size <= 7) {
        return 4;
    } else if (size <= 15) {
        return 8;
    } else if (size <= 31) {
        return 16;
    }
    return 1;
};

// Algoritmo de Fisher-Yates

const shuffle = (array) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        [array[i], array[random]] = [array[random], array[i]];
    }

    return array;
};

// Função responsável por gerar os jogos com base nos times

export const generateMatches = (array) => {
    const {times, tamanhoDaChave, quantidadeDeTimesNoChapeu} = generateKeys(array);
    const chaveChapeu = [];
    const chavePrincipal = [];
    const quartas = []
    const semifinais = []
    chaveChapeu.push(...times.splice(0, quantidadeDeTimesNoChapeu));

    const arrayFill = (array, n) => {
        for (let i = 0; i < Math.ceil(tamanhoDaChave / n); i++) {
            array.push({
                time1: times[i * n] ?? null,
                time2: times[i * n + 1] ?? null,
            });
        }
        return array
    }
    const arrayFillNull = (array, n) => {
        for (let i = 0; i < Math.ceil(tamanhoDaChave / n); i++) {
            array.push({
                time1: null,
                time2: null,
            });
        }

        return array
    }

    return {
        faseChapeu: chaveChapeu.map((_, index) => {
            if (index % 2 === 0)
                return {
                    time1: chaveChapeu[index] ?? null,
                    time2: chaveChapeu[index + 1] ?? null,
                }
            return null;
        }).filter(jogos => jogos !== null),
        primeiraFase: arrayFill(chavePrincipal, 2),
        segundaFase: arrayFillNull(quartas, 4),
        terceiraFase: arrayFillNull(semifinais, 8)
    };
};

// console.log(`Chave do chapéu: ${chaveChapeu.length}\n`);
// chaveChapeu.forEach(jogos => console.log(jogos));
//
// console.log(`Chave principal: ${chavePrincipal.length}\n`);
// chavePrincipal.forEach(jogos => console.log(jogos));
