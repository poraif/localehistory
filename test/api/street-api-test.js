import { EventEmitter } from "events";
import { assert } from "chai";
import { localehistoryService } from "./localehistory-service.js";
import { assertSubset } from "../test-utils.js";

import { maggie, talbot, testStreets } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Street API tests", () => {
  let user = null;

  setup(async () => {
    await localehistoryService.deleteAllStreets();
    await localehistoryService.deleteAllUsers();
    user = await localehistoryService.createUser(maggie);
    talbot.userid = user._id;
  });

  teardown(async () => {});

  test("create street", async () => {
    const returnedStreet = await localehistoryService.createStreet(talbot);
    assert.isNotNull(returnedStreet);
    assertSubset(talbot, returnedStreet);
  });

  test("delete a street", async () => {
    const street = await localehistoryService.createStreet(talbot);
    const response = await localehistoryService.deleteStreet(street._id);
    assert.equal(response.status, 204);
    try {
      const returnedStreet = await localehistoryService.getStreet(street.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Street with this id", "Incorrect Response Message");
    }
  });

  test("create multiple streets", async () => {
    for (let i = 0; i < testStreets.length; i += 1) {
      testStreets[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await localehistoryService.createStreet(testStreets[i]);
    }
    let returnedLists = await localehistoryService.getAllStreets();
    assert.equal(returnedLists.length, testStreets.length);
    await localehistoryService.deleteAllStreets();
    returnedLists = await localehistoryService.getAllStreets();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existent street", async () => {
    try {
      const response = await localehistoryService.deleteStreet("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Street with this id", "Incorrect Response Message");
    }
  });
});