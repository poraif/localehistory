import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { localehistoryService } from "./localehistory-service.js";
import { maggie, talbot, testStreets, testPlacemarks, behanStatue, maggieAuth } from "../fixtures.js";

suite("Placemark API tests", () => {
  let user = null;
  let talbotSt = null;

  setup(async () => {
    localehistoryService.clearAuth();
    user = await localehistoryService.createUser(maggie);
    await localehistoryService.authenticate(maggieAuth);
    await localehistoryService.deleteAllStreets();
    await localehistoryService.deleteAllPlacemarks();
    await localehistoryService.deleteAllUsers();
    user = await localehistoryService.createUser(maggie);
    await localehistoryService.authenticate(maggieAuth);
    talbot.userid = user._id;
    talbotSt = await localehistoryService.createStreet(talbot);
  });

  test("create placemark", async () => {
    const returnedPlacemark = await localehistoryService.createPlacemark(talbotSt._id, behanStatue);
    assertSubset(behanStatue, returnedPlacemark);
  });

  test("create Multiple placemarks", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await localehistoryService.createPlacemark(talbotSt._id, testPlacemarks[i]);
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
      await localehistoryService.createPlacemark(talbotSt._id, testPlacemarks[i]);
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
      await localehistoryService.createPlacemark(talbotSt._id, testPlacemarks[i]);
    }
    const returnedStreet = await localehistoryService.getStreet(talbotSt._id);
    assert.equal(returnedStreet.placemarks.length, testPlacemarks.length);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      assertSubset(testPlacemarks[i], returnedStreet.placemarks[i]);
    }
  });
});