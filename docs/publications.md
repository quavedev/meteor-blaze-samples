# Publications

### Publications doc

https://docs.meteor.com/api/pubsub.html#Meteor-publish

## Arrow functions on publications

Don't use arrow function if you need `userId` or anything from `this` context.

When use arrow function, the `this` context is a global context.

## Parameters from subscribe

It's possible to receive params from the `subscribe` to use on filters to find data or to validate anything.

## Get current logged user

Don't use `Meteor.userId()` on publications, instead of this use `this.userId` and `Meteor.users.findOne(userId)`.

## Return empty data

To returns an empty data, prefer using an empty array instead of `this.ready()`.
Only use `this.ready()` if you need to manipulate the data with `this.added`, `this.changed`, `this.removed`.

## Returns different data from different users

It's possible to return data based on the user or anything do you need.

## Publish some fields from different users

It's possible to publish only selected fields or exclude some fields from publishing.

## Return cursor or array of cursors

Don't return an array of data like `.find().fetch().` instead, returns a cursor or an array of cursors.

```javascript
Meteor.publish("countries", function (filter = {}) {
  const userId = this.userId;
  if (!userId) {
    return [];
  }
  const user = Meteor.users.findOne(userId);
  if (!user) {
    return [];
  }
  if (user.username.startsWith("user1")) {
    return CountriesCollection.find({ name: { $regex: /^a.*/i }, ...filter });
  }
  if (user.username.startsWith("user2")) {
    return CountriesCollection.find(
      { name: { $regex: /^b.*/i }, ...filter },
      {
        fields: {
          name: 1,
        },
      }
    );
  }

  return CountriesCollection.find({ ...filter });
});
```

**Publication implementation**

- [Source code: JS (client)](imports/ui/publications/publications.js)
- [Source code: HTML (client)](imports/ui/publications/publications.html)
- [Source code: JS (server)](imports/server/publications/countries-publication.js)

[Live Demo](https://meteor-blaze-samples-prod-quave.svc.zcloud.ws/publications)
