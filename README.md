# CAPJu - Interface

<div align="center">
  <img src="https://i.imgur.com/0KsqIUe.png" alt="logo">
</div>

[![Interface-CI](https://github.com/fga-eps-mds/2022-1-CAPJu-Interface/actions/workflows/CI.yaml/badge.svg)](https://github.com/fga-eps-mds/2022-1-CAPJu-Interface/actions/workflows/CI.yaml) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2022-1-CAPJu-Interface&metric=coverage)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2022-1-CAPJu-Interface)

## Sobre Projetos

O CAPJu é abreviação para _"Controle e Acompanhamento de Processos da Justiça"_, no qual trata-se de uma projeto de código aberto que tem como objetivo ajudar os usuários da 4ª vara cível da Justiça Federal na realização de gerenciar os processos.

Este repositório é destinado exclusivamente ao Front-End do projeto.

O CAPJu é uma aplicação _Web_ compatível com qualquer navegador.

## Tecnologias

<img src="https://download.logo.wine/logo/Node.js/Node.js-Logo.wine.png" alt="nodeJS" height="80" width="auto"/><img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmiro.medium.com%2Fmax%2F5000%2F1*M1XoId5pZaVJiIDAMDTDiw.png&f=1&nofb=1" alt="Express" height="50" width="100"/><img src="https://logos-download.com/wp-content/uploads/2016/09/MongoDB_logo_Mongo_DB.png" alt="MongoBD" height="auto" width="120"/><img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mongoose/mongoose.png" alt="Mogoose" height="80" width="auto"/><img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Flogos-download.com%2Fwp-content%2Fuploads%2F2016%2F09%2FReact_logo_logotype_emblem.png&f=1&nofb=1" alt="ReactJS" height="60" width="auto"/><img src="https://avatars.githubusercontent.com/u/40133106?s=200&v=4" alt="Docsify" height="60" width="auto"/>

- [React](https://pt-br.reactjs.org) Como framework para criação de interface de usuário.

## Demais Repositórios

- [Doc](https://github.com/fga-eps-mds/2022-1-CAPJu-Doc)
- [User](https://github.com/fga-eps-mds/2022-1-CAPJu-User)
- [Service](https://github.com/fga-eps-mds/2022-1-CAPJu-Service)

## Instalação

A aplicação encontra-se em homologação acessando o seguinte [LINK](https://capju.vercel.app/)

### Executando as coisas localmente

Quer ver o projeto funcionando em sua máquina?

Você precisará ter o [NodeJS](https://nodejs.org/en/) e o [Yarn](https://yarnpkg.com/) previamente instalados.

E o projeto foi implementado em máquinas com sistemas operacionais de distribuição Linux, portanto os passos encontrados a seguir mostram orientações de sistemas Linux.

Em caso tentativa de execução em outro sistema operacional como, o Windows, recomenda-se uma pesquisa breve. E os usuários do MacOS certamente podem pagar alguém para descobrir como fazer isso.

Será necessário que adicione uma variavel em um arquivo `.env` dentro na pasta raiz do projeto com nome `REACT_APP_DEV=true` para que possa executar na porta 3000 do serviço local

_Abra http://localhost:3000 para ver em seu navegador._

**Executando os Serviços**

Nos repositórios _2022-1-CAPJu-Service_ e _2022-1-CAPJu-User_:

```bash
$ cd ~/your/directory/
$ git clone https://github.com/fga-eps-mds/2022-1-CAPJu-Service.git
$ cd 2022-1-CAPJu-Service
```

```bash
$ cd ~/your/directory/
$ git clone https://github.com/fga-eps-mds/2022-1-CAPJu-User.git
$ cd 2022-1-CAPJu-User
```

Caso exista um serviço MongoDB em nuvem, adicione a string de conexão a um arquivo `.env` dentro na pasta raiz do projeto com nome `MONGODB_URI`

Caso não seja configurada uma string de conexão personalizada, a aplicação se conectará à porta 27017 do serviço local

No arquvo `.env` também será necessário que adicione um string com nome `JWT_SECRET` para realização autenticação do usuário

<br>

No repositórios _2022-1-CAPJu-Interface_:

```bash
$ cd ~/your/directory/
$ git clone https://github.com/fga-eps-mds/2022-1-CAPJu-Interface.git
$ cd 2022-1-CAPJu-Interface
```

Instale as dependencias.

```bash
$ yarn install
```

Inicie a aplicação

```bash
$ yarn start
```

<br>

## Testes

Para rodar os testes execulte:

```bash
$ yarn test
```

### Instalando de Dependecias

Pode ser utilizado o seguinte comando para inserir novas dependencias no sistema

```bash
$ yarn add "nome_da_dependencia"
```

### Deployment

[GitHub Actions](https://github.com/fga-eps-mds/2022-1-CAPJu-Interface/actions).

## Contribuição

Certifique-se de ler o [Guia de Contribuição](https://github.com/fga-eps-mds/2022-1-CAPJu-Doc/blob/main/.github/CONTRIBUTING.md) antes de realizar qualquer atividade no projeto!

## Licença

O CAPJu está sob as regras aplicadas na licença [MIT](https://github.com/fga-eps-mds/2022-1-CAPJu-Doc/blob/main/LICENSE)
