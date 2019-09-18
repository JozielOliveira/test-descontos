class Titular {
  telefone : String
  email : String
}
class PessoaFisica extends Titular {
  constructor() {super()}
  nome : String
  age : number
}

class Recidencia {
  rua : String
  caixaAgua : Boolean
  dono : PessoaFisica
}

class Leitura {
  numberoHidrometro: number
  leituraAnterior: Date
  leituraAtual: Date
  recidencia: Recidencia
}

class Regra {
  operador : 'igual' | 'maior' | 'menor'
  atributo : 'consumo' | 'leitura' | 'desconto' | 'titular' | 'recidencia'
  subAtributo: 'rua' | 'caixaAgua' | 'nome'
  parametro: any
  valor: number
  
  getDesconto (cobranca: Cobranca) {
    if(this.subAtributo)
      if((this[this.operador](cobranca[this.atributo][this.subAtributo], this.parametro )))
        return this.valor
    
    if(this[this.operador](cobranca[this.atributo], this.parametro ))
      return this.valor
  }

  igual (a, b) { return a === b }
  
  maior (a, b) { return a > b }

  menor (a, b) { return a < b}
}

class Categoria {
  name : String
  regras: [Regra]
}
class Cobranca {
  consumo: number
  leitura: Leitura
  desconto: Categoria
  titular: Titular
  recidencia: Recidencia

  aplicarDesconto () {
  }
}

const joao = new PessoaFisica()
joao.telefone = "95808816"
joao.email = "email@gmail.com"
joao.nome = "John"
joao.age = 16

const casaJoao = new Recidencia()
casaJoao.rua = "Av. D"
casaJoao.caixaAgua = true
casaJoao.dono = joao

const leitura1 = new Leitura()
leitura1.numberoHidrometro= 123
leitura1.leituraAnterior= new Date
leitura1.leituraAtual= new Date
leitura1.recidencia = casaJoao

// TAXA
const regraExesso = new Regra()
regraExesso.operador = 'maior'
regraExesso.parametro = 5000
regraExesso.atributo = 'consumo'
regraExesso.valor = 25

const taxaExesso = new Categoria()
taxaExesso.name = "Taxa por exesso"
taxaExesso.regras = [regraExesso]

// DESCONTO
const regraCaixaAgua = new Regra()
regraExesso.operador = 'igual'
regraExesso.parametro = true
regraExesso.atributo = 'recidencia'
regraExesso.subAtributo = 'caixaAgua'
regraExesso.valor = 250

const descontoCaixaAgua = new Categoria()
descontoCaixaAgua.name = "Desconto da Caixa d`agua"
descontoCaixaAgua.regras = [regraCaixaAgua]

//COBRANCA
const cobranca1Joao = new Cobranca()
cobranca1Joao.consumo = 1235
cobranca1Joao.leitura = leitura1
cobranca1Joao.desconto = descontoCaixaAgua
