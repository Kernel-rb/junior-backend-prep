function printURLParts(urlString) {
    const urlObj = new URL(urlString)
    const protocol = urlObj.protocol
    const username = urlObj.username
    const password = urlObj.password
    const hostname = urlObj.hostname
    const port = urlObj.port
    const pathname = urlObj.pathname
    const search = urlObj.search
    const hash = urlObj.hash
    return console.log(`Protocol: ${protocol}\nUsername: ${username}\nPassword: ${password}\nHostname: ${hostname}\nPort: ${port}\nPathname: ${pathname}\nSearch: ${search}\nHash: ${hash}`)
}

// don't touch below this line

const fantasyQuestURL = 'http://dragonslayer:pwn3d@fantasyquest.com:8080/maps?sort=rank#id'
printURLParts(fantasyQuestURL)
