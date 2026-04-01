import type { RoleConfig } from '@rh/shared';
import { rolesConfig, cultureFitQuestions } from '@rh/shared';

export function getRoles(): RoleConfig[] {
  return rolesConfig;
}

export function getRoleById(roleId?: string): RoleConfig | undefined {
  return rolesConfig.find((role) => role.id === roleId);
}

export { cultureFitQuestions };
