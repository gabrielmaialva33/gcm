export default interface ICreateEnderecosDTO {
  logradouro: string;
  numero?: number;
  bairro?: string;
  complemento?: string;
  cidade: string;
  estado: string;
  cep: string;
  codigo: string;
}
