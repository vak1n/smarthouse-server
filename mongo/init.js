db = db.getSiblingDB('smarthouse');

db.createUser({
  pwd: 'smarthouse',
  roles: [
    {
      db: 'smarthouse',
      role: 'readWrite',
    },
  ],
  user: 'smarthouse',
});
