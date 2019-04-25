# Установка и запуск проекта
1. Необходимые зависимости:<br>
  1.1 [**Node JS**](https://nodejs.org/en/download/)<br>
  1.2 [**GIT**](https://git-scm.com/downloads)<br>
2. **Задаем переменную среды**<br>
В поиске Windows вводите "изменение переменных среды" и добавляете: `NODE_ENV = development` [Скрин](http://joxi.ru/krDgMojfEXZQqA)
3. **Форкаем текущий репозиторий** [Скрин](http://joxi.ru/l2ZKkoltwQNK4A)<br>
Таким образом в Вашем аккаунте появляется копия репозитория
4. **Клонируем репозиторий на рабочую машину** (не скачиваем, а именно клонируем)<br>
Для этого запускаем Git bash (ранее установленный), определяем папку где будет распологаться проект (к примеру на `C:/Project`)<br>
Выполняем:<br>
`cd C:/Project`<br>
`git clone https://github.com/ [ Ваш аккаунт ] /prostokna.git`
В выбранной папке появляется папка с названием `prostokna`<br>
`cd prostokna`<br>
5. **Установка Sequelize**<br>
Запускаем:<br>
`sequelize init`<br>
`sequelize db:create`<br>
`sequelize db:migrate`<br>
6. **Установка зависимостей**<br>
Выполняем<br>
`npm i`
7. **Создаем в корне файл `.env`**<br>
Создаем файл в `.env` и вставляем туда<br>
`PORT = 3000`<br>
`MAILGUN_KEY = null`<br>
`MAILGUN_DOMAIN = null`<br>
8. **Запуск**
Выполняем в Git bash в 3-х разных окнах<br>
Gulp nodemon для запуска nodejs сервера <br>
`gulp nodemon`<br>
Gulp watch для запуска наблюдения за изменениями <br>
`gulp watch`<br>
Gulp bs для запуска BrowserSync (необязателен, можно заменить nodemon) <br>
`gulp bs`
