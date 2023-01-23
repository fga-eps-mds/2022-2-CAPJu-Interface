export const Permissions = {
  DIRETOR: 1,
  JUIZ: 2,
  SERVIDOR: 3,
  ESTAGIARIO: 4,
  ADMINISTRADOR: 5
};

const permissionsArray = [
  {
    id: 2,
    name: 'criar-etapa',
    users: [
      Permissions.DIRETOR,
      Permissions.SERVIDOR,
      Permissions.ADMINISTRADOR
    ]
  },
  {
    name: 'visualizar-etapa',
    users: [
      Permissions.ESTAGIARIO,
      Permissions.DIRETOR,
      Permissions.JUIZ,
      Permissions.SERVIDOR,
      Permissions.ADMINISTRADOR
    ]
  },
  {
    name: 'editar-etapa',
    users: [
      Permissions.DIRETOR,
      Permissions.SERVIDOR,
      Permissions.ADMINISTRADOR
    ]
  },
  {
    name: 'apagar-etapa',
    users: [
      Permissions.DIRETOR,
      Permissions.SERVIDOR,
      Permissions.ADMINISTRADOR
    ]
  },
  {
    name: 'criar-fluxo',
    users: [
      Permissions.DIRETOR,
      Permissions.SERVIDOR,
      Permissions.ADMINISTRADOR
    ]
  },
  {
    name: 'visualizar-fluxo',
    users: [
      Permissions.ESTAGIARIO,
      Permissions.DIRETOR,
      Permissions.JUIZ,
      Permissions.SERVIDOR,
      Permissions.ADMINISTRADOR
    ]
  },
  {
    name: 'editar-fluxo',
    users: [
      Permissions.DIRETOR,
      Permissions.SERVIDOR,
      Permissions.ADMINISTRADOR
    ]
  },
  {
    name: 'apagar-fluxo',
    users: [
      Permissions.DIRETOR,
      Permissions.SERVIDOR,
      Permissions.ADMINISTRADOR
    ]
  },
  {
    name: 'criar-processo',
    users: [
      Permissions.ESTAGIARIO,
      Permissions.DIRETOR,
      Permissions.SERVIDOR,
      Permissions.ADMINISTRADOR
    ]
  },
  {
    name: 'visualizar-processo',
    users: [
      Permissions.ESTAGIARIO,
      Permissions.DIRETOR,
      Permissions.JUIZ,
      Permissions.SERVIDOR,
      Permissions.ADMINISTRADOR
    ]
  },
  {
    name: 'editar-processo',
    users: [
      Permissions.ESTAGIARIO,
      Permissions.DIRETOR,
      Permissions.SERVIDOR,
      Permissions.ADMINISTRADOR
    ]
  },
  {
    name: 'apagar-processo',
    users: [
      Permissions.ESTAGIARIO,
      Permissions.DIRETOR,
      Permissions.SERVIDOR,
      Permissions.ADMINISTRADOR
    ]
  },
  { name: 'criar-unidade', users: [Permissions.ADMINISTRADOR] },
  {
    name: 'visualizar-unidade',
    users: [
      Permissions.ESTAGIARIO,
      Permissions.DIRETOR,
      Permissions.JUIZ,
      Permissions.SERVIDOR,
      Permissions.ADMINISTRADOR
    ]
  },
  {
    name: 'editar-conta',
    users: [
      Permissions.ESTAGIARIO,
      Permissions.DIRETOR,
      Permissions.JUIZ,
      Permissions.SERVIDOR,
      Permissions.ADMINISTRADOR
    ]
  },
  {
    name: 'editar-unidade',
    users: [Permissions.ADMINISTRADOR]
  },
  {
    name: 'apagar-unidade',
    users: [Permissions.ADMINISTRADOR]
  },
  {
    name: 'criar-usuario',
    users: [Permissions.DIRETOR, Permissions.ADMINISTRADOR]
  },
  {
    name: 'visualizar-usuario',
    users: [Permissions.DIRETOR, Permissions.JUIZ, Permissions.ADMINISTRADOR]
  },
  {
    name: 'editar-usuario',
    users: [Permissions.DIRETOR, Permissions.ADMINISTRADOR]
  },
  {
    name: 'apagar-usuario',
    users: [Permissions.DIRETOR, Permissions.ADMINISTRADOR]
  },
  {
    name: 'aceitar-usuario',
    users: [Permissions.DIRETOR, Permissions.ADMINISTRADOR]
  },
  {
    name: 'avançar-etapa',
    users: [
      Permissions.ESTAGIARIO,
      Permissions.DIRETOR,
      Permissions.SERVIDOR,
      Permissions.ADMINISTRADOR
    ]
  },
  {
    name: 'retroceder-etapa',
    users: [
      Permissions.ESTAGIARIO,
      Permissions.DIRETOR,
      Permissions.SERVIDOR,
      Permissions.ADMINISTRADOR
    ]
  },
  {
    name: 'visualizar-processo-no-fluxo',
    users: [
      Permissions.ESTAGIARIO,
      Permissions.DIRETOR,
      Permissions.JUIZ,
      Permissions.SERVIDOR,
      Permissions.ADMINISTRADOR
    ]
  },
  {
    name: 'visualizar-estatistica-dos-processos-no-fluxo',
    users: [
      Permissions.ESTAGIARIO,
      Permissions.DIRETOR,
      Permissions.JUIZ,
      Permissions.SERVIDOR,
      Permissions.ADMINISTRADOR
    ]
  }
];

export default function verifyRole(user, permissionName) {
  if (user == null) {
    return false;
  } else {
    const permission = permissionsArray.find((p) => p.name === permissionName);
    const hasPermission = permission.users.includes(user.role);
    return hasPermission;
  }
}
