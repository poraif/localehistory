export const aboutController = {
    index: {
      handler: function (request, h) {
        const viewData = {
          title: "About Locale History",
        };
        return h.view("about-view", viewData);
      },
    },
  };