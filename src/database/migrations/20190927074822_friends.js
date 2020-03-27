exports.up = (knex) => knex.schema.createTable('friends', (table) => {
    table.increments('friend_id').primary();
    table.integer('senderId').notNullable();
    table.foreign('senderId').references('id').inTable('users').onDelete('CASCADE');
    table.integer('receiverId').notNullable();
    table.foreign('receiverId').references('id').inTable('users').onDelete('CASCADE');
    table.varchar('receiverEmail').notNullable();
    table.varchar('status', 2).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
});

exports.down = (knex) => knex.schema.dropTableIfExists('friends');
