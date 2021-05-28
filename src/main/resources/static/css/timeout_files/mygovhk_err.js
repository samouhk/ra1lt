var cueTextShowDetails = [' show details',' \u986F\u793A\u8A73\u60C5',' \u663E\u793A\u8BE6\u60C5'];
var cueTextHideDetails = [' hide details',' \u96B1\u85CF\u8A73\u60C5',' \u9690\u85CF\u8BE6\u60C5'];

function smart_scroll(el, offset) {
	offset = offset || 0;
	var elHeight = $(el).height();
	var elPos = $(el).offset();
	var elPosTop = elPos.top - offset;
	var vportHeight = $(window).height();
	var windowTop = $(window).scrollTop();
	
	if (elPosTop < windowTop || elPosTop >= (windowTop + vportHeight)) {
		// element not visible
		$('html,body').scrollTop(elPosTop);
	}
}

function collapseCollapsibleContent($collapseHeading,$collapseContent,languageIndex) {
	$collapseHeading.addClass('ui-collapsible-heading-collapsed');
	$collapseHeading.attr('aria-expanded',false);
	$collapseHeading.find('.ui-collapsible-heading-status').text(cueTextShowDetails[languageIndex]);
	$collapseHeading.find('.ui-icon').removeClass('ui-icon-minus').addClass('ui-icon-plus');
	$collapseContent.hide().addClass('ui-collapsible-content-collapsed').attr('aria-hidden',true);
}

function expandCollapsibleContent($collapseHeading,$collapseContent,languageIndex) {
	$collapseHeading.removeClass('ui-collapsible-heading-collapsed');
	$collapseHeading.attr('aria-expanded',true);
	$collapseHeading.find('.ui-collapsible-heading-status').text(cueTextHideDetails[languageIndex]);
	$collapseHeading.find('.ui-icon').removeClass('ui-icon-plus').addClass('ui-icon-minus');
	$collapseContent.show().removeClass('ui-collapsible-content-collapsed').attr('aria-hidden',false);
}

function initExpandCollapse() {
	$('.ui-collapsible-set').each(function(){
		$(this).children('.ui-collapsible').each(function(){
			var $collapseHeading = $(this).children('.ui-collapsible-heading');
			var $collapseContent = $(this).children('.ui-collapsible-content');
			if ($collapseHeading.length && $collapseContent.length) {
				var languageIndex = getLanguageIndex($(this));
				var collapseContentId = $collapseContent.prop('id');
				if (typeof collapseContentId !== "undefined") {
					$collapseHeading.attr('aria-controls',collapseContentId);
				}
				collapseCollapsibleContent($collapseHeading,$collapseContent,languageIndex);
				
				$collapseHeading.children('.ui-collapsible-heading-toggle').click(function(e){
					e.preventDefault();
					if ($collapseContent.is(':visible')) {
						// hide the content
						collapseCollapsibleContent($collapseHeading,$collapseContent,languageIndex);
					} else {
						// expand the content, hide others in the same set, and scroll
						expandCollapsibleContent($collapseHeading,$collapseContent);
						$collapseHeading.parent().siblings('.ui-collapsible').children('.ui-collapsible-content').each(function(){
							if ($(this).is(':visible')) {
								collapseCollapsibleContent($(this).prev('.ui-collapsible-heading'),$(this),languageIndex);
							}
						});
						
						var intervalId = setTimeout(function(){
							smart_scroll(e.target);
						}, 0);
					}
				}).focus(function(){
					$(this).parent('h2').addClass('focus');
				}).focusout(function(){
					$(this).parent('h2').removeClass('focus');
				});
				if (!($collapseHeading.attr('title'))){
					$collapseHeading.children('.ui-collapsible-heading-toggle').hover(
						function(){
							if ($collapseContent.is(':visible')) {
								$(this).attr('title',cueTextHideDetails[languageIndex]);
							} else {
								$(this).attr('title',cueTextShowDetails[languageIndex]);
							}
						},
						function(){
							$(this).removeAttr('title');
						}
					);
				}
			}
		});
	});
}

/*
find the closest elment with class = en, tc, or sc
	return 0 if element (or its parents has class="en")
	return 1 if element (or its parents has class="tc")
	return 2 if element (or its parents has class="sc")
	if class element not found, return 0
*/
function getLanguageIndex($elm) {
	var $closestElm = $elm.closest('.en,.tc,.sc');
	if ($closestElm.length) {
		if ($closestElm.hasClass('tc')) {
			return 1;
		} else {
			if ($closestElm.hasClass('sc')) {
				return 2;
			}
		}
	}
	return 0;
}

function validateForm(frontForm,lang) {
	var alertMsg=['Please enter search keyword(s).','請輸入查詢字串。','请输入查询字串。'];
	/* avoid null query */
	if (!isQueryValid(frontForm,lang)){
		alert(alertMsg[lang]);
		return false;
	}
}

function isQueryValid(thisForm,lang) {
	switch(lang) {
		case 1:
			if (!thisForm.query.value){
				return false;
			}
			break;
		case 2:
			if (!thisForm.query.value){
				return false;
			}
			break;
		default:
			if (!thisForm.query.value){
				return false;
			}
	}
	return true;
}

function initDeviceSpecificCss() {
	// detect if touch device
	if ("ontouchstart" in document.documentElement) {
		$('html').addClass('ui-mobile');
	} else {
		$('body').addClass('no-touch');
	}
}

$(document).ready(function() {
	initDeviceSpecificCss();
	initExpandCollapse();
	$('.searchBtn').focus(function(){
		$(this).addClass('focus');
	}).focusout(function(){
		$(this).removeClass('focus');
	});
});
