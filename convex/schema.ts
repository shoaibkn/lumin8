import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  callRequests: defineTable({
    phoneNumber: v.string(),
    name: v.string(),
    createdAt: v.number(),
  }).index("by_created_at", ["createdAt"]),
  contactSubmissions: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    createdAt: v.number(),
  }).index("by_created_at", ["createdAt"]),
});
