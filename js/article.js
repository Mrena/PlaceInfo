var article_da = require(__dirname + "/data_access/article_da");

var article = function (client,mysql_con,fs) {

    var validateArticle = function (objArticle) {


        return true;
    };

    client.on("add_article", function (objArticle) {


        if (validateArticle(objArticle)) {
         
            article_da.addArticle(client,mysql_con,fs,objArticle);

        }


    });

    client.on("get_all_article_categories", function () {

        article_da.getAllArticleCategories(client,mysql_con,fs);

    });


};

exports.article = article;