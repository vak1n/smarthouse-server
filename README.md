# Сервер для умного дома

Бэкенд для работы умного дома https://vak1n.github.io/smarthouse/public/

## Использование

Сервер развернут на heroku https://smarthouse-server.herokuapp.com/

#### Маршруты

- /status
- /api/events
- /api/videos
- /store

##### /status

Отдает время, прошедшее с запуска сервера.

##### /api/events

Отдает события умного дома. 
Для фильтрации событий по типу добавлен параметр type (/api/events?type=info:critical). 
При передаче некорректного type отдается статус 400 "incorrect type".

##### /api/videos

Отдает ссылки на потоки с видео.

##### /store

REST API для хранения store:

- POST /store добавляет стор
- GET /store/:id отдает стор по йд
- PUT /store/:id обновляет стор по йд

## Разработка 

Окружение при разработке:

- node --version ^10.12.0
- npm --version ^6.4.1

#### Получение

```sh
git clone https://github.com/vak1n/smarthouse-server
cd smarthouse-server
npm install
```

#### Запуск

```sh
npm run dev
```

#### Сборка и старт

```sh
npm start
```

#### Тестирование

TODO
