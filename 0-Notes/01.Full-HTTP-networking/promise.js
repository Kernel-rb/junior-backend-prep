const applyDamage = (damage, currentHP) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (currentHP > damage) {
                const newHP = currentHP - damage
                resolve(`The player suffers ${damage} points of damage and has ${newHP} hit points remaining.`)
            } else {
                reject(`The player suffers ${damage} points of damage and has fallen unconscious.`)
           }
        }, 1000)
    })
}

// Don't touch below this line

async function runApplyDamageTest(damage, currentHP) {
    console.log(`Applying ${damage} damage to player with ${currentHP} HP...`)
    try {
        const message = await applyDamage(damage, currentHP)
        console.log(`...applyDamage resolved with: ${message}`)
    } catch (message) {
        console.log(`...applyDamage rejected with: ${message}`)
    }
}

async function main() {
    await runApplyDamageTest(27, 50)
    await sleep(1100)
    await runApplyDamageTest(50, 50)
    await sleep(1100)
    await runApplyDamageTest(110, 100)
    await sleep(1100)
}

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

(async () => {
    await main();
})();
