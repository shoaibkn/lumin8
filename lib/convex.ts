import { ConvexHttpClient } from "convex/browser";

export const convexFunctionNames = {
  submitCallRequest: "contact:submitCallRequest",
  submitContactForm: "contact:submitContactForm",
} as const;

let convexClient: ConvexHttpClient | null = null;

export function getConvexClient() {
  if (convexClient) {
    return convexClient;
  }

  const convexUrl = process.env.CONVEX_URL;
  if (!convexUrl) {
    throw new Error("CONVEX_URL is not configured");
  }

  convexClient = new ConvexHttpClient(convexUrl);
  return convexClient;
}
