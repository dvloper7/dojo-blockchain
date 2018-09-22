const SHA256 = require("crypto-js/sha256");

class Transaction {
    constructor(enderecoRemetente, enderecoDestinatario, valor) {
        this.enderecoRemetente = enderecoRemetente;
        this.enderecoDestinatario = enderecoDestinatario;
        this.valor = valor;
    }


}

class Block {
    constructor(timestamp, transacoes, hashBlocoAnterior = "") {
        this.timestamp = timestamp;
        this.transacoes = transacoes;
        this.hashBlocoAnterior = hashBlocoAnterior;
        this.hash = this.calcularHash();
        this.contador = 0;
        
    }

    calcularHash() {
        return SHA256(this.index + this.hashBlocoAnterior + this.timestamp + JSON.stringify(this.transacoes) + this.contador).toString();
    }

    minerarBloco(dificuldade) {
        while(this.hash.substring(0, dificuldade) !== Array(dificuldade + 1).join("0")) {
            this.contador ++;
            this.hash = this.calcularHash();
        }

        console.log("Bloco minerado: ", this.hash);
    }
    
}

class Blockchain {
    constructor() {
        this.chain = [this.criarBlocoGenesis()];
        this.dificuldade = 4;
        this.transacoesPendentes = [];
        this.recompensaMinerador = 100;
    }

    criarBlocoGenesis() {
        return new Block(0, "26/09/2018", "Bloco Genesis", "0");
    }

    obterUltimoBloco() {
        return this.chain[this.chain.length -1];
    }

    minerarTransacoesPendentes(enderecoMinerador) {
        let novoBloco = new Block(Date.now(), this.transacoesPendentes);
        novoBloco.hashBlocoAnterior = this.obterUltimoBloco().hash;
        novoBloco.minerarBloco(this.dificuldade);
        console.log("Bloco minerado com sucesso!");
        this.chain.push(novoBloco);
        this.transacoesPendentes = [new Transaction(null, enderecoMinerador, this.recompensaMinerador)];
    }

    adicionarTransacao(transacao) {
        this.transacoesPendentes.push(transacao);
    }

    obterRecomenpaMinerador(endereco) {
        let recompensa = 0;

        for (const block of this.chain) {
            for (const transacao of block.transacoes) {
                if (transacao.enderecoRemetente === endereco) {
                    recompensa -= transacao.valor;
                }

                if (transacao.enderecoDestinatario === endereco) {
                    recompensa += transacao.valor;
                }
            }
        }

        return recompensa;
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
let enderecoDavide = "endereco-davide";

hariDineshCoin.adicionarTransacao(new Transaction("endereco-joao", "endereco-maria", 100)); 
hariDineshCoin.adicionarTransacao(new Transaction("endereco-maria", "endereco-joao", 150));
//hariDineshCoin.adicionarTransacao(new Transaction("endereco-joao", enderecoDavide, 150));


console.log("\nIniciando a mineração....");
hariDineshCoin.minerarTransacoesPendentes(enderecoDavide);
console.log("\Recompensa do Davide é: ", hariDineshCoin.obterRecomenpaMinerador(enderecoDavide));


console.log("\nIniciando nova mineração....");
hariDineshCoin.minerarTransacoesPendentes(enderecoDavide);
console.log("\Recompensa do Davide é: ", hariDineshCoin.obterRecomenpaMinerador(enderecoDavide));

console.log(hariDineshCoin.chain);