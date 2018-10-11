const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(timestamp, dados, hashBlocoAnterior = "") {
        this.timestamp = timestamp;
        this.dados = dados;
        this.hashBlocoAnterior = hashBlocoAnterior;
        this.hash = this.calcularHash();
    }

    calcularHash() {
        return SHA256(this.hashBlocoAnterior + this.timestamp + JSON.stringify(this.dados)).toString();
    }
    
}

class Blockchain {
    constructor() {
        this.chain = [this.criarBlocoGenesis()];
    }

    criarBlocoGenesis() {
        return new Block("26/09/2018", "Bloco Genesis", "0");
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

    eBlockchainValido() {
        for (let i = 1; i < this.chain.length; i ++) {
            const blocoAtual = this.chain[i];
            const blocoAnterior = this.chain[i - 1];
         
            if (blocoAtual.hash !== blocoAtual.calcularHash()) {
                return false;
            }

            if (blocoAtual.hashBlocoAnterior !== blocoAnterior.hash) {
                return false;
            }
        }
        
        return true;
    }
}

let hariDineshCoin = new Blockchain();
let blocoHariDinesh = new Block("26/09/2018", {nome: "Hari Dinesh", valor: 1000000.00});
let blocoDavide =     new Block("26/09/2018", {nome: "Davide", valor: 1.00});

hariDineshCoin.adicionarBloco(blocoHariDinesh);
hariDineshCoin.adicionarBloco(blocoDavide);

console.log(JSON.stringify(hariDineshCoin, null, 4));
console.log("Esse blockchain é válido? ", hariDineshCoin.eBlockchainValido());

hariDineshCoin.chain[1].dados = {nome: "Hari Dinesh", valor: 2};

console.log(JSON.stringify(hariDineshCoin,null, 4));
console.log("Esse blockchain é válido? ", hariDineshCoin.eBlockchainValido());

