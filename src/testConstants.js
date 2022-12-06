export const flowsResponse = {
  Flows: [
    {
      __v: 0,
      _id: '62fd4b16006730249d33b19d',
      createdAt: '2022-08-17T20:09:58.530Z',
      deleted: false,
      name: 'fluxo 1',
      sequences: [
        {
          from: '62fd4ac0006730249d33b185',
          to: '62fd4ac5006730249d33b188'
        },
        {
          from: '62fd4ac5006730249d33b188',
          to: '62fd4acb006730249d33b18b'
        }
      ],
      stages: [
        '62fd4ac0006730249d33b185',
        '62fd4ac5006730249d33b188',
        '62fd4acb006730249d33b18b'
      ],
      updatedAt: '2022-08-17T20:09:58.530Z'
    },
    {
      __v: 0,
      _id: '62fff77dd588ebd8c101a12a',
      createdAt: '2022-08-19T20:50:05.831Z',
      deleted: false,
      name: 'outro Fluxo',
      sequences: [
        {
          from: '62fd4ac0006730249d33b185',
          to: '62fd4ac5006730249d33b188'
        },
        {
          from: '62fd4ac5006730249d33b188',
          to: '62fd4acb006730249d33b18b'
        }
      ],
      stages: [
        '62fd4ac0006730249d33b185',
        '62fd4ac5006730249d33b188',
        '62fd4acb006730249d33b18b'
      ],
      updatedAt: '2022-08-19T20:50:05.831Z'
    }
  ]
};

export const processResponse = {
  processes: [
    {
      _id: '62fd4b7f006730249d33b1ab',
      registro: '1111',
      apelido: 'sdlkfja',
      etapas: [],
      arquivado: false,
      etapaAtual: '62fd4ac0006730249d33b185',
      fluxoId: '62fd4b16006730249d33b19d',
      createdAt: 1660767103499,
      updatedAt: 1660767103499,
      __v: 0
    }
  ]
};

export const stagesResponse = {
  Stages: [
    {
      _id: '62fd4ac0006730249d33b185',
      name: 'etpa c1',
      time: '10',
      deleted: false,
      createdAt: '2022-08-17T20:08:32.382+00:00',
      updatedAt: '2022-08-17T20:08:32.382+00:00',
      __v: 0
    },
    {
      _id: '62fd4ac5006730249d33b188',
      name: 'etpa c2',
      time: '15',
      deleted: false,
      createdAt: '2022-08-17T20:08:32.382+00:00',
      updatedAt: '2022-08-17T20:08:32.382+00:00',
      __v: 0
    },
    {
      _id: '62fd4acb006730249d33b18b',
      name: 'etpa c3',
      time: '15',
      deleted: false,
      createdAt: '2022-08-17T20:08:32.382+00:00',
      updatedAt: '2022-08-17T20:08:32.382+00:00',
      __v: 0
    },
    {
      _id: '62fd4acb006730249d33b18c',
      name: 'etpa c4',
      time: '12',
      deleted: false,
      createdAt: '2022-08-17T20:08:32.382+00:00',
      updatedAt: '2022-08-17T20:08:32.382+00:00',
      __v: 0
    }
  ]
};

export const usersResponse = {
  user: [
    {
      _id: '62fd4b7f776730249d33b1ab',
      name: 'João Cardoso',
      email: 'joão12@gmail.com',
      accepted: true,
      role: 4,
      createdAt: '2022-08-17T20:08:32.382+00:00',
      updatedAt: '2022-08-17T20:08:32.382+00:00',
      __v: 0
    },
    {
      _id: '89Fd4b7f016730249d63bboo',
      name: 'Maria Joana',
      email: 'mjoana12@gmail.com',
      accepted: false,
      role: 3,
      createdAt: '2022-08-17T20:08:32.382+00:00',
      updatedAt: '2022-08-17T20:08:32.382+00:00',
      __v: 0
    },
    {
      _id: '84Fd4b7f016740049d63bolo',
      name: 'Marcio de carvalho',
      email: 'marcioc12@gmail.com',
      accepted: false,
      role: 2,
      createdAt: '2022-08-17T20:08:32.382+00:00',
      updatedAt: '2022-08-17T20:08:32.382+00:00',
      __v: 0
    },
    {
      _id: '50fd4a7f000778949d63bart',
      name: 'Rebecca Calda',
      email: 'dirrebecca12@gmail.com',
      accepted: true,
      role: 1,
      createdAt: '2022-08-17T20:08:32.382+00:00',
      updatedAt: '2022-08-17T20:08:32.382+00:00',
      __v: 0
    }
  ]
};

