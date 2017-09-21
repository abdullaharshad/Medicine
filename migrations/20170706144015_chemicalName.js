exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('chemicals', function (table) {
            table.increments().primary();
            table.string('name',255).collate('utf8mb4_unicode_ci');
            table.timestamps();
        })
    ]);
};

//Rollback migration
exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('chemicals')
    ]);
};