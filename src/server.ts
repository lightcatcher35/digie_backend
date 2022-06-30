import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import { schema } from "./schema";
const PORT = process.env.PORT || 8080;


async function startApolloServer() {
  const server = new ApolloServer({ schema });
  const app = express();
  const corstOpts = cors({ origin: true });
  app.use(corstOpts);
  app.use(helmet());
  app.use(compression());

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
  
const httpServer = createServer(app);
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();
