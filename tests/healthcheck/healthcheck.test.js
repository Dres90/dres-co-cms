const fs = require('fs');
const { setupStrapi, cleanupStrapi } = require("../helpers/strapi");

beforeAll(async () => {
  await setupStrapi();
});

afterAll(async () => {
  await cleanupStrapi();
});

it("strapi is defined", () => {
  expect(strapi).toBeDefined();
});

it("should be true", () => {
    expect(true).toBe(true);
})