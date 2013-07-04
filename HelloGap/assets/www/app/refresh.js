/**
 * Created with JetBrains WebStorm.
 * User: rrovirosa
 * Date: 7/1/13
 * Time: 3:02 PM
 * To change this template use File | Settings | File Templates.
 */
$(function() {
    $("#ang_button").click(function() {
        $(location).attr('href',"Index_knockout.html");
    });
    $("#contacts").click(function() {
        $(location).attr('href',"contacts/contacts.html");
    });
    $("#calendar_button").click(function() {
        $(location).attr('href',"calendar/calendar.html");
    });
    $("#camera_button").click(function() {
        $(location).attr('href',"camera/camera.html");
    });


});