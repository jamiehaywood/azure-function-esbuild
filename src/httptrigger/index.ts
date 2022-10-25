import { Context, HttpRequest } from "@azure/functions";
import Dayjs from "dayjs";

export default async (context: Context, req: HttpRequest): Promise<void> => {
  context.log("HTTP trigger function processed a request.");
  const name = req.query.name || (req.body && req.body.name);
  const responseMessage = name
    ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    : `The time is ${Dayjs().unix()} UNIX time`;

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage,
  };
};
