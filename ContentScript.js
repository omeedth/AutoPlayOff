$(document).ready(run())

function run() {

  var delayMS = 6000;

  chrome.storage.sync.get({
    'video_option': 'Remove',
    'whitelist': ['https://www.youtube.com/']
  }, function(items) {

    console.log("AutoPlayOff Script!");

    var option = items.video_option;
    var websites = items.whitelist;

    console.log("AutoPlayOff: " + option + "!");

    // If the user wants the extension to do something
    if(option != "Nothing") {

      var url = window.location.toString();
      var whitelisted = false;

      for(var i = 0; i < websites.length; i++) {
        if(url.startsWith(websites[i])) {
          whitelisted = true;
          break;
        }
      }

      // If the user didn't whitelist the website
      if(!whitelisted) {

        console.log(url + " is not whitelisted!");

        // User wants to remove videos
        if(option == "Remove") {
          var clearVideos = setInterval(clearVideo,delay);
        } else {
          // User wants to mute all videos
          var clearVideos = setInterval(muteVideo,delay);
        }

        function clearVideo() {
          var videos = $("body").find("video");
          videos.closest("div").remove();
          console.log("Removed video!");
        }

        function muteVideo() {
          var videos = $("body").find("video");
          // Code to mute video
          videos.attr("muted","muted");
          console.log("Muted video!");
        }

        /* Mutation Observer (When the DOM changes) */

      } else {
        console.log(url + " is whitelisted!");
      }

    }

  });

}
