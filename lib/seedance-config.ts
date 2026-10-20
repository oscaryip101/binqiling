// Server-side configuration only. Never pass API keys to client components.
export const PRO_FAST_MODEL = 'doubao-seedance-1-0-pro-fast-251015';

export function resolveSeedanceConfig(bindings: Record<string, unknown>) {
 const namedKey = typeof bindings[PRO_FAST_MODEL] === 'string'
  ? bindings[PRO_FAST_MODEL].trim() : '';
 const standardKey = typeof bindings.ARK_API_KEY === 'string'
  ? bindings.ARK_API_KEY.trim() : '';
 const configuredModel = typeof bindings.SEEDANCE_MODEL === 'string'
  ? bindings.SEEDANCE_MODEL.trim() : '';
 return {
  ARK_API_KEY: standardKey || namedKey,
  SEEDANCE_MODEL: configuredModel || (namedKey ? PRO_FAST_MODEL : 'doubao-seedance-2-5-260628'),
 };
}
