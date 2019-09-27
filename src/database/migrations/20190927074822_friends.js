exports.up = (knex) => knex.schema.createTable('friends', (table) => {
    table.increments('id').primary();
    table.integer('userId').notNullable();
    table.integer('friendId').notNullable();
    table.integer('received').notNullable();
    table.varchar('status', 4).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
});


exports.down = (knex) => knex.schema.dropTableIfExists('friends');
