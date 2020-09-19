import CreateDadosPessoaisService from '@modules/gcm/services/dados_pessoais/CreateDadosPessoaisService';
import UpdateDadosPessoaisService from '@modules/gcm/services/dados_pessoais/UpdateDadosPessoaisService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class DadosPessoaisController {
  // todo show execute

  //* -> create execute
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const {
      nome,
      rg,
      cpf,
      telefone,
      celular,
      nome_mae,
      nome_pai,
      data_nascimento,
      municipio_nascimento,
      sexo,
      tipo_sanguineo,
      estado_civil,
      profissao,
      escolaridade,
      nome_conjulge,
      nome_filhos,
      titulo_eleitor,
      zona_eleitoral,
      cnh,
      validade_cnh,
      tipo_cnh,
      observacao,
    } = request.body;

    const createDadosPessoais = container.resolve(CreateDadosPessoaisService);
    const dadosPessoais = await createDadosPessoais.execute({
      user_id,
      nome,
      rg,
      cpf,
      telefone,
      celular,
      nome_mae,
      nome_pai,
      data_nascimento,
      municipio_nascimento,
      sexo,
      tipo_sanguineo,
      estado_civil,
      profissao,
      escolaridade,
      nome_conjulge,
      nome_filhos,
      titulo_eleitor,
      zona_eleitoral,
      cnh,
      validade_cnh,
      tipo_cnh,
      observacao,
    });

    return response.json(classToClass(dadosPessoais));
  }

  //* -> update execute
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { dados_pessoais_id } = request.params;
    const {
      nome,
      rg,
      cpf,
      telefone,
      celular,
      nome_mae,
      nome_pai,
      data_nascimento,
      municipio_nascimento,
      sexo,
      tipo_sanguineo,
      estado_civil,
      profissao,
      escolaridade,
      nome_conjulge,
      nome_filhos,
      titulo_eleitor,
      zona_eleitoral,
      cnh,
      validade_cnh,
      tipo_cnh,
      observacao,
    } = request.body;

    const updateDados = container.resolve(UpdateDadosPessoaisService);
    const dadosPessoais = await updateDados.execute({
      user_id,
      dados_pessoais_id,
      nome,
      rg,
      cpf,
      telefone,
      celular,
      nome_mae,
      nome_pai,
      data_nascimento,
      municipio_nascimento,
      sexo,
      tipo_sanguineo,
      estado_civil,
      profissao,
      escolaridade,
      nome_conjulge,
      nome_filhos,
      titulo_eleitor,
      zona_eleitoral,
      cnh,
      validade_cnh,
      tipo_cnh,
      observacao,
    });

    return response.json(classToClass(dadosPessoais));
  }
}

export default new DadosPessoaisController();