export const units = {
  Unitys: [
    {
      _id: '62fd4b7f776730249d33b1ab',
      name: 'Unidade 1',
      deleted: 'false',
      admins: [
        {
          _id: '62fd4b7f776730249d33b1ab',
          name: 'João Cardoso',
          email: 'joão12@gmail.com',
          accepted: true,
          role: 4,
          createdAt: '2022-08-17T20:08:32.382+00:00',
          updatedAt: '2022-08-17T20:08:32.382+00:00',
          __v: 0
        },
        {
          _id: '89Fd4b7f016730249d63bboo',
          name: 'Maria Joana',
          email: 'mjoana12@gmail.com',
          accepted: false,
          role: 3,
          createdAt: '2022-08-17T20:08:32.382+00:00',
          updatedAt: '2022-08-17T20:08:32.382+00:00',
          __v: 0
        },
        {
          _id: '84Fd4b7f016740049d63bolo',
          name: 'Marcio de carvalho',
          email: 'marcioc12@gmail.com',
          accepted: false,
          role: 2,
          createdAt: '2022-08-17T20:08:32.382+00:00',
          updatedAt: '2022-08-17T20:08:32.382+00:00',
          __v: 0
        },
        {
          _id: '50fd4a7f000778949d63bart',
          name: 'Rebecca Calda',
          email: 'dirrebecca12@gmail.com',
          accepted: true,
          role: 1,
          createdAt: '2022-08-17T20:08:32.382+00:00',
          updatedAt: '2022-08-17T20:08:32.382+00:00',
          __v: 0
        }
      ]
    },
    {
      _id: '89Fd4b7f016730249d63bboo',
      name: 'Unidade 2',
      deleted: 'false',
      admins: [
        {
          _id: '62fd4b7f776730249d33b1ab',
          name: 'João Cardoso',
          email: 'joão12@gmail.com',
          accepted: true,
          role: 4,
          createdAt: '2022-08-17T20:08:32.382+00:00',
          updatedAt: '2022-08-17T20:08:32.382+00:00',
          __v: 0
        }
      ]
    },
    {
      _id: '84Fd4b7f016740049d63bolo',
      name: 'Unidade 3',
      deleted: 'false',
      admins: []
    }
  ]
};

export const adminsList = {
  admins: [
    {
      _id: '6366b61c1103cade86f4b145',
      name: 'João Vitor Alves',
      email: 'vitor.alves07750@outlook.com',
      accepted: true,
      role: 1,
      unity: '6366b55accb406a52123e319',
      createdAt: '2022-11-05T19:14:36.201Z',
      updatedAt: '2022-12-03T16:33:35.634Z',
      __v: 0,
      unityAdmin: '6366b55accb406a52123e319'
    },
    {
      _id: '6366be8a32943db6cb47ffd0',
      name: 'Fernando',
      email: 'teste@gmail.com',
      accepted: true,
      role: 1,
      unity: '6366b55accb406a52123e319',
      createdAt: '2022-11-05T19:50:34.320Z',
      updatedAt: '2022-11-26T14:56:41.146Z',
      __v: 0,
      unityAdmin: '6366b55accb406a52123e319'
    },
    {
      _id: '6369a99b857faed1f519ecb3',
      name: 'Lude Teste',
      email: 'ludeyuri07@gmail.com',
      accepted: true,
      role: 2,
      unity: '6366b55accb406a52123e319',
      createdAt: '2022-11-08T00:58:03.623Z',
      updatedAt: '2022-12-03T16:39:55.619Z',
      __v: 0,
      unityAdmin: '6366b55accb406a52123e319'
    }
  ]
};

export const loggedUser = {
  user: {
    email: 'teste@teste.teste',
    expiresIn: '2022-12-06T22:59:03.775Z',
    name: 'Teste',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjZiZThhMzI5NDNkYjZjYjQ3ZmZkMCIsImlhdCI6MTY3MDEwODM0MywiZXhwIjoxNjcwMzY3NTQzfQ.R7lD6IiNQjwNcSSwqufN7DfqnhfENmA69ddM8JqvlUQ',
    _id: '6366be8a32943db6cb47ffd0'
  }
};
