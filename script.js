var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML =
    ".txt-rotate > .wrap {border-right: solid 5px black; animation: animated-cursor 600ms steps(29,end) infinite; }";
  document.body.appendChild(css);
};

$(document).ready(function () {
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a").on("click", function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        900,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });
});

//   $(document).ready(function () {

//     //menu show hide code
//     $("#sidebarCollapse").click(function(){
//       var columns_container = $(".dynamic-columns");

//       if (!columns_container.hasClass("expanded")) {

//         $(".dynamic-columns #sidebar").hide();
//         $('.dynamic-columns #content').css('width', '100%');

//         columns_container.toggleClass("expanded");
//       }

//       else{

//         $(".dynamic-columns #sidebar").show();

//         $(".dynamic-columns #content").show();
//         $('.dynamic-columns #content').css('width', '76.95%');
//         columns_container.toggleClass("expanded");
//       }
//     });

//     // active code
//       $('li > a').click(function() {
//       $('li').removeClass('active');
//       $(this).parent().addClass('active');
//     });

//     // scroll code
//     $(".list_menu a").click(function(event) {
//       var targetID = $(this).attr("data-target");
//       $(this).attr("href", targetID)
//       console.log( $(this).attr("href"))
//     });
//     // myFunction();

// });

// function myFunction(){
//   $(".list_menu a").click(function(event) {
//     var targetID = $(this).attr("data-target");
//     $(this).attr("href", targetID)
//     console.log( $(this).attr("href"))
//   });
// }
