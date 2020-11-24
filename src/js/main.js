$(document).ready(function() {
  $('#fullpage').fullpage({
    navigation:  true,
    verticalCentered: true,
    sectionsColor : ['#ccc', '#3d5fcc', '#ddd', '#000'],
    anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
    menu: '#myMenu',
    css3: true,
    slidesNavigation: true,
    dragAndMove: true,
    loopBottom: true,

  });

});