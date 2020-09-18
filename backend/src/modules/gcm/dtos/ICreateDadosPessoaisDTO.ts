export default interface ICreateDadosPessoaisDTO {
  nome: string;
  rg: string;
  cpf: string;
  telefone?: string[];
  celular?: string[];
  nome_mae: string;
  nome_pai?: string;
  data_nascimento: Date;
  municipio_nascimento_id: string;
  sexo: string;
  tipo_sanguineo: string;
  estado_civil?: string;
  profissao?: string[];
  escolaridade?: string;
  nome_conjulge?: string;
  nome_filhos?: string[];
  titulo_eleitor?: string;
  zona_eleitoral?: string;
  cnh?: string;
  validade_cnh?: Date;
  tipo_cnh?: string;
  observacao?: string;
}
