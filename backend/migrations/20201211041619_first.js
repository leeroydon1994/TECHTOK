
exports.up = function(knex,Promise){
    return knex.schema.createTable('users',(table)=>{
        table.increments();
        table.string('name')
        table.string('password')
        table.string('email')
        table.string('displayname')
        table.string('accessToken');
        table.boolean('admin');
    });
}

exports.down = function(knex,Promise){
    return knex.schema.dropTable("users");
}
