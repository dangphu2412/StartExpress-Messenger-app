
exports.up = (knex) => knex.schema.table('friends', (table) => {
    table.varchar('message', 255);
});


exports.down = (knex) => knex.schema.table('friends', (table) => {
        table.dropColumn('message');
});
