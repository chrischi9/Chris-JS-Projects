let battleLog = [];
let lastLoggedEntry;
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 18;
const MONSTER_ATTACK_VALUE = 12;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK'; // MODE_ATTACK = 0
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'; // MODE_STRONG_ATTACK = 1
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

function getMaxLifeValues() {
    const enteredValue = prompt('Maximum life for you and the monster.', '100');

    const parsedValue = parseInt(enteredValue);
    if (isNaN(parsedValue) || parsedValue <= 0) {
        throw {message: `Invalid user input, not a number!`}
    }
    return parsedValue;
}

let chosenMaxLife;
try {
    chosenMaxLife = getMaxLifeValues();
} catch (error) {
    console.log(error);
    chosenMaxLife = 100;
}


let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
    let logEntry;

    //use for equality conditions
    switch(event) {
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry = {
                event: event,
                value: value,
                target: 'MONSTER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry = {
                event: event,
                value: value,
                target: 'MONSTER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry = {
                event: event,
                value: value,
                target: 'PLAYER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
            break;
        case LOG_EVENT_PLAYER_HEAL:
            logEntry = {
                event: event,
                value: value,
                target: 'PLAYER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
            break;
        case LOG_EVENT_GAME_OVER:
            logEntry = {
                event: event,
                value: value,
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
            break;
        default:
            logEntry = {};
    }

    //preferred method but since it's only equality, switch case works
    // if (event === LOG_EVENT_PLAYER_ATTACK) {
    //     logEntry = {
    //         event: event,
    //         value: value,
    //         target: 'MONSTER',
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth
    //     };
    // }
    // else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    //     logEntry = {
    //         event: event,
    //         value: value,
    //         target: 'MONSTER',
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth
    //     };
    // }
    // else if (event === LOG_EVENT_MONSTER_ATTACK) {
    //     logEntry = {
    //         event: event,
    //         value: value,
    //         target: 'PLAYER',
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth
    //     };
    // }
    // else if (event === LOG_EVENT_PLAYER_HEAL) {
    //     logEntry = {
    //         event: event,
    //         value: value,
    //         target: 'PLAYER',
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth
    //     };
    // }
    // else if (event === LOG_EVENT_GAME_OVER) {
    //     logEntry = {
    //         event: event,
    //         value: value,
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth
    //     };
    // }
    battleLog.push(logEntry);
}

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealh = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(
        LOG_EVENT_MONSTER_ATTACK, 
        playerDamage, 
        currentMonsterHealth, 
        currentPlayerHealth);

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealh;
        alert("You were saved by the bonus health!");
        setPlayerHealth(initialPlayerHealh);
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You won!')
        writeToLog(
            LOG_EVENT_GAME_OVER, 
            'PLAYER WON', 
            currentMonsterHealth, 
            currentPlayerHealth);
    }
    else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lost!')
        writeToLog(
            LOG_EVENT_GAME_OVER, 
            'MONSTER WON', 
            currentMonsterHealth, 
            currentPlayerHealth);
    }
    else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('You have a draw!')
        writeToLog(
            LOG_EVENT_GAME_OVER, 
            'DRAW', 
            currentMonsterHealth, 
            currentPlayerHealth);
    }

    if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
        reset();
    }
}

function attackMonster(mode) {
    //ternary operator option
    const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    const logEvent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;

    // let maxDamage;
    // let logEvent;
    // if (mode === MODE_ATTACK) {
    //     maxDamage = ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_ATTACK;
    // }
    // else if (mode === MODE_STRONG_ATTACK) {
    //     maxDamage = STRONG_ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    // }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(
        logEvent, 
        damage, 
        currentMonsterHealth, 
        currentPlayerHealth);
    endRound();
}

function attackHandler() {
    attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
    attackMonster(MODE_STRONG_ATTACK);
}

function healHandler() {
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert(`You can't heal to more than your max initial health.`);
        healValue - chosenMaxLife - currentPlayerHealth;
    }
    else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(
        LOG_EVENT_PLAYER_HEAL, 
        healValue, 
        currentMonsterHealth, 
        currentPlayerHealth);
    endRound();
}

function printLogHandler() {
    // for (var i = 0; i < battleLog.length; i++) {
    //     console.log('--------------')
    // }

    let j = 0;
    while (j < 3) {
        console.log('---------------');
        j++;
    }

    let i = 0;
    for (const logEntry of battleLog) {
        if (!lastLoggedEntry && lastLoggedEntry !== 0 || lastLoggedEntry < i) {
            console.log(`#${i}`);
            for (const key in logEntry) {
                console.log(`${key} => ${logEntry[key]}`);
            }
            lastLoggedEntry = i;
            break;
        }
        i++;
    }

    // for (var i = 0; i< battleLog.length; i++) {
    //     console.log(battleLog[i]);
    // }
    // console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healHandler);
logBtn.addEventListener('click', printLogHandler);
