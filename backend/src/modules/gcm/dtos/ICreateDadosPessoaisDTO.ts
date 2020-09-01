export default interface ICreateDadosPessoaisDTO {
  nome: string;
  rg: string;
  cpf: string;
  telefone?: string;
  celular?: string;
  nome_mae: string;
  nome_pai?: string;
  data_nascimento: Date;
  local_nascimento: string;
  estado_nascimento: string;
  sexo: string;
  nacionalidade?: string;
  naturalidade?: string;
  estado_civil?: string;
  profissao: string;
  escolaridade?: string;
  nome_conjulge?: string;
  nome_filhos: string;
  titulo_eleitor?: string;
  zona_eleitoral?: string;
  cnh?: string;
  validade_cnh?: Date;
  observacao?: string;
}
