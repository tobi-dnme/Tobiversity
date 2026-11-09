/* Code copied from LogRocket tutorial: Axios POST requests: Handling errors, authentication, and best practices */
import axios from "axios";

export function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const data = error.response.data;

      if (typeof data !== "object") {
        return "Something went wrong on the server.";
      }

      if (data.error) {
        return data.error;
      }

      const messages: string[] = [];
      for (const field in data) {
        messages.push(field + ": " + data[field]);
      }
      return messages.join(" ");
    }

    return "Could not reach the server. Is Django running?";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong.";
}