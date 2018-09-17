jQuery(function($){
   $("#pay input[name='cardnumber']").mask("9999 9999 9999 9999");
   $("#pay input[name='year']").mask("99");
   $("#pay input[name='month']").mask("99");
   $("#pay input[name='code']").mask("999");
});