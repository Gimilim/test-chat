Данный проект реализует приложение для обмена сообщениями - чат

Структура проекта:

/components - все компоненты проекта

/services - содержит модели и сервисы для запросов на бэк.
Предполагается, что все файлы были автогенерируемыми через SwaggerCodegen,
частично упрощено (с комментариями) из-за принципа работы фэйкового бэка.
Так же в реальном проекте некоторые модели были бы заменены на DTO модели

/state - сервисы проекта

/pipes - пайпы проекта

/helpers - полезные функции, которые будут полезными во всем проекте

app.routing.ts - маршруты

Полезное:
npm run fake-back -- запускает фейковый бэк

Подключен функционал для просмотра стора, по идее можно поставить Redux-Devtools как экстеншин для браузера и посмотреть
работу стора в реальном времени

Основные технологии:
-Angular 18 версии
-RxJS
-AntDesign
-ElfStore (Стейт менеджмент)
-Tailwind (Стили)


Условности:
1) Предполагается, что бэк реализован на SQRS паттерне, модели были частично упрощены из-за невозможности эмуляции поведения через фейковый бэк
2) Обновление данных на странице (например после создания нового канала) не работают, предполагается,
что бэк при успешном создании отправляет объект с данными только что созданного канала
3) Создание нового канала не генерирует новый айдишник. Будучи required полем при попытке засунуть туда null бэк сгенерировал бы туда следующий
по счету айдишник при попытке добавить и записать новый объект в dbcontext. Аналогичные проблемы будут с отправкой сообщения,
все следующие отправленные сообщения будут с нулевым айдишником
4) Модальное окно можно было бы написать более лаконично через кастомную обертку (с написанием отдельного сервиса и компонента)
т.к. в реальных приложениях часто подразумевается многократное использование схожего функционала модальных окон,
в рамках текущего задания взято готовое, коробочное решение
5) Если не забуду и хватит время -- добавлю отслеживание запросов на все взаимодействие с бэком
6) GuidId у моделей объектов заменены на Id осознанно, дискуссионный момент, есть свои плюсы и минусы
7) Вероятно, концептуально неплохо бы подключить возможность получения сообщения без обновления страницы (SignalR?)

ToDo:
-Для сообщений в чате менять статус, который видно визуально, чтобы понимать, что сообщение отправилось, но еще обработано бэком
-Добавить дату отправки сообщения
-Добавить виртуальный скрол для окна чата

