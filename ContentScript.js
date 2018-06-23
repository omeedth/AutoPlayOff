$(document).ready(run())

function run() {

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
          var clearVideos = setInterval(clearVideo,5000);
        } else {
          // User wants to mute all videos
          var clearVideos = setInterval(muteVideo,5000);
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
        /*
        // Select the node that will be observed for mutations
        var targetNode = document.body;

        // Options for the observer (which mutations to observe)
        var config = { attributes: true, childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        var callback = function(mutationsList) {
            for(var mutation of mutationsList) {
                if (mutation.type == 'childList') {
                    console.log('A child node has been added or removed.');
                    if(mutation.tagName == "video") {
                      mutation.setAttribute("muted", "muted");
                      console.log("mutation has been muted!");
                    }
                }
                else if (mutation.type == 'attributes') {
                    console.log('The ' + mutation.attributeName + ' attribute was modified.');
                }
            }
        };

        // Create an observer instance linked to the callback function
        var observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);

        // Later, you can stop observing
        observer.disconnect();
        */

      } else {
        console.log(url + " is whitelisted!");
      }

    }

  });

}
