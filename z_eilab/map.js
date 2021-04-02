/* EiLAB Publishg Guide | version 5.3 | date 2020-01-06 since 2016.12.23 */

/********************************************************************************************************
   초기실행
*********************************************************************************************************/
/* document ready */
$(document).ready(function() {
	preLoadFunction(); // 사전로드 스크립트
	$('.ia').pageMaker({
		manageMode:{ recentDate : 'finishAll' }, //모든페이지완료시 recentDate : 'finishAll'
		pageDefault: { pageCallNumber: true }, //화면콜넘버
		pageCalc:{
			addGuideNum : true, // 가이드페이지 진척률에 포함
			percentGage: true // 진척률 퍼센테이지모드
		},
		// depthNavi : true //뎁스네비게이션
	});
	iaLayout(); // ia메뉴 레이아웃

});

/* window resize */
$(window).resize(function(){
	iaLayout();
})


/********************************************************************************************************
   사전로드 스크립트
*********************************************************************************************************/
 /* 사전로드모음 */
var preLoadFunction = function(){
	iaMenuCtrl(); // ia메뉴 아코디언
	remoteControll(); // 상단고정리모콘 - (ia목록 새로고침, ia메뉴 전체열고닫기)
};

/* 상단고정리모콘 */
var remoteControll = function(){
	listRefresh(); // ia목록 새로고침
	iaMenuAll(); // ia메뉴 전체열고닫기
};


/****************************************************************************
  퍼블리싱가이드
****************************************************************************/
/* ia메뉴 레이아웃 */
var iaLayout = function(){
	var layout = $('.layout'),
		header = $('.header'),
		container = $('.container'),
		ia =  $('.ia');

	var windowHeight = $(window).outerHeight(true),
		headerHeight = header.outerHeight(true);

	layout.css({ 'height': windowHeight })
	container.css({ 'height': windowHeight - headerHeight });
	// ia.css({ 'padding-bottom' : windowHeight*.5 })
};



