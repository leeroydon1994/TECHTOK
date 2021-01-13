exports.up = function(knex,Promise){
    return knex.schema.createTable('stocks',(table)=>{
        table.increments();
        table.string("symbol");
        table.string("company");
        table.string('url');
        table.integer("latestPrice");
        table.integer("change");
        table.integer("changePercent");
        table.integer("open");
        table.integer("high");
        table.integer("low");
        table.integer("peRatio");
        table.integer("week52High");
        table.integer("week52Low");
        table.integer("ytdChange");
        table.timestamps(false,true);
    }).then(() => {
        return knex.schema.createTable('blogs',(table)=>{
            table.increments();
            table.string('headline');
            table.string('content');
            table.string('imageUrl')
            table.timestamps(false,true);
        }).then(() => {
            return knex.schema.createTable('tags',(table)=>{
                table.increments();
                table.string('name');
                table.timestamps(false,true);
            });
        });
    });
}

exports.down = function(knex,Promise){
    return knex.schema.dropTable("stocks")
            .then(() => knex.schema.dropTable("blogs"))
                .then(() => knex.schema.dropTable("tags"));

}
