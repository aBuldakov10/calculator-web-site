//узнать сумму за количество страниц 
function getPages() {
	//получить сумму в зависимости от количества стр
	var pages_amount = +$('#page_amount').val();
	var sum_pages_amount = +pages_amount*4;
	//запись результата в поле рядом
	$('#forPagesSum').html(' ('+sum_pages_amount+' $)');
	console.log(sum_pages_amount);
	return sum_pages_amount;
}

// активация поля для введения страниц при клике на чекбокс
function fillPages() {
	//сделать поле активным
	$('#page_amount').removeAttr('disabled', 'disabled');
	if ($("#content_checkbox").is(":checked")) {
		$('#page_amount').removeAttr('disabled', 'disabled');
		//значение чек-бокса всегда будет 0
		$("#content_checkbox").val(0);
	}
	else {
		$('#page_amount').attr('disabled', 'disabled').val('');
		$('#forPagesSum').html('');
	}
}

//заказать индусов
function chooseIndus() {
	$('#remake_label').css('display', 'block');
}

//заказать нормальных разрабов
function chooseDev() {
	$('#remake_label').css('display', 'none');
	if ($("#remake").is(":checked")) {
		$('#remake').prop('checked', false);
	}
}

//записать в переменную функцию для вычисления
//стоимости в зависимосит от дней на работу
function chooseDays() {
	//получить значение в данный момент и вывести его рядом
	var daysAmount = $('#choose_days').val();
	$('#days_amount').html(daysAmount);
	//узнать стоимость в зависимости от дней
	var sumForDays = 500/+daysAmount;
	//записать округленное до целого числа значение в поле рядом
	$('#sumForDaysAmount').html('('+sumForDays.toFixed()+' $)');
	//возвращает округленное до целого числа значение
	return +sumForDays.toFixed();
}

//записать в переменную функцию для перебора
//всех input-checkbox и вычисления их суммы 
function checkboxVal() {
	var check_sum = 0;
	$('input[type=checkbox]').each(
		function () {
			if (this.checked) {
				var check_price = +$(this).val();
				check_sum = check_sum + check_price;
			}
	})
	console.log('check_summa ', check_sum);
	return check_sum;
}

//записать в переменную функцию для перебора
//всех input-radio и вычисления суммы
function radioVal() {
	var radio_sum = 0;
	$('input[type=radio]').each(
		function () {
			if (this.checked) {
				var radio_price = +$(this).val();
				radio_sum = radio_sum + radio_price;
			}
	})
	console.log('radio_summa ', radio_sum);
	return radio_sum;
}

//записать в переменную функцию для перебора
//всех select и вычисления суммы
function selectVal() {
	var select_sum = 0;
	$('select :selected').each(
		function () {
			if (this.selected) {
				var select_price = +$(this).val();
				select_sum = select_sum + select_price;
			}
	})
	console.log('select_summa ', select_sum);
	return select_sum;
}

//отображение соответствующего контента при выборе пункта из списка
$('#select_site').change(function totalAmount() {
	//переменная для определения отображаемого контента
	var site_value = +$('#select_site :selected').val();
	//показывает только общие пункты
	if (site_value > 0) {
		$('#general').css('display', 'block');
		checkboxVal();
	}
	else {
		//сбросить все чекбоксы и спрятать блоки
		$('#general').css('display', 'none');
		$('#corporative').css('display', 'none');
		$('#shop').css('display', 'none');
		$('#general input').prop('checked', false);
		$('#corporative input').prop('checked', false);
		$('#shop input').prop('checked', false);
	}
	//показывает общие + корпоративные пункты
	if (site_value == 100) {
		$('#corporative').css('display', 'block');
		checkboxVal();
	}
	else {
		//сбросить все чекбоксы и спрятать блоки
		$('#corporative').css('display', 'none');
		$('#corporative input').prop('checked', false);
	}
	//показывает общие + магазинные
	if (site_value == 200) {
		$('#shop').css('display', 'block');
		checkboxVal();
	}
	else {
		//сбросить все чекбоксы и спрятать блоки
		$('#shop').css('display', 'none');
		$('#shop input').prop('checked', false);
	}
});

//при клике на checkbox вызывается переменная в которой есть функция
$('input[type=checkbox]').click(checkboxVal);
//при клике на radio вызывается переменная в которой есть функция
$('input[type=radio]').click(radioVal);
//при выборе select вызывается переменная в котором есть функция
$('select').change(selectVal);
//при смене положения ползунка вызывается переменная в которой есть функция
$('#choose_days').on('input', chooseDays);

//вычисление суммы всех функций с багом - при смене
//с корпоратива на визитку (в корпоративе отметить) пересчитывает чекбоксы
//только после клика, иначе будет ичитывать корпоратив
// $('body').on('input', function () {
// 	var itog = checkboxVal()+radioVal()+selectVal()+chooseDays()+getPages();
// 	$('#total').html(itog);
// })

//без бага но некрасиво - range и дни не считает при вводе
//только после окончания ввода
$('body').change(function () {
	var itog = checkboxVal()+radioVal()+selectVal()+chooseDays()+getPages();
	$('#total').html(itog);
})