/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_LINK_TEST } = process.env;

describe("login", () => {
  beforeAll(
    async () =>
      mongoose
        .connect(DB_LINK_TEST)
        .then(() => console.log("db is connected"))
        .catch((err) => console.log(err)),
    20000
  );

  it("must return status 200", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "nomail@gmail.com", password: "qwe123" });

    expect(response.statusCode).toBe(200);
  });

  it("must have token", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "nomail@gmail.com", password: "qwe123" });

    expect(response.body.token).toBeTruthy();
  });

  it("must return contain user object with two string keys", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "nomail@gmail.com", password: "qwe123" });

    expect(response.body.user).toStrictEqual({
      email: expect.any(String),
      subscription: expect.any(String),
    });
  });
  afterAll(async () =>
    mongoose
      .disconnect(DB_LINK_TEST)
      .then(() => console.log("db is disconnected"))
      .catch((err) => console.log(err))
  );
});
