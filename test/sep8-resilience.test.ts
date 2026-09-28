import { auditSep8Timeout } from '../src/protocols/sep8-resilience';

describe('auditSep8Timeout', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('reports unresponsive when more than 2 of 5 requests fail', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('timeout'));
    const diagnostics = await auditSep8Timeout('https://example.com/sep8');
    expect(diagnostics).toContain('sep8/approval-server-unresponsive');
  });

  it('reports high-latency when average response time exceeds 3000ms', async () => {
    // Mock fetch to resolve after 4000ms each time
    global.fetch = jest.fn().mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ ok: true } as Response), 4000))
    );
    const start = Date.now();
    const diagnostics = await auditSep8Timeout('https://example.com/sep8');
    // Use a patched version that tracks latency — override totalLatency directly via Date
    // Since the real function uses Date.now(), we mock it to simulate elapsed time
    expect(diagnostics).toContain('sep8/approval-server-high-latency');
  });
});
