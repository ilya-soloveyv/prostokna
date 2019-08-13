<?php
/**
 * User: Mlex
 * Date: 20.06.13
 * Time: 15:19
 */
@header("Content-Type: content=text/html; charset=utf-8");
$mailTo = array('prosto@prostokna.ru,prosto.pochta2013@mail.ru');
$mailSubjects = array('Заказ окон с сайта*','Заказ обратного звонка*');

function xSendEmails($subject,$body){
    global $mailTo;
    for($i=0;$i<count($mailTo);$i++){
      $email = new TEmail;
      $email->from_email = 'noreply@prostokna.ru';
      $email->to_email = $mailTo[$i];
      $email->subject = $subject;
      $email->body = $body;
      $email->send();
      //mail($mailTo[0], $subject, $body);
    }

}

if(!empty($_POST['act']) && $_POST['act']=='backphone'){
    $result = '';
    $result .= "Имя: ".$_REQUEST['name']."\n";
    $result .= "Телефон: ".$_REQUEST['phone']."\n";
    $result .= "Удобное время для звонка: с ".$_REQUEST['t_from']." до ".$_REQUEST['t_to']."\n";
    xSendEmails($mailSubjects[1],$result);
    die('Спасибо. Мы свяжемся с вами в удобное для вас время.');
}

$firms = array(
    'Montblanc Eco',
    'Montblanc Nord',
    'Rehau Blitz',
    'Rehau Sib',
    'Rehau Delight',
    'Rehau Brillant',
    'Darrio/Wintech',
    'Provedal С-640'
);
$window_names = array(
    'Окно - Х1 - глухое',
    'Окно - Х1 - поворотное',
    'Окно - Х1 - поворотно-откидное',
    'Окно - Х2 - глухое + поворотное',
    'Окно - Х2 - глухое + поворотно-откидное',
    'Окно - Х2 - поворотное + поворотное',
    'Окно - Х2 - поворотное + поворотно-откидное',
    'Окно - Х2 - поворотно-откидное + поворотно-откидное',
    'Окно - Х3 - 2 глухих + поворотное',
    'Окно - Х3 - 2 глухих + поворотно-откидное',
    'Окно - Х3 - глухое + 2 поворотных',
    'Окно - Х3 - поворотное + глухое + поворотно-откидное',
    'Окно - Х3 - глухое + 2 поворотно-откидных',
    'Окно - Х3 - 3 поворотных',
    'Окно - Х3 - 2 поворотных + поворотно-откидное',
    'Окно - Х3 - 2 поворотно-откидных + поворотное',
    'Окно - Х3 - 3 поворотно-откидных',
    'Дверь - Х1 - поворотная',
    'Дверь - Х1 - поворотно-откидная',
    'Алюминий Окно - Х2',
    'Алюминий Окно - Х3',
    'Алюминий Окно - Х4'
);

$data =$_POST['data'];
$result = '';
$result .= "Имя: ".$_POST['name']."\n";
$result .= "Телефон: ".$_POST['telephone']."\n";
$result .= "E-mail: ".$_POST['email']."\n";
$result .= "\n";
foreach($data as $id => $window){
    $result .="****** ОКНО ******\n";
    $result .= "Название: ".$window_names[$window[2]]."\n";
    $result .= "Фирма: ".$firms[$window[3]]."\n";
    $result .= "Ширина: ".$window[0]." mm\n";
    $result .= "Высота: ".$window[1]." mm\n";
    $result .= "Цена: ".$window[4]." р.\n";
    $result .= "\n";
}
$result .= "Общая стоимость заказа: ".$_POST['totalprice']." р.\n";
xSendEmails($mailSubjects[0],$result);
echo "Спасибо, ваша заявка получена. Мы свяжемся с вами в ближайщее время.";




class TEmail {
  public $from_email;
  public $from_name;
  public $to_email;
  public $to_name;
  public $subject;
  public $data_charset = 'UTF-8';
  public $send_charset = 'windows-1251';
  public $body = '';
  public $type = 'text/plain';
  function send(){
    $dc = $this->data_charset;
    $sc = $this->send_charset;
    //Кодируем поля адресата, темы и отправителя
    if ($this->to_name) 
      $enc_to = mime_header_encode($this->to_name,$dc,$sc).' <'.$this->to_email.'>';
    else
      $enc_to = $this->to_email;
    if ($this->from_name)
      $enc_from = $this->mime_header_encode($this->from_name,$dc,$sc).' <'.$this->from_email.'>';
    else
      $enc_from = $this->from_email;
    $enc_subject = $this->mime_header_encode($this->subject,$dc,$sc);

    //Кодируем тело письма
    $enc_body = $dc == $sc?$this->body:iconv($dc,$sc.'//IGNORE',$this->body);

    //Оформляем заголовки письма
    $headers = "Mime-Version: 1.0\r\n";
    $headers .= "Content-type: ".$this->type."; charset=".$sc."\r\n";
    $headers .= "From: ".$enc_from."\r\n";
    //Отправляем
    return mail($enc_to,$enc_subject,$enc_body,$headers);
  }
  function mime_header_encode($str, $data_charset, $send_charset) {
    if($data_charset != $send_charset)
      $str = iconv($data_charset, $send_charset, $str);
    return '=?' . $send_charset . '?B?' . base64_encode($str) . '?=';
  }
}

?>