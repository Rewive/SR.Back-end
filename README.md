# Social Rating 🚀

## Описание
Проект на основе Nest.js, Mongoose, Express, TypeScript, Swagger, Docker и Docker Compose.

## Установка и запуск проекта

### Локальная установка

1. Клонируйте репозиторий:
    ```bash
    git clone https://github.com/Rewive/SR.Back-end.git
    cd SR.Back-end
    ```

2. Установите зависимости:
    ```bash
    npm install
    ```

3. Переименуйте файл конфигурации:
    ```bash
    mv .env.default .env
    ```

4. Соберите и запустите контейнеры:
    ```bash
    docker-compose up --build
    ```

3. Откройте браузер и перейдите по адресу:
    ```
    http://localhost:3000/docs
    ```

### Линтинг кода

Для проверки кода с помощью ESLint используйте команду:
```bash
npm run lint
```

## Полезное для гита

### Создание новой ветки и переключение на неё:
```bash
git checkout -b dev
```

### Добавление изменений и коммит:
```bash
git add .
git commit -m "Добавил новую фичу"
```

### Отправка изменений:
```bash
git push origin dev
```

### Слияние ветки с основной:
```bash
git checkout main
git merge dev
```