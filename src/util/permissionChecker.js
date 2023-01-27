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
      'create-stage',
      'edit-stage',
      'delete-stage',
      'create-flow',
      'edit-flow',
      'delete-flow'
    ],
    users: [
      Permissions.DIRETOR,
      Permissions.SERVIDOR,
      Permissions.ADMINISTRADOR
    ]
  },
  {
    actions: [
      'create-process',
      'edit-process',
      'delete-process',
      'advance-stage'
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
      'view-stage',
      'view-flow',
      'view-process',
      'view-admins',
      'view-unity',
      'edit-account'
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
    actions: ['edit-unity', 'delete-unity', 'create-unity'],
    users: [Permissions.ADMINISTRADOR]
  },
  {
    actions: 'view-user',
    users: [Permissions.DIRETOR, Permissions.JUIZ, Permissions.ADMINISTRADOR]
  },
  {
    actions: [
      'create-user',
      'accept-user',
      'regress-stage',
      'delete-user',
      'edit-user',
      'add-admin-in-unity'
    ],
    users: [Permissions.DIRETOR, Permissions.ADMINISTRADOR]
  },
  {
    actions: ['view-process-in-flow', 'view-statistic-of-process-in-flow'],
    users: [
      Permissions.ESTAGIARIO,
      Permissions.DIRETOR,
      Permissions.JUIZ,
      Permissions.SERVIDOR,
      Permissions.ADMINISTRADOR
    ]
  }
];

export default function hasPermission(user, permissionName) {
  if (user == null) {
    return false;
  } else {
    const permission = permissionsArray.find((p) =>
      p.actions.includes(permissionName)
    );
    const hasPermission = permission.users.includes(user.idRole);
    return hasPermission;
  }
}
