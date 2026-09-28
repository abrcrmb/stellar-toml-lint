import { auditClawbackAndFreeze } from '../src/rules/clawback-audit';

describe('auditClawbackAndFreeze', () => {
  it('reports undisclosed-clawback-enabled when horizon flags clawback but toml does not', () => {
    const diagnostics = auditClawbackAndFreeze(
      { clawback_enabled: false, auth_revocable: false },
      { clawback_enabled: true, auth_revocable: false }
    );
    expect(diagnostics).toContain('currencies/undisclosed-clawback-enabled');
  });

  it('reports mismatched-auth-revocable-flag when flags differ', () => {
    const diagnostics = auditClawbackAndFreeze(
      { clawback_enabled: false, auth_revocable: false },
      { clawback_enabled: false, auth_revocable: true }
    );
    expect(diagnostics).toContain('currencies/mismatched-auth-revocable-flag');
  });

  it('returns empty diagnostics when flags match', () => {
    const diagnostics = auditClawbackAndFreeze(
      { clawback_enabled: true, auth_revocable: true },
      { clawback_enabled: true, auth_revocable: true }
    );
    expect(diagnostics).toHaveLength(0);
  });
});
