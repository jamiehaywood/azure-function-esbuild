import { app } from "@azure/functions";
import httpTrigger from "./httpTrigger";
// import timerTrigger from "./timerTrigger";

app.http("httpTrigger", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: httpTrigger,
});

// app.timer("timerTrigger", {
//   schedule: "*/10 * * * * *",
//   handler: timerTrigger,
// });
