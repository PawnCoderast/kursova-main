<?php
require 'PHPMailer-6.9.3/src/Exception.php';
require 'PHPMailer-6.9.3/src/PHPMailer.php';
require 'PHPMailer-6.9.3/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo 'Invalid email address.';
    exit;
}

$email = $data['email'];
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'lutskcorp@gmail.com'; // Ваш email
    $mail->Password = 'pwou nlie wuej pord';   // Ваш пароль
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->CharSet = 'UTF-8';
    $mail->setFrom('lutskcorp@gmail.com', 'LNTU');
    $mail->addAddress($email);
    $mail->isHTML(true);
    $mail->Subject = 'Підписка на сайт';
    $mail->Body = "
        <h1>Нове повідомлення з сайту</h1>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Повідомлення:</strong><br>Ви успішно підписались на наш сайт</p>
    ";
    $mail->send();
    
    echo 'OK';
    http_response_code(200);
} catch (Exception $e) {
    echo "{$mail->ErrorInfo}";
    http_response_code(400);
}
?>
