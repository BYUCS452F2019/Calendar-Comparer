module.exports = [{
    mapId: 'calendarMap',
    idProperty: 'id',
    properties: [
      'name'
    ],
    collections: [
      {name: 'users', mapId: 'userMap', columnPrefix: 'user_'}
    ]
}]