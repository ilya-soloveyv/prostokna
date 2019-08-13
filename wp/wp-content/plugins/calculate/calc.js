var curTabIndex = 0;
var curTabCount = 0;
var curWindowsID = 0;

var htmlTotalPrice = '.calc p.f-24.b';
var htmlPriceWindow = '.calc p.f-41.b';
var htmlSubmitCalc = '.calc button.btn_1.mr-12';
var htmlFormCalc = '.calc form.ph-6';
var htmlFormBackPhone = '#backphoneform';
var htmlSubmitBackPhone = htmlFormBackPhone+' button.btn_1';
var htmlShampus = 'p.shampus';
var htmlShampusw ='div.calc p.mb-8.f-11.i';
var htmlSliderX ='.js-slider_horizontal';
var htmlSliderY ='.js-slider_vertical';


// w,h,wid,firmid,price
var windowData = [
    [800, 600, 0, 2,0],
    [800, 600, 0, 2,0],
    [800, 600, 0, 2,0],
    [800, 600, 0, 2,0]
];

var ImagesFirmProfiles = [
    'MONTBLANC_ECO-60.png',   // 0
    'MONTBLANC_NORD-70.png',  // 1
    'RehauBlitz.png',         // 2
    'RehauSibDesign.png',     // 3
    'RehauDelightDesign.png', // 4
    'RehauBrillantDesign.png',// 5
    'WINTECH_Isotech.png',    // 6
    'al-profile.png'          // 7
    ];

/*
 0 - Montblanc Eco
 1 - Montblanc Nord
 2 - Rehau Blitz
 3 - Rehau Sib
 4 - Rehau Delight
 5 - Rehau Brillant
 6 - Darrio/Wintech
 7 - Provedal С-640
 */


function showDebug() {
    console.group("Dump");
    console.log("Tab index: %d", curTabIndex);
    console.log("curTabCount: %d", curTabCount);
    console.dir(windowData);
    console.groupEnd();
}

function wSlide(val) {
    windowData[curTabIndex][0] = val;
    CalculateEvent();
}
function hSlide(val) {
    windowData[curTabIndex][1] = val;
    CalculateEvent();
}
function setCurWid(val) {
    windowData[curTabIndex][2] = parseInt(val);
    console.log("Windows id: %d", windowData[curTabIndex][2]);
    CalculateEvent();
}
function setCurFirm(val) {
    windowData[curTabIndex][3] = parseInt(val);
    if(windowData[curTabIndex][3] > 7){ windowData[curTabIndex][3] = 0; }
    console.log("Firm id: %d", windowData[curTabIndex][3]);
    $('.content div.window.active .w-90.fr img').attr('src', '/wp-content/themes/daisho/images/calc_profile/'+ImagesFirmProfiles[parseInt(val)]);
    CalculateEvent();
}
function setCurTabIndex(val) {
    curTabIndex = val;
    console.log("Tab index: %d", curTabIndex);
    CalculateEventEx();
    //CalculateEvent();
}

function getCalcTotalPrice(){
    var totalPrice = 0;

    for (var i = 0; i <= curTabCount; i++) 
      totalPrice += windowData[i][4];
    return totalPrice;
}

