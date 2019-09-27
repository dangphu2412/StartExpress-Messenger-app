exports.up = (knex) => knex.schema.createTable('friends', (table) => {
    table.increments('id').primary();
    table.integer('userId').unsigned().notNullable();
    table.foreign('userId').references('id').inTable('users').onDelete('CASCADE');
    table.integer('friendId').notNullable();
    table.foreign('friendId').references('id').inTable('users').onDelete('CASCADE');
    table.integer('received').notNullable();
    table.varchar('status', 4).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
});


exports.down = (knex) => knex.schema.dropTableIfExists('friends');
