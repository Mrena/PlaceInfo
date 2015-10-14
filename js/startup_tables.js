var startup_da_tables = require("./data_access/startup_da_tables");

var startup_tables = function(client,mysql_con,fs){
	
	
	client.on("create_location_table",function(){
		
		try{
			
			startup_da_tables.createLocationTable(client,mysql_con,fs);
			
		}catch(error){
			console.log(error);
		
		}
		
	}).on("delete_location_table",function(){
		
	try{
			
		startup_da_tables.deleteLocationTable(client,mysql_con,fs);
			
		}catch(error){
			console.log(error);
		}
		
	}).on("empty_location_table",function(){
		
		
	try{
			
		startup_da_tables.emptyLocationTable(client,mysql_con,fs);
			
		}catch(error){
			console.log(error);
	
		}
		
	});


    client.on("create_tables", function() {

        try {

            startup_da_tables.createTables(client, mysql_con, fs);

        } catch(error) {
            console.log(error);
        }

    }).on("delete_tables", function() {

        try {

            startup_da_tables.deleteTables(client, mysql_con, fs);

        } catch(error) {
            console.log(error);
        }

    }).on("empty_tables", function() {

        try {

            startup_da_tables.emptyTables(client, mysql_con, fs);

        } catch(error) {
            console.log(error);
        }

    });

     client.on("create_tables_table", function () {

	    try {
	     
	        startup_da_tables.createTablesTable(client, mysql_con, fs);

	    } catch (error) {
	        console.log(error);
	    }

	}).on("delete_tables_table", function () {

	    try {

	        startup_da_tables.deleteTablesTable(client, mysql_con, fs);

	    } catch (error) {
	        console.log(error);
	    }

	}).on("get_tables_status", function () {
	    
	    try {

	        startup_da_tables.getTablesStatus(client, mysql_con, fs);

	    } catch (error) {
	        console.log(error);
	    }

	});
	 
};

exports.startup_tables = startup_tables;