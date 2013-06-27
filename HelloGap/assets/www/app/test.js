/**
 * Created with JetBrains WebStorm.
 * User: rrovirosa
 * Date: 6/20/13
 * Time: 3:56 PM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function() {
    dpd.comments.get(function (result, err) {
        if(err) return console.log(err);
        console.log(result);
        //document.write(result[0].comment);
        result.forEach(function(element, index){
            document.write(result[index].name + result[index].comment + '<br/>');
        });
    });

    var manager = new breeze.EntityManager('http://localhost:2403/comments');
    alert(manager.getEntities.length);

    var query = new breeze.EntityQuery();


    manager.executeQuery(query).then(function(data){
        ko.applyBindings(data);
    }).fail(function(e) {
            alert(e);
        });

});