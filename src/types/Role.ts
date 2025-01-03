export enum RoleEnum {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  PROFESSOR = "PROFESSOR",
  STUDENT = "STUDENT",
}

export interface Role {
  id: number;
  name: RoleEnum;
}

export const roles: Role[] = [
  {
    id: 1,
    name: RoleEnum.SUPER_ADMIN,
  },
  {
    id: 2,
    name: RoleEnum.ADMIN,
  },
  {
    id: 3,
    name: RoleEnum.PROFESSOR,
  },
  {
    id: 4,
    name: RoleEnum.STUDENT,
  },
];

export function getRole(roleId: number): Role {
  return (
    roles.find((_r) => _r.id === roleId) ?? { id: 4, name: RoleEnum.STUDENT }
  );
}

export function getIdByRole(roleName: RoleEnum): number {
  return roles.find((_r) => _r.name === roleName)?.id ?? 4;
}

export function isSuperAdmin(
  authorities: Role[] | undefined
): boolean | undefined {
  return authorities?.some((_r) => _r.name === RoleEnum.SUPER_ADMIN);
}

export function isAdmin(authorities: Role[] | undefined): boolean | undefined {
  return authorities?.some(
    (_r) => _r.name === RoleEnum.ADMIN || _r.name === RoleEnum.SUPER_ADMIN
  );
}
