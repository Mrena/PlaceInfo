var startup_da_parent = require("./startup_da_parent");
var query;
var tablesStatus = new Array();

var createLocationTable = function(client,mysql_con,fs){
	
	query = "CREATE TABLE IF NOT EXISTS Location(location_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,type INTEGER NOT NULL,heading VARCHAR(50) NOT NULL UNIQUE,message VARCHAR(5000) NOT NULL,likes INTEGER,dislikes INTEGER)";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		client.emit("create_table_location_error");
		
	},function(client) {

	    setTableCreateStatus(client, mysql_con, "messages", 1);
		client.emit("location_table_created");
	
	});
	

};


		
		var createCatchaImagesTable = function(client,mysql_con,fs){
			
			
			query = "CREATE TABLE IF NOT EXISTS Catcha_Images(catcha_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,catcha_name VARCHAR(50) NOT NULL,catcha_value VARCHAR(50) NOT NULL,catcha_image VARCHAR(5000) NOT NULL)";
	    	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
	    		
	    		console.log(error);
				client.emit("create_table_catcha_images_error");
	    		
	    	},function(client){
	    		
	    	        setTableCreateStatus(client, mysql_con, "catcha_images", 1);
        			client.emit("catcha_images_table_created");
        	
	    	});
			
		};
		
	
		var createTables = function(client,mysql_con,fs){
	
		         createMessagesTable(client, mysql_con, fs);
		         createReplyMessagesTable(client,mysql_con,fs);
		         createCategoryTable(client, mysql_con, fs);
		         createArticleTable(client, mysql_con, fs);
    			 createMessageAttachmentsTable(client,mysql_con,fs);
    			 createCatchaImagesTable(client,mysql_con,fs);
    			    
    			 console.log("Tables created");	

            };


        var deleteLocationTable = function(client,mysql_con,fs){
	
	
	        query = "DROP TABLE IF EXISTS Location";
	        startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		            console.trace(error);
		            client.emit("delete_table_location_error");
		
		
	        },function(client){
		
	            setTableCreateStatus(client, mysql_con, "location", 0);
	            setTableSamplesStatus(client, mysql_con, "location", 0);
		        client.emit("location_table_deleted");
			
	        });
	
        };

var deleteCatchaImagesTable = function(client,mysql_con,fs){
	
	query = "DROP TABLE IF EXISTS Catcha_Images";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		client.emit("delete_table_catcha_images_error");
		
		
	},function(client){
		
	    setTableCreateStatus(client, mysql_con, "catcha_images", 0);
	    setTableSamplesStatus(client, mysql_con, "catcha_images", 0);
		client.emit("catcha_images_table_deleted");
		
	});
	
};

var deleteTables = function(client,mysql_con,fs) {

    deleteLocationTable(client, mysql_con, fs);
    deleteCatchaImagesTable(client, mysql_con, fs);
   


};


var emptyLocationTable = function(client,mysql_con,fs){
	
	query = "TRUNCATE TABLE Location";
	startup_da_parent.runQuery(query, mysql_con, client, function (client, error) {

	    console.trace(error);
	    client.emit("empty_table_location_error");


	}, function (client) {

	    setTableSamplesStatus(client, mysql_con, "messages", 0);
	    client.emit("location_table_emptied");

	});
	    
};

var emptyCatchaImagesTable = function(client,mysql_con,fs){
	
	query = "TRUNCATE TABLE Catcha_Images";
	startup_da_parent.runQuery(query,mysql_con,client,function(client,error){
		
		console.trace(error);
		client.emit("empty_table_catcha_images_error");
		
		
	},function(client){
		
	    setTableSamplesStatus(client, mysql_con, "catcha_images", 0);
		client.emit("catcha_images_table_emptied");
		
	});
	
};

var emptyTables = function (client, mysql_con, fs) {

    emptyMessagesTable(client, mysql_con, fs);
    emptyCatchaImagesTable(client, mysql_con, fs);



};


var setTableCreateStatus = function (client,mysql_con,table_name,status) {
    
    query = "UPDATE Tables SET created = "+status+" WHERE name='"+table_name+"'";
    startup_da_parent.runQuery(query, mysql_con, client, function (client, error) {

        console.log(error);
     

    }, function (client) {

        return;

    });


};

var setTableSamplesStatus = function (client, mysql_con, table_name, status) {


    query = "UPDATE Tables SET samples_added = " + status + " WHERE name='" + table_name + "'";
    startup_da_parent.runQuery(query, mysql_con, client, function (client, error) {

        console.log(error);


    }, function (client) {

        return;

    });


};


var createTablesTable = function (client, mysql_con, fs) {

    query = "CREATE TABLE IF NOT EXISTS Tables(name VARCHAR(50) PRIMARY KEY NOT NULL,created INTEGER,samples_added INTEGER,can_message INTEGER)";
    startup_da_parent.runQuery(query, mysql_con, client, function (client, error) {

        console.log(error);
        client.emit("create_table_tables_error");

    }, function (client) {

        var tables_name = new Array("location");
        var tables_length = tables_name.length,
            added_tables = 0;
        
        tables_name.forEach(function (table) {

            var query = "INSERT INTO Tables(name,created,samples_added,can_message) VALUES('" + table + "',0,0,0)";
            startup_da_parent.runQuery(query, mysql_con, client, function (client, error) {

                console.log(error);

            }, function (client) {

                ++added_tables;
               if (added_tables == tables_length) {
                client.emit("tables_table_created");
                }

            });
            
        });

       

    });

};

var deleteTablesTable = function (client, mysql_con, fs) {

    query = "DROP TABLE IF EXISTS Tables";
    startup_da_parent.runQuery(query, mysql_con, client, function (client, error) {

        console.trace(error);
        client.emit("delete_tables_error");


    }, function (client) {

        client.emit("table_tables_deleted");

    });

};

var getTablesStatus = function (client,mysql_con,fs) {

    query = "SELECT * FROM Tables";

    startup_da_parent.runSelectQuery(query, client, mysql_con, function(client,error) {

        console.log(error);
        client.emit("get_tables_status_error");

    }, function(client,rows,fields) {
       
        client.emit("tables_status",rows);

    });
};


    exports.createTables = createTables;
    exports.deleteTables = deleteTables;
    exports.emptyTables = emptyTables;
    exports.createTablesTable = createTablesTable;
    exports.deleteTablesTable = deleteTablesTable;
    exports.getTablesStatus = getTablesStatus;

    exports.createLocationTable = createLocationTable;
	exports.createCatchaImagesTable = createCatchaImagesTable;

	exports.deleteLocationTable = deleteLocationTable;
	exports.deleteCatchaImagesTable = deleteCatchaImagesTable;
	
	exports.emptyLocationTable = emptyLocationTable;
	exports.emptyCatchaImagesTable = emptyCatchaImagesTable;