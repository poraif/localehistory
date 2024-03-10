import { assert } from "chai";
import { localehistoryService } from "./localehistory-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieAuth } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    localehistoryService.clearAuth();
    await localehistoryService.createUser(maggie);
    await localehistoryService.authenticate(maggieAuth);
    await localehistoryService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await localehistoryService.createUser(maggie);
    const response = await localehistoryService.authenticate(maggieAuth);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await localehistoryService.createUser(maggie);
    const response = await localehistoryService.authenticate(maggieAuth);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    localehistoryService.clearAuth();
    try {
      await localehistoryService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
