import { createServer } from './server.js';

const PORT = process.env.PORT || 3003;
const app = createServer();

app.listen(PORT, () => {
  console.log(`Inventory Service listening on port ${PORT}`);
});
