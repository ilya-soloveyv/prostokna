<script type="text/javascript">
    $(document).ready(function () {
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
    });
</script>
<div class="calc">
    <div id="anchor_calc" style="position: absolute; top: -50px;"></div>
    <div class="head">Просто Калькулятор</div>
    <p class="mb-0 pl-26 f-11">ЗА ВСЁ:</p>
    <p class="mb-14 pl-20 verdana f-24 b"></p>
    <p class="mb-0 pl-26 f-11">ЗА ИЗДЕЛИЕ:</p>
    <p class="mb-2 pl-16 verdana f-41 b"></p>
    <p class="mb-8 f-11 i"></p>
    <p class="mb-14 ac">
    <p class="shampus" style="position: absolute;top: 199px;left: 73px;font-size: 20pt;">1</p>
    <img src="/wp-content/themes/daisho/images/pic9.png" alt=""/></p>
    <form class="ph-6" method="post" action="">
        <p><input class="field c-100" name="name" type="text" value="" placeholder="Имя"/></p>
        <p><input class="field c-100" name="telephone" type="text" value="" placeholder="Телефон"/></p>
        <p><input class="field c-100" name="email" type="text" value="" placeholder="E-mail"/></p>
        <p class="mb-18">
          <button class="btn_1 mr-12" type="submit">Отправить на просчет</button>
					<span class="hint">?<span class="bubl">Бесплатный просчет стоимости окон нашими специалистами, по введенным вами параметрам в калькулятор <i>(телефон или почта нужны для обратной связи)</i></span> </span>
        </p>
    </form>
    <p class="mb-8 ac"><a href="/calculation">Заказать детальный просчет</a></p>
    <p class="ac">+7 (499) 391-22-21</p>
</div>
<div class="constructor">
<ul class="s ibs tabs js-num_window">
    <li class="item active"><span class="text">Окно 1</span></li>
    <li class="item hidden"><span class="text">Окно 2</span> <a class="remove" href="#"></a></li>
    <li class="item hidden"><span class="text">Окно 3</span> <a class="remove" href="#"></a></li>
    <li class="item hidden"><span class="text">Окно 4</span> <a class="remove" href="#"></a></li>
    <li class="item add"></li>
</ul>


