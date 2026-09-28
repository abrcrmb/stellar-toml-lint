export async function auditSep8Timeout(serverUrl: string) {
  const diagnostics = [];
  let totalLatency = 0;
  let failures = 0;
  
  for (let i = 0; i < 5; i++) {
    const start = Date.now();
    try {
      await fetch(serverUrl);
      totalLatency += Date.now() - start;
    } catch (e) {
      failures++;
    }
  }
  
  if (failures > 2) {
    diagnostics.push('sep8/approval-server-unresponsive');
  } else if (totalLatency / 5 > 2000) {
    diagnostics.push('sep8/approval-server-high-latency');
  }
  return diagnostics;
}
