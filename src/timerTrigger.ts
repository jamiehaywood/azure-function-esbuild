import type { InvocationContext, Timer } from "@azure/functions";

export default async (context: InvocationContext, myTimer: Timer): Promise<void> => {
  console.log("Hello");
  context.log("Timer function processed request.");
};
