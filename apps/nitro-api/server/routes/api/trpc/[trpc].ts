import { cors } from "nitro-cors";
import { _appRouter } from "@spike/api";
import { createContext } from "@spike/api/context";
import { defineTRPCEventHandler } from "@falcondev-oss/nitro-trpc-event-handler";

export default eventHandler({
  handler: defineTRPCEventHandler({
    router: _appRouter,
    createContext: async (req) => {
      await createContext({ authHeader: req.headers.get("authentication") });
    },
  }),
  onRequest: [
    cors({
      origin: "*",
      methods: "*",
    }),
  ],
});
