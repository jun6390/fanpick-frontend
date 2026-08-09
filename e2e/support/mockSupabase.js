const jsonHeaders = {
  "access-control-allow-headers":
    "authorization, apikey, content-type, prefer, x-client-info",
  "access-control-allow-methods": "GET, POST, PATCH, DELETE, OPTIONS",
  "access-control-allow-origin": "*",
  "access-control-expose-headers": "content-range",
  "content-type": "application/json",
};

const emptyArrayResponse = {
  body: "[]",
  headers: {
    ...jsonHeaders,
    "content-range": "0-0/0",
  },
  status: 200,
};

const fulfillCorsPreflight = (route) =>
  route.fulfill({
    headers: jsonHeaders,
    status: 204,
  });

export const mockSupabase = async (page) => {
  await page.route("**/auth/v1/**", async (route) => {
    if (route.request().method() === "OPTIONS") {
      await fulfillCorsPreflight(route);
      return;
    }

    await route.fulfill({
      headers: jsonHeaders,
      json: {
        session: null,
        user: null,
      },
      status: 200,
    });
  });

  await page.route("**/rest/v1/rpc/**", async (route) => {
    if (route.request().method() === "OPTIONS") {
      await fulfillCorsPreflight(route);
      return;
    }

    await route.fulfill(emptyArrayResponse);
  });

  await page.route("**/rest/v1/**", async (route) => {
    if (route.request().method() === "OPTIONS") {
      await fulfillCorsPreflight(route);
      return;
    }

    await route.fulfill(emptyArrayResponse);
  });
};
