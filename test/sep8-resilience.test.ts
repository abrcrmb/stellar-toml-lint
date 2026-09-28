import { auditSep8Timeout } from '../src/protocols/sep8-resilience';

describe('auditSep8Timeout', () => {
  it('reports unresponsive when more than 2 of 5 requests fail', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('timeout'));
    const diagnostics = await auditSep8Timeout('https://example.com/sep8');
    expect(diagnostics).toContain('sep8/approval-server-unresponsive');
  });
});
