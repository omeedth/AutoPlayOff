var saved = true;

// Choosing Options
function clickOption(clicked) {

//var clicked = $(this);

if(clicked.hasClass("active")) {
  // Do Nothing
} else {
  $(".active").removeClass("active");
  clicked.addClass("active");
  if(clicked.value == "Nothing") {
    console.log("Nothing!");
    $("#whitelist").attr("disabled", "disabled");
  }
  if(saved) {
    saved = false;
    $("#save").removeAttr("disabled");
    $("#status").attr("placeholder", "Not Saved");
  }
}

}

// Selecting Whitelisted Websites
$(document).click(function(e) {

//console.log($(e.target));
var target = $(e.target);
$(".bg-light").removeClass("bg-light");

if(target.hasClass("url")) {

  target.addClass("selected");
  target.addClass("bg-light");

} else if(target.hasClass("list-group-item")) {

  clickOption(target);

}

});

$("body").keydown(function(e) {

console.log("Pressed Key Number: " + e.which);

// Backspace or Delete
if(e.which == 8 || e.which == 46) {
  console.log("Pressed Backspace or Delete!");
  $(".selected").remove();
  if(saved) {
    saved = false;
    $("#save").removeAttr("disabled");
    $("#status").attr("placeholder", "Not Saved");
  }
}

// Pressed Enter
if(e.which == 13) {

  e.preventDefault();

  // Extract Data
  var website = $("#whitelist").val();
  $("#whitelist").val('');

  if(valid(website)) {

    // Add to website
    $("#websites").append('<p class="url border-bottom">' + website + '</p>');

    // Update
    if(saved) {
      saved = false;
      $("#save").removeAttr("disabled");
      $("#status").attr("placeholder", "Not Saved");
    }

  }

}

});

function valid(url) {

  if(url.startsWith("https://") || url.startsWith("http://")) {
    return true;
  }
  return false;

}

// Saves options to chrome.storage
function save_options() {
var video_choice = document.getElementsByClassName('active')[0].value;
var website_list = $("#website");
var websites = [];

$(".url").each(function() {

  websites.push($(this).text());

});

/*
chrome.storage.sync.set({
  'preferences': [video_choice,websites]
}, function() {
  // Update status to let user know options were saved.
  console.log("Saving Options...");
  saved = true;
  $("#save").attr("disabled","disabled");
  $("#status").attr("placeholder", "Saved");
});
*/

chrome.storage.sync.set({
  'video_option': video_choice,
  'whitelist': websites
}, function() {
  // Update status to let user know options were saved.
  console.log("Saving Options...");
  saved = true;
  $("#save").attr("disabled","disabled");
  $("#status").attr("placeholder", "Saved");
});

}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
console.log("Loading Options...");
// Use default value "video_choice" = 'Remove' and "whitelist" = [].
chrome.storage.sync.get({
  'video_option': 'Remove',
  'whitelist': ['https://www.youtube.com/']
}, function(items) {

  $(".list-group-item[value=" + items.video_option + "]").addClass("active");

  var websites = $("#websites");
  for(var i = 0; i < items.whitelist.length; i++) {
    websites.append('<p class="url border-bottom">' + items.whitelist[i] + '</p>');
  }

});
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
