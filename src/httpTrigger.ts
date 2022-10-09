import type { HttpRequest, InvocationContext } from "@azure/functions";

export default async (context: InvocationContext, request: HttpRequest) => {
  context.log(`Http function processed request for url "${request.url}"`);

  const name = request.query.get("name") || (await request.text()) || "world";

  return { body: `Hello, ${name}!` };
};