var CalculateEventTimeout;
function CalculateEvent(){
  clearTimeout(CalculateEventTimeout);
  CalculateEventTimeout = window.setTimeout(function(){getWindowPrice(curTabIndex);}, 100);
}
function CalculateEventEx() {
    var totalPrice = 0;
    var curPrice = windowData[curTabIndex][4];
    
    if (curPrice>0){
      $(htmlPriceWindow).html( curPrice );
      $(htmlShampusw).html('примерно '+Math.ceil(curPrice / 700)+' бутылок шампанского');
    }
    else{
      $(htmlPriceWindow).html('&nbsp;');
      $(htmlShampusw).html('&nbsp;');
    }

    for (var i = 0; i <= curTabCount; i++) {
        totalPrice += windowData[i][4];
    }
    if (totalPrice>0){
      $(htmlTotalPrice).html(totalPrice + " р.");
      $(htmlShampus).html(Math.ceil(totalPrice/700));
    }
    else {
      $(htmlTotalPrice).html('&nbsp;');
      $(htmlShampus).html('&nbsp;');
    }
    
}
var cacheWindowPrice=[];
function getWindowPrice(tInd) {
    var res = 0;
    var cur_window = windowData[tInd]; /** параметры текущего окна */
    var cwid = cur_window[2]; /** id текущего окна */
    showDebug();

    $.getJSON( "/wp-content/plugins/calculate/calc.php", { x: cur_window[0], y: cur_window[1], type: cur_window[2], brand: cur_window[3], action: "price"})
    .done(function( data ) { updatedPriceCallback(tInd, data); });

}
function updatedPriceCallback(tInd, data){
  windowData[tInd][4] = data.price;
  if (curTabIndex == tInd){
    updateScrolls(data)
    CalculateEventEx();
  }
}
function updateScrolls(data){
  var value = 0;
  hs = $(htmlSliderX).slider();
  hs.slider( "option", {min: data.minX, max: data.maxX});
  if (hs.slider('option','value') < data.minX || hs.slider('option','value') > data.maxX){
    value = Math.ceil((data.maxX+data.minX)/2);
    hs.slider('option','value', value);
    hs.slider('option','slide')
    .call(hs,null,{ handle: $('.ui-slider-handle', hs), value: value });
  }  
  hs = $(htmlSliderY).slider();
  hs.slider( "option", {min: data.minY, max: data.maxY});
  if (hs.slider('option','value') < data.minY || hs.slider('option','value') > data.maxY ){
    value = Math.ceil((data.maxY+data.minY)/2);
    hs.slider('option','value', value);
    hs.slider('option','slide')
    .call(hs,null,{ handle: $('.ui-slider-handle', hs), value: value });
  }  
}


function initNumWindow() {
  var $tabs = $('.js-num_window li.item:not(.add)');
  var $add = $('.js-num_window li.add');
  var $remove = $('.js-num_window a.remove');
  var $windows = $('div.window');
  var i = 0;
  var l = 3;

  $tabs.each(function(index){
    var $obj = $(this);
    $obj.click(function(){
      if($obj.hasClass('hidden'))
        return false;
      $tabs.removeClass('active');
      $obj.addClass('active');
      $windows.removeClass('active');
      $windows.eq(index).addClass('active');
      setCurTabIndex(index);
      return false;
    });
  });

  $remove.click(function(event){
    event.preventDefault();
    $(this).parents('li.item:first').addClass('hidden');
    $add.removeClass('hidden');
    i--;
    curTabCount = i;
    $tabs.eq(i).find('a.remove').removeClass('hidden');
    if (curTabIndex == i+1)
      $tabs.eq(i).click();
    CalculateEventEx();
  });

  $add.click(function() {
    if (i<l) {
      i++;
      curTabCount = i;
      CalculateEvent();
      for(var j=0; j<=i; j++) {
        $tabs.eq(j).removeClass('hidden').find('a.remove').addClass('hidden');
        //$tabs.eq(j).find('input[data-desc=2][name*=marks]').click();
        if (j==i) 
          $tabs.eq(j).find('a.remove').removeClass('hidden');
      }
      $tabs.eq(i).click();
    }
    if (i==l) 
      $add.addClass('hidden');
  });
}

