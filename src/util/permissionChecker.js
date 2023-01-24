export const Permissions = {
  DIRETOR: 1,
  JUIZ: 2,
  SERVIDOR: 3,
  ESTAGIARIO: 4,
  ADMINISTRADOR: 5
};

const permissionsArray = [
  {
    actions: [
      'criar-etapa',
      'editar-etapa',
      'apagar-etapa',
      'criar-fluxo',
      'editar-fluxo',
      'apagar-fluxo'
    ],
    users: [
      Permissions.DIRETOR,
      Permissions.SERVIDOR,
      Permissions.ADMINISTRADOR
    ]
  },
  {
    actions: [
      'criar-processo',
      'editar-processo',
      'apagar-processo',
      'avançar-etapa'
    ],
    users: [
      Permissions.ESTAGIARIO,
      Permissions.DIRETOR,
      Permissions.SERVIDOR,
      Permissions.ADMINISTRADOR
    ]
  },
  {
    actions: [
      'visualizar-etapa',
      'visualizar-fluxo',
      'visualizar-processo',
      'visualizar-unidade',
      'editar-conta'
    ],
    users: [
      Permissions.ESTAGIARIO,
      Permissions.DIRETOR,
      Permissions.JUIZ,
      Permissions.SERVIDOR,
      Permissions.ADMINISTRADOR
    ]
  },
  {
    actions: ['editar-unidade', 'apagar-unidade', 'criar-unidade'],
    users: [Permissions.ADMINISTRADOR]
  },
  {
    actions: 'visualizar-usuario',
    users: [Permissions.DIRETOR, Permissions.JUIZ, Permissions.ADMINISTRADOR]
  },
  {
    actions: [
      'criar-usuario',
      'aceitar-usuario',
      'retroceder-etapa',
      'apagar-usuario',
      'editar-usuario'
    ],
    users: [Permissions.DIRETOR, Permissions.ADMINISTRADOR]
  },
  {
    actions: [
      'visualizar-processo-no-fluxo',
      'visualizar-estatistica-dos-processos-no-fluxo'
    ],
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
    const permission = permissionsArray.find((p) =>
      p.actions.includes(permissionName)
    );
    const hasPermission = permission.users.includes(user.role);
    return hasPermission;
  }
}
