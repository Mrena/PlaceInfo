var startup_da_parent = require("./startup_da_parent");



var addSampleLocation = function(client,mysql_con,fs){
	
    query = "INSERT INTO Messages(type,heading,message,likes,dislikes) VALUES(1,'Hello World Message Heading','Hello World Message',1,0)";
		startup_da_parent.runQuery(query,mysql_con,client,function(client,error) {

		    console.log(error);
			client.emit("add_sample_message_error");
			
		},function(client){
			  
		    client.emit("sample_message_added");
		    setTableSamplesStatus(client, mysql_con, "messages", 1);
		                        		
		 });
    	
};


var addSampleData = function(client,mysql_con,fs){
	

	addSampleLocation(client,mysql_con);
	
	

};

var setTableSamplesStatus = function (client, mysql_con, table_name, status) {


    query = "UPDATE Tables SET samples_added = " + status + " WHERE name='" + table_name + "'";
    startup_da_parent.runQuery(query, mysql_con, client, function (client, error) {

        console.log(error);


    }, function (client) {

        return;

    });


};


exports.addSampleLocation = addSampleLocation;

