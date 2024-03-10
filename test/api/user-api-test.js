import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { localehistoryService } from "./localehistory-service.js";
import { maggie, testUsers, maggieAuth } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    localehistoryService.clearAuth();
    await localehistoryService.createUser(maggie);
    await localehistoryService.authenticate(maggieAuth);
    await localehistoryService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await localehistoryService.createUser(testUsers[i]);
    }
    await localehistoryService.createUser(maggie);
    await localehistoryService.authenticate(maggieAuth);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await localehistoryService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await localehistoryService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await localehistoryService.deleteAllUsers();
    await localehistoryService.createUser(maggie);
    await localehistoryService.authenticate(maggieAuth);
    returnedUsers = await localehistoryService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user", async () => {
    const returnedUser = await localehistoryService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await localehistoryService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("get a user - deleted user", async () => {
    await localehistoryService.deleteAllUsers();
    await localehistoryService.createUser(maggie);
    await localehistoryService.authenticate(maggieAuth);
    try {
      const returnedUser = await localehistoryService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});