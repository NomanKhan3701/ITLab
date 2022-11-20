const axios = require("axios")
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const getPoets = async () => {
    try {
        const url = "https://poetrydb.org/author";
        const poets = await axios.get(url);
        return poets.data.authors;
    } catch (error) {
        
    }
}

const showPoets = async (req, res) => {
    try{
        const poets=await getPoets();
        res.status(200).send(poets)
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}

const getPoetryByPoets = async (req, res, next) => {
    try {
        const poetImage = await image();
        var poetries = [];
        try {
            await Promise.all(await poetImage.map(async (poet) => {
                const url = "https://poetrydb.org/author" + `/${[poet.name]}`;
                //console.log(url)
                const poetryByPoets = await axios.get(url);
                poetries.push({
                    poets: poet.name,
                    image: poet.images,
                    poetries: JSON.stringify(poetryByPoets.data),
                })
            }))
        } catch (error) {
        }
        res.status(200).send(poetries)
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}

async function image() {
    var authorImage = [];
    const authors = await getPoets();
    await Promise.all(await authors.map(async (author) => {
        const authorName = author.replace(/ /g, '_')
        try {
            const response = await axios.get(`https://dbpedia.org/page/${authorName}`)
            const data = new JSDOM(response.data);
            if (data) {
                const image = data
                    .window
                    .document.querySelector("body > section:nth-child(3) > div > div.row.pt-2 > div.col-xs-3.col-sm-2 > a > img")?.src
                if (typeof image !== "undefined") {
                    authorImage.push({
                        name: author,
                        image: image,
                    })
                }
            } 
        } catch (error) { }
    }))
    return authorImage;
}

const getPoetWithImage = async (req, res) => {
    try {
        const imagePoet = await image();
       // console.log(imagePoet);
        res.status(200).send(imagePoet)
    } catch (error) {
        console.error(error)
    }
}
module.exports = { getPoetryByPoets, getPoetWithImage,showPoets }