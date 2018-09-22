const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(timestamp, dados, hashBlocoAnterior = "") {
        this.timestamp = timestamp;
        this.dados = dados;
        this.hashBlocoAnterior = hashBlocoAnterior;
        this.hash = this.calcularHash();
    }

    calcularHash() {
        return SHA256(this.hashBlocoAnterior + this.timestamp + JSON.stringify(this.data)).toString();
    }
    
}

class Blockchain {
    constructor() {
        this.chain = [this.criarBlocoGenesis()];
    }

    criarBlocoGenesis() {
        return new Block(0, "26/09/2018", "Bloco Genesis", "0");
    }

    obterUltimoBloco() {
        return this.chain[this.chain.length -1];
    }

    adicionarBloco(novoBloco) {
        let ultimoBloco = this.obterUltimoBloco()

        novoBloco.hashBlocoAnterior = ultimoBloco.hash;
        novoBloco.hash = novoBloco.calcularHash();
        this.chain.push(novoBloco);
    }

}


//Testando o nosso blockchain
let hariDineshCoin = new Blockchain();
let blocoHariDinesh = new Block("26/09/2018", {nome: "Hari Dinesh", valor: 1000000.00});
let blocoDavide =     new Block("26/09/2018", {nome: "Davide",  valor: 1.00});

hariDineshCoin.adicionarBloco(blocoHariDinesh);
hariDineshCoin.adicionarBloco(blocoDavide);

console.log(JSON.stringify(hariDineshCoin, null, 4));

