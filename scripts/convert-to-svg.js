const hre = require("hardhat")
const fs = require("fs")


async function convertAllToURI() {
    let filenames = fs.readdirSync("./img/png")
    filenames.forEach(async (filename) => {
        let fullURI = await convertToURI(filename)
        let txtFilename = filename.replace(".png", ".txt")
        txtFilename = txtFilename.replace(".svg", ".txt")
        fs.writeFileSync(`./img/base64/${txtFilename}`, fullURI)
    })
}

async function convertToURI(filename) {
    let base64 = fs.readFileSync(`./img/png/${filename}`, { encoding: "base64" })
    let fullURI = `data:image/png;base64,${base64}`
    return fullURI
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
convertAllToURI()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })

module.exports = {
    convertToURI
}

