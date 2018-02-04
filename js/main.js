//Variables
var users = ["ESL_SC2", "cretetion", "freecodecamp", "noobs2ninjas", "habathcx"];
var api = "https://wind-bow.glitch.me/twitch-api/";


//Function that gets the streams and twitch channels
function getStreams(){

  //For that goes through the users array
  users.forEach(function(user){

    //First ajax request that gets the streams and see if they are online or offline
    $.getJSON(api + "streams/" + user , function(data) {
      var status;
      if(data.stream === null){
        status = "Offline";
      }else{
        status = data.stream.game + ": " + data.stream.channel.status;
      }

        //Second ajax request that gets the channels' info
        $.getJSON('https://wind-bow.glitch.me/twitch-api/channels/' + user, function(resp) {

            var logo = resp.logo != null ? resp.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F",
            name = resp.display_name != null ? resp.display_name : user,
            url = resp.url != null ? resp.url : "";

            //Insert the channels in the divs
            var html = '<div class="list-container">' +
              '<div class="row"> <div class="col-md-3">' +
              '<img class="img-circle img-responsive" src="' + logo +'" alt="Channels logo"> </div> </br>' +
              '<a href="' + url + '" target="_blank">' + name + '</a> <p>' + status + '</p></div></div>';

            if(status === "Offline"){
              $("#off").append(html);
            }else{
              $("#on").append(html);
            }
            $("#channels").append(html);

        });

    });
  });
}


document.addEventListener("DOMContentLoaded", function(event){
  getStreams();
});
