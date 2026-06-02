import request from "supertest";
import { createApp } from "../app.js";

describe("health", () => {
  it("returns service status", async () => {
    const app = createApp();
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });
});
