exports.up = function(knex) {
    return knex.schema
        .createTable('session', function(table) {
            table.string('sid').primary().notNullable();
            table.json('sess').notNullable();
            table.timestamp('expire').notNullable().defaultTo(knex.fn.now());

        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('session');
};

exports.config = { transaction: false };
