import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDadosPessoaisService from '@modules/gcm/services/dados_pessoais/CreateDadosPessoaisService';
import UpdateDadosPessoaisService from '@modules/gcm/services/dados_pessoais/UpdateDadosPessoaisService';
import CreateBairroService from '@modules/endereco/services/bairro/CreateBairroService';
import CreateEnderecoServices from '@modules/endereco/services/endereco/CreateEnderecoService';
import CreateCgmService from '@modules/gcm/services/gcm/CreateGcmService';

class GcmController {
  // todo show execute

  //* -> create execute
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const {
      // -> dados_pessoais
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
      // -> bairro
      nome_bairro,
      municipio,
      // -> endereco
      logradouro,
      numero,
      complemento,
      cep,
      // -> gcm
      nome_guerra,
      atribuicao,
    } = request.body;

    //* -> execute create dados_pessoais
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

    //* -> execute create bairro
    const createBairro = container.resolve(CreateBairroService);
    const bairro = await createBairro.execute({
      user_id,
      nome: nome_bairro,
      municipio,
    });

    //* -> execute create endereco
    const createEndereco = container.resolve(CreateEnderecoServices);
    const endereco = await createEndereco.execute({
      logradouro,
      numero,
      complemento,
      cep,
      bairro_id: bairro.id,
    });

    //* -> execute create gcm
    const createGcm = container.resolve(CreateCgmService);
    const gcm = await createGcm.execute({
      dados_pessoais_id: dadosPessoais.id,
      endereco_id: endereco.id,
      nome_guerra,
      atribuicao,
    });

    return response.json(classToClass(gcm));
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

export default new GcmController();
