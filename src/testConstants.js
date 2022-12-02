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
      password: 'Password1234',
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
      password: 'Password1234',
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
      password: 'Password1234',
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
      password: 'Password1234',
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
          password: 'Password1234',
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
          password: 'Password1234',
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
          password: 'Password1234',
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
          password: 'Password1234',
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
          password: 'Password1234',
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
