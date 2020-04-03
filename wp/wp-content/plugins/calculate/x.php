<?php
@header("Content-Type: text/html; charset=UTF-8");
@session_start();

$btn_restart = "<p class='foot'><button class='btn_1 btn_c1_restart' id='b_2' type='submit'>Заново</button></p>";

include('res.php');
if (!isset($_POST['id'])) {
    echo "<p class='step'><span class='in'>" . "Шаг 0" . "</span></p>";
    echo "<p class='title'>$title[$a] *</p>";
    echo $btn_restart;
} else {
    $a = $_POST['id'];
    $q_id = $_POST['id'];
    $_SESSION['way'] = $a[0];
    $_SESSION['step'] = $a[1];
    if($_SESSION['step'] == 2)
        unset($_SESSION['calc']);
    $val = $a + 1;
    $i = $a[1] - 2;

    if ($a == 14 || $a == 24) {
        $view = 'checkbox';
    } else $view = 'radio';


    function calculate_window()
    {

        $result = array();
        // Квартира
        if ($_SESSION['calc']['h_type'] == 1) {
            //Дешевые
            if ($_SESSION['calc']['price'] == 0) {
                //этаж
                switch ((int)$_SESSION['calc']['floor']) {
                    //1-5
                    case 0:
                        // Style обычный
                        if ($_SESSION['calc']['style'] == 0) {
                            $result[] = 'REHAU Blitz';
                            $result[] = 'KRAUSS 58';
                            // Style красиво
                        } elseif ($_SESSION['calc']['style'] == 1) {
                            $result[] = 'MONTBLANC Eco 60';
                            // Style не важно
                        } else {
                            $result[] = 'REHAU Blitz';
                            $result[] = 'REHAU Sib-Design';
                            $result[] = 'REHAU Delight-Design';
                            $result[] = 'REHAU Brilland-Design';
                            $result[] = 'MONTBLANC Eco 60';
                            $result[] = 'MONTBLANC Nord 70';
                            $result[] = 'KRAUSS 58';
                        }
                        break;
                    //6-11 and 12-...
                    case 1:
                    case 2:
                        // Style обычный
                        if ($_SESSION['calc']['style'] == 0) {
                            $result[] = 'REHAU Sib-Design';
                            // Style красиво
                        } elseif ($_SESSION['calc']['style'] == 1) {
                            $result[] = 'MONTBLANC Nord 70';
                            // Style не важно
                        } else {
                            $result[] = 'REHAU Sib-Design';
                            $result[] = 'REHAU Delight-Design';
                            $result[] = 'REHAU Brilland-Design';
                            $result[] = 'MONTBLANC Nord 70';
                        }
                        break;
                    //Not found
                    default:
                        $result[] = 'Не найден этаж для квартиры(дешево). Получен: ' . $_SESSION['calc']['floor'];
                        break;
                }
                //Дорогие
            } elseif ($_SESSION['calc']['price'] == 2) {
                //этаж
                switch ((int)$_SESSION['calc']['floor']) {
                    //1-5
                    case 0:
                        // Style обычный
                        if ($_SESSION['calc']['style'] == 0) {
                            $result[] = 'REHAU Sib-Design';
                            $result[] = 'REHAU Brilland-Design';
                            // Style красиво
                        } elseif ($_SESSION['calc']['style'] == 1) {
                            $result[] = 'REHAU Delight-Design';
                            $result[] = 'MONTBLANC Nord 70';
                            // Style не важно
                        } else {
                            $result[] = 'REHAU Blitz';
                            $result[] = 'REHAU Sib-Design';
                            $result[] = 'REHAU Delight-Design';
                            $result[] = 'REHAU Brilland-Design';
                            $result[] = 'MONTBLANC Eco 60';
                            $result[] = 'MONTBLANC Nord 70';
                            $result[] = 'KRAUSS 58';
                        }
                        break;
                    case 1:
                    case 2:
                        // Style обычный
                        if ($_SESSION['calc']['style'] == 0) {
                            $result[] = 'REHAU Brilland-Design';
                            // Style красиво
                        } elseif ($_SESSION['calc']['style'] == 1) {
                            $result[] = 'MONTBLANC Nord 70';
                            // Style не важно
                        } else {
                            $result[] = 'REHAU Sib-Design';
                            $result[] = 'REHAU Delight-Design';
                            $result[] = 'REHAU Brilland-Design';
                            $result[] = 'MONTBLANC Nord 70';
                        }
                        break;
                    //Not found
                    default:
                        $result[] = 'Не найден этаж для квартиры(Дорого). Получен: ' . $_SESSION['calc']['floor'];
                        break;
                }
                // Средние
            } else {
                //этаж
                switch ((int)$_SESSION['calc']['floor']) {
                    //1-5
                    case 0:
                        // Style обычный
                        if ($_SESSION['calc']['style'] == 0) {
                            $result[] = 'REHAU Sib-Design';
                            $result[] = 'REHAU Brilland-Design';
                            $result[] = 'KRAUSS 58';
                            // Style красиво
                        } elseif ($_SESSION['calc']['style'] == 1) {

                            $result[] = 'REHAU Delight-Design';
                            $result[] = 'MONTBLANC Eco 60';
                            $result[] = 'MONTBLANC Nord 70';
                            // Style не важно
                        } else {
                            $result[] = 'REHAU Blitz';
                            $result[] = 'REHAU Sib-Design';
                            $result[] = 'REHAU Delight-Design';
                            $result[] = 'REHAU Brilland-Design';
                            $result[] = 'MONTBLANC Eco 60';
                            $result[] = 'MONTBLANC Nord 70';
                            $result[] = 'KRAUSS 58';
                        }
                        break;
                    case 1:
                    case 2:
                        // Style обычный
                        if ($_SESSION['calc']['style'] == 0) {
                            $result[] = 'REHAU Sib-Design';
                            // Style красиво
                        } elseif ($_SESSION['calc']['style'] == 1) {
                            $result[] = 'REHAU Delight-Design';
                            $result[] = 'MONTBLANC Nord 70';
                            // Style не важно
                        } else {
                            $result[] = 'REHAU Sib-Design';
                            $result[] = 'REHAU Delight-Design';
                            $result[] = 'REHAU Brilland-Design';
                            $result[] = 'MONTBLANC Nord 70';
                        }
                        break;
                    //Not found
                    default:
                        $result[] = 'Не найден этаж для квартиры(Дорого). Получен: ' . $_SESSION['calc']['floor'];
                        break;
                }
            }
            // Загородный дом
        } elseif ($_SESSION['calc']['h_type'] == 2) {
            //Дешевые
            if ($_SESSION['calc']['price'] == 0) {
                // Temperature
                switch ((int)$_SESSION['calc']['temp']) {
                    // 0-10
                    case 0:
                        // Style обычный
                        if ($_SESSION['calc']['style'] == 0) {
                            $result[] = 'KRAUSS 58';
                            // Style красиво
                        } elseif ($_SESSION['calc']['style'] == 1) {
                            $result[] = 'MONTBLANC Eco 60';
                            // Style не важно
                        } else {
                            $result[] = 'REHAU Blitz';
                            $result[] = 'MONTBLANC Eco 60';
                            $result[] = 'MONTBLANC Nord 70';
                            $result[] = 'KRAUSS 58';
                        }
                        break;
                    // 11-...
                    default:
                        // Style обычный
                        if ($_SESSION['calc']['style'] == 0) {
                            $result[] = 'REHAU Sib-Design';
                            // Style красиво
                        } elseif ($_SESSION['calc']['style'] == 1) {
                            $result[] = 'MONTBLANC Nord 70';
                            // Style не важно
                        } else {
                            $result[] = 'REHAU Sib-Design';
                            $result[] = 'REHAU Delight-Design';
                            $result[] = 'REHAU Brilland-Design';
                            $result[] = 'MONTBLANC Nord 70';
                        }
                        break;
                }
                //Дорогие
            } elseif ($_SESSION['calc']['price'] == 2) {
                // Temperature
                switch ((int)$_SESSION['calc']['temp']) {
                    // 0-10
                    case 0:
                        // Style обычный
                        if ($_SESSION['calc']['style'] == 0) {
                            $result[] = 'REHAU Blitz';
                            // Style красиво
                        } elseif ($_SESSION['calc']['style'] == 1) {
                            $result[] = 'MONTBLANC Nord 70';
                            // Style не важно
                        } else {
                            $result[] = 'REHAU Blitz';
                            $result[] = 'MONTBLANC Eco 60';
                            $result[] = 'MONTBLANC Nord 70';
                            $result[] = 'KRAUSS 58';
                        }
                        break;
                    // 11-...
                    default:
                        // Style обычный
                        if ($_SESSION['calc']['style'] == 0) {
                            $result[] = 'REHAU Brilland-Design';
                            // Style красиво
                        } elseif ($_SESSION['calc']['style'] == 1) {
                            $result[] = 'REHAU Delight-Design';
                            // Style не важно
                        } else {
                            $result[] = 'REHAU Sib-Design';
                            $result[] = 'REHAU Delight-Design';
                            $result[] = 'REHAU Brilland-Design';
                            $result[] = 'MONTBLANC Nord 70';
                        }
                        break;
                }
                //Средние
            } else {
                // Temperature
                switch ((int)$_SESSION['calc']['temp']) {
                    // 0-10
                    case 0:
                        // Style обычный
                        if ($_SESSION['calc']['style'] == 0) {
                            $result[] = 'REHAU Blitz';
                            $result[] = 'KRAUSS 58';
                            // Style красиво
                        } elseif ($_SESSION['calc']['style'] == 1) {
                            $result[] = 'MONTBLANC Eco 60';
                            $result[] = 'MONTBLANC Nord 70';
                            // Style не важно
                        } else {
                            $result[] = 'REHAU Blitz';
                            $result[] = 'MONTBLANC Eco 60';
                            $result[] = 'MONTBLANC Nord 70';
                            $result[] = 'KRAUSS 58';
                        }
                        break;
                    // 11-...
                    default:
                        // Style обычный
                        if ($_SESSION['calc']['style'] == 0) {
                            $result[] = 'REHAU Sib-Design';
                            // Style красиво
                        } elseif ($_SESSION['calc']['style'] == 1) {
                            $result[] = 'MONTBLANC Nord 70';
                            // Style не важно
                        } else {
                            $result[] = 'REHAU Sib-Design';
                            $result[] = 'REHAU Delight-Design';
                            $result[] = 'REHAU Brilland-Design';
                            $result[] = 'MONTBLANC Nord 70';
                        }
                        break;
                }
            }
            // Нежилое помещение
        } elseif ($_SESSION['calc']['h_type'] == 3) {
            // Для другое
            if($_SESSION['calc']['wid'] == 3){
                // цена
                switch ((int)$_SESSION['calc']['price']) {
                    // дешевые
                    case 0:
                        // Style обычный
                        if ($_SESSION['calc']['style'] == 0) {
                            $result[] = 'KRAUSS 58';
                            // Style красиво
                        } elseif ($_SESSION['calc']['style'] == 1) {
                            $result[] = 'MONTBLANC Eco 60';
                            // Style не важно
                        } else {
                            $result[] = 'KRAUSS 58';
                            $result[] = 'MONTBLANC Eco 60';
                        }
                        break;
                    // дорогие
                    case 2:
                        // Style обычный
                        if ($_SESSION['calc']['style'] == 0) {
                            $result[] = 'REHAU Blitz';
                            // Style красиво
                        } elseif ($_SESSION['calc']['style'] == 1) {
                            $result[] = 'MONTBLANC Nord 70';
                            // Style не важно
                        } else {
                            $result[] = 'REHAU Blitz';
                            $result[] = 'MONTBLANC Nord 70';
                        }
                        break;
                    // средние
                    default:
                        // Style обычный
                        if ($_SESSION['calc']['style'] == 0) {
                            $result[] = 'REHAU Blitz';
                            $result[] = 'KRAUSS 58';
                            // Style красиво
                        } elseif ($_SESSION['calc']['style'] == 1) {
                            $result[] = 'MONTBLANC Eco 60';
                            $result[] = 'MONTBLANC Nord 70';
                            // Style не важно
                        } else {
                            $result[] = 'REHAU Blitz';
                            $result[] = 'MONTBLANC Eco 60';
                            $result[] = 'MONTBLANC Nord 70';
                            $result[] = 'KRAUSS 58';
                        }
                        break;
                }
            }else{
                //Вид помещения
                switch ((int)$_SESSION['calc']['wid']){
                    // Office
                    case 0:
                        // Style обычный
                        if ($_SESSION['calc']['style'] == 0) {
                            $result[] = 'REHAU Blitz';
                            // Style красиво
                        } elseif ($_SESSION['calc']['style'] == 1) {
                            $result[] = 'MONTBLANC Nord 70';
                            // Style не важно
                        } else {
                            $result[] = 'REHAU Blitz';
                            $result[] = 'MONTBLANC Nord 70';
                        }
                        break;
                    // склад & Пройти комиссию
                    case 1:
                    case 2:
                        // Style обычный
                        if ($_SESSION['calc']['style'] == 0) {
                            $result[] = 'KRAUSS 58';
                            // Style красиво
                        } elseif ($_SESSION['calc']['style'] == 1) {
                            $result[] = 'MONTBLANC Eco 60';
                            // Style не важно
                        } else {
                            $result[] = 'KRAUSS 58';
                            $result[] = 'MONTBLANC Eco 60';
                        }
                        break;
                }
            }

        } else return 'Not found!';

        /*
                if ($_SESSION['calc']['style'] == 0) {
                    $result[] = "Rehau Sib";
                } elseif ($_SESSION['calc']['style'] == 1) {
                    $result[] = "Montblanc Eco";
                    $result[] ="Montblanc Nord";
                    $result[] ="Rehau Delight";
                } elseif ($_SESSION['calc']['style'] == 2) {
                    $result[] = "Montblanc Nord";
                    $result[] = "Rahau Delight";
                }

                if ($_SESSION['calc']['price'] == 0) {
                    if ($_SESSION['calc']['stress'] == 0) {
                        if ($_SESSION['calc']['style'] == 0) {
                            $result = array("KRAUSS 58");
                        } elseif ($_SESSION['calc']['style'] == 1) {
                            $result = array("Rehau Blitz");
                        } else $result = "?";
                    } else $result .= array(" - Без учета дизайна.");
                } elseif ($_SESSION['calc']['price'] == 1) {
                    if ($_SESSION['calc']['stress'] == 0) {
                        if ($_SESSION['calc']['style'] == 0) {
                            $result = array("Rehau Blitz");
                        } elseif ($_SESSION['calc']['style'] == 1) {
                            $result = array("Montblanc Nord");
                        }
                    }
                } elseif ($_SESSION['calc']['price'] == 2) {
                    if ($_SESSION['calc']['stress'] == 0) {
                        if ($_SESSION['calc']['style'] == 0) {
                            $result = array("Rehau Sib");
                        } elseif ($_SESSION['calc']['style'] == 1) {
                            $result = array("Rehau Delight");
                        }
                    }
                }
        // return '<br><a class="bubl" href="#anchor_calc">'.$result."<br>".'</a>';
        */
        $r = "<br>";
        foreach ($result as $t) {
            $r .= '<a class="bubl" href="#anchor_calc">' . $t . '</a><br>';
        }
        return $r;//.print_r($_SESSION['calc'],1);
    }

function label_tpl($data){
    $lable_tpl = '<p class="pl-18" rel="data"><label><label class="f-{view} mr-10"><input class="mr-10" name="data" type="{view}" value="{id}" ></label>{value}</label> </p>';
    foreach($data as $id => $val)
        $lable_tpl = str_replace('{'.$id.'}',$val,$lable_tpl);
    return $lable_tpl;
}
    switch ($a[0]) {
        case '1':
            $_SESSION['calc']['h_type'] = 1;
            // Панель Кирпич Монолит Не знаю
            if ($q_id == 13) $_SESSION['calc']['h_struct'] = $_REQUEST['data'];
            //Этаж? -  1-5 6-12 12-...
            if ($q_id == 14) $_SESSION['calc']['floor'] = $_REQUEST['data'];
            if ($q_id == 15) $_SESSION['calc']['stress'] = $_REQUEST['data'];
            if ($q_id == 16) $_SESSION['calc']['style'] = $_REQUEST['data'];
            if ($q_id == 17) $_SESSION['calc']['price'] = $_REQUEST['data'];
            if ($_SESSION['way'] == '1' and $a != 17) {
                echo "<p class='step'><span class='in'>" . "Шаг $a[1] </span></p>";
                echo "<p class='title'>$title[$a]</p>";
                if ($val == 15) $view = 'checkbox';
                foreach ($way1[$i] as $id => $value) {
                    $data['view']=$view;
                    $data['id']=$id;
                    $data['value']=$value;
                    echo label_tpl($data);
                }
                echo "<p class='foot'><button class='btn_1' id='b_1' type='submit'>Далее</button></p>";
            } else {
                echo "<p class='step'><span class='in'>Результат</span></p>";
                echo "<p class='title'>Вам подойдет: ";
                echo calculate_window();

                echo "</p>";
                echo $btn_restart;
            }
            break;

        case '2':
            $_SESSION['calc']['h_type'] = 2;
            if ($q_id == 23) $_SESSION['calc']['temp'] = $_REQUEST['data'];
            if ($q_id == 25) $_SESSION['calc']['style'] = $_REQUEST['data'];
            if ($q_id == 26) $_SESSION['calc']['price'] = $_REQUEST['data'];
            if ($_SESSION['way'] == '2' and $a != 27) {
                echo "<p class='step'><span class='in'>" . "Шаг " . $a[1] . "</span></p>";
                echo "<p class='title'>$title[$a]</p>";
                if ($val == 25) $view = 'checkbox';
                foreach ($way2[$i] as $id => $value) {
                    $data['view']=$view;
                    $data['id']=$id;
                    $data['value']=$value;
                    echo label_tpl($data);
                }
                echo "<p class='foot'><button class='btn_1' id='b_1' type='submit'>Далее</button></p>";
            } else {
                echo "<p class='step'><span class='in'>Вам подойдет: </span></p>";
                echo "<p class='title'>Вам подойдет: " . calculate_window() . "</p>";
                echo $btn_restart;
            }
            break;

        case '3':
            $_SESSION['calc']['h_type'] = 3;
            //if($q_id == 14) $_SESSION['calc']['etag'] = $_REQUEST['data'];
            //if($q_id == 24) $_SESSION['calc']['stress'] = $_REQUEST['data'];
            //$_SESSION['calc']['stress'] = -1;
            if($q_id == 34) $_SESSION['calc']['wid'] = $_REQUEST['data'];
            if ($q_id == 35) $_SESSION['calc']['style'] = $_REQUEST['data'];
            if ($q_id == 36) $_SESSION['calc']['price'] = $_REQUEST['data'];

            $end = (isset($_SESSION['calc']['wid']) AND $_SESSION['calc']['wid'] != 3 AND $a == 35)?FALSE:TRUE;


            if ($_SESSION['way'] == '3' and ($a != 36 && $end) ) {
                echo "<p class='step'><span class='in'>" . "Шаг " . $a[1] . "</span></p>";
                echo "<p class='title'>$title[$a]</p>";
                foreach ($way3[$i] as $id => $value) {
                    $data['view']=$view;
                    $data['id']=$id;
                    $data['value']=$value;
                    echo label_tpl($data);
                    //echo "<p class='pl-18' rel='data'><label><label class='f-$view mr-10'><input class='mr-10' name='data' type=$view value=$id ></label>$value</label> </p>";
                }
                echo "<p class='foot'><button class='btn_1' id='b_1' type='submit'>Далее</button></p>";
            } else {
                echo "<p class='step'><span class='in'>Результат</span></p>";
                echo "<p class='title'>Вам подойдет: " . calculate_window() . "</p>";
                echo $btn_restart;
            }
            break;
        default:
            echo "Incorrect info";
    }
    echo "<input type='hidden' name='id' value='$val'>";
}
?>


