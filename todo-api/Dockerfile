FROM php:8.2-fpm

# Dépendances système
RUN apt-get update && apt-get install -y \
    build-essential libpng-dev libjpeg62-turbo-dev libfreetype6-dev \
    zip jpegoptim optipng pngquant gifsicle vim unzip git curl libonig-dev libxml2-dev libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Dossier de travail
WORKDIR /var/www

# Copie du projet
COPY . .

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install

# Droits
RUN chown -R www-data:www-data /var/www

EXPOSE 9000
CMD ["php-fpm"]
