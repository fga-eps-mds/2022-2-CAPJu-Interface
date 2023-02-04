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
      'view-unit',
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
    actions: [
      'edit-unit',
      'delete-unit',
      'create-unit',
      'view-admins',
      'add-admin-in-unit'
    ],
    users: [Permissions.ADMINISTRADOR]
  },
  {
    actions: 'view-user',
    users: [Permissions.DIRETOR, Permissions.ADMINISTRADOR]
  },
  {
    actions: [
      'create-user',
      'accept-user',
      'regress-stage',
      'delete-user',
      'edit-user'
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
