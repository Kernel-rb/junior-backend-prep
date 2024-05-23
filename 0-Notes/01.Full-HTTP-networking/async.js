const craftingCompleteWait = 8000   
const combiningMaterialsWait = 4000
const smeltingIronBarsWait = 2000
const shapingIronWait = 6000

// Don't touch below this line

setTimeout(() => console.log('Iron Longsword Complete!'), craftingCompleteWait)
setTimeout(() => console.log('Combining Materials...'), combiningMaterialsWait)
setTimeout(() => console.log('Smelting Iron Bars...'), smeltingIronBarsWait)
setTimeout(() => console.log('Shaping Iron...'), shapingIronWait)

console.log('Firing up the forge...')

sleep(2500)
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
