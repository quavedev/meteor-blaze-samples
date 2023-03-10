import { CountriesCollection } from "../../collections/countries-collection";

// Publications doc here https://docs.meteor.com/api/pubsub.html#Meteor-publish

// Arrow Functions
// Don't use arrow function if you need "userId" or anything from "this" context.
// When use arrow function, the "this" context is a global context.

// Parameters
// It's possible to receive params from subscribe and use it on filters to find data or to validate
Meteor.publish("countries", function (filter = {}) {
  // On the publications don't use Meteor.userId(), use this.userId
  const userId = this.userId;
  if (!userId) {
    return [];
  }
  const user = Meteor.users.findOne(userId);
  if (!user) {
    // Publication returns a cursor list, so prefer using an empty array instead of "this.ready()".
    // Use this.ready() if you need to manipulate the data with "this.added", "this.changed", "this.removed".
    //
    return [];
  }
  // It's possible to return data based on the user or anything do you need.
  if (user.username.startsWith("user1")) {
    return CountriesCollection.find({ name: { $regex: /^a.*/i }, ...filter });
  }
  if (user.username.startsWith("user2")) {
    // It's possible to publish only selected fields or exclude some fields from publishing
    return CountriesCollection.find(
      { name: { $regex: /^b.*/i }, ...filter },
      {
        fields: {
          name: 1,
        },
      }
    );
  }
  // Don't return an array of data like ".find().fetch()." Instead, return a cursor or an array of cursors.
  return CountriesCollection.find({ ...filter });
});
