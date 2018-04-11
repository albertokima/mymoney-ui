export class PessoaFiltro {
  nome: string;
  pagina = 0;
  linhas = 5;
  campo: string;
  ordem = 1;
}

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;
  pagina = 0;
  linhas = 5;
  campo: string;
  ordem = 1;
}
