export function auditClawbackAndFreeze(asset: any, horizonAccountFlags: any) {
  const diagnostics = [];
  if (horizonAccountFlags.clawback_enabled && !asset.clawback_enabled) {
    diagnostics.push('currencies/undisclosed-clawback-enabled');
  }
  if (horizonAccountFlags.auth_revocable && !asset.auth_revocable) {
    diagnostics.push('currencies/mismatched-auth-revocable-flag');
  }
  return diagnostics;
}
