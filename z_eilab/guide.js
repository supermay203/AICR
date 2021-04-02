/* EiLAB Publishg Guide | version 5.3 | date 2020-01-06 since 2016.12.23 */

////////////////////////////////////////////////////////////////////////////////////////////////////
////// 함수 실행
////////////////////////////////////////////////////////////////////////////////////////////////////
$(window).load(function() {
	popupSource(); //소스보기 팝업
});

////////////////////////////////////////////////////////////////////////////////////////////////////
////// 함수 정의
////////////////////////////////////////////////////////////////////////////////////////////////////

/****************************************************************************
  소스보기 팝업
****************************************************************************/

/*----------------------------------------
 # popupSource		소스보기 팝업
 ----------------------------------------*/
 var popupSource = function(){
 	$(document).on('click','.source', function(){
		$('body').append('<div class="sourceDim"></div>');
		$('body').append('<div class="sourceWindow"><div class="sourceWindow_close">X</div><textarea class="sourceView" rows="" cols=""></textarea></div>');
		var tempSource = $(this).parents('.ex_type').find('.source_code').html();
		$('.sourceWindow .sourceView').text(tempSource);
	});
	$(document).on('click','.sourceWindow .sourceWindow_close, .sourceDim', function(){
		$('.sourceWindow, .sourceDim').remove();
	});
 };



	
	



