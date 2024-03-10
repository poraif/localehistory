export const seedData = {
  // ----------------- User ----------------- //
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
      admin: false
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
      admin: false
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
      admin: false
    },
    abe: {
      firstName: "Abe",
      lastName: "Simpson",
      email: "abe@simpson.com",
      password: "secret",
      admin: true
    },
  },



// ----------------- Street ----------------- //
  streets: {
    _model: "Street",
    oconnell: {
      name: "O'Connell Street",
      userid: "->users.homer"
    },
    mall: {
      name: "The Mall",
      userid: "->users.marge"
    },
    kieran: {
      name: "St Kieran's Street",
      userid: "->users.bart"
    },
  },

// ----------------- Placemark ----------------- //
  placemarks: {
    _model : "Placemark",
    gpo : {
      title: "GPO",
      description: "The site of the 1916 Easter Rising. It is now a museum and post office. It's where the proclamation of independence was read out.",
      year: 2003,
      latitude: 53.3498,
      longitude: -6.2603,
      category: "Landmark",
      streetid: "->streets.oconnell"
    },
    tricolour : {
      title: "Flying of tricolour",
      description: "The first time the Irish flag was flown",
      year: 1848,
      latitude: 52.6784,
      longitude: -6.2926,
      category: "Event",
      streetid: "->streets.mall"
    },
    kyteler : {
      title: "Kyteler's Inn",
      description: "Where Alice Kyteler was accused of witchcraft",
      year: 1324,
      latitude: 52.6547,
      longitude: -7.2523,
      category: "Residence",
      streetid: "->streets.kieran"
    },
  }
};
