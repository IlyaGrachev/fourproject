window.addEventListener('DOMContentLoaded', function() {

	'use strict';

	//Tabs

	let tab = document.querySelectorAll('.info-header-tab'),					//Получаем коллекцию элементов(Tabs)
		 info = document.querySelector('.info-header'),							//Получаем родительский элемент
		 tabContent = document.querySelectorAll('.info-tabcontent');		//Получаем коллекцию элементов в которых находится контент всех Tabs

	// Функция, которая скрывает контент всех табов
	function hideTabContent(a) {
		 for (let i = a; i < tabContent.length; i++) {							//Цикл перебора всех полученных элементов с контентом Tabs
			  tabContent[i].classList.remove('show');								//Удаление CSS-свойства, которое делает контент видимым
			  tabContent[i].classList.add('hide');									//Добавление CSS-свойства, которое делает контент невидимым
		 }
	}

	//Запускаем функцию скрытия, чтобы при загрузке страницы скрыть все элементы кроме 1-ого
	hideTabContent(1);

	// Функция, которая показывает контент всех табов
	function showTabContent(b) {
		 if (tabContent[b].classList.contains('hide')) {						//Проверка: действительно ли этот элемент скрыт?
			  tabContent[b].classList.remove('hide');								//Удаление CSS-свойства, которое делает контент невидимым
			  tabContent[b].classList.add('show');									//Добавление CSS-свойства, которое делает контент видимым
		 }
	}

	//Навешиваем обработчик событий на Tabs
	info.addEventListener('click', function(event) {
		 let target = event.target;													//Переменная для сокращения кода
		 if (target && target.classList.contains('info-header-tab')) {		//Если произошло нажатие в родительском элементе с классом info-header точно в элемнт элемент info-header-tab то:
			  for(let i = 0; i < tab.length; i++) {								//Запускается цикл перебора Tabs
					if (target == tab[i]) {												//Если наш клик совпал с номером tab то:
						 hideTabContent(0);												//Скрываем контенты всех остальных Tabs
						 showTabContent(i);												//Показываем контент того tab на который мы кликнули
						 break;																//Прекращаем цикл перебора до следующего нажатия по табу
					}
			  }
		 }

	});



	// Timer 

	let deadline = '2021-11-21';														//Время остановки таймера

	//
	function getTimeRemaining(endtime) {
		 let t = Date.parse(endtime) - Date.parse(new Date()),				//Переменная, в которой будет разница между датой остановки таймера и датой сейчас( в милисекундах)
		 seconds = Math.floor((t/1000) % 60),										//Конвертируем из милисекунд в секунды
		 minutes = Math.floor((t/1000/60) % 60),									//Конвертируем из милисекунд в минуты
		 hours = Math.floor((t/(1000*60*60)));										//Конвертируем из милисекунд в часы

		 return {
			  'total' : t,																	//остаток в милисекундах
			  'hours' : hours,															//часы
			  'minutes' : minutes,														//минуты
			  'seconds' : seconds														//секунды
		 };
	}

	//Функция установки часов
	function setClock(id, endtime) {													//Функция принимает id и время остановки таймера
		 let timer = document.getElementById(id),									//Получаем элемент таймера по id из HTML
			  hours = timer.querySelector('.hours'),								//Получаем элемент для выведения часов
			  minutes = timer.querySelector('.minutes'),							//Получаем элемент для выведения минут
			  seconds = timer.querySelector('.seconds'),							//Получаем элемент для выведения секунд
			  timeInterval = setInterval(updateClock, 1000);					//Задаем интервал обновления таймера(через каждую секунду)
		
		//Функция обновляющая таймер
		 function updateClock() {														//При каждом запуске функции будет создаваться переменная t
			  let t = getTimeRemaining(endtime);									// t будет через каждую секунду получать новое время

			  function addZero(num){													//Функция добавляюща 0 перед числами меньше 10
							  if(num <= 9) {												//Если число меньше 10 то:
									return '0' + num;										//добавляем строку '0' и плюсуем число
							  } else return num;											//В других случаях возвращаем пришедшее число
						 };

			  hours.textContent = addZero(t.hours);								//Выводим в HTML число часов
			  minutes.textContent = addZero(t.minutes);							//Выводим в HTML число минут
			  seconds.textContent = addZero(t.seconds);							//Выводим в HTML число секунд

			  if (t.total <= 0) {														//Если t меньше или равно 0 (Врея таймера истекло):
					clearInterval(timeInterval);										//происходит очистка и в HTML выводятся 00
					hours.textContent = '00';
					minutes.textContent = '00';
					seconds.textContent = '00';
			  }
		 }

	}
	
	//Функция запуска таймера при загрузке страницы
	setClock('timer', deadline);														//Запускаем функцию установки таймера, передаем id и дату окончания таймера



	// Modal

	let more = document.querySelector('.more'),									//получаем кнопку, которая будет выводить модальное окно
		 overlay = document.querySelector('.overlay'),							//скрытое модальное окно
		 close = document.querySelector('.popup-close');						//элемент для закрытия модального окна


	more.addEventListener('click', function() {									//Вешаем обработчик событий на конопку вызова окна, при клике:
		 overlay.style.display = 'block';											//Модальному окну добавляется CSS-класс делающий его видимым
		 this.classList.add('more-splash');											//При нажатии на ЭТУ кнопку происходит СSS анимация
		 document.body.style.overflow = 'hidden';									//При появлении модального окна запрещается прокрутка страницы
	});

	close.addEventListener('click', function() {									//Вешаем обработчик событий на крестик закрытия модального окна
		 overlay.style.display = 'none';												//Модальному окну добавляется CSS-класс делающий его невидимым
		 more.classList.remove('more-splash');										//С кнопки убирается СSS анимация
		 document.body.style.overflow = '';											//При исчезновении разрешается прокрутка страницы
	});




	 // Form

	//Объект сообщений для пользователя о состоянии отправки данных на сервер
	let message = {
		 loading: 'Загрузка...',
		 success: 'Спасибо! Скоро мы с вами свяжемся!',
		 failure: 'Что-то пошло не так...'
	};

	let form = document.querySelector('.main-form'),							//Получаем форму
		 input = form.getElementsByTagName('input'),								//Получаем инпут
		 statusMessage = document.createElement('div');							//Переменная, создающая блок для вывода сообщения в нем

		 statusMessage.classList.add('status');									//Назначаем стиль блоку с сообщением
	
	//НЕ ВЕШАТЬ ОБРАБОТЧИК НА КНОПКУ!!!
	form.addEventListener('submit', function(event) {							//Вешаем обработчик событий, при подтверждении формы:
		 event.preventDefault();														//запретить перезагрузку страницы
		 form.appendChild(statusMessage);											//добовляем в форму блок со статусом

		 let request = new XMLHttpRequest();										//переменная = новому запросу, дальше настройка запроса
		 request.open('POST', 'server.php');										//метод POST и URL servera
		 request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); //наш контент будет содержать данные полученные из формы(ajhvfn json)

		 let formData = new FormData(form);											//Объект в который поместится все, что было в форме

		 let obj = {};																		//Пустой объект для заполнения его данными из формы
		 formData.forEach(function(value, key) {									//Заполняем пустой объект методом forEach
			  obj[key] = value;
		 });
		 let json = JSON.stringify(obj);												//превращаем JS объект в формат Json

		 request.send(json);																//метод send отправляет запрос на сервер

		 request.addEventListener('readystatechange', function() {			//Вешаем обработчик событий на запрос, чтобы отслеживать состояние запроса
			  if (request.readyState < 4) {											//Если запрос ушел, а сервер долго отвечает
					statusMessage.innerHTML = message.loading;					//Выводим сообщение о загрузке
			  } else if(request.readyState === 4 && request.status == 200) {//Если пришел 200 статус
					statusMessage.innerHTML = message.success;					//Выводим сообщении об успешной операции
			  } else {																		//В других случаях
					statusMessage.innerHTML = message.failure;					//Сообщение об ошибке
			  }
		 });

		 for (let i = 0; i < input.length; i++) {									//После отправки данных с формы
			  input[i].value = '';														//каждый инпут очищается
		 }
	});




	// Slider

	let slideIndex = 1,																	//переменная, в которой указывается номер слайда
		 slides = document.querySelectorAll('.slider-item'),					//коллекция всех слайдов
		 prev = document.querySelector('.prev'),									//получаем стрелку слайдера "назад"
		 next = document.querySelector('.next'),									//получаем стрелку слайдера "вперед"
		 dotsWrap = document.querySelector('.slider-dots'),					//родительский элемент дотов, контейнер
		 dots = document.querySelectorAll('.dot');								//доты слайдера

	// Вызов функции показывающей слайд после загрузки
	showSlides(slideIndex);

	//Функция показывающая слайд
	function showSlides(n) {
		
		//Условие круговой прокурутки слайдов
		 if (n > slides.length) {
			  slideIndex = 1;
		 }
		 if (n < 1) {
			  slideIndex = slides.length;
		 }

		 slides.forEach((item) => item.style.display = 'none');				//все слайды на странице скроются
		 // for (let i = 0; i < slides.length; i++) {
		 //     slides[i].style.display = 'none';
		 // }
		 dots.forEach((item) => item.classList.remove('dot-active'));		//Убираем со всех точек CSS-классы активности

		 //Конвертация нормальной системы счисления в систему JS
		 slides[slideIndex - 1].style.display = 'block';						//делаем слайд видимым
		 dots[slideIndex - 1].classList.add('dot-active');						//делаем точку видимой
	}

	//Функция переключения слайда
	function plusSlides(n) {
		 showSlides(slideIndex += n);
	}

	//Функция которая определяет и устанавливает текущий слайд
	function currentSlide(n) {
		 showSlides(slideIndex = n);
	}

	//Функционал стрелки "вперед"
	prev.addEventListener('click', function() {
		 plusSlides(-1);
	});

	//Функционал стрелки "назад"
	next.addEventListener('click', function() {
		 plusSlides(1);
	});

	//Система счислени JS начинается с 0, точек 4, поэтому в условии цикла добавляем +1,
	//а в определении номера элемента делаем -1, чтобы привести все в норму.

	dotsWrap.addEventListener('click', function(event) {
		 for (let i = 0; i < dots.length + 1; i++) {
			  if (event.target.classList.contains('dot') && event.target == dots[i-1]) {	//проверка клика по CSS-свойству и совпадении клика и точки[узнаем номер точки]
					currentSlide(i);																			//вызов функции показа слайда по номеру точки
			  }
		 }
	});

	// Calc

	let persons = document.querySelectorAll('.counter-block-input')[0],						//получаем элемент, в который вводится число людей людей
		 restDays = document.querySelectorAll('.counter-block-input')[1],						//получаем элемент, в который вводится число дней
		 place = document.getElementById('select'),													//получаем место отдыха
		 totalValue = document.getElementById('total'),												//получаем элемент, в котором будет вывод результата
		 personsSum = 0,																						//переменная, отвечающая за количество людей
		 daysSum = 0,																							//переменная, отвечающая за количество дней
		 total = 0;																								//переменная общей суммы

	totalValue.innerHTML = 0;																				//В блок вывода результата ставим 0 по дефолту

	persons.addEventListener('change', function() {													//При заполнении инпута формы persons
		 personsSum = +this.value;																			//Изменяем значение переменной суммы человек
		 total = (daysSum + personsSum)*4000;															//Алгаритм расчета(передается заказчиком)

		//Обработка ситуации, когда одно поле заполнено а другое нет
		 if(restDays.value == '') {																		//если колличество дней не указано, то:
			  totalValue.innerHTML = 0;																	//то в блоке вывода результата будет 0
		 } else {																								//если все формы заполнены, то:
			  totalValue.innerHTML = total;																//показать сумму
		 }
	});

	restDays.addEventListener('change', function() {												//При заполнении инпута формы restDays
		 daysSum = +this.value;																				//Изменяем значение переменной суммы дней
		 total = (daysSum + personsSum)*4000;															//Алгаритм расчета(передается заказчиком)

		 if(persons.value == '') {																			//если колличество дней не указано, то:
			  totalValue.innerHTML = 0;																	//то в блоке вывода результата будет 0
		 } else {																								//если все формы заполнены, то:
			  totalValue.innerHTML = total;																//показать сумму
		 }
	});

	place.addEventListener('change', function() {													//При выборе места отдыха
		 if (restDays.value == '' || persons.value == '') {										//Если кол-во дней или кол-во людей не указано,
			  totalValue.innerHTML = 0;																	//то в блоке вывода результата будет 0
		 } else {																								//если все формы заполнены, то:
			  let a = total;
			  totalValue.innerHTML = a * this.options[this.selectedIndex].value;				//показать сумму * на ТОТ коэффициен указанный в ЭТОМ селекте списка
		 }
	});

});