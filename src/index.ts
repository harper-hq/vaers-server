import { createApp } from "./createServer";

const port = process.env.PORT || 8080;

const app = createApp();

// Start server
app.listen(port, () => {
  console.log(`⚡️[Avers Server]💉: Server is running at http://localhost:${port}`);
});


