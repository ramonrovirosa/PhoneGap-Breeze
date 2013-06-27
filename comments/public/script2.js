/**
 * Created with JetBrains WebStorm.
 * User: rrovirosa
 * Date: 6/20/13
 * Time: 3:56 PM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function() {
//    dpd.comments.get(function (result, err) {
//        if(err) return console.log(err);
//        console.log(result);
//        //document.write(result[0].comment);
//        result.forEach(function(element, index){
//            //document.write('Name: ' + result[index].name + ', comment: ' + result[index].comment +'<br/>');
//        });
//    });


//    $.get(path, function(data) {
//        console.log(data);
//    });

    var path = 'http://localhost:2403/comments';


    var dataService = new breeze.DataService({
        serviceName: path,
        hasServerMetadata: false
    });

    var manager = new breeze.EntityManager({
        dataService: dataService
    });

    var query = new breeze.EntityQuery("comments");

         //.orderBy("")
         //.where("",,);

    manager.executeQuery(query).then(function(data){
        //console.log(data);
        //console.log(data.results);
        var outputHtml = "";
        data.results.forEach(function(item) {
            outputHtml += 'Name: ' + item.name + ', Comment: '+ item.comment + "<br>";
        });
        $("#output").html(outputHtml);

        //console.log(query);

        //var customers = manager.executeQueryLocally(query);
        //var localQueryData = {results: customers};

    });










});