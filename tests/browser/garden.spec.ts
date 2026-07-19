import { expect, test } from "@playwright/test";
import sampleReport from "../../fixtures/sample-report.json";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".garden-stage")).toBeVisible();
});

test("plant buttons support pointer inspection and the challenge stays in-map", async ({
  page,
}) => {
  await page.locator(".map-plant-button").first().click();
  await expect(page.locator(".inspector")).toBeVisible();
  const action = page.getByRole("button", { name: /Press to use/ }).first();
  if (await action.count()) {
    await action.click();
    await expect(page.locator(".map-challenge-overlay")).toBeVisible();
  }
});

test("initial sample mode has no browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.reload();
  await expect(page.locator(".garden-stage")).toBeVisible();
  expect(errors).toEqual([]);
});

test("first-visit guide and mode banner stay inside the map", async ({
  page,
}) => {
  await expect(page.getByText("Sample rehearsal").first()).toBeVisible();
  await expect(
    page.getByRole("complementary", { name: "First visit guide" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Got it" }).click();
  await expect(
    page.getByRole("complementary", { name: "First visit guide" }),
  ).toBeHidden();
  await page.getByRole("button", { name: "Help / pause" }).click();
  await expect(
    page.getByRole("complementary", { name: "Garden help" }),
  ).toBeVisible();
});

test("sample lesson can be reset without a page reload", async ({ page }) => {
  await page.getByRole("button", { name: "Reset sample lesson" }).click();
  await expect(
    page.getByText("Lesson reset. Walk to the golden glow to begin."),
  ).toBeVisible();
  await expect(page.getByText("Sample rehearsal").first()).toBeVisible();
});

test("learner age band explains the recommended challenge depth", async ({
  page,
}) => {
  const band = page.locator("#learner-band-select");
  await band.selectOption("older");
  await expect(band).toHaveValue("older");
  await expect(
    page.getByText(/recommended level changes the question depth/),
  ).toBeVisible();
});

test("in-map action status explains the current phase", async ({ page }) => {
  const status = page.locator(".map-action-staging");
  await expect(status).toBeVisible();
  await expect(status).toContainText("Explore and inspect");
  await page
    .locator(".map-plant-button.withered, .map-plant-button.stressed")
    .first()
    .click();
  await page
    .getByRole("button", { name: /Press to use/ })
    .first()
    .click();
  await expect(status).toContainText("Learning question");
});

test("keyboard movement changes facing and keeps the map usable", async ({
  page,
}) => {
  const map = page.locator("svg[aria-label*='module map']");
  await map.focus();
  const before = await page
    .locator(".gardener-sprite")
    .evaluate((node) => node.getAttribute("style"));
  await page.keyboard.press("ArrowRight");
  const after = await page
    .locator(".gardener-sprite")
    .evaluate((node) => node.getAttribute("style"));
  expect(after).not.toBe(before);
  await expect(page.locator(".map-hud")).toBeVisible();
});

test("mobile layout has no horizontal overflow", async ({ page }) => {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await expect(page.locator(".garden-stage")).toBeVisible();
});

test("reduced motion disables the target animation", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator(".map-target-halo")).toBeVisible();
  await expect(page.locator(".map-target-halo")).toHaveCSS(
    "animation-name",
    "none",
  );
  await context.close();
});

test("public reports expose read-only mode", async ({ page }) => {
  await page.route("**/api/repository/analyze", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        mode: "public-read-only",
        report: {
          ...sampleReport,
          repo: {
            ...sampleReport.repo,
            name: "public-test",
            commit: "public-commit",
          },
        },
      }),
    });
  });
  await page.locator("#repository-url").fill("https://github.com/acme/garden");
  await page.getByRole("button", { name: "Grow this garden" }).click();
  await expect(
    page.getByText("Public report · commit public-commi"),
  ).toBeVisible();
  await expect(
    page.getByText(/Public reports are read-only/).first(),
  ).toBeVisible();
});
