import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { localehistoryService } from "./localehistory-service.js";
import { maggie, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

suite("User API tests", () => {
  setup(async () => {
    await localehistoryService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testUsers[0] = await localehistoryService.createUser(testUsers[i]);
    }
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await localehistoryService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all userApi", async () => {
    let returnedUsers = await localehistoryService.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await localehistoryService.deleteAllUsers();
    returnedUsers = await localehistoryService.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  test("get a user", async () => {
    const returnedUser = await localehistoryService.getUser(testUsers[0]._id);
    assert.deepEqual(testUsers[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await localehistoryService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
    }
  });

  test("get a user - deleted user", async () => {
    await localehistoryService.deleteAllUsers();
    try {
      const returnedUser = await localehistoryService.getUser(testUsers[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
    }
  });
});