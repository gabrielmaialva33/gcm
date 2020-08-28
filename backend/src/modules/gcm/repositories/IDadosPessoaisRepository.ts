import DadosPessoais from '@modules/gcm/infra/typeorm/entities/DadosPessoais';
import ICreateDadosPessoaisDTO from '@modules/gcm/dtos/ICreateDadosPessoaisDTO';

export default interface IDadosPessoaisRepository {
  create(data: ICreateDadosPessoaisDTO): Promise<DadosPessoais>;
  save(dadosPessoais: DadosPessoais): Promise<DadosPessoais>;
  findById(dados_pessoais_id: string): Promise<DadosPessoais | undefined>;
  findByRg(rg: string): Promise<DadosPessoais | undefined>;
  findByCpf(cpf: string): Promise<DadosPessoais | undefined>;
  findByTituloEleitor(
    titulo_eleitor: string,
  ): Promise<DadosPessoais | undefined>;
  findByCnh(cnh: string): Promise<DadosPessoais | undefined>;
}
