import DadosPessoais from '@modules/gcm/infra/typeorm/entities/DadosPessoais';
import ICreateDadosPessoaisDTO from '@modules/gcm/dtos/ICreateDadosPessoaisDTO';

export default interface IDadosPessoais {
  create(data: ICreateDadosPessoaisDTO): Promise<DadosPessoais>;
  save(dadosPessoais: DadosPessoais): Promise<DadosPessoais>;
}
