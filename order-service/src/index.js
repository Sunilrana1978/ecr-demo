import { createServer } from './server.js';

const PORT = process.env.PORT || 3002;
const app = createServer();

app.listen(PORT, () => {
  console.log(`Order Service listening on port ${PORT}`);
});
