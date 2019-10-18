module.exports = [
  {
    mapId: 'sessionMap',
    idProperty: 'id',
    properties: [
      'session_start_time',
      'session_last_active',
      'session_expiry_length'
    ],
    associations: [
      {name: 'user', mapId: 'userMap', columnPrefix: 'user_'}
    ]
  },{
    mapId: 'userMap',
    idProperty: 'id',
    properties: [
      'email',
      'google_id_token',
      'google_refresh_token',
      'google_access_token'
    ]
  }
]