/* pageMaker */
$.fn.pageMaker = function(options){
	var defaults = {
		pageDefault: {
			pageType: null,
			pageCallNumber: false
		},
		pageCalc:{
			addGuideNum : true,
			percentGage : false
		},
		manageMode:{
			recentDate: null
		},
		depthNavi: false
	};

	var o = $.extend(defaults,options);

	var _this = $(this);

	var ia = $('.ia'),
		folder = ia.find('.dir').html(),
		depth = ia.find('.depth'),
		depthTitle = ia.find('.depth').children('.title'),
		page = ia.find('.page'),
		pageTitle = ia.find('a.info.title'),
		pageDate = ia.find('.info.date'),
		totalPageNum = '[data-pageNum="totalPage"]';
		depthCategory = $('.depth.category')

	depthTop= []

	// 기본사항
	if( o.pageDefault ){
		var btnNew = '<span class="btn btn_func new_window" title="새창열기버튼"></span>',
			btnMoreInfo = '<span class="btn btn_func more_info" title="화면추가정보"></span>';

		depthTitle.each(function(){
			// 폴더경로있는뎁스 root지정
			var _this = $(this);
			if( _this.find('.dir').length > 0 ){
				_this.parent().attr('data-dir','dirDepth');
			};
		});


		
		page.each(function(){
			var _this = $(this);
			var modifyLeng = _this.find('.row_modify .modify').length
			var modifyHtml = '<div class="modify_wrap">'
			 	modifyHtml += '<div class="modify" title="수정 '+ modifyLeng +' 건">'+ modifyLeng +'</div>'
				modifyHtml += '</div>'
			if( modifyLeng > 0 ){
				_this.children('.row').first().find('.info.date').after(modifyHtml);
			}
		});

		
		// 뎁스지정
		depthCategory.each(function(){
			var _this = $(this)
			var contsLength = _this.find('.conts').length
			var depth01 = _this,
				depth02 = depth01.children('.conts').children('.depth'),
				depth03 = depth02.children('.conts').children('.depth'),
				depth04 = depth03.children('.conts').children('.depth');

			depth01.addClass('depth01');
			depth02.addClass('depth02');
			depth03.addClass('depth03');
			depth04.addClass('depth04');

			depthTop.push(_this.position().top)
		});

		


		// 화면경로설정
		pageTitle.each(function(){
			var _this = $(this),
				page = _this.closest('.page'),
				folder = _this.closest('.depth[data-dir="dirDepth"]').find('.dir').text(),
				rootIdxOf = folder.indexOf('/');
				root = folder.substring(0,rootIdxOf),
				fileName = page.find('.info.file').text();

			// 폴더경로 다른 파일 불러올 경우 
			var crossdir = page.find('.info.file').attr('data-crossdir');

			if( Boolean(crossdir) == true ){
				_this.attr('href', root + '/' + crossdir + '/' + fileName);
			}else{
				_this.attr('href', folder + '/' + fileName);
			};

			_this.attr('target','frameView');
			_this.before(btnNew); // 새창열기버튼

		});


		// 화면유형
		if( o.pageDefault.pageType == null ){

			var pageType = function( _this, typeClass, typeName ){
				var pageTitle = _this.find('.info.title');
				var typeHtml = '<span class="'+ typeClass +'">'+ typeName +'</span>';
				pageTitle.prepend(typeHtml);
			};

			page.each(function(){
				var _this = $(this);
				
				// 스텝
				if( _this.attr('class').indexOf('step') > -1 ){
					var srch = _this.attr('class').indexOf('step'),
						stepClass = _this.attr('class').substring(srch);
					var typeInfo = { classname: 'page_step', name: '[' + stepClass + ']' };
					pageType(_this, typeInfo.classname, typeInfo.name );
				};

				// [탭]
				if( _this.hasClass('tab') == true ){
					var typeInfo = { classname: 'page_type tab', name: '[탭]' };
					pageType(_this, typeInfo.classname, typeInfo.name );
				};

				// [레이어]
				if( _this.hasClass('layer') == true ){
					var typeInfo = { classname: 'page_type layer', name: '[레이어]' };
					pageType(_this, typeInfo.classname, typeInfo.name );
				};

				// [풀팝업]
				if( _this.hasClass('popup_full') == true ){
					var typeInfo = { classname: 'page_type popup_full', name: '[풀팝업]' };
					pageType(_this, typeInfo.classname, typeInfo.name );
				}

				// [팝업]
				if( _this.hasClass('popup') == true ){
					var typeInfo = { classname: 'page_type popup', name: '[팝업]' };
					pageType(_this, typeInfo.classname, typeInfo.name );
				}

				// [얼럿]
				if( _this.hasClass('alert') == true ){
					var typeInfo = { classname: 'page_type alert', name: '[얼럿]' };
					pageType(_this, typeInfo.classname, typeInfo.name );
				}

				// [공통]
				if( _this.hasClass('common') == true ){
					var typeInfo = { classname: 'page_type common', name: '[공통]' };
					var pageDate = _this.find('.info.date'),
						pageFile = _this.find('.info.file');

					pageType(_this, typeInfo.classname, typeInfo.name );

					if( Boolean(pageFile.attr('data-crossdir')) == true ){
						pageDate.text('공통화면');
						pageDate.addClass('no_calc')
					};

				};

			});
		};


		// 화면콜넘버
		if( o.pageDefault.pageCallNumber == true ){
			
			depth.each(function(){ // 뎁스
				var _this  = $(this),
					_thisIdx = _this.index() + 1;
				// if( _thisIdx < 10 ) var _thisIdx = '0' + _thisIdx;

				var callNumberHtml = '<span class="call_number" title="Page Call Number"></span>';

				_this.children('.title').prepend(callNumberHtml);

				if( _this.parent('.conts').parent('.depth').hasClass('depth') == true ){
					var _thisIdx =  _this.parent('.conts').prev('.title').find('.call_number').text() + _thisIdx;
				};

				_this.find('.title > .call_number').text(_thisIdx);
			});

			page.each(function(){ // 페이지
				var _this  = $(this),
					_thisIdx = _this.index() + 1;
				if( _thisIdx < 10 ) var _thisIdx = '0' + _thisIdx;
				
				var callNumberHtml = '<span class="call_number" title="Page Call Number"></span>';
				
				_this.find('.title').prepend(callNumberHtml);

				if( _this.parent('.conts').parent('.depth').hasClass('depth') == true ){
					var _thisIdx =  _this.parent('.conts').prev('.title').find('.call_number').text() + '_' + _thisIdx;
				};

				_this.find('.title > .call_number').text(_thisIdx);
			});

		};

	};


	// 일정관리
	if( o.manageMode ){
		var recentDate = o.manageMode.recentDate.replace(/-/g,'');

		pageDate.each(function(){
			var _this = $(this),
				releaseDate = _this.text().replace(/-/g,'');

			// 가이드페이지 진척률에 포함 여부
			if( o.pageCalc.addGuideNum == true || o.pageCalc.addGuideNum == undefined ){ // 포함
				if( releaseDate == 'default' ) _this.addClass('default finish');
			}else{ // 미포함
				if( releaseDate == 'default' ) _this.addClass('no_calc');
			};

			// 페이지완료 정의 
			if( recentDate == 'finishAll' ){ // 모두완료
				if( _this.hasClass('no_calc') == false ) _this.addClass('finish');
			}else{ 
				if( recentDate == releaseDate ) _this.addClass('recent'); // 최근완료
				else if( recentDate > releaseDate ) _this.addClass('finish'); // 이전완료
			}; 

		});
	};
		

	// 진척률산정
	if( o.pageCalc ){
		var pageCalc = function(eClass){
			$(eClass).each(function(){
				var _this = $(this),
					_thisP = _this.parent();

				// 뎁스기준
				var totalLength = _thisP.find('.info.title').length,
					finishLength = _thisP.find('.info.finish').length,
					recentLength = _thisP.find('.info.recent').length,
					nocalcLength = _thisP.find('.no_calc').length;
				var guidePageNum = $('.depth.guide').find('.page').length;


				// 전체기준
				if( _this.attr('data-pageNum') == 'totalPage' ){
					var nocalcLength = ia.find('.no_calc').length;
					var totalLength = ia.find('.info.title').length,
						finishLength = ia.find('.info.finish').length,
						recentLength = ia.find('.info.recent').length;
				};

				// 퍼센테이지모드
				if( o.pageCalc.percentGage == true || o.pageCalc.percentGage == undefined){
					ia.addClass('mode_gage');

					var pagePercent = Math.floor( ((finishLength + recentLength) / (totalLength - nocalcLength)) * 100 );

					_this.append('<div class="gauge_wrap"><div class="gaugebar"></div></div>');

					var gaugeBar = _this.find('.gaugebar');
					gaugeBar.css({ 'width': pagePercent + '%' });
				};

				var pagenumHtml =  '<div class="page_num_wrap">'
					pagenumHtml += '<span class="page_num">'
					pagenumHtml += '(<span class="finish_num">'+ (finishLength + recentLength) +'</span>'
					pagenumHtml += '/'
					pagenumHtml += '<span class="total_num">'+ (totalLength - nocalcLength) +'</span>)</span>'
				if ( o.pageCalc.percentGage == true ) pagenumHtml += '<span class="percent">'+ pagePercent + '%</span>'
					pagenumHtml += '</div>';

				// 가이드페이지 진척률에 추가
				if( o.pageCalc.addGuideNum == false ){
					if( _this.parents('.depth').hasClass('guide') == false ){
						_this.append(pagenumHtml);	
					};
				}else{
					_this.append(pagenumHtml);	
				};

			});
		};

		pageCalc(totalPageNum);
		pageCalc('.depth > .title');
	};


	// 뎁스네비게이션
	if( o.depthNavi == true ){
		if( $('body').find('.navi_wrap').length > 0 ){
			var categoryList =  [];
			var categoryListBgClass =  [];
			depthCategory.each(function(){
				var _this = $(this),
					categoryTitleText = _this.children('.title').html(),
					categoryTitleClass = _this.children('.title').attr('class');

				var categoryTitleBgClassIndexOf = categoryTitleClass.indexOf(''),
					categoryTitleBgClassLastIndexOf = categoryTitleClass.lastIndexOf(''),
					categoryTitleBgClass = categoryTitleClass.substr(categoryTitleBgClassIndexOf,categoryTitleBgClassLastIndexOf);

				categoryListBgClass.push(categoryTitleBgClass);
				categoryList.push(categoryTitleText);

			});

			// for ( var i = 0; i < $('.depth.category').length; i++ ){
			// 	var naviListHtml = '<div class="swiper-slide"><button type="button" class="btn category_list '+ categoryListBgClass[i]+'">' + categoryList[i] + '</button></div>';
			// 	$('.navi_wrap .swiper-wrapper').append(naviListHtml);
			// };

			// var mySwiper = new Swiper ('.navi_wrap .swiper-container', {
			// 	freeMode: true,
			// 	slidesPerView: 'auto',
			// 	scrollbar: {
			// 		el: '.swiper-scrollbar',
			// 		draggable: true
			// 	},
			// })

			var containerScr = function(){
				var scrTop = $('.container').scrollTop()
				var activeNavBtn = $('.navi_wrap .category_list.active')
				if( $('.navi_wrap .category_list').last().hasClass('active') == false ){
					if( scrTop >= $('.depth.category').eq(activeNavBtn.index() +1).position().top ){
						activeNavBtn.next().addClass('active').siblings().removeClass('active')
					}
				};
				if( scrTop <= $('.depth.category').eq(activeNavBtn.index()).position().top ){
					activeNavBtn.prev().addClass('active').siblings().removeClass('active')
				};
			}

			

			for ( var i = 0; i < $('.depth.category').length; i++ ){
				var naviListHtml = '<button type="button" class="btn category_list '+ categoryListBgClass[i]+'">' + categoryList[i] + '</button>';
				$('.navi_wrap').append(naviListHtml);
				$('.navi_wrap').find('.dir').remove()
				$('.navi_wrap').find('.category_list').first().addClass('active')
			};

			

			// $('.category_list').find('.gauge_wrap').remove();
			$(document).on('click', '.category_list', function(){
				$('.container').off('scroll',containerScr)

				var _this = $(this),
					_thisIdx = _this.index();
				var scrT = $('.depth.category').eq(_thisIdx).position().top;
				$('.container').scrollTop(scrT)
				setTimeout(function(){
					_this.addClass('active').siblings().removeClass('active')
					$('.container').on('scroll',containerScr);
				})
			});

			$('.container').on('scroll',containerScr);

		};
		
	}else if( o.depthNavi == false ){
		$('.navi_wrap').hide();
	};


	
	
};

