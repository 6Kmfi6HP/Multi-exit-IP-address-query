export async function checkIP(host: string): Promise<string | null> {
  return new Promise((resolve) => {
    const wsHost = `wss://${host}/ws`;
    const ws = new WebSocket(wsHost);
    const timeout = setTimeout(() => {
      ws.close();
      resolve(null);
    }, 5000);

    ws.onopen = () => {
      ws.send('GETIP');
    };

    ws.onmessage = (event) => {
      const data = event.data;
      if (data.startsWith('YOURIP')) {
        const ip = data.split(' ')[1];
        clearTimeout(timeout);
        ws.close();
        resolve(ip);
      }
    };

    ws.onerror = () => {
      clearTimeout(timeout);
      ws.close();
      resolve(null);
    };
  });
}