function initTabs() {
    /*
    $('.js-tabs').find('li.item').eq(0).parents('div.window:first').find('div.tab').eq(0).find('input[data-desc=2][name*=marks]').click();
    $('.js-tabs').find('li.item').eq(0).parents('div.window:first').find('div.tab').eq(0).find('input[data-desc=2][name*=marks]').click();
    $('.js-tabs').find('li.item').eq(0).parents('div.window:first').find('div.tab').eq(0).find('input[data-desc=2][name*=mark_]').click();
    $('.js-tabs').find('li.item').eq(0).parents('div.window:first').find('div.tab').eq(0).find('input[data-desc=2][name*=mark_]').click();
    */
    $('.js-tabs').each(function(){
        var $tabs = $(this).find('li.item');
        var i = 0;
        var l = $tabs.length - 1;
        var $tabs_box = $tabs.eq(0).parents('div.window:first').find('div.tab');

        $tabs.each(function(index){
            var $obj = $(this);
            $obj.click(function(){
                $tabs.removeClass('active');
                $obj.addClass('active');
                $tabs_box.removeClass('active').eq(index).addClass('active');
                if (index==1){
                  $tabs_box.eq(index).find('input[data-desc=7][name*=marks]').click();
                  $tabs_box.eq(index).find('input[data-desc=7][name*=marks]').click();

                }
                else{
                  $tabs_box.eq(index).find('input[data-desc=2][name*=marks]').click();
                  $tabs_box.eq(index).find('input[data-desc=2][name*=marks]').click();
                }
                return false;
            });
        });
    });
}

function initMark() {
    var $marks = $('input[name*=marks]');
    var $models = $('input[name*=_model]');

    $marks.filter(':checked').each(function(){
        var $marks_box = $(this).parents('div.window:first').find('div.mark');
        var $model_box = $(this).parents('div.window:first').find('div.model');
		    //console.log("marks.filter id: %s",$(this).attr('id'));
        $marks_box.filter('.'+$(this).attr('id')).show();
    });

    $models.filter(':checked').each(function(){
        var $marks_box = $(this).parents('div.window:first').find('div.mark');
        var $model_box = $(this).parents('div.window:first').find('div.model');
        $model_box.filter('.'+$(this).attr('id')).show();
    });

    $models.click(function(){
        var $marks_box = $(this).parents('div.window:first').find('div.mark');
        var $model_box = $(this).parents('div.window:first').find('div.model');
        $model_box.hide()
        $models.filter(':checked').each(function(){
            $model_box.filter('.'+$(this).attr('id')).show();
        });
        setCurFirm($(this).attr('data-desc'));
    });

    $marks.click(function(){
        var $marks_box = $(this).parents('div.window:first').find('div.mark');
        var $model_box = $(this).parents('div.window:first').find('div.model');
        $marks_box.hide()
        $marks.filter(':checked').each(function(){
            $marks_box.filter('.'+$(this).attr('id')).show();
        });
        setCurFirm($(this).attr('data-desc'));
    });
}

function initGroupPreview() {
  var isSelectSubWindow = false;
  $('.js-group_preview').each(function(){
    var $previews = $(this);
    var $items = $previews.find('li.item').find('div.text');
    var $items_links = $previews.find('li.item').find('div.link');

    $items_links.click(function(){
      $thisParent = $(this).parents('li.item[data-desc]'); 
      $previews.parents('.tab').find('.js-preview_img').attr('src',$thisParent.attr('data-preview'));
      
      $previews.parents('.tab').find('.js-preview_desc').html( $thisParent.attr('data-desc')
          + ' - ' + $(this).find('.text').html().replace(/<br>/g,"").toLowerCase() );

		  setCurWid($(this).attr('data-wid'));
      isSelectSubWindow = true;
    });

    $items.click(function(){
      $item = $(this).parent();
      $previews.parents('.tab').find('.js-preview_img').attr('src',$item.attr('data-preview'));
      $previews.parents('.tab').find('.js-preview_desc').html( $item.attr('data-desc')
          + ( $item.find('div.link').length ? ' - ' + $item.find('div.link').find('.text').html().replace(/<br>/g,"").toLowerCase() :'' ) );

      if(isSelectSubWindow){
        isSelectSubWindow = false;
      }
      else{
        setCurWid($item.attr('data-wid'));
        $items.removeClass("window-selected");
        $item.addClass('window-selected');
      }
    });
    
  });
}


