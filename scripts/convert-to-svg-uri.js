const hre = require("hardhat")
const fs = require("fs")


async function convertAllToURI() {
    let baseDir = "./img/png/"
    let filenames = fs.readdirSync(baseDir)
    filenames.forEach(async (filename) => {
        let fullURI = await convertToURI(filename, baseDir)
        let txtFilename = filename.replace(".png", ".txt")
        txtFilename = txtFilename.replace(".svg", ".txt")
        fs.writeFileSync(`./img/base64/${txtFilename}`, fullURI)
    })
}

async function convertToURI(filename, baseDir) {
    let base64 = fs.readFileSync(`${baseDir}${filename}`, { encoding: "base64" })
    // you can also do data:image/svg+xml;base64
    let fullURI = `data:image/png;base64,${base64}`
    return fullURI
}

convertAllToURI()

module.exports = {
    convertToURI
}

