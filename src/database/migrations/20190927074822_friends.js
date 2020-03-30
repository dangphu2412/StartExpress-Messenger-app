exports.up = (knex) => knex.schema.createTable('friends', (table) => {
    table.increments('friend_id').primary();
    table.integer('userId').notNullable();
    table.foreign('userId').references('id').inTable('users').onDelete('CASCADE');
    table.integer('friendId').notNullable();
    table.foreign('friendId').references('id').inTable('users').onDelete('CASCADE');
    table.integer('receiverId').notNullable();
    table.varchar('message', 255);
    table.integer('status').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
});

exports.down = (knex) => knex.schema.dropTableIfExists('friends');
