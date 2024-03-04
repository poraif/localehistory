import { EventEmitter } from "events";
import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testStreets, talbot } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

EventEmitter.setMaxListeners(25);

suite("Street Model tests", () => {

    setup(async () => {
      db.init("mongo");
      await db.streetStore.deleteAllStreets();
      for (let i = 0; i < testStreets.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        testStreets[i] = await db.streetStore.addStreet(testStreets[i]);
      }
    });
  
    test("create a street", async () => {
      const street = await db.streetStore.addStreet(talbot);
      assertSubset(talbot, street);
      assert.isDefined(street._id);
    });
  
    test("delete all streets", async () => {
      let returnedStreets = await db.streetStore.getAllStreets();
      assert.equal(returnedStreets.length, 3);
      await db.streetStore.deleteAllStreets();
      returnedStreets = await db.streetStore.getAllStreets();
      assert.equal(returnedStreets.length, 0);
    });
  
    test("get a street - success", async () => {
      const street = await db.streetStore.addStreet(talbot);
      const returnedStreet = await db.streetStore.getStreetById(street._id);
      assertSubset(talbot, street);
    });
  
    test("delete One street - success", async () => {
      const id = testStreets[0]._id;
      await db.streetStore.deleteStreetById(id);
      const returnedStreets = await db.streetStore.getAllStreets();
      assert.equal(returnedStreets.length, testStreets.length - 1);
      const deletedStreet = await db.streetStore.getStreetById(id);
      assert.isNull(deletedStreet);
    });
  
    test("get a street - bad params", async () => {
      assert.isNull(await db.streetStore.getStreetById(""));
      assert.isNull(await db.streetStore.getStreetById());
    });
  
    test("delete One Street - fail", async () => {
      await db.streetStore.deleteStreetById("bad-id");
      const allStreets = await db.streetStore.getAllStreets();
      assert.equal(testStreets.length, allStreets.length);
    });
  });