<?php for($tab=1; $tab<=4; $tab++){ ?>
<!-- TAB WINDOW -->
<div class="window<?php if($tab==1) echo " active";?>">
<ul class="s ibs tabs right_tabs js-tabs">
    <li class="item active"><span class="text">Пластик</span></li>
    <li class="item"><span class="text">Алюминий</span></li>
</ul>
<div class="tab active">
<div class="col_1">
    <ul class="s ibs-ju list_1 js-group_preview">
        <li data-wid="0" class="item" data-desc="Окно - Х1"
            data-preview="/wp-content/themes/daisho/images/pic25.png">
            <div class="text">
                <p><img class="img" src="/wp-content/themes/daisho/images/pic10.png" alt=""/></p>
                <p>х1</p>
            </div>
            <div class="sub">
                <table class="s">
                    <tr>
                        <td>
                            <div class="link" data-wid="0">
												      <span class="fig"><img src="/wp-content/themes/daisho/images/pic29.png" alt=""/></span>
                              <span class="text">Глухое</span>
                            </div>
                        </td>
                        <td>
                            <div class="link" data-wid="1">
												      <span class="fig"><img src="/wp-content/themes/daisho/images/pic30.png" alt=""/></span>
                              <span class="text">Поворотное</span>
                            </div>
                        </td>
                        <td>
                            <div class="link" data-wid="2">
												      <span class="fig"><img src="/wp-content/themes/daisho/images/pic31.png" alt=""/></span>
                              <span class="text">Поворотно - откидное</span>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </li>
        <li data-wid="3" class="item" data-desc="Окно - Х2"
            data-preview="/wp-content/themes/daisho/images/pic26.png">
            <div class="text">
                <p><img class="img" src="/wp-content/themes/daisho/images/pic12.png" alt=""/></p>
                <p>х2</p>
            </div>
            <div class="sub">
                <table class="s">
                    <tr>
                        <td>
                            <div class="link" data-wid="3">
      												<span class="fig"><img src="/wp-content/themes/daisho/images/pic32.png" alt=""/></span>
                              <span class="text">Глухое&nbsp;+<br/>поворотное</span>
                            </div>
                        </td>
                        <td>
                            <div class="link" data-wid="5">
												      <span class="fig"><img src="/wp-content/themes/daisho/images/pic33.png" alt=""/></span>
												      <span class="text">Поворотное&nbsp;+<br/>поворотное</span>
                            </div>
                        </td>
                        <td>
                            <div class="link" data-wid="6">
												      <span class="fig"><img src="/wp-content/themes/daisho/images/pic34.png" alt=""/></span>
												      <span class="text">Поворотное&nbsp;+<br/>поворотно&nbsp;-<br/>откидное</span>
                            </div>
                        </td>
                        <td>
                            <div class="link" data-wid="4">
												      <span class="fig"><img src="/wp-content/themes/daisho/images/pic35.png" alt=""/></span>
												      <span class="text">Поворотно&nbsp;- <br/>откидное&nbsp;+ <br/>глухое</span>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </li>
        <li data-wid="9" class="item" data-desc="Окно - Х3"
            data-preview="/wp-content/themes/daisho/images/pic27.png">
            <div class="text">
                <p><img class="img" src="/wp-content/themes/daisho/images/pic13.png" alt=""/></p>
                <p>х3</p>
            </div>
            <div class="sub">
                <table class="s">
                    <tr>
                        <td>
                            <div class="link" data-wid="9">
												      <span class="fig"><img src="/wp-content/themes/daisho/images/pic36.png" alt=""/></span>
												      <span class="text">Поворотно&nbsp;-<br/>откидное&nbsp;+<br/>2 глухих</span>
                            </div>
                        </td>
                        <td>
                            <div class="link" data-wid="8">
												      <span class="fig"><img src="/wp-content/themes/daisho/images/pic37.png" alt=""/></span>
												      <span class="text">Поворотное&nbsp;+<br/>2 глухих</span>
                            </div>
                        </td>
                        <td>
                            <div class="link" data-wid="11">
												      <span class="fig"><img src="/wp-content/themes/daisho/images/pic38.png" alt=""/></span>
												      <span class="text">Поворотно&nbsp;-<br/>откидное&nbsp;+<br/>поворотное<br/>+&nbsp;глухое</span>
                            </div>
                        </td>
                        <td>
                            <div class="link" data-wid="14">
												      <span class="fig"><img src="/wp-content/themes/daisho/images/pic39.png" alt=""/></span>
												      <span class="text">Поворотно&nbsp;-<br/>откидное&nbsp;+<br/>2 поворотных</span>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </li>
        <li data-wid="17" class="item" data-desc="Дверь"
            data-preview="/wp-content/themes/daisho/images/pic28.png">
            <div class="text">
                <p><img class="img" src="/wp-content/themes/daisho/images/pic14.png" alt=""/></p>
                <p>Дверь</p>
            </div>
            <div class="sub">
                <table class="s">
                    <tr>
                        <td>
                            <div class="link" data-wid="17">
												      <span class="fig"><img src="/wp-content/themes/daisho/images/pic40.png" alt=""/></span>
                              <span class="text">Поворотная</span>
                            </div>
                        </td>
                        <td>
                            <div class="link" data-wid="18">
												      <span class="fig"><img src="/wp-content/themes/daisho/images/pic41.png" alt=""/></span>
												      <span class="text">Поворотно - откидная</span>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </li>
    </ul>
    <div class="preview">
        <div class="img">
            <p><img class="js-preview_img" height="210" src="/wp-content/themes/daisho/images/pic25.png" alt=""/></p>
            <p class="js-preview_desc">Окно - Х1 - глухое</p>
        </div>
        <div class="slider_horizontal">
            <div class="slider js-slider_horizontal"></div>
            <div class="slider_value"><p>Ширина</p><input class="field" type="text" value=""/><p>мм</p></div>
        </div>
        <div class="slider_vertical">
            <div class="slider js-slider_vertical"></div>
            <div class="slider_value"><p>Высота</p><input class="field" type="text" value=""/><p>мм</p></div>
        </div>
    </div>
</div>
<div class="col_2">
<p class="mb-12">
    <input data-desc="2" name="marks_<?php echo $tab;?>" id="mark_<?php echo $tab;?>_1" class="mr-3" type="radio" value="" checked="checked"/>
    <label for="mark_<?php echo $tab;?>_1" class="red f-10">REHAU</label>
    <input data-desc="0" name="marks_<?php echo $tab;?>" id="mark_<?php echo $tab;?>_2" class="mr-3 ml-6" type="radio" value=""/>
    <label for="mark_<?php echo $tab;?>_2" class="red f-10">MONTBLANC</label>
    <input data-desc="6" name="marks_<?php echo $tab;?>" id="mark_<?php echo $tab;?>_3" class="mr-3 ml-6" type="radio" value=""/>
    <label for="mark_<?php echo $tab;?>_3" class="red f-10">NOVOTEX</label>
</p>
<div class="mark mark_<?php echo $tab;?>_1">
    <div class="o mb-20">
        <div class="w-90 fr"><img src="/wp-content/themes/daisho/images/pic16.png" alt=""/></div>
        <div class="o ph-5">
            <p><input data-desc="2" name="mark_<?php echo $tab;?>_1_model" id="mark_<?php echo $tab;?>_1_model_1" class="mr-4" type="radio" value="" checked="checked"/>
                <label for="mark_<?php echo $tab;?>_1_model_1" class="red f-10">Blitz</label>
            </p>
            <p><input data-desc="3" name="mark_<?php echo $tab;?>_1_model" id="mark_<?php echo $tab;?>_1_model_2" class="mr-4" type="radio" value=""/>
                <label for="mark_<?php echo $tab;?>_1_model_2" class="red f-10">Sib-Design</label>
            </p>
            <p><input data-desc="4" name="mark_<?php echo $tab;?>_1_model" id="mark_<?php echo $tab;?>_1_model_3" class="mr-4" type="radio" value=""/>
                <label for="mark_<?php echo $tab;?>_1_model_3" class="red f-10">Delight-Design</label>
            </p>
            <p><input data-desc="5" name="mark_<?php echo $tab;?>_1_model" id="mark_<?php echo $tab;?>_1_model_4" class="mr-4" type="radio" value=""/>
                <label for="mark_<?php echo $tab;?>_1_model_4" class="red f-10">Brillant-Design</label>
            </p>
        </div>
    </div>
    <div class="model mark_<?php echo $tab;?>_1_model_1">
        <p class="mb-0 i">Безупречное качество REHAU по доступной цене. Экологически чистые окна в классическом дизайне.</p>
        <ul class="mb-24 s i">
            <li>- Монтажная глубина 60 мм;</li>
            <li>- Трёхкамерный профиль;</li>
            <li>- Сопротивление теплопередаче 0,64 м2×°С/Вт;</li>
            <li>- Класс профиля «B»;</li>
            <li>- Защита от холода, осадков и ветра группы «С»;</li>
            <li>- Звукоизоляция класса «С»;</li>
            <li>- Фурнитура Roto (Германия).</li>
        </ul>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Тишина</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 73%"></span> </span>
            <span class="ib vm f-10 i">75%</span>
        </p>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Тепло</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 73%"></span> </span>
            <span class="ib vm f-10 i">73%</span>
        </p>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Дизайн</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 75%"></span> </span>
            <span class="ib vm f-10 i">75%</span>
        </p>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Цена</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 70%"></span> </span>
            <span class="ib vm f-10 i">70%</span>
        </p>
    </div>
    <div class="model mark_<?php echo $tab;?>_1_model_2">
        <p class="mb-0 i">Классический внешний вид и улучшенная теплоизоляция. Качество REHAU по приятной цене.</p>
        <ul class="mb-24 s i">
            <li>- Монтажная глубина 70 мм;</li>
            <li>- Трёхкамерный профиль;</li>
            <li>- Сопротивление теплопередаче 0,7 м2×°С/Вт;</li>
            <li>- Класс профиля «B»;</li>
            <li>- Звукоизоляция класса «С»;</li>
            <li>- Защита от холода, осадков и ветра группы «B»;</li>
            <li>- Фурнитура Roto (Германия);</li>
            <li>- Возможность установки стеклопакета шириной до 42 мм.</li>
        </ul>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Тишина</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 85%"></span> </span>
            <span class="ib vm f-10 i">85%</span>
        </p>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Тепло</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 87%"></span> </span>
            <span class="ib vm f-10 i">87%</span>
        </p>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Дизайн</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 77%"></span> </span>
            <span class="ib vm f-10 i">77%</span>
        </p>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Цена</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 83%"></span> </span>
            <span class="ib vm f-10 i">83%</span>
        </p>
    </div>
    <div class="model mark_<?php echo $tab;?>_1_model_3">
        <p class="mb-0 i">Дизайнерские окна с увеличенным световым проемом. Уникальный фигурный или круглый штапик.</p>
        <ul class="mb-24 s i">
            <li>- Монтажная глубина 70 мм;</li>
            <li>- Пятикамерный профиль;</li>
            <li>- Звукоизоляция 5 класса;</li>
            <li>- Сопротивление теплопередаче 0,8 м2×°С/Вт;</li>
            <li>- Класс профиля «A»;</li>
            <li>- Звукоизоляция класса «А»;</li>
            <li>- Защита от холода, осадков и ветра группы «А»;</li>
            <li>- Фурнитура Roto (Германия);</li>
            <li>- Возможность установки стеклопакета шириной до 42 мм.</li>
        </ul>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Тишина</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 90%"></span> </span>
            <span class="ib vm f-10 i">90%</span>
        </p>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Тепло</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 93%"></span> </span>
            <span class="ib vm f-10 i">93%</span>
        </p>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Дизайн</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 100%"></span> </span>
            <span class="ib vm f-10 i">100%</span>
        </p>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Цена</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 100%"></span> </span>
            <span class="ib vm f-10 i">100%</span>
        </p>
    </div>
    <div class="model mark_<?php echo $tab;?>_1_model_4">
        <p class="mb-0 i">Премиум класс. Максимальная защита в эксклюзивном дизайне. Произведено в Германии.</p>
        <ul class="mb-24 s i">
            <li>- Монтажная глубина 70 мм;</li>
            <li>- Пятикамерный профиль;</li>
            <li>- Сопротивление теплопередаче 0,79 м2×°С/Вт;</li>
            <li>- Класс профиля «A»</li>
            <li>- Звукоизоляция класса «А»;</li>
            <li>- Защита от холода, осадков и ветра группы «А»;</li>
            <li>- Фурнитура Roto (Германия);</li>
            <li>- Возможность установки стеклопакета шириной до 42 мм;</li>
        </ul>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Тишина</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 94%"></span> </span>
            <span class="ib vm f-10 i">94%</span>
        </p>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Тепло</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 97%"></span> </span>
            <span class="ib vm f-10 i">97%</span>
        </p>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Дизайн</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 87%"></span> </span>
            <span class="ib vm f-10 i">87%</span>
        </p>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Цена</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 89%"></span> </span>
            <span class="ib vm f-10 i">89%</span>
        </p>
    </div>
</div>
<div class="mark mark_<?php echo $tab;?>_2">
    <div class="o mb-20">
        <div class="w-90 fr"><img src="/wp-content/themes/daisho/images/pic16.png" alt=""/></div>
        <div class="o ph-5">
            <p><input data-desc="0" name="mark_<?php echo $tab;?>_2_model" id="mark_<?php echo $tab;?>_2_model_1" class="mr-4" type="radio" value="" checked="checked"/>
                <label for="mark_<?php echo $tab;?>_2_model_1" class="red f-10" href="#">Eco 60</label>
            </p>
            <p><input data-desc="1" name="mark_<?php echo $tab;?>_2_model" id="mark_<?php echo $tab;?>_2_model_2" class="mr-4" type="radio" value=""/>
                <label for="mark_<?php echo $tab;?>_2_model_2" class="red f-10" href="#">Nord 70</label>
            </p>
        </div>
    </div>
    <div class="model mark_<?php echo $tab;?>_2_model_1">
        <p class="mb-0 i">Отменное качество по приемлемой цене. Эстетичный профиль с закругленным штапиком.</p>
        <ul class="mb-24 s i">
            <li>- Монтажная глубина 60 мм;</li>
            <li>- Трёхкамерный профиль;</li>
            <li>- Сопротивление теплопередаче 0,58 м2×°С/Вт;</li>
            <li>- Класс профиля «B»</li>
            <li>- Звукоизоляция класса «С»;</li>
            <li>- Защита от холода, осадков и ветра группы «C»;</li>
            <li>- Фурнитура Roto (Германия).</li>
        </ul>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Тишина</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 70%"></span> </span>
            <span class="ib vm f-10 i">70%</span>
        </p>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Тепло</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 75%"></span> </span>
            <span class="ib vm f-10 i">75%</span>
        </p>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Дизайн</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 95%"></span> </span>
            <span class="ib vm f-10 i">95%</span>
        </p>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Цена</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 65%"></span> </span>
            <span class="ib vm f-10 i">65%</span>
        </p>
    </div>
    <div class="model mark_<?php echo $tab;?>_2_model_2">
        <p class="mb-0 i">Самые теплые и красивые окна! Великолепный дизайн и премиальное качество исполнения.</p>
        <ul class="mb-24 s i">
            <li>- Монтажная глубина 70 мм;</li>
            <li>- Пятикамерный профиль;</li>
            <li>- Сопротивление теплопередаче 0,77 м2×°С/Вт;</li>
            <li>- Класс профиля «A»</li>
            <li>- Звукоизоляция класса «А»;</li>
            <li>- Защита от холода, осадков и ветра группы «А»;</li>
            <li>- Фурнитура Roto (Германия);</li>
            <li>- Возможность установки стеклопакета шириной до 42 мм;</li>
        </ul>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Тишина</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 90%"></span> </span>
            <span class="ib vm f-10 i">90%</span>
        </p>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Тепло</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 90%"></span> </span>
            <span class="ib vm f-10 i">90%</span>
        </p>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Дизайн</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 95%"></span> </span>
            <span class="ib vm f-10 i">95%</span>
        </p>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Цена</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 75%"></span> </span>
            <span class="ib vm f-10 i">75%</span>
        </p>
    </div>
</div>
<div class="mark mark_<?php echo $tab;?>_3">
    <div class="o mb-20">
        <div class="w-90 fr"><img src="/wp-content/themes/daisho/images/pic16.png" alt=""/></div>
        <div class="o ph-5">
            <p><input data-desc="6" name="mark_<?php echo $tab;?>_3_model" id="mark_<?php echo $tab;?>_3_model_1" class="mr-4" type="radio" value="" checked="checked"/>
                <label for="mark_<?php echo $tab;?>_3_model_1" class="red f-10" href="#">Novotex Light 58</label>
            </p>
        </div>
    </div>
    <div class="model mark_<?php echo $tab;?>_3_model_1">
        <p class="mb-0 i">Профиль супер-эконом класса. Универсальная оконная система, которая cочетает в себе превосходный внешний вид, надежные технические решения и комфортную ценовую политику.</p>
        <ul class="mb-24 s i">
            <li>- Монтажная глубина 58 мм;</li>
            <li>- Трёхкамерный профиль;</li>
            <li>- Сопротивление теплопередаче 0,64 м2×°С/Вт;</li>
            <li>- Класс профиля «B»</li>
            <li>- Звукоизоляция класса «В»;</li>
            <li>- Защита от холода, осадков и ветра группы «С»;</li>
            <li>- Возможность установки стеклопакета шириной до 32 мм;</li>
        </ul>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Тишина</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 67%"></span> </span>
            <span class="ib vm f-10 i">67%</span>
        </p>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Тепло</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 70%"></span> </span>
            <span class="ib vm f-10 i">70%</span>
        </p>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Дизайн</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 70%"></span> </span>
            <span class="ib vm f-10 i">70%</span>
        </p>
        <p class="mb-24"><span class="ib vm w-42 f-10 i black">Цена</span>
            <span class="graf_2 mr-8"><span class="in" style="width: 60%"></span> </span>
            <span class="ib vm f-10 i">60%</span>
        </p>
    </div>
</div>
</div>
</div>
<div class="tab">
<div class="col_1">
    <ul class="s ibs-ju list_1 js-group_preview">
        <li data-wid="0" class="item" data-desc="Окно - Х2 - раздвижное"
            data-preview="/wp-content/themes/daisho/images/alumini/okno_2x.png">
            <div class="text">
                <p><img class="img" src="/wp-content/themes/daisho/images/pic42.png" alt=""/></p>
                <p>х2</p>
            </div>
        </li>
        <li data-wid="1" class="item" data-desc="Окно - Х3 - раздвижное"
            data-preview="/wp-content/themes/daisho/images/alumini/okno_3x.png">
            <div class="text">
                <p><img class="img" src="/wp-content/themes/daisho/images/pic43.png" alt=""/></p>
                <p>х3</p>
            </div>
        </li>
        <li data-wid="2" class="item" data-desc="Окно - Х4 - раздвижное"
            data-preview="/wp-content/themes/daisho/images/alumini/okno_4x.png">
            <div class="text">
                <p><img class="img" src="/wp-content/themes/daisho/images/pic44.png" alt=""/></p>
                <p>х4</p>
            </div>
        </li>
    </ul>
    <div class="preview">
        <div class="img">
            <p><img class="js-preview_img" height="210" src="/wp-content/themes/daisho/images/alumini/okno_2x.png" alt=""/></p>
            <p class="js-preview_desc">Окно - Х2 - поворотное</p>
        </div>
        <div class="slider_horizontal">
            <div class="slider js-slider_horizontal"></div>
            <div class="slider_value"><p>Ширина</p><input class="field" type="text" value=""/><p>мм</p></div>
        </div>
        <div class="slider_vertical">
            <div class="slider js-slider_vertical"></div>
            <div class="slider_value"><p>Высота</p><input class="field" type="text" value=""/><p>мм</p></div>
        </div>
    </div>
</div>
<div class="col_2">
    <p class="mb-12">
        <input data-desc="7" name="marks_<?php echo $tab;?>" id="mark_<?php echo $tab;?>_100" class="mr-3" type="radio" value=""/>
        <label for="mark_<?php echo $tab;?>_100" class="red f-10" href="#">Provedal C640</label>
    </p>
    <div class="mark mark_<?php echo $tab;?>_100">
        <div class="o mb-20">
            <div class="w-90 fr"><img src="/wp-content/themes/daisho/images/alumini/al-profile.png" alt=""/>
            </div>
            <div class="o ph-5">
                <p class="i"><a href="/balcony-glazing">Остекление балконов</a><br>и лоджий любой сложности. Защита<br>от осадков и шума. Легкость и надежность.</p>
            </div>
				<ul class="mb-24 s i" style="margin-top:25px;">
           			<li>- Ширина стандартного варианта – 64 мм;</li>
            		<li>- Двух и трехполозное конструирование;</li>
            		<li>- Защита от осадков класса Е2;</li>
            		<li>- Заполнение – стекло или стеклопакет;</li>
            		<li>- Звукоизоляция – 20-27 дБ.</li>
        		</ul>
            	 <p class="mb-24"><span class="ib vm w-42 f-10 i black">Тишина</span>
            		<span class="graf_2 mr-8"><span class="in" style="width: 45%"></span> </span>
            		<span class="ib vm f-10 i">45%</span>
        		</p>
        		<p class="mb-24"><span class="ib vm w-42 f-10 i black">Тепло</span>
            		<span class="graf_2 mr-8"><span class="in" style="width: 39%"></span> </span>
            		<span class="ib vm f-10 i">39%</span>
        		</p>
        		<p class="mb-24"><span class="ib vm w-42 f-10 i black">Дизайн</span>
            		<span class="graf_2 mr-8"><span class="in" style="width: 40%"></span> </span>
            		<span class="ib vm f-10 i">40%</span>
        		</p>
        		<p class="mb-24"><span class="ib vm w-42 f-10 i black">Цена</span>
            		<span class="graf_2 mr-8"><span class="in" style="width: 50%"></span> </span>
            		<span class="ib vm f-10 i">50%</span>
        		</p>
        </div>
        
        <div class="model mark_<?php echo $tab;?>_100_model_1">
            <p class="mb-0 i">Безупречное качество REHAU по доступной цене. Экологически чистые окна в классическом дизайне.</p>
            <ul class="mb-24 s i">
                <li>- Ширина стандартного варианта –<br/>64 мм;</li>
                <li>- Двух и трехполозное конструирование;</li>
                <li>- Защита от осадков класса Е2;</li>
                <li>- Заполнение – стекло или<br/>стеклопакет;</li>
                <li>- Звукоизоляция – 20-27 дБ.</li>
            </ul>
            <p class="mb-24"><span class="ib vm w-42 f-10 i black">Тишина</span>
                <span class="graf_2 mr-8"><span class="in" style="width: 73%"></span> </span>
                <span class="ib vm f-10 i">73%</span>
            </p>
            <p class="mb-24"><span class="ib vm w-42 f-10 i black">Тепло</span>
                <span class="graf_2 mr-8"><span class="in" style="width: 62%"></span> </span>
                <span class="ib vm f-10 i">62%</span>
            </p>
            <p class="mb-24"><span class="ib vm w-42 f-10 i black">Дизайн</span>
                <span class="graf_2 mr-8"><span class="in" style="width: 70%"></span> </span>
                <span class="ib vm f-10 i">70%</span>
            </p>
        </div>
        <div class="model mark_<?php echo $tab;?>_100_model_2">
            <p class="mb-0 i"> Дополнительная теплоизоляция сохранит тепло в вашем доме самой холодной зимой. Стандартный дизайн.</p>
            <ul class="mb-24 s i">
                <li>- Монтажная глубина 70 мм;</li>
                <li>- Трёхкамерный профиль;</li>
                <li>- Звукоизоляция 4 класса;</li>
                <li>- Защита от холода, дождя и ветра группы «С»;</li>
                <li>- Фурнитура Roto;</li>
                <li>- Возможность установки стеклопакета шириной до 42 мм;</li>
            </ul>
            <p class="mb-24"><span class="ib vm w-42 f-10 i black">Тишина</span>
                <span class="graf_2 mr-8"><span class="in" style="width: 73%"></span> </span>
                <span class="ib vm f-10 i">73%</span>
            </p>
            <p class="mb-24"><span class="ib vm w-42 f-10 i black">Тепло</span>
                <span class="graf_2 mr-8"><span class="in" style="width: 62%"></span> </span>
                <span class="ib vm f-10 i">62%</span>
            </p>
            <p class="mb-24"><span class="ib vm w-42 f-10 i black">Дизайн</span>
                <span class="graf_2 mr-8"><span class="in" style="width: 70%"></span> </span>
                <span class="ib vm f-10 i">70%</span>
            </p>
        </div>
        <div class="model mark_<?php echo $tab;?>_100_model_3">
            <p class="mb-0 i">Больше света, тепла, вариантов! Широкие возможности дизайнерских решений. Уникальный декоративный закругленный штапик.</p>
            <ul class="mb-24 s i">
                <li>- Монтажная глубина 70 мм;</li>
                <li>- Пятикамерный профиль;</li>
                <li>- Звукоизоляция 5 класса;</li>
                <li>- Защита от холода, дождя и ветра группы «А»;</li>
                <li>- Фурнитура Roto;</li>
                <li>- Возможность установки стеклопакета шириной до 42 мм;</li>
                <li>- Взломобезопасность;</li>
                <li>- Светопропускная способность больше на 10%.</li>
            </ul>
            <p class="mb-24"><span class="ib vm w-42 f-10 i black">Тишина</span>
                <span class="graf_2 mr-8"><span class="in" style="width: 73%"></span> </span>
                <span class="ib vm f-10 i">73%</span>
            </p>
            <p class="mb-24"><span class="ib vm w-42 f-10 i black">Тепло</span>
                <span class="graf_2 mr-8"><span class="in" style="width: 62%"></span> </span>
                <span class="ib vm f-10 i">62%</span>
            </p>
            <p class="mb-24"><span class="ib vm w-42 f-10 i black">Дизайн</span>
                <span class="graf_2 mr-8"><span class="in" style="width: 70%"></span> </span>
                <span class="ib vm f-10 i">70%</span>
            </p>
        </div>
        <div class="model mark_<?php echo $tab;?>_100_model_4">
            <p class="mb-0 i"> Премиум класс. Эксклюзивный дизайн и инновационные технологии. Произведен в Германии.</p>
            <ul class="mb-24 s i">
                <li>- Монтажная глубина 70 мм;</li>
                <li>- Пятикамерный профиль;</li>
                <li>- Звукоизоляция 5 класса;</li>
                <li>- Защита от холода, дождя и ветра группы «С»;</li>
                <li>- Фурнитура Roto;</li>
                <li>- Возможность установки стеклопакета шириной до 42 мм;</li>
                <li>- Взломобезопасность 3 класса;</li>
                <li>- Легко очищаемая поверхность.</li>
            </ul>
            <p class="mb-24"><span class="ib vm w-42 f-10 i black">Тишина</span>
                <span class="graf_2 mr-8"><span class="in" style="width: 73%"></span> </span>
                <span class="ib vm f-10 i">73%</span>
            </p>
            <p class="mb-24"><span class="ib vm w-42 f-10 i black">Тепло</span>
                <span class="graf_2 mr-8"><span class="in" style="width: 62%"></span> </span>
                <span class="ib vm f-10 i">62%</span>
            </p>
            <p class="mb-24"><span class="ib vm w-42 f-10 i black">Дизайн</span>
                <span class="graf_2 mr-8"><span class="in" style="width: 70%"></span> </span>
                <span class="ib vm f-10 i">70%</span>
            </p>
        </div>
    </div>
</div>
</div>
</div>
<!-- DEFAULT WINDOW END -->
<?php }?>

</div>
</div>