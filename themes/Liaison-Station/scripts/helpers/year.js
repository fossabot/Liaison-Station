hexo.extend.helper.register("getAnimalIcon", function (year) {
  var index = parseInt(year) % 12;
  var icon = {
    0: "liaisonstation-colorful-icon-monkey",
    1: "liaisonstation-colorful-icon-rooster",
    2: "liaisonstation-colorful-icon-dog",
    3: "liaisonstation-colorful-icon-boar",
    4: "liaisonstation-colorful-icon-rat",
    5: "liaisonstation-colorful-icon-ox",
    6: "liaisonstation-colorful-icon-tiger",
    7: "liaisonstation-colorful-icon-rabbit",
    8: "liaisonstation-colorful-icon-dragon",
    9: "liaisonstation-colorful-icon-snake",
    10: "liaisonstation-colorful-icon-horse",
    11: "liaisonstation-colorful-icon-goat",
  };
  return icon[index];
});
