# Publications

### Publications doc

https://docs.meteor.com/api/pubsub.html#Meteor-publish

## Arrow functions on publications

Don't use the arrow function if you need `userId` or anything from `this` context.

When using the arrow function, the `this` context is global.

## Parameters from subscribe

It's possible to receive params from the `subscribe` to use on filters to find data or to validate anything.

## Get currently logged user

Don't use `Meteor.userId()` on publications. Instead, use `this.userId` and `Meteor.users.findOne(userId)`.

## Return empty data

Use an empty array instead of `this.ready()` to return empty data.
Only use `this.ready()` if you need to manipulate the data with `this.added`, `this.changed`, `this.removed`.

## Returns different data from different users

It's possible to return different data based on the user or anything you need.

## Publish some fields from different users

Publishing only selected fields or excluding some fields from publishing is possible.

## Return cursor or array of cursors

Don't return an array of data like `.find().fetch().` Instead, returns a cursor or an array of cursors.

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

- [Source code: JS (client)](/imports/ui/publications/publications.js)
- [Source code: HTML (client)](/imports/ui/publications/publications.html)
- [Source code: JS (server)](/imports/server/publications/countries-publication.js)

[Live Demo](https://meteor-blaze-samples-prod-quave.svc.zcloud.ws/publications)
