$(document).ready(function(){
  
  $('#random').on('click', function(e){
    e.preventDefault();
    window.open('https://en.wikipedia.org/wiki/Special:Random');
  });
  
  $('#search').on('click', function(e){
    e.preventDefault();
    $('#footer').hide();
    $.ajax({
      url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search="+$('#search_keyword').val().replace(/ /g,'+')+"&limit=10&suggest=1&redirects=return&callback=?",
      jsonp: "callback",
      dataType: "jsonp",
      success: function(json) {
        var text = '';
        for(var i=0;i<json[1].length;i++)
        {
          text += '<a href="'+json[3][i]+'" target="_blank"><div id="link-block"><h3>'+json[1][i]+'</h3><p>'+json[2][i]+'</p></div></a>';
        }
        $('#header').animate({
          margin:'0px'
        },1000,function(){
          $('#result').hide();
          
          $('#links').html(text);
          $('#result').fadeIn(1000);
          $('#footer').show();
        });
      }
  });
});
});