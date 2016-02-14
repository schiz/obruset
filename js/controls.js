(function($){
	
	$.fn.tzSelect = function(options){
		options = $.extend({
			render : function(option){
				return $('<li>',{
					html : option.text()
				});
			},
			className : ''
		},options);
		
		return this.each(function(){
			
			// "this" указывает на текущий элемент select:
			
			var select = $(this);


			var textF = select.find("option").eq(0).text();
		
			var selectBoxContainer = $('<div>',{
				width		: select.outerWidth(),
				class	: 'tzSelectBox',
				html		: '<div class="selectBox">'+textF+'</div>'
			});
		
			var dropDown = $('<ul>',{className:'dropDown'});
			var selectBox = selectBoxContainer.find('.selectBox');
			
			// Цикл по опциям оригинального элемента select




			if(options.className){
				dropDown.addClass(options.className);
			}
			
			select.find('option').each(function(i){
				var option = $(this);

				if(i==select.attr('selectedIndex')){
					selectBox.html(option.text());
				}
				
				if(option.data('skip')){
					return true;
				}
				
				// Создаем выпадающий пункт в соответствии с атрибутами HTML5
				// data-icon и data-html-text HTML5:
				
				var li = options.render(option);

				li.click(function(){
					
					selectBox.html(option.text());
					dropDown.trigger('hide');
					
					// Когда происходит событие click, мы также отображаем изменения на 
					// оригинальном элементе select:
					select.val(option.val());
					
					return false;
				});
		
				dropDown.append(li);
			});
			
			selectBoxContainer.append(dropDown.hide());
			select.hide().after(selectBoxContainer);
			
			// Привязываем пользовательские события show и hide к dropDown:
			
			dropDown.bind('show',function(){
				
				if(dropDown.is(':animated')){
					return false;
				}
				
				selectBox.addClass('expanded');
				dropDown.slideDown();
				
			}).bind('hide',function(){
				
				if(dropDown.is(':animated')){
					return false;
				}
				
				selectBox.removeClass('expanded');
				dropDown.slideUp();
				
			}).bind('toggle',function(){
				if(selectBox.hasClass('expanded')){
					dropDown.trigger('hide');
				}
				else dropDown.trigger('show');
			});
			
			selectBox.click(function(){
				dropDown.trigger('toggle');
				return false;
			});
		
			// Если мы нажмем где-нибудь на странице в то время, когда выпадающий список выведен,
			// то он будет скрыт:
			
			$(document).click(function(){
				dropDown.trigger('hide');
			});

		});
	}
	
})(jQuery);
$(document).ready(function(){
	
	$('select.makeMeFancy').tzSelect({
		render : function(option){
			return $('<li>',{
				html:	option.text()
			});
		},
		className : 'hasDetails'
	});
	
	// Вызываем версию по умолчанию для выпадающего списка
	$('select.regularSelect').tzSelect();

});
