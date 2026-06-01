import { createServer } from './server.js';

const PORT = process.env.PORT || 3004;
const app = createServer();

app.listen(PORT, () => {
  console.log(`Supplier Service listening on port ${PORT}`);
});
