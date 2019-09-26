exports.up = (knex) => {
    return knex.schema.createTable('session', (table) => {
            table.string('sid').primary().notNullable();
            table.json('sess').notNullable();
            table.timestamp('expire').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = (knex) => {
    return knex.schema
        .dropTable('session');
};

exports.config = { transaction: false };
