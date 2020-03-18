import api from './api';

const startServer = () => {
  const PORT = process.env.PORT || 3000;
  const IP = process.env.IP || '127.0.0.1';

  const server = api.listen(PORT, IP, () => {
    console.log('API Server has started');
    const { address, port } = server.address();
    console.log(`running at http://${address}:${port}`);
  });
};

startServer();