$(function() {
  if ($('.js-group_preview').length)
    initGroupPreview();
  if ($('input[name*=marks]').length)
    initMark();
  if ($('.js-tabs').length)
    initTabs();
  if ($('.js-num_window').length)
    initNumWindow();
  
  if ($('.js-slider_horizontal').length) {
        var changed1 = false;
        var sl2 = $('.js-slider_horizontal').slider({
            range: 'min', min: 450,  max: 1600, step: 5,
            //value: 800,
            slide: function( event, ui ) {
              changed1 = true;
              $( this).parents('.slider_horizontal').find('.field').val( ui.value );
              wSlide(ui.value);
              changed1 = false;
              //$( "#amount" ).val( ui.value );
            }
        });
    		wSlide(800);
        $( ".slider_horizontal .field" ).val( $( ".slider_horizontal .js-slider_horizontal" ).slider( "value" ) );
        sl2.parents('.slider_horizontal').find('.field').change(function() {
            if(!changed1){
                sl2.slider('option', 'value',$(this).val());
                sl2.trigger('change');
                wSlide($(this).val());
            }
        });
    }

    if ($('.js-slider_vertical').length) {
        var changed = false;
        var sl = $('.js-slider_vertical').slider({
            range: 'min', min: 500, max: 2000, step : 5,
            orientation: "vertical",
            //value: 600,
            slide: function( event, ui ) {
                changed = true;
                $( this).parents('.slider_vertical').find('.field').val( ui.value );
        				hSlide(ui.value);
                changed = false;
//                $( "#amount" ).val( ui.value );
            }
        });
        hSlide(600);
        $( ".slider_vertical .field" ).val( $( ".slider_vertical .js-slider_vertical" ).slider( "value" ) );

        sl.parents('.slider_vertical').find('.field').change(function() {
            if(!changed){
            sl.slider('option', 'value',$(this).val());
            sl.trigger('change');
                hSlide($(this).val());
            }
        });
    }

    /* Форма заказа окон */
    $(htmlSubmitCalc).click(function(){
        if ($(htmlFormCalc+' input[name=name]').val() == '') {
            alert('Вы не ввели имя');
            return false;
        }
        if ($(htmlFormCalc+' input[name=telephone]').val() == '') {
            alert('Вы не ввели телефон');
            return false;
        }
        if ($(htmlFormCalc+' input[name=email]').val() == '') {
            alert('Вы не ввели email');
            return false;
        }
        var queryStr = $(htmlFormCalc).formSerialize();
        var totalPrice = getCalcTotalPrice();
        var queryStrCalc = '';
        queryStrCalc = queryStrCalc + '&totalprice='+totalPrice;
        for (var i = 0; i <= curTabCount; i++) {
            for(var t = 0; t < windowData[i].length; t++){
                if(t==3 && windowData[i][t] > 18){
                    queryStrCalc = queryStrCalc + '&data['+i+']['+t+']=7';
                }else{
                    queryStrCalc = queryStrCalc + '&data['+i+']['+t+']='+windowData[i][t];
                }
            }
        }
        queryStr = queryStr + queryStrCalc;
        $.ajax({
            url: '/wp-content/plugins/calculate/send-order.php',
            type: 'post',
            dataType: "html",
            data: queryStr,
            success: function (data) {
                alert(data);
            },
            error: function(jqXHR,textStatus,errorThrown){
                alert("Error: "+errorThrown+"\nStatus: "+textStatus);
            }
        });
        //console.dir(queryStr);
        return false;
    });
    /* Форма обратного звонка */
    $(htmlSubmitBackPhone).click(function(){
        var qStr = $(htmlFormBackPhone).formSerialize();
        qStr = qStr + '&act=backphone';
        $.ajax({
            url: '/wp-content/plugins/calculate/send-order.php',
            type: 'post',
            dataType: "html",
            data: qStr,
            success: function (data) {
                alert(data);
            },
            error: function(jqXHR,textStatus,errorThrown){
                alert("Error: "+errorThrown+"\nStatus: "+textStatus);
            }
        });
        return false;
    });


});