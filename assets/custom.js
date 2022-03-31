  let seconds;
  const date = new Date(window.earlybird_date);
  
  const now = new Date();
  seconds = parseInt((date.getTime() - now.getTime()) / 1000);
  days = Math.floor(seconds / (3600 * 24));
  seconds -= days * 3600 * 24;
  hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  const validationPrint = (timeUnit) => {
    return timeUnit < 10 ? `0${timeUnit}` : timeUnit;
  };

  console.log({days, hours, minutes, seconds });

  $(".minutes").text(validationPrint(minutes));
  $(".hours").text(validationPrint(hours));
  $(".days").text(validationPrint(days));

  const changeTimeWithLimit = setInterval(() => {
    seconds -= 1;

    $(".minutes").text(validationPrint(minutes));

    if (minutes === 0 && hours > 0) {
      seconds = 60;
      minutes = 60;
      hours -= 1;
      $(".hours").text(validationPrint(hours));
    }
    if (minutes === 0 && hours === 0 && days > 0) {
      seconds = 60;
      minutes = 60;
      hours = 24;
      days -= 1;
      $(".days").text(validationPrint(days));
    }
    if (minutes === 0 && hours === 0 && days === 0) {
      $(".flash-event-details").css("display", "none");
      $(".flash-events").css("display", "none");
      clearInterval(changeTimeWithLimit);
    }
  }, 60000);


  let userAgent = navigator.userAgent;
  let browserName;
  if(userAgent.match(/chrome|chromium|crios/i)){
    browserName = "chrome";
  }else if(userAgent.match(/firefox|fxios/i)){
    browserName = "firefox";
  }  else if(userAgent.match(/safari/i)){
    browserName = "safari";
  }else if(userAgent.match(/opr\//i)){
    browserName = "opera";
  } else if(userAgent.match(/edg/i)){
    browserName = "edge";
  }else{
    browserName="No browser detection";
  }
  let device; 
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
      device = "mobile";
  }

  if (browserName == "safari" || device == "mobile") {
    $(".product_navigation_row").css("top", "77px");
  }
/** Sticky Header*/
let offset = $( ".booking-form-container" ).offset();

$(window).scroll(function() {
  var booking_form_container_height = $( ".booking-form-container" ).innerHeight();
  console.log(booking_form_container_height);
  var margin_top = (booking_form_container_height - 70) + "px";
  
    if ( $('html').scrollTop() > offset.top){
        $("#about").css("margin-top", margin_top);
        $('.booking-form-container').addClass('fixed-top');
    } else {
        $("#about").css("margin-top", "0px");
         $('.booking-form-container').removeClass('fixed-top');
    } 
});

$('.header__menu-item').on('click',function(e){
  e.preventDefault();
  $('html,body').animate({
    'scrollTop': $($(this).attr('href')).offset().top - 130 + 'px'
  }, 300);
});

$('.dropdown-item').on('click',function(e){
  e.preventDefault();
  var diffPos = 130;
  if (window.innerWidth < 993) {
    diffPos = 220;
  } 
  if (window.innerWidth < 656) {
    diffPos = 300;
  } 
  if (window.innerWidth <557) {
    diffPos = 300;
  } 
  if (window.innerWidth < 309) {
    diffPos = 380;
  } 
  $('html,body').animate({
    'scrollTop': $($(this).attr('href')).offset().top - diffPos + 'px'
  }, 300);
});

