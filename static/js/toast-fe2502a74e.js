"use strict";

window.toast = function (text) {
  $("#toast").text(text);
  $("#toast").fadeIn().delay(1000).fadeOut();
};