<script type="text/javascript">
function flabels_restart(){
    var $fcheckboxes = $('#w input[type=checkbox]');
    var $fradios = $('#w input[type=radio]');
    /*checkbox*/
    if ($fcheckboxes) {
        $fcheckboxes.each(function() {
            var $checkbox = $(this);
            $checkbox.click(function(){
                $checkbox.parents('.f-checkbox:first').toggleClass('checked');
            });
        });
    }
    /*fradios*/
    if ($fradios) {
        $fradios.each(function() {
            var $radio = $(this);
            $radio.click(function(){
                $('label.f-radio').removeClass('checked');
                $radio.parents('.f-radio:first').toggleClass('checked');
            });
        });
    }
    $('#b_1').click(function () {
        if ($('#w input:checked').val()) {
            var queryStr = $('#calculate').formSerialize();
            $.ajax({
                url: '/wp-content/plugins/calculate/x.php',
                type: 'post',
                dataType: "html",
                data: queryStr,
                success: function (data) {
                    $('#w').html(data);
                }
            });
        } else {
            alert('Вы не выбрали значение!')
        }
        return false;
    });
    $('.btn_c1_restart').click(function () {
        $('#w').html('<p class="step"><span class="in">Шаг 1</span></p>' +
            '<p class="title">Куда вы хотите поставить окна?</p>' +
            '<p class="pl-18"><label><label class="f-radio mr-10"><input class="mr-10" name="id" type="radio" value="12"></label>Квартира</label></p>' +
            '<p class="pl-18"><label><label class="f-radio mr-10"><input class="mr-10" name="id" type="radio" value="22"></label>Загородный дом</label></p>' +
            '<p class="pl-18"><label><label class="f-radio mr-10"><input class="mr-10" name="id" type="radio" value="32"></label>Нежилое помещение</label></p>' +
            '<p class="foot"><button class="btn_1" id="b_1" type="submit">Далее</button></p>');
        flabels_restart();
        return false;
    });
}
    flabels_restart();
</script>




