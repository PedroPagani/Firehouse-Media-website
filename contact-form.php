<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpMailer/Exception.php';
require 'phpMailer/PHPMailer.php';
require 'phpMailer/SMTP.php';


if (isset($_POST['submit'])) {
    
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $jobs = $_POST['jobs'];
    $text = $_POST['text'];

    $emailResponse = '
    <html>
    <head>
        <style>
            
        * {
            /* border: solid 1px red; */
        }

        h3, p {
            margin: 0;
            padding: 0;
        
        }
        
        .container {
            
        
            border: solid 1px black;
            margin-top: 30px;
            
        }

        .name-title {
            font-weight: 700;
            padding: 20px;
            color: white;
            background: #af1414;
            
        }

        .name-input {
            
            padding: 10px;
            font-size: 25px;
            font-weight: 700;
        }
        

        
        
        </style>
    </head>
    <body>

        <div style="text-align: center; width: 85%; margin: 0 auto;">

            <div class="container">
                <div class="name-title">
                    <h3>Nome</h3>
                </div>
                <div class="name-input">
                    <p>'.$name.'</p>
                </div>
            </div>


            <div class="container">
                <div class="name-title">
                    <h3>E-mail</h3>
                </div>
                <div class="name-input">
                    <p>'.$email.'</p>
                </div>
            </div>
            <div class="container">
                <div class="name-title">
                    <h3>Telefone</h3>
                </div>
                <div class="name-input">
                    <p>'.$phone.'</p>
                </div>
            </div>
            <div class="container">
                <div class="name-title">
                    <h3>Produção desejada</h3>
                </div>
                <div class="name-input">
                    <p>'.$jobs.'</p>
                </div>
            </div>
            <div class="container">
                <div class="name-title">
                    <h3>Descrição</h3>
                </div>
                <div class="name-input">
                    <p>'.$text.'</p>
                </div>
            </div>
            
            
        </div>
        
    </body>
    </html>';


    $mail = new PHPMailer;

    $mail->CharSet = 'UTF-8';

    //$mail->isSMTP();
    $mail->Host = "smtp.gmail.com";
    $mail->Port = 587;
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'tls';


    $mail->Username = 'xxx@gmail.com';
    $mail->Password = 'xxx';

    $mail->setFrom("xxx@firehousemedia.com");
    $mail->addAddress('xxx@gmail.com');
    

    $mail->isHTML(true);
    $mail->Subject = 'Contato do site NOVO';
    $mail->Body = $emailResponse;

    // Criando o recaptach!!
    // É o Key para o backend que é dada quando vc registra o recaptach
    $secretKey = "xxx";
    // Aqui seria o value do captcha que ele pega quando o botão submit é apertado
    $responseKey = $_POST['g-recaptcha-response'];

    $userIp = $_SERVER['REMOTE_ADDR'];
    $url = "https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$responseKey&remoteip=$userIp";

    $response = file_get_contents($url);
    $response2 = json_decode($response);


    // A seta é o jeito de acessar um objeto Ex: Javascript (response2.success)
    if ($response2->success) {

        if (!$mail->send()) {
            header('Location: notSent.html');
            echo 'error: ' .$mail->ErrorInfo;
        } else {
            header('Location: obrigado.html');
        }

    } else {
        echo 'Erro captcha: ' .$reponse;
    }

}


?>