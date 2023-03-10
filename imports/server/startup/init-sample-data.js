import { Meteor } from "meteor/meteor";
import { CountriesCollection } from "../../collections/countries-collection";

const importUsers = () => {
  const sampleUsers = [
    {
      email: "user1@localhost",
      password: "user1",
    },
    {
      email: "user2@localhost",
      password: "user2",
    },
    {
      email: "user3@localhost",
      password: "user3",
    },
  ];
  sampleUsers.forEach(({ email, password }) => {
    if (Meteor.users.findOne({ "emails.address": email })) {
      return;
    }
    const userId = Accounts.createUser({ username: email, password });
    Accounts.addEmail(userId, email, true);
  });
};

const importCountries = () => {
  import countries from "../../data/countries.json";

  countries.forEach((country) => {
    CountriesCollection.insert(country);
  });
};

Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    importUsers();
  }
  if (CountriesCollection.find().count() === 0) {
    importCountries();
  }
});
