import DadosPessoais from '@modules/gcm/infra/typeorm/entities/DadosPessoais';
import ICreateDadosPessoaisDTO from '@modules/gcm/dtos/ICreateDadosPessoaisDTO';

export default interface IDadosPessoaisRepository {
  create(data: ICreateDadosPessoaisDTO): Promise<DadosPessoais>;
  save(dadosPessoais: DadosPessoais): Promise<DadosPessoais>;
  findById(dados_pessoais_id: string): Promise<DadosPessoais | undefined>;
}
