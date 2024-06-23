# Payment-form / Форма оплаты

## Introduction

I am continuing my journey in learning TypeScript through the educational platform Skillbox. This task involves creating an online payment form using Node.js and npm, utilizing a build system like Parcel or any other suitable one. The form must include fields for the card number, expiry date, CVC/CVV, and email, with specific validation rules. This exercise helps reinforce my skills in TypeScript and front-end development.

## Введение

Я продолжаю изучать TypeScript на образовательной платформе Skillbox. В этом задании нужно создать форму для онлайн-оплаты, используя Node.js и npm, а также систему сборки, такую как Parcel или любую другую подходящую. Форма должна содержать поля для ввода номера карты, даты окончания действия, CVC/CVV и адреса электронной почты, с обязательной проверкой корректности данных. Это задание поможет мне улучшить навыки в TypeScript и фронтенд-разработке.

[Demo](https://hellsgor.github.io/payment-form/)

Below is the text of the task from my curator / Ниже текст задания от моего куратора

---

## Task: Node.js and npm

_When completing the task, you will need npm and a build system. You can use parcel or try any other system if you can figure it out._

## Create an online payment form. The form should have the following input fields:

- Card Number
- Card Expiry Date (MM/YY)
- CVC/CVV (3 digits on the back of the card)
- E-mail for sending the online receipt

All fields are required to be filled out.

When entering the card number, any characters other than digits should be ignored. The digits should be automatically separated by spaces every 4 digits. The card number must be validated for correctness.

The expiry date should be strictly in the format 00/00, where the first 2 digits are the month, and the 3rd-4th digits are the year. They must be separated by a "/" symbol automatically when 2 digits of the month are entered. The date must be valid (month from 01 to 12) and later than the current date (i.e., if today is March 14, 2021, the minimum valid date is 04/21).

The CVC/CVV field must contain exactly 3 digits.

The e-mail should also be in the correct format.

Validation of the entered value should occur when the field loses focus (blur event). Any error should be reset upon any input in the field.

Below the form, there should be a "Pay" button. It should be in a disabled state until the user has correctly filled out all the fields. You do not need to handle the button press.

To validate the fields, find a library on npm. This is especially important for the card number, as it is a relatively complex algorithm that is not limited to a simple check of the number of characters. Moreover, valid cards may have different numbers of digits, not just the common 16 digits. Do not try to implement a full-fledged check yourself; find a ready-made solution for this.

---

## Задание: Node.js и npm

_При выполнении задания вам понадобится npm и система сборки. Вы можете взять parcel или попробовать любую другую систему, если сможете в ней разобраться._

## Сделайте форму для онлайн-оплаты. Форма должна иметь следующие поля для ввода:

- Номер карты
- Дата окончания действия карты (ММ/ГГ)
- CVC/CVV (3 цифры на обороте карты)
- E-mail для отправки онлайн-чека

Все поля обязательны для заполнения.

При вводе номера карты должны игнорироваться любые символы, кроме цифр. Цифры автоматически разделяются по 4 штуки пробелом. Номер карты должен проходить валидацию на корректность.

Дата окончания должна быть строго в формате 00/00, где первые 2 цифры - номер месяца, 3-4 цифры - год. Обязательно разделяйте их символом "/", причём делать это нужно автоматически, если в поле введено 2 цифры месяца. Указанная должна быть корректной (месяц от 01 до 12) и больше текущей даты (то есть если если сегодня 14 марта 2021 года, то минимально возможная дата - 04/21).

В поле CVC/CVV должно быть введено строго 3 цифры.

E-mail также должен быть указан в корректном формате.

Проверка корректности введённого значения должна происходить при потере фокуса на поле (событие blur). А при любом вводе в поле ошибка должна сбрасываться.

Под формой нужно расположить кнопку "Оплатить". Она должна быть в состоянии disabled до тех пор, пока пользователь корректно не заполнит все поля. Нажатие на кнопку обрабатывать не нужно.

Для валидации полей найдите библиотеку в npm. Особенно это касается номера карты, так как это относительно сложный алгоритм, который не ограничивается простой проверкой количества символов. К тому же валидными могут быть не только распространённые 16-циферные карты, но бывают и карты с другим количеством цифр. Не пытайтесь самостоятельно реализовать полноценную проверку, найдите готовое решение для этого.
