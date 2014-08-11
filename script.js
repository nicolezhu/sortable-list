$(document).ready(function() {
	var correct_ordering_albums = ['The Beatles', 'Elvis Presley', 'Garth Brooks', 'Led Zeppelin', 'The Eagles', 'Billy Joel', 'Michael Jackson', 'Pink Floyd', 'Elton John', 'AC/DC'];
	var correct_ordering_singles = ['Katy Perry', 'Rihanna', 'Taylor Swift', 'Lil Wayne', 'Kanye West', 'Eminem', 'Flo Rida', 'Lady Gaga', 'Bruno Mars', 'Justin Bieber'];
	var total_items = $('#sortable li').size();
	var list_items = [];
	var original_list_albums = [];
	original_list_albums = $(".albums li").each(function() { list_items.push($(this).text()) });
	var original_list_singles = [];
	original_list_singles = $(".singles li").each(function() { list_items.push($(this).text()) });

	orderAlbums();

	$(function() {
				$(".albums").sortable();
				$(".singles").sortable();
				$("#sortable").disableSelection();
			});

	function orderAlbums() {
		$('.singles').hide();
		$('#orderSingles').removeClass('selected');
		$('#orderAlbums').addClass('selected');
		$('.albums').show();
	}

	function orderSingles() {
		$('#orderAlbums').removeClass('selected');
		$('#orderSingles').addClass('selected');
		$('.singles').show();
		$('.albums').hide();
	}

	function checkOrder() {
		list_items = [];
		if ($('.singles').is(":visible")) {
			$(".singles li").each(function() { list_items.push($(this).text()) });
			for (var i = 0; i < total_items; i++) {
				console.log(list_items[i]);
			}
			console.log(list_items);
			arraysEqual(list_items, correct_ordering_singles);
			highlightAnswers(list_items, correct_ordering_singles);
		} else if ($('.albums').is(":visible")) {
			$(".albums li").each(function() { list_items.push($(this).text()) });
			for (var i = 0; i < total_items; i++) {
				console.log(list_items[i]);
			}
			arraysEqual(list_items, correct_ordering_albums);
			highlightAnswers(list_items, correct_ordering_albums);
		}
	}

	function arraysEqual(arr1, arr2) {
		console.log('reached');
		if (arr1.length !== arr2.length) {
			return false;
		}
		for (var i = 0; i <= arr1.length; i++) {
			if (arr1[i] !== arr2[i]) {
				console.log('false');
				// $("ul li").each(function() { $('li').addClass('incorrect') });
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
	}

	function reset() {
		if ($('.singles').is(":visible")) {
			$('.singles').html(original_list_singles).sortable();
			removeColors();
		} else if ($('.albums').is(":visible")) {
			$('.albums').html(original_list_albums).sortable();
			removeColors();
		}
		/*$('#sortable').html(original_list_albums).sortable();
		removeColors();*/
	}

	function removeColors() {
		$('#sortable li').removeClass('incorrect');
		$('#sortable li').removeClass('correct');
	}

	function showAnswers() {
		if ($('.singles').is(":visible")) {
			$(".singles li").remove();
			for (var i = 0; i < correct_ordering_singles.length; i++) {
				$('.singles').append('<li class="ui-state-default ui-sortable-handle">' + correct_ordering_singles[i] + '</li>');
			}
			$('.singles li').addClass('correct');
			$('.singles').sortable();
		} else if ($('.albums').is(":visible")) {
			$(".albums li").remove();
			for (var i = 0; i < correct_ordering_albums.length; i++) {
				$('.albums').append('<li class="ui-state-default ui-sortable-handle">' + correct_ordering_albums[i] + '</li>');
			}
			$('.albums li').addClass('correct');
			$('.albums').sortable();
		}

		/* $('#sortable li').remove();
		for (var i = 0; i < correct_ordering_albums.length; i++) {
			$('#sortable').append('<li class="ui-state-default ui-sortable-handle">' + correct_ordering_albums[i] + '</li>');
		}
		$('#sortable li').addClass('correct');
		$('#sortable').sortable(); */
	}

	$('#checkAnswers').on('click', checkOrder);
	$('#reset').on('click', reset);
	$('#showAnswers').on('click', showAnswers);
	$('#orderAlbums').on('click', orderAlbums);
	$('#orderSingles').on('click', orderSingles);
});