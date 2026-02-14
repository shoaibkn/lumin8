import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const submitCallRequest = mutation({
  args: {
    phoneNumber: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("callRequests", {
      phoneNumber: args.phoneNumber,
      name: args.name,
      createdAt: Date.now(),
    });

    return { id };
  },
});

export const submitContactForm = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("contactSubmissions", {
      name: args.name,
      email: args.email,
      message: args.message,
      createdAt: Date.now(),
    });

    return { id };
  },
});
