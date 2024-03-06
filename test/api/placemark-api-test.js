import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { localehistoryService } from "./localehistory-service.js";
import { maggie, talbot, testStreets, testPlacemarks, behanStatue } from "../fixtures.js";

suite("Placemark API tests", () => {
  let user = null;
  let dublinStreets = null;

  setup(async () => {
    await localehistoryService.deleteAllStreets();
    await localehistoryService.deleteAllUsers();
    await localehistoryService.deleteAllPlacemarks();
    user = await localehistoryService.createUser(maggie);
    talbot.userid = user._id;
    dublinStreets = await localehistoryService.createStreet(talbot);
  });

  teardown(async () => {});

  test("create placemark", async () => {
    const returnedPlacemark = await localehistoryService.createPlacemark(dublinStreets._id, behanStatue);
    assertSubset(behanStatue, returnedPlacemark);
  });

  test("create Multiple placemarks", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await localehistoryService.createPlacemark(dublinStreets._id, testPlacemarks[i]);
    }
    const returnedPlacemarks = await localehistoryService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length);
    for (let i = 0; i < returnedPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const placemark = await localehistoryService.getPlacemark(returnedPlacemarks[i]._id);
      assertSubset(placemark, returnedPlacemarks[i]);
    }
  });

  test("Delete PlacemarkApi", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await localehistoryService.createPlacemark(dublinStreets._id, testPlacemarks[i]);
    }
    let returnedPlacemarks = await localehistoryService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length);
    for (let i = 0; i < returnedPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const placemark = await localehistoryService.deletePlacemark(returnedPlacemarks[i]._id);
    }
    returnedPlacemarks = await localehistoryService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 0);
  });

  test("denormalised street", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await localehistoryService.createPlacemark(dublinStreets._id, testPlacemarks[i]);
    }
    const returnedStreet = await localehistoryService.getStreet(dublinStreets._id);
    assert.equal(returnedStreet.placemarks.length, testPlacemarks.length);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      assertSubset(testPlacemarks[i], returnedStreet.placemarks[i]);
    }
  });
});