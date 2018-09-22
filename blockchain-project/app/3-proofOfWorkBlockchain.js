const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(timestamp, dados, hashBlocoAnterior = "") {
        this.timestamp = timestamp;
        this.dados = dados;
        this.hashBlocoAnterior = hashBlocoAnterior;
        this.hash = this.calcularHash();
        this.contador = 0;
        
    }

    calcularHash() {
        return SHA256(this.hashBlocoAnterior + this.timestamp + JSON.stringify(this.dados) + this.contador).toString();
    }

    minerarBloco(dificuldade) {
        //console.log("Parte do hash: ", this.hash.substring(0, dificuldade));
        //console.log("Valor final válido:" + Array(dificuldade + 1).join("0"));

        while(this.hash.substring(0, dificuldade) !== Array(dificuldade + 1).join("0")) {
            this.contador ++;
            this.hash = this.calcularHash();
            //console.log("Parte do hash: ", this.hash.substring(0, dificuldade));
        }

        console.log("Bloco minerado: ", this.hash);
    }
    
}

class Blockchain {
    constructor() {
        this.chain = [this.criarBlocoGenesis()];
        this.dificuldade = 2;
    }

    criarBlocoGenesis() {
        return new Block(0, "26/09/2018", "Bloco Genesis", "0");
    }

    obterUltimoBloco() {
        return this.chain[this.chain.length -1];
    }

    adicionarBloco(novoBloco) {
        const ultimoBloco = this.obterUltimoBloco();
        novoBloco.hashBlocoAnterior = ultimoBloco.hash;
        novoBloco.minerarBloco(this.dificuldade);
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


console.log("Minerando bloco HariDinesh...");
hariDineshCoin.adicionarBloco(blocoHariDinesh);

console.log("Minerando bloco Davide...");
hariDineshCoin.adicionarBloco(blocoDavide);

console.log(JSON.stringify(hariDineshCoin, null, 4));
console.log("Esse blockchain é válido? ", hariDineshCoin.eBlockchainValido());