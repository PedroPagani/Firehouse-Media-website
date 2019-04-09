
# About this project

You can check the website here [www.firehousemedia.com.br](https://firehousemedia.com.br/) 

I created this website from scratch, using Gulp, HTML, CSS, javascript and PHPMailer to send mails from a form using PHP.

This is the public version, all passwords and keys were deleted from the files.

---

## Run project

* clone this repo
* run `npm install` to install all dependencies
* run `gulp` in console
    * When you run `gulp` it will create a `dist` folder with all files. The base directory for the server is the `dist` folder.
    * It will open in `http://localhost:3000`
    * Any change that you do in HTML, SCSS or Javascript (from `js` folder), will update the `dist` folder
    * If you change other file that is not listed above, you need to run `gulp copy` to copy all files to `dist` folder

## PHPMailer

I use [PHPMailer](https://github.com/PHPMailer/PHPMailer) to send emails from a form.

## videos.json

This file contains all data from all images for portfolio section. You can check the `portfolioController.js`, it controls the portfolio when the user select a categorie, to load only the images of the specific categorie to make the website faster.

## Service Worker

I create a service worker to cache files to make webpage load faster