/* 새창열기 이벤트 */
$(document).on('click', '.new_window', function(){
	var new_href = $(this).parent().find('a.info.title').attr('href')
	window.open(new_href,'_blank');
});


/* ia메뉴 아코디언 */
var iaMenuCtrl = function(){
	var depthTitle = $('.depth').children('.title'),
		pageTitle = $('.info.title');

	depthTitle.next().addClass('open');

	// ia메뉴 열고닫기
	var menuCtrl = function(){
		var _this = $(this),
			conts = $(this).next();
		var thisHasOn = conts.hasClass('open');
		var speed = 200;

		if( thisHasOn == true ){ //열기
			// conts.removeClass('open').hide();
			conts.removeClass('open').css({'display':'none'});
			
			// if( conts.closest('.depth').hasClass('last') == true ){
			// 	conts.prev().css({ 'width' : '100%' });
			// 	conts.prev().find('.gauge_wrap').css({ 'width' : '100%' });
			// };
		}else{ //닫기
			conts.addClass('open').show();
			

			// if( conts.closest('.depth').hasClass('last') == true ){
			// 	conts.prev().css({ 'width' : '30%' });
			// 	conts.prev().find('.gauge_wrap').css({ 'width' : '30%' });
			// }else{
			// }
		};
	};

	// 클릭한 페이지 표시
	var nowPage = function(){
		var wrap = $('.ia')
		wrap.find('.page').removeClass('active');
		$(this).closest('.page').addClass('active');
	};

	depthTitle.unbind('click',menuCtrl).bind('click',menuCtrl); // 메뉴열고닫기- 뎁스
	pageTitle.unbind('click',nowPage).bind('click',nowPage); // 클릭한 페이지 표시
};


