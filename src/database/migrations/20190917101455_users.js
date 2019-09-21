exports.up = function(knex) {
    return knex.schema 
        .createTable('users',function (table) {
            table.increments('id').primary();
            table.string('firstname',255);
            table.string('lastname',255);
            table.string('avatar',255);
            table.string('email',255);
            table.string('phone_number',255);
            table.string('password',255);
            table.string('city',255);
            table.string('describe','text');
            table.string('google_id',255);
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        });
    };

exports.down = function(knex) {
    return knex.schema
        .dropTable('users');
};

exports.config = { transaction: false };

