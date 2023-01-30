export const adminsList = [
  {
    cpf: '38939885058',
    fullName: 'Samuel Gomes',
    email: 'samuel@email.com',
    accepted: true,
    idRole: 5,
    idUnit: 1,
    createdAt: '2023-01-25T20:08:32.382+00:00',
    updatedAt: '2023-01-18T21:07:32.382+00:00'
  },
  {
    cpf: '17527266007',
    fullName: 'João Vitor Alves',
    email: 'vitor.alves07750@outlook.com',
    accepted: true,
    idRole: 1,
    idUnit: 1,
    createdAt: '2022-11-05T19:14:36.201Z',
    updatedAt: '2022-12-03T16:33:35.634Z'
  },
  {
    cpf: '11840118008',
    fullName: 'Fernando',
    email: 'teste@gmail.com',
    accepted: true,
    idRole: 1,
    idUnit: 1,
    createdAt: '2022-11-05T19:50:34.320Z',
    updatedAt: '2022-11-26T14:56:41.146Z'
  },
  {
    cpf: '56639810042',
    fullName: 'Lude Teste',
    email: 'ludeyuri07@gmail.com',
    accepted: true,
    idRole: 2,
    idUnit: 1,
    createdAt: '2022-11-08T00:58:03.623Z',
    updatedAt: '2022-12-03T16:39:55.619Z'
  }
];

export const prioritiesResponse = [
  {
    idPriority: 1,
    description: 'Art. 1048, II. Do CPC (ECA)',
    createdAt: '2023-01-26T18:03:26.842Z',
    updatedAt: '2023-01-26T18:03:26.842Z'
  },
  {
    idPriority: 2,
    description: 'Art. 1048, IV do CPC (Licitação)',
    createdAt: '2023-01-26T18:03:26.842Z',
    updatedAt: '2023-01-26T18:03:26.842Z'
  },
  {
    idPriority: 3,
    description: 'Art. 7, parágrafo 4, da Lei n 12.016/2009',
    createdAt: '2023-01-26T18:03:26.842Z',
    updatedAt: '2023-01-26T18:03:26.842Z'
  },
  {
    idPriority: 4,
    description: 'Idosa(a) maior de 80 anos',
    createdAt: '2023-01-26T18:03:26.842Z',
    updatedAt: '2023-01-26T18:03:26.842Z'
  },
  {
    idPriority: 5,
    description: 'Pessoa com deficiencia',
    createdAt: '2023-01-26T18:03:26.842Z',
    updatedAt: '2023-01-26T18:03:26.842Z'
  },
  {
    idPriority: 6,
    description: 'Pessoa em situação de rua',
    createdAt: '2023-01-26T18:03:26.842Z',
    updatedAt: '2023-01-26T18:03:26.842Z'
  },
  {
    idPriority: 7,
    description: 'Portador(a) de doença grave',
    createdAt: '2023-01-26T18:03:26.842Z',
    updatedAt: '2023-01-26T18:03:26.842Z'
  }
];

export const stagesResponse = [
  {
    createdAt: '2022-08-17T20:08:32.382+00:00',
    duration: 10,
    idStage: '1',
    idUnit: 4,
    name: 'etpa c1',
    updatedAt: '2022-08-17T20:08:32.382+00:00'
  },
  {
    createdAt: '2022-08-17T20:08:32.382+00:00',
    duration: 15,
    idStage: '2',
    idUnit: 4,
    name: 'etpa c2',
    updatedAt: '2022-08-17T20:08:32.382+00:00'
  },
  {
    createdAt: '2022-08-17T20:08:32.382+00:00',
    duration: 15,
    idStage: '3',
    idUnit: 4,
    name: 'etpa c3',
    updatedAt: '2022-08-17T20:08:32.382+00:00'
  },
  {
    createdAt: '2022-08-17T20:08:32.382+00:00',
    duration: 12,
    idStage: '4',
    idUnit: 4,
    name: 'etpa c4',
    updatedAt: '2022-08-17T20:08:32.382+00:00'
  }
];

export const flowsResponse = [
  {
    idFlow: '1',
    idUnit: 4,
    name: 'fluxo 1',
    sequences: [
      {
        from: 1,
        commentary: 'teste',
        to: 2
      },
      {
        from: 2,
        commentary: 'teste2',
        to: 3
      }
    ],
    stages: ['1', '2', '3', '4'],
    users: []
  },
  {
    idFlow: '2',
    idUnit: 4,
    name: 'outro Fluxo',
    sequences: [
      {
        from: 2,
        commentary: 'teste3',
        to: 1
      },
      {
        from: 3,
        commentary: 'teste4',
        to: 2
      }
    ],
    stages: ['1', '2', '3', '4'],
    users: []
  }
];

