import { createServer } from './server.js';

const PORT = process.env.PORT || 3001;
const app = createServer();

app.listen(PORT, () => {
  console.log(`Todo API listening on port ${PORT}`);
});
