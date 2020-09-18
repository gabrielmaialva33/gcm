export default interface ICreateEnderecosDTO {
  logradouro: string;
  numero?: string;
  complemento?: string;
  cep: string;
  codigo_endereco?: string;
  bairro_id: string;
}
