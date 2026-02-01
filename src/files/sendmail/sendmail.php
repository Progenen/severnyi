<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../phpmailer/Exception.php';
require '../phpmailer/PHPMailer.php';
require '../phpmailer/SMTP.php';

// ==================== НАСТРОЙКИ ====================
$your_email   = 'ваш@email.com';               // Куда приходят письма
$from_name    = 'Сайт Stanislav';              // Имя отправителя в письме

// Для Gmail / Google Workspace — используй App Password (не обычный пароль!)
// Инструкция: https://support.google.com/accounts/answer/185833
$smtp_host    = 'smtp.gmail.com';
$smtp_port    = 587;
$smtp_user    = 'ваш@gmail.com';               // Ваш Gmail
$smtp_pass    = 'ваш-app-password-16-символов'; // App Password, а НЕ обычный пароль
// ===================================================

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die('Неверный метод');
}

$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$message = trim($_POST['message'] ?? '');

if (empty($name) || empty($email) || empty($message)) {
    die('Заполните все поля');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die('Некорректный email');
}

$mail = new PHPMailer(true);

try {
    // Настройки сервера
    $mail->isSMTP();
    $mail->Host       = $smtp_host;
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtp_user;
    $mail->Password   = $smtp_pass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;  // 'tls'
    $mail->Port       = $smtp_port;
    $mail->CharSet    = 'UTF-8';

    // От кого
    $mail->setFrom($smtp_user, $from_name);
    
    // Кому
    $mail->addAddress($your_email);
    
    // Ответить на письмо клиенту
    $mail->addReplyTo($email, $name);

    // Содержимое
    $mail->isHTML(true);
    $mail->Subject = 'Новое сообщение с сайта';
    $mail->Body    = "
        <h3>Новое сообщение</h3>
        <p><b>Имя:</b> " . htmlspecialchars($name) . "</p>
        <p><b>Email:</b> " . htmlspecialchars($email) . "</p>
        <p><b>Телефон:</b><br>" . nl2br(htmlspecialchars($message)) . "</p>
    ";
    $mail->AltBody = "Имя: $name\nEmail: $email\nСообщение:\n$message";

    $mail->send();
    echo 'Сообщение успешно отправлено';

} catch (Exception $e) {
    echo "Ошибка отправки: {$mail->ErrorInfo}";
}