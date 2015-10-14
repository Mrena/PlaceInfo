var startup_da_parent = require(__dirname + "/startup_da_parent");
var query = "";

var getAllArticleCategories = function (client,mysql_con,fs) {

    query = "SELECT * FROM Category";

    startup_da_parent.runSelectQuery(query, client, mysql_con, function (client,error) {

        client.emit("get_all_article_categories_error");

    }, function (client,rows,fields) {

        if (rows && rows[0])
            client.emit("all_article_categories", rows);
        else
            client.emit("no_article_categories");

    });



};

exports.getAllArticleCategories = getAllArticleCategories;