/* 상단고정리모콘 - ia메뉴 전체열고닫기 */
var iaMenuAll = function(){
	var btn = $('.btn_ia_ctrl');
	btn.parent('.btn_wrap_iactrl').addClass('all_open');

	// btn.click(function(){
	// 	var _this = $(this),
	// 		btnWrap = _this.parent('.btn_wrap_iactrl'),
	// 		lastDep = $('.depth').find('.split');


	// 	if( btnWrap.hasClass('all_open') == true ){
			
	// 		if( _this.hasClass('ia_close') == true ){
	// 			btnWrap.removeClass('all_open');

	// 			btnWrap.addClass('last_hide');
	// 			lastDep.find('.conts').removeClass('open').hide();
	// 		}

	// 	}else if( btnWrap.hasClass('last_hide') == true ){
			
	// 		if( _this.hasClass('ia_close') == true ){
	// 			btnWrap.removeClass('last_hide');

	// 			btnWrap.addClass('last_p_hide');
	// 			lastDep.parent().parent('.depth').find('.conts').removeClass('open').hide()

	// 		}else if( _this.hasClass('ia_open') == true ){
	// 			btnWrap.removeClass('last_hide');
				
	// 			btnWrap.addClass('all_open');
	// 			$('.ia').find('.conts').addClass('open').show();
	// 		}

	// 	}else if( btnWrap.hasClass('last_p_hide') == true ){
			
	// 		if( _this.hasClass('ia_close') == true ){
	// 			btnWrap.removeClass('last_p_hide');

	// 			btnWrap.addClass('last_p_p_hide');
	// 			lastDep.parent().parent('.depth').parent().parent('.depth').find('.conts').removeClass('open').hide()

	// 		}else if( _this.hasClass('ia_open') == true ){
	// 			btnWrap.removeClass('last_p_hide');
				
	// 			btnWrap.addClass('last_hide');
	// 			lastDep.parent().parent('.depth').children('.conts').addClass('open').show()
	// 		}

	// 	}else if( btnWrap.hasClass('last_p_p_hide') == true ){


	// 		if( _this.hasClass('ia_close') == true ){
	// 			btnWrap.removeClass('last_p_p_hide');

	// 			btnWrap.addClass('last_p_p_p_hide');
	// 			lastDep.parent().parent('.depth').parent().parent('.depth').parent().parent('.depth').find('.conts').removeClass('open').hide()

	// 		}else if( _this.hasClass('ia_open') == true ){
	// 			btnWrap.removeClass('last_p_p_hide');
				
	// 			btnWrap.addClass('last_p_hide');
	// 			lastDep.parent().parent('.depth').parent().parent('.depth').children('.conts').addClass('open').show()
	// 		}
			
			

	// 	}else if( btnWrap.hasClass('last_p_p_p_hide') == true ){

	// 		if( _this.hasClass('ia_open') == true ){
	// 			btnWrap.removeClass('last_p_p_p_hide');
				
	// 			btnWrap.addClass('last_p_p_hide');
	// 			lastDep.parent().parent('.depth').parent().parent('.depth').parent().parent('.depth').children('.conts').addClass('open').show()
	// 		}
	// 	}

	// 	$(window).trigger('resize')
	// });

	btn.click(function(){
		var _this = $(this),
			btnWrap = _this.parent('.btn_wrap_iactrl'),
			lastDep = $('.depth').find('.split');


		if( btnWrap.hasClass('all_open') == true ){
			
			if( _this.hasClass('ia_close') == true ){
				btnWrap.removeClass('all_open');

				btnWrap.addClass('last_hide');
				lastDep.find('.conts').removeClass('open').hide();
			}

		}else if( btnWrap.hasClass('last_hide') == true ){
			
			if( _this.hasClass('ia_close') == true ){
				btnWrap.removeClass('last_hide');

				btnWrap.addClass('last_p_hide');
				lastDep.parent().parent('.depth').find('.conts').removeClass('open').hide()

			}else if( _this.hasClass('ia_open') == true ){
				btnWrap.removeClass('last_hide');
				
				btnWrap.addClass('all_open');
				$('.ia').find('.conts').addClass('open').show();
			}

		}else if( btnWrap.hasClass('last_p_hide') == true ){
			
			if( _this.hasClass('ia_close') == true ){
				btnWrap.removeClass('last_p_hide');

				btnWrap.addClass('last_p_p_hide');
				lastDep.parent().parent('.depth').parent().parent('.depth').find('.conts').removeClass('open').hide()

			}else if( _this.hasClass('ia_open') == true ){
				btnWrap.removeClass('last_p_hide');
				
				btnWrap.addClass('last_hide');
				lastDep.parent().parent('.depth').children('.conts').addClass('open').show()
			}

		}else if( btnWrap.hasClass('last_p_p_hide') == true ){


			if( _this.hasClass('ia_close') == true ){
				btnWrap.removeClass('last_p_p_hide');

				btnWrap.addClass('last_p_p_p_hide');
				lastDep.parent().parent('.depth').parent().parent('.depth').parent().parent('.depth').find('.conts').removeClass('open').hide()

			}else if( _this.hasClass('ia_open') == true ){
				btnWrap.removeClass('last_p_p_hide');
				
				btnWrap.addClass('last_p_hide');
				lastDep.parent().parent('.depth').parent().parent('.depth').children('.conts').addClass('open').show()
			}
			
			

		}else if( btnWrap.hasClass('last_p_p_p_hide') == true ){

			if( _this.hasClass('ia_open') == true ){
				btnWrap.removeClass('last_p_p_p_hide');
				
				btnWrap.addClass('last_p_p_hide');
				lastDep.parent().parent('.depth').parent().parent('.depth').parent().parent('.depth').children('.conts').addClass('open').show()
			}
		}

		$(window).trigger('resize')
	});
};

/* 상단고정리모콘 - ia목록 새로고침 */
var listRefresh = function(){
	var btnRefresh = $('.btn.refresh');

	// # ia목록 reload
	var reload = function(){
		window.location.reload();
		$(window).scrollTop(0);
	};

	btnRefresh.unbind('click',reload).bind('click',reload); // ia목록 새로고침
};


/* 상단고정리모콘 - 페이지 부가정보 더 보기 */
$(document).on('click', '.more_info', function(){
	var _this = $(this),
		ia = $('.ia');

	if( _this.hasClass('active') == true ){
		_this.removeClass('active');
		ia.find('.row:first-child').show().siblings().hide();

	}else{
		_this.addClass('active')
		ia.find('.row').show();
	};

	if( ia.find('.page.active').length > 0 ){
		setTimeout(function(){
			var activePagePos = $('.page.active').position().top;
		},50);
	};
	
});


$(document).on('click','.check_modify, .modify_wrap', function(){
	var _this = $(this),
		page = _this.closest('.page');

	var allModifyRow = $('.ia').find('.row_modify'),
		allModifyWrap = $('.ia').find('.modify_wrap');

	if( _this.parents('.page').length > 0  ){
		if( _this.hasClass('active') == true ){
			_this.removeClass('active');
			page.find('.row_modify').hide();
		}else{
			_this.addClass('active')
			page.find('.row_modify').show();
		};
	}else if( _this.parents('.remote_wrap').length > 0 ){
		if( _this.hasClass('active') == true ){
			_this.removeClass('active');
			allModifyWrap.removeClass('active');
			allModifyRow.hide();
		}else{
			_this.addClass('active');
			allModifyWrap.addClass('active');
			allModifyRow.show();
		};
	};
});



	
/********************************************************************************************************
   20191002 클립보드 저장 - 윤종규 temp
*********************************************************************************************************/
/*----------------------------------------
 # 저장 프로세스
-----------------------------------------*/
$(function(){

	$('.info.file').each(function(){
		var _this = $(this);

		//_this.off('click');

		_this.on('click', function(e){

			// 텍스트 & 페이크 인풋
			var	_thisText = _this.text(),
				_fakeInput = "<input class='fake_input' type='text' value=''>";
				
			$('body').prepend(_fakeInput);

			$('.fake_input').css({'position': 'fixed', 'top' : -100, 'left': 0}).val(_thisText);
			$('.fake_input').select();	

			document.execCommand("copy");

			$('.fake_input').remove();

			//안내문
			var infoText = "<div class='info_text'>Copied</div>"

			$('body').append(infoText);
			$('.info_text').css({'z-index': 99999, 'position': 'fixed', 'top': e.pageY + 10, 'left': e.pageX + 10, 'font-size': 12, 'font-weight': 'bold', 'color': 'red', 'background': '#fff'})
			setTimeout(function(){
				$('.info_text').remove();
			},300)

		})	

	})

})
