import "./publications.scss";
import "./publications.html";
import "../auth/login";
import {CountriesCollection} from "../../collections/countries-collection";

Template.Publications.onCreated(function () {
  const tmpl = this;
  this.subscribe("countries");

});
Template.Publications.helpers({
  countries() {
    return CountriesCollection.find().fetch();
  }
});

Template.Publications.events({});
