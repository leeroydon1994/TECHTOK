exports.up = function(knex,Promise){
    return knex.schema.createTable('user_stock',(table)=>{
        table.increments();
        table.integer('user_id');
        table.foreign('user_id').references("users.id");
        table.integer('stock_id');
        table.foreign('stock_id').references("stocks.id");
    }).then(() => {
        return knex.schema.createTable('user_blog',(table)=>{
            table.increments();
            table.integer('user_id');
            table.foreign('user_id').references("users.id");
            table.integer('blog_id');
            table.foreign('blog_id').references("blogs.id");
        }).then(() => {
            return knex.schema.createTable('stocks_tag',(table)=>{
                table.increments();
                table.integer('stock_id');
                table.foreign('stock_id').references("stocks.id");
                table.integer('tag_id');
                table.foreign('tag_id').references("tags.id");
            });
        });
    });
}

exports.down = function(knex,Promise){
    return knex.schema.dropTable("user_stock")
            .then(() => knex.schema.dropTable("user_blog"))
                .then(() => knex.schema.dropTable("stocks_tag"));
}
