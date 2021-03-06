$(document).ready(function() {
	var correct_ordering = ['Anesthesiologists', 'Chief executives', 'Petroleum engineers', 'Computer hardware engineers', 'Nurse practitioners', 'Fashion designers', 'Registered nurses', 'High school teachers', 'Clergy', 'Legislators', 'Logging workers', 'Farmworkers, livestock', 'Cooks, fast food'];
	var wages = ['$235,070', '$178,400', '$149,180', '$106,930', '$95,070', '$73,570', '$68,910', '$58,170', '$47,540', '$39,320', '$35,600', '$24,760', '$18,870'];
	var total_items = $('#sortable li').size();
	var list_items = [];
	var original_list = [];
	original_list = $(".jobs li").each(function() { list_items.push($(this).text()) });

	$(function() {
				$(".jobs").sortable();
				$("#sortable").disableSelection();
			});

	function checkOrder() {
		list_items = [];
		$('.wages').remove();
		$(".jobs li").each(function() { list_items.push($(this).text()) });
		console.log(list_items);
		arraysEqual(list_items, correct_ordering);
		highlightAnswers(list_items, correct_ordering);
	}

	function arraysEqual(arr1, arr2) {
		if (arr1.length !== arr2.length) {
			return false;
		}
		for (var i = 0; i <= arr1.length; i++) {
			if (arr1[i] !== arr2[i]) {
				console.log('false');
				return false;
			}
		}
		console.log('true');
		return true;
	}

	function highlightAnswers(arr1, arr2) {
		var correct;
		var incorrect;
		for (var i = 0; i < arr1.length; i++) {
			// if there is a match
			if (arr1[i] == arr2[i]) {
				console.log('CORRECT');
				correct = $('ul').find('li').filter(':contains("' + arr1[i] + '")');
				// if the answer used to be incorrect
				if (correct.hasClass('incorrect')) {
					correct.removeClass('incorrect').addClass('correct');
				} else {
					console.log('made it');
					correct.addClass('correct');
				}
			} else {
				incorrect = $('ul').find('li').filter(':contains("' + arr2[i] + '")');
				// if answer used to be correct
				if (incorrect.hasClass('correct')) {
					incorrect.removeClass('correct').addClass('incorrect');
				} else {
					incorrect.addClass('incorrect');
				}
			}
		}
		//$('.wages').show();
	}

	function reset() {
		$('.jobs').html(original_list).sortable();
		removeColors();
		$('.wages').hide();
	}

	function removeColors() {
		$('#sortable li').removeClass('incorrect');
		$('#sortable li').removeClass('correct');
	}

	function showAnswers() {
		$(".jobs li").remove();
		for (var i = 0; i < correct_ordering.length; i++) {
			$('.jobs').append('<li class="ui-state-default ui-sortable-handle">' + correct_ordering[i] + '<br><span class="wages">' + wages[i] + '</span></li>');
		}
		$('.wages').show();
		$('.jobs li').addClass('correct');
		$('.jobs').sortable();
	}

	$('#checkAnswers').on('click', checkOrder);
	$('#reset').on('click', reset);
	$('#showAnswers').on('click', showAnswers);
});