export const processResponse = [
  {
    createdAt: '2022-08-17T20:09:58.530Z',
    idPriority: 0,
    idStage: '0',
    idUnit: 4,
    idFlow: 2,
    nickname: 'sdlkfja',
    record: '1111'
  },
  {
    createdAt: '2022-08-17T20:09:58.530Z',
    idPriority: 2,
    idStage: '0',
    idUnit: 4,
    idFlow: 2,
    nickname: 'Processo teste',
    record: '2222'
  }
];

export const usersResponse = [
  {
    accepted: true,
    cpf: '45632356019',
    createdAt: '2022-08-17T20:08:32.382+00:00',
    email: 'Adm@gmail.com',
    fullName: 'Adm Cardoso',
    idRole: 5,
    idUnit: 3,
    updatedAt: '2022-08-17T20:08:32.382+00:00'
  },
  {
    accepted: true,
    cpf: '19283905016',
    createdAt: '2022-08-17T20:08:32.382+00:00',
    email: 'joão12@gmail.com',
    fullName: 'João Cardoso',
    idRole: 4,
    idUnit: 4,
    updatedAt: '2022-08-17T20:08:32.382+00:00'
  },
  {
    accepted: false,
    cpf: '71155647017',
    createdAt: '2022-08-17T20:08:32.382+00:00',
    email: 'mjoana12@gmail.com',
    fullName: 'Maria Joana',
    idRole: 3,
    idUnit: 4,
    updatedAt: '2022-08-17T20:08:32.382+00:00'
  },
  {
    accepted: false,
    cpf: '93863200020',
    createdAt: '2022-08-17T20:08:32.382+00:00',
    email: 'marcioc12@gmail.com',
    fullName: 'Marcio de carvalho',
    idRole: 2,
    idUnit: 4,
    updatedAt: '2022-08-17T20:08:32.382+00:00'
  },
  {
    accepted: true,
    cpf: '46846760059',
    createdAt: '2022-08-17T20:08:32.382+00:00',
    email: 'dirrebecca12@gmail.com',
    fullName: 'Rebecca Calda',
    idRole: 1,
    idUnit: 4,
    updatedAt: '2022-08-17T20:08:32.382+00:00'
  }
];

export const units = [
  {
    idUnit: '62fd4b7f776730249d33b1ab',
    name: 'Unidade 1',
    admins: adminsList
  },
  {
    idUnit: '89Fd4b7f016730249d63bboo',
    name: 'Unidade 2',
    admins: [
      {
        accepted: true,
        cpf: '59112136050',
        createdAt: '2023-01-17T20:03:32.382+00:00',
        email: 'chaydson@email.com',
        fullName: 'Chaydson Ferreira',
        idRole: 5,
        idUnit: 4,
        updatedAt: '2023-01-17T20:03:32.382+00:00'
      },
      {
        accepted: true,
        cpf: '32705802070',
        createdAt: '2022-08-17T20:08:32.382+00:00',
        email: 'joão12@gmail.com',
        fullName: 'João Cardoso',
        idRole: 5,
        idUnit: 4,
        updatedAt: '2022-08-17T20:08:32.382+00:00'
      }
    ]
  },
  {
    idUnit: '84Fd4b7f016740049d63bolo',
    name: 'Unidade 3',
    admins: [
      {
        accepted: true,
        cpf: '59674889019',
        createdAt: '2023-02-17T20:08:32.382+00:00',
        fullName: 'Adm Silva',
        email: 'AdmSilva@gmail.com',
        idRole: 5,
        idUnit: 3,
        updatedAt: '2023-02-17T20:08:32.382+00:00'
      }
    ]
  }
];

export const loggedUser = [
  {
    cpf: '79025160077',
    email: 'teste@teste.teste',
    expiresIn: '2022-12-06T22:59:03.775Z',
    fullName: 'Teste',
    idRole: 5,
    idUnit: 4,
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjZiZThhMzI5NDNkYjZjYjQ3ZmZkMCIsImlhdCI6MTY3MDEwODM0MywiZXhwIjoxNjcwMzY3NTQzfQ.R7lD6IiNQjwNcSSwqufN7DfqnhfENmA69ddM8JqvlUQ'
  }
];

export const precessForShowProcess = [
  {
    createdAt: '2022-08-17T20:09:58.530Z',
    effectiveDate: '2023-01-30T04:45:56.480Z',
    idPriority: 0,
    idStage: '2',
    idUnit: 4,
    nickname: 'sdlkfja',
    record: '1111',
    updatedAt: '2023-01-30T04:45:56.480Z'
  }
];
