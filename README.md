# Сервер для Яндекс Дом

https://smarthouse-server.herokuapp.com/

#### Запуск

```sh
npm install
npm start
```

#### Разработка 

```sh
npm install
npm run dev
```

### Четвертое задание «Node js»

Бэкенд для умного дома развернут на heroku https://smarthouse-server.herokuapp.com/

#### Сервер

Cервер напиасан на express, поднимается по умолчанию на 8000 порту и обрабатывает два роута.
По остальным адресам отдает 404 статус. В случае ошибки сервера отдает 500 ошибку. 

    Используемая версия ноды при разработке v10.12.0
    Используемая версия ноды на "продакшне" v8.12.0

#### Роуты

Добвлены роуты: 

- /status
- /api/events 

##### /status

Отдает время, прошедшее с запуска сервера.

##### /api/events

Отдает содержимое файла events.json. 
Для фильтрации событий по типу добавлен параметр type (/api/events?type=info:critical). 
При передаче некорректного type отдается статус 400 "incorrect type". 


#### Дополнительно

- предусмотрена обработка ошибок сервера
- добавлена возможность получать события начиная с определеной позиции и лимитом на количество через параметры offset и limit
- параметры offset и limit проверяются на валидность, в случае некоректных значений отдается 400 ошибка
- параметры передаются через POST запросы чтобы избежать ограничений при GET запросах и кеширования
- бэкенд подключен к фронтеду из первого задания https://vak1n.github.io/smarthouse/public/


### Седьмое задание «Типизация»

Код  переписан на TypeScript
Компиляция и запуск см. выше пункты Сборка и Разработка

- используется строгий режим `"strict": true`
- отсутствуют `@ts-ignore`
- минимальное использование `type assertions`, как например `someVar as SomeType`
- подключен tslint

#### Сложные моменты перевода проекта на TypeScript

Была проблема с прокидованием ошибки сервера

#### Найдены ошибки в процессе перевода

В процессе ошибок в работе не найдено.

#### Продолжу ли работать с TypeScript?

Да. Типизация дает большую уверенность в том, что при внесении изменений к проект, что-то сломается.
