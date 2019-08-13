var htmlTotalPrice = '.calc p.f-24.b';
var htmlPriceWindow = '.calc p.f-41.b';
var htmlSubmitCalc = '.calc button.btn_1.mr-12';
var htmlFormCalc = '.calc form.ph-6';
var htmlFormBackPhone = '#backphoneform';
var htmlSubmitBackPhone = htmlFormBackPhone+' button.btn_1';
var htmlShampus = 'p.shampus';
var htmlShampusw ='div.calc p.mb-8.f-11.i';

// w,h,wid,firmid,price
var windowData = [
    [800, 600, 0, 2,0],
    [800, 600, 0, 2,0],
    [800, 600, 0, 2,0],
    [800, 600, 0, 2,0]
];

var ImagesFirmProfiles = ['MONTBLANC_ECO-60.png','MONTBLANC_NORD-70.png','RehauBlitz.png','RehauSibDesign.png',
    'RehauDelightDesign.png','RehauBrillantDesign.png','WINTECH_Isotech.png','al-profile.png'];

var windowsInfo = [
    //0 Окно - Х1 - глухое
    [
        [400, 400, //ширина*высота
            [
                556, //Montblanc Eco
                697, //Montblanc Nord
                626, //Rehau Blitz
                792, //Rehau Sib
                977, //Rehau Delight
                1111, //Rehau Brillant
                539        //Darrio/Wintech
            ]
        ],
        [800, 1000, //ширина*высота
            [
                1524, //Montblanc Eco
                1992, //Montblanc Nord
                1686, //Rehau Blitz
                2088, //Rehau Sib
                2589, //Rehau Delight
                2797, //Rehau Brillant
                1474    //Darrio/Wintech
            ]
        ],
        [1200, 1500, //ширина*высота
            [
                3008, //Montblanc Eco
                4051, //Montblanc Nord
                3248, //Rehau Blitz
                3882, //Rehau Sib
                4955, //Rehau Delight
                4929, //Rehau Brillant
                2923    //Darrio/Wintech
            ]
        ],
        [1600, 2000, //ширина*высота
            [
                5382, //Montblanc Eco
                7429, //Montblanc Nord
                5702, //Rehau Blitz
                6601, //Rehau Sib
                8659, //Rehau Delight
                7966, //Rehau Brillant
                5260    //Darrio/Wintech
            ]
        ]
    ],
    //1 Окно - Х1 - поворотное
    [
        [400, 500, //ширина*высота
            [
                1283, //Montblanc Eco
                1460, //Montblanc Nord
                1425, //Rehau Blitz
                1684, //Rehau Sib
                1958, //Rehau Delight
                2282, //Rehau Brillant
                1136        //Darrio/Wintech
            ]
        ],
        [570, 1050, //ширина*высота
            [
                1331, //Montblanc Eco
                1728, //Montblanc Nord
                1474, //Rehau Blitz
                1831, //Rehau Sib
                2108, //Rehau Delight
                2470, //Rehau Brillant
                1178    //Darrio/Wintech
            ]
        ],
        [740, 1600, //ширина*высота
            [
                3470, //Montblanc Eco
                4207, //Montblanc Nord
                3885, //Rehau Blitz
                4643, //Rehau Sib
                5470, //Rehau Delight
                6385, //Rehau Brillant
                3179    //Darrio/Wintech
            ]
        ],
        [900, 2180, //ширина*высота
            [
                5039, //Montblanc Eco
                6240, //Montblanc Nord
                5593, //Rehau Blitz
                6621, //Rehau Sib
                7907, //Rehau Delight
                8941, //Rehau Brillant
                4697    //Darrio/Wintech
            ]
        ]
    ],
    //2 Окно - Х1 - поворотно-откидное
    [
        [430, 500, //ширина*высота
            [
                2051, //Montblanc Eco
                2267, //Montblanc Nord
                2136, //Rehau Blitz
                2499, //Rehau Sib
                2790, //Rehau Delight
                3105, //Rehau Brillant
                1189        //Darrio/Wintech
            ]
        ],
        [600, 1050, //ширина*высота
            [
                2680, //Montblanc Eco
                3136, //Montblanc Nord
                2901, //Rehau Blitz
                3494, //Rehau Sib
                4033, //Rehau Delight
                4682, //Rehau Brillant
                2261    //Darrio/Wintech
            ]
        ],
        [770, 1600, //ширина*высота
            [
                3855, //Montblanc Eco
                4631, //Montblanc Nord
                4213, //Rehau Blitz
                5057, //Rehau Sib
                5913, //Rehau Delight
                6815, //Rehau Brillant
                3375    //Darrio/Wintech
            ]
        ],
        [900, 2180, //ширина*высота
            [
                5351, //Montblanc Eco
                6563, //Montblanc Nord
                5842, //Rehau Blitz
                6946, //Rehau Sib
                8232, //Rehau Delight
                9259, //Rehau Brillant
                4797    //Darrio/Wintech
            ]
        ]
    ],
    //3 Окно - Х2 - глухое + поворотное
    [
        [800, 500, //ширина*высота
            [
                1962, //Montblanc Eco
                2338, //Montblanc Nord
                2225, //Rehau Blitz
                2673, //Rehau Sib
                3148, //Rehau Delight
                3557, //Rehau Brillant
                1801        //Darrio/Wintech
            ]
        ],
        [1150, 1050, //ширина*высота
            [
                3585, //Montblanc Eco
                4374, //Montblanc Nord
                4034, //Rehau Blitz
                4879, //Rehau Sib
                5724, //Rehau Delight
                6500, //Rehau Brillant
                3296    //Darrio/Wintech
            ]
        ],
        [1500, 1600, //ширина*высота
            [
                5572, //Montblanc Eco
                7020, //Montblanc Nord
                6209, //Rehau Blitz
                7464, //Rehau Sib
                8937, //Rehau Delight
                9813, //Rehau Brillant
                5239    //Darrio/Wintech
            ]
        ],
        [1900, 2180, //ширина*высота
            [
                8500, //Montblanc Eco
                10986, //Montblanc Nord
                9352, //Rehau Blitz
                11081, //Rehau Sib
                13526, //Rehau Delight
                14197, //Rehau Brillant
                8111    //Darrio/Wintech
            ]
        ]
    ],
    //4 Окно - Х2 - глухое + поворотно-откидное
    [
        [830, 500, //ширина*высота
            [
                2729, //Montblanc Eco
                3146, //Montblanc Nord
                2933, //Rehau Blitz
                3480, //Rehau Sib
                3969, //Rehau Delight
                4369, //Rehau Brillant
                1855       //Darrio/Wintech
            ]
        ],
        [1180, 1050, //ширина*высота
            [
                3868, //Montblanc Eco
                4686, //Montblanc Nord
                4259, //Rehau Blitz
                5188, //Rehau Sib
                6052, //Rehau Delight
                6821, //Rehau Brillant
                3422    //Darrio/Wintech
            ]
        ],
        [1530, 1600, //ширина*высота
            [
                5956, //Montblanc Eco
                4686, //Montblanc Nord
                4259, //Rehau Blitz
                5188, //Rehau Sib
                6052, //Rehau Delight
                6821, //Rehau Brillant
                3422    //Darrio/Wintech
            ]
        ],
        [1900, 2180, //ширина*высота
            [
                8874, //Montblanc Eco
                11355, //Montblanc Nord
                9645, //Rehau Blitz
                11452, //Rehau Sib
                13897, //Rehau Delight
                14560, //Rehau Brillant
                8211    //Darrio/Wintech
            ]
        ]
    ],
    //5 Окно - Х2 - поворотное + поворотное
    [
        [800, 500, //ширина*высота
            [
                2577, //Montblanc Eco
                2947, //Montblanc Nord
                2908, //Rehau Blitz
                3431, //Rehau Sib
                3947, //Rehau Delight
                4561, //Rehau Brillant
                2289       //Darrio/Wintech
            ]
        ],
        [1150, 1050, //ширина*высота
            [
                4762, //Montblanc Eco
                5633, //Montblanc Nord
                5349, //Rehau Blitz
                6353, //Rehau Sib
                7329, //Rehau Delight
                8514, //Rehau Brillant
                4258    //Darrio/Wintech
            ]
        ],
        [1500, 1600, //ширина*высота
            [
                6910, //Montblanc Eco
                8409, //Montblanc Nord
                7753, //Rehau Blitz
                9241, //Rehau Sib
                10812, //Rehau Delight
                12427, //Rehau Brillant
                6350    //Darrio/Wintech
            ]
        ],
        [1900, 2180, //ширина*высота
            [
                10272, //Montblanc Eco
                12806, //Montblanc Nord
                11389, //Rehau Blitz
                13437, //Rehau Sib
                15994, //Rehau Delight
                17707, //Rehau Brillant
                9614    //Darrio/Wintech
            ]
        ]
    ],
    //6 Окно - Х2 - поворотное + поворотно-откидное
    [
        [830, 500, //ширина*высота
            [
                3348, //Montblanc Eco
                3758, //Montblanc Nord
                3620, //Rehau Blitz
                4243, //Rehau Sib
                4771, //Rehau Delight
                5386, //Rehau Brillant
                2344       //Darrio/Wintech
            ]
        ],
        [1180, 1050, //ширина*высота
            [
                5050, //Montblanc Eco
                5953, //Montblanc Nord
                5583, //Rehau Blitz
                6673, //Rehau Sib
                7670, //Rehau Delight
                8850, //Rehau Brillant
                4391    //Darrio/Wintech
            ]
        ],
        [1530, 1600, //ширина*высота
            [
                7297, //Montblanc Eco
                8837, //Montblanc Nord
                8080, //Rehau Blitz
                9656, //Rehau Sib
                11253, //Rehau Delight
                12859, //Rehau Brillant
                6545    //Darrio/Wintech
            ]
        ],
        [1900, 2180, //ширина*высота
            [
                10628, //Montblanc Eco
                13175, //Montblanc Nord
                11683, //Rehau Blitz
                13808, //Rehau Sib
                16365, //Rehau Delight
                18070, //Rehau Brillant
                9714    //Darrio/Wintech
            ]
        ]
    ],
    //7 Окно - Х2 - поворотно-откидное + поворотно-откидное
    [
        [830, 500, //ширина*высота
            [
                4096, //Montblanc Eco
                4504, //Montblanc Nord
                4278, //Rehau Blitz
                4993, //Rehau Sib
                5521, //Rehau Delight
                6121, //Rehau Brillant
                2151       //Darrio/Wintech
            ]
        ],
        [1210, 1050, //ширина*высота
            [
                5347, //Montblanc Eco
                6277, //Montblanc Nord
                5820, //Rehau Blitz
                6991, //Rehau Sib
                8011, //Rehau Delight
                9188, //Rehau Brillant
                4523    //Darrio/Wintech
            ]
        ],
        [1560, 1600, //ширина*высота
            [
                7680, //Montblanc Eco
                9257, //Montblanc Nord
                8408, //Rehau Blitz
                10071, //Rehau Sib
                11698, //Rehau Delight
                13290, //Rehau Brillant
                6742    //Darrio/Wintech
            ]
        ],
        [1900, 2180, //ширина*высота
            [
                10985, //Montblanc Eco
                13544, //Montblanc Nord
                11976, //Rehau Blitz
                14179, //Rehau Sib
                16736, //Rehau Delight
                18434, //Rehau Brillant
                9814    //Darrio/Wintech
            ]
        ]
    ],
    //8 Окно - Х3 - 2 глухих + поворотное
    [
        [1200, 500, //ширина*высота
            [
                2642, //Montblanc Eco
                3219, //Montblanc Nord
                3026, //Rehau Blitz
                3658, //Rehau Sib
                4333, //Rehau Delight
                4831, //Rehau Brillant
                2369       //Darrio/Wintech
            ]
        ],
        [1700, 1050, //ширина*высота
            [
                4720, //Montblanc Eco
                5853, //Montblanc Nord
                5334, //Rehau Blitz
                6507, //Rehau Sib
                7657, //Rehau Delight
                8556, //Rehau Brillant
                3768    //Darrio/Wintech
            ]
        ],
        [2200, 1600, //ширина*высота
            [
                7407, //Montblanc Eco
                9437, //Montblanc Nord
                8262, //Rehau Blitz
                10009, //Rehau Sib
                11996, //Rehau Delight
                12942, //Rehau Brillant
                6852    //Darrio/Wintech
            ]
        ],
        [2700, 2180, //ширина*высота
            [
                11385, //Montblanc Eco
                14862, //Montblanc Nord
                12468, //Rehau Blitz
                14823, //Rehau Sib
                18182, //Rehau Delight
                18624, //Rehau Brillant
                10487    //Darrio/Wintech
            ]
        ]
    ],
    //9 Окно - Х3 - 2 глухих + поворотно-откидное
    [
        [1230, 550, //ширина*высота
            [
                3558, //Montblanc Eco
                4258, //Montblanc Nord
                3927, //Rehau Blitz
                4694, //Rehau Sib
                5077, //Rehau Delight
                5912, //Rehau Brillant
                2778       //Darrio/Wintech
            ]
        ],
        [1730, 1050, //ширина*высота
            [
                5051, //Montblanc Eco
                6219, //Montblanc Nord
                5611, //Rehau Blitz
                6875, //Rehau Sib
                8057, //Rehau Delight
                8957, //Rehau Brillant
                4441    //Darrio/Wintech
            ]
        ],
        [2230, 1600, //ширина*высота
            [
                8018, //Montblanc Eco
                10184, //Montblanc Nord
                8823, //Rehau Blitz
                10661, //Rehau Sib
                12772, //Rehau Delight
                13630, //Rehau Brillant
                7296    //Darrio/Wintech
            ]
        ],
        [2730, 2180, //ширина*высота
            [
                11931, //Montblanc Eco
                15484, //Montblanc Nord
                12961, //Rehau Blitz
                15423, //Rehau Sib
                18846, //Rehau Delight
                19255, //Rehau Brillant
                10885    //Darrio/Wintech
            ]
        ]
    ],
    //10 Окно - Х3 - глухое + 2 поворотных
    [
        [1200, 500, //ширина*высота
            [
                3280, //Montblanc Eco
                3856, //Montblanc Nord
                3735, //Rehau Blitz
                4443, //Rehau Sib
                5168, //Rehau Delight
                5864, //Rehau Brillant
                3189       //Darrio/Wintech
            ]
        ],
        [1700, 1050, //ширина*высота
            [
                6602, //Montblanc Eco
                7156, //Montblanc Nord
                6692, //Rehau Blitz
                8028, //Rehau Sib
                9323, //Rehau Delight
                10633, //Rehau Brillant
                5252    //Darrio/Wintech
            ]
        ],
        [2200, 1600, //ширина*высота
            [
                8936, //Montblanc Eco
                11105, //Montblanc Nord
                9996, //Rehau Blitz
                11972, //Rehau Sib
                14154, //Rehau Delight
                15747, //Rehau Brillant
                8100    //Darrio/Wintech
            ]
        ],
        [2700, 2180, //ширина*высота
            [
                13233, //Montblanc Eco
                16802, //Montblanc Nord
                14602, //Rehau Blitz
                17290, //Rehau Sib
                20793, //Rehau Delight
                22262, //Rehau Brillant
                12158    //Darrio/Wintech
            ]
        ]
    ],
    //11 Окно - Х3 - поворотное + глухое + поворотно-откидное
    [
        [1230, 550, //ширина*высота
            [
                4341, //Montblanc Eco
                4919, //Montblanc Nord
                4659, //Rehau Blitz
                5512, //Rehau Sib
                5946, //Rehau Delight
                7009, //Rehau Brillant
                3237       //Darrio/Wintech
            ]
        ],
        [1730, 1050, //ширина*высота
            [
                6226, //Montblanc Eco
                7475, //Montblanc Nord
                6924, //Rehau Blitz
                8343, //Rehau Sib
                9659, //Rehau Delight
                11579, //Rehau Brillant
                5315    //Darrio/Wintech
            ]
        ],
        [2230, 1600, //ширина*высота
            [
                9321, //Montblanc Eco
                11530, //Montblanc Nord
                10321, //Rehau Blitz
                12385, //Rehau Sib
                14594, //Rehau Delight
                16173, //Rehau Brillant
                8288    //Darrio/Wintech
            ]
        ],
        [2730, 2180, //ширина*высота
            [
                13688, //Montblanc Eco
                17307, //Montblanc Nord
                14998, //Rehau Blitz
                17775, //Rehau Sib
                21313, //Rehau Delight
                22736, //Rehau Brillant
                12347    //Darrio/Wintech
            ]
        ]
    ],
    //12 Окно - Х3 - глухое + 2 поворотно-откидных
    [
        [1260, 550, //ширина*высота
            [
                5024, //Montblanc Eco
                5736, //Montblanc Nord
                5377, //Rehau Blitz
                6328, //Rehau Sib
                6419, //Rehau Delight
                7838, //Rehau Brillant
                3313       //Darrio/Wintech
            ]
        ],
        [1760, 1050, //ширина*высота
            [
                6516, //Montblanc Eco
                7797, //Montblanc Nord
                7156, //Rehau Blitz
                8659, //Rehau Sib
                9993, //Rehau Delight
                11293, //Rehau Brillant
                5502    //Darrio/Wintech
            ]
        ],
        [2260, 1600, //ширина*высота
            [
                9707, //Montblanc Eco
                11956, //Montblanc Nord
                10649, //Rehau Blitz
                12798, //Rehau Sib
                15036, //Rehau Delight
                16600, //Rehau Brillant
                8476    //Darrio/Wintech
            ]
        ],
        [2760, 2180, //ширина*высота
            [
                14003, //Montblanc Eco
                17812, //Montblanc Nord
                15393, //Rehau Blitz
                18260, //Rehau Sib
                21835, //Rehau Delight
                23252, //Rehau Brillant
                12534    //Darrio/Wintech
            ]
        ]
    ],
    //13 Окно - Х3 - 3 поворотных
    [
        [1200, 500, //ширина*высота
            [
                3906, //Montblanc Eco
                4474, //Montblanc Nord
                4428, //Rehau Blitz
                5219, //Rehau Sib
                5980, //Rehau Delight
                6898, //Rehau Brillant
                3374       //Darrio/Wintech
            ]
        ],
        [1700, 1050, //ширина*высота
            [
                7127, //Montblanc Eco
                8434, //Montblanc Nord
                8027, //Rehau Blitz
                9529, //Rehau Sib
                10951, //Rehau Delight
                12679, //Rehau Brillant
                6200    //Darrio/Wintech
            ]
        ],
        [2200, 1600, //ширина*высота
            [
                10286, //Montblanc Eco
                12506, //Montblanc Nord
                11555, //Rehau Blitz
                13769, //Rehau Sib
                16047, //Rehau Delight
                18390, //Rehau Brillant
                9190    //Darrio/Wintech
            ]
        ],
        [2700, 2180, //ширина*высота
            [
                14988, //Montblanc Eco
                18626, //Montblanc Nord
                16643, //Rehau Blitz
                19650, //Rehau Sib
                23258, //Rehau Delight
                25767, //Rehau Brillant
                13619    //Darrio/Wintech
            ]
        ]
    ],
    //14 Окно - Х3 - 2 поворотных + поворотно-откидное
    [
        [1230, 550, //ширина*высота
            [
                4878, //Montblanc Eco
                5543, //Montblanc Nord
                5367, //Rehau Blitz
                6304, //Rehau Sib
                6776, //Rehau Delight
                8088, //Rehau Brillant
                3772       //Darrio/Wintech
            ]
        ],
        [1730, 1050, //ширина*высота
            [
                7424, //Montblanc Eco
                8756, //Montblanc Nord
                8264, //Rehau Blitz
                9849, //Rehau Sib
                11294, //Rehau Delight
                13017, //Rehau Brillant
                6330    //Darrio/Wintech
            ]
        ],
        [2230, 1600, //ширина*высота
            [
                10674, //Montblanc Eco
                12934, //Montblanc Nord
                11885, //Rehau Blitz
                14186, //Rehau Sib
                16491, //Rehau Delight
                18824, //Rehau Brillant
                9381   //Darrio/Wintech
            ]
        ],
        [2730, 2180, //ширина*высота
            [
                15449, //Montblanc Eco
                19135, //Montblanc Nord
                17042, //Rehau Blitz
                20140, //Rehau Sib
                23785, //Rehau Delight
                26270, //Rehau Brillant
                13810    //Darrio/Wintech
            ]
        ]
    ],
    //15 Окно - Х3 - 2 поворотно-откидных + поворотное
    [
        [1260, 550, //ширина*высота
            [
                5659, //Montblanc Eco
                6361, //Montblanc Nord
                6088, //Rehau Blitz
                7125, //Rehau Sib
                7252, //Rehau Delight
                8922, //Rehau Brillant
                3850       //Darrio/Wintech
            ]
        ],
        [1760, 1050, //ширина*высота
            [
                7718, //Montblanc Eco
                9086, //Montblanc Nord
                8503, //Rehau Blitz
                10172, //Rehau Sib
                11590, //Rehau Delight
                13361, //Rehau Brillant
                6460    //Darrio/Wintech
            ]
        ],
        [2260, 1600, //ширина*высота
            [
                11063, //Montblanc Eco
                13362, //Montblanc Nord
                12216, //Rehau Blitz
                14604, //Rehau Sib
                16937, //Rehau Delight
                19259, //Rehau Brillant
                9573  //Darrio/Wintech
            ]
        ],
        [2760, 2180, //ширина*высота
            [
                15904, //Montblanc Eco
                19640, //Montblanc Nord
                17439, //Rehau Blitz
                20628, //Rehau Sib
                24313, //Rehau Delight
                26776, //Rehau Brillant
                14002    //Darrio/Wintech
            ]
        ]
    ],
    //16 Окно - Х3 - 3 поворотно-откидных
    [
        [1290, 550, //ширина*высота
            [
                6436, //Montblanc Eco
                7183, //Montblanc Nord
                6807, //Rehau Blitz
                7953, //Rehau Sib
                7725, //Rehau Delight
                9753, //Rehau Brillant
                4007       //Darrio/Wintech
            ]
        ],
        [1790, 1050, //ширина*высота
            [
                8014, //Montblanc Eco
                9408, //Montblanc Nord
                8740, //Rehau Blitz
                10494, //Rehau Sib
                11981, //Rehau Delight
                13700, //Rehau Brillant
                6591    //Darrio/Wintech
            ]
        ],
        [2290, 1600, //ширина*высота
            [
                11451, //Montblanc Eco
                13790, //Montblanc Nord
                12580, //Rehau Blitz
                15058, //Rehau Sib
                17420, //Rehau Delight
                19693, //Rehau Brillant
                9764 //Darrio/Wintech
            ]
        ],
        [2790, 2180, //ширина*высота
            [
                16360, //Montblanc Eco
                20150, //Montblanc Nord
                17838, //Rehau Blitz
                21119, //Rehau Sib
                24839, //Rehau Delight
                27279, //Rehau Brillant
                14194    //Darrio/Wintech
            ]
        ]
    ],
    //17 Дверь - Х1 - поворотная
    [
        [400, 1400, //ширина*высота
            [
                2679, //Montblanc Eco
                3068, //Montblanc Nord
                2942, //Rehau Blitz
                3513, //Rehau Sib
                4132, //Rehau Delight
                4829, //Rehau Brillant
                2440       //Darrio/Wintech
            ]
        ],
        [600, 1700, //ширина*высота
            [
                3470, //Montblanc Eco
                4217, //Montblanc Nord
                3916, //Rehau Blitz
                4691, //Rehau Sib
                5563, //Rehau Delight
                6403, //Rehau Brillant
                3322    //Darrio/Wintech
            ]
        ],
        [800, 2000, //ширина*высота
            [
                4275, //Montblanc Eco
                5241, //Montblanc Nord
                4823, //Rehau Blitz
                5797, //Rehau Sib
                6854, //Rehau Delight
                7917, //Rehau Brillant
                4121    //Darrio/Wintech
            ]
        ],
        [980, 2270, //ширина*высота
            [
                5311, //Montblanc Eco
                6737, //Montblanc Nord
                6049, //Rehau Blitz
                7217, //Rehau Sib
                8465, //Rehau Delight
                9688, //Rehau Brillant
                5164    //Darrio/Wintech
            ]
        ]
    ],
    //18 Дверь - Х1 - поворотно-откидная
    [
        [400, 1400, //ширина*высота
            [
                2649, //Montblanc Eco
                3118, //Montblanc Nord
                2932, //Rehau Blitz
                3564, //Rehau Sib
                4401, //Rehau Delight
                4879, //Rehau Brillant
                2510       //Darrio/Wintech
            ]
        ],
        [600, 1700, //ширина*высота
            [
                3754, //Montblanc Eco
                4510, //Montblanc Nord
                4141, //Rehau Blitz
                4985, //Rehau Sib
                5859, //Rehau Delight
                6692, //Rehau Brillant
                3429    //Darrio/Wintech
            ]
        ],
        [800, 2000, //ширина*высота
            [
                4538, //Montblanc Eco
                5513, //Montblanc Nord
                5027, //Rehau Blitz
                6071, //Rehau Sib
                7128, //Rehau Delight
                8184, //Rehau Brillant
                4228    //Darrio/Wintech
            ]
        ],
        [980, 2270, //ширина*высота
            [
                5645, //Montblanc Eco
                7082, //Montblanc Nord
                6323, //Rehau Blitz
                7564, //Rehau Sib
                8811, //Rehau Delight
                10028, //Rehau Brillant
                5261    //Darrio/Wintech
            ]
        ]
    ],
    //19 Алюминий Окно - Х2
    [
        [400, 600, //ширина*высота
            [
                1659, //Montblanc Eco
                1659, //Montblanc Nord
                1659, //Rehau Blitz
                1659, //Rehau Sib
                1659, //Rehau Delight
                1659, //Rehau Brillant
                1659       //Darrio/Wintech
            ]
        ],
        [950, 1000, //ширина*высота
            [
                2991, //Montblanc Eco
                2991, //Montblanc Nord
                2991, //Rehau Blitz
                2991, //Rehau Sib
                2991, //Rehau Delight
                2991, //Rehau Brillant
                2991    //Darrio/Wintech
            ]
        ],
        [1450, 1400, //ширина*высота
            [
                4489, //Montblanc Eco
                4489, //Montblanc Nord
                4489, //Rehau Blitz
                4489, //Rehau Sib
                4489, //Rehau Delight
                4489, //Rehau Brillant
                4489    //Darrio/Wintech
            ]
        ],
        [2000, 1800, //ширина*высота
            [
                6304, //Montblanc Eco
                6304, //Montblanc Nord
                6304, //Rehau Blitz
                6304, //Rehau Sib
                6304, //Rehau Delight
                6304, //Rehau Brillant
                6304    //Darrio/Wintech
            ]
        ]
    ],
    //20 Алюминий Окно - Х3 - глухое + 2 поворотных
    [
        [600, 600, //ширина*высота
            [
                2134, //Montblanc Eco
                2134, //Montblanc Nord
                2134, //Rehau Blitz
                2134, //Rehau Sib
                2134, //Rehau Delight
                2134, //Rehau Brillant
                2134       //Darrio/Wintech
            ]
        ],
        [1425, 1000, //ширина*высота
            [
                4378, //Montblanc Eco
                4378, //Montblanc Nord
                4378, //Rehau Blitz
                4378, //Rehau Sib
                4378, //Rehau Delight
                4378, //Rehau Brillant
                4378    //Darrio/Wintech
            ]
        ],
        [2475, 1400, //ширина*высота
            [
                7049, //Montblanc Eco
                7049, //Montblanc Nord
                7049, //Rehau Blitz
                7049, //Rehau Sib
                7049, //Rehau Delight
                7049, //Rehau Brillant
                7049    //Darrio/Wintech
            ]
        ],
        [3000, 1800, //ширина*высота
            [
                9245, //Montblanc Eco
                9245, //Montblanc Nord
                9245, //Rehau Blitz
                9245, //Rehau Sib
                9245, //Rehau Delight
                9245, //Rehau Brillant
                9245    //Darrio/Wintech
            ]
        ]
    ],
    //21 Алюминий Окно - Х4 - поворотное
    [
        [800, 600, //ширина*высота
            [
                3056, //Montblanc Eco
                3056, //Montblanc Nord
                3056, //Rehau Blitz
                3056, //Rehau Sib
                3056, //Rehau Delight
                3056, //Rehau Brillant
                3056       //Darrio/Wintech
            ]
        ],
        [1900, 1000, //ширина*высота
            [
                5653, //Montblanc Eco
                5653, //Montblanc Nord
                5653, //Rehau Blitz
                5653, //Rehau Sib
                5653, //Rehau Delight
                5653, //Rehau Brillant
                5653    //Darrio/Wintech
            ]
        ],
        [3296, 1400, //ширина*высота
            [
                9233, //Montblanc Eco
                9233, //Montblanc Nord
                9233, //Rehau Blitz
                9233, //Rehau Sib
                9233, //Rehau Delight
                9233, //Rehau Brillant
                9233    //Darrio/Wintech
            ]
        ],
        [4000, 1800, //ширина*высота
            [
                12178, //Montblanc Eco
                12178, //Montblanc Nord
                12178, //Rehau Blitz
                12178, //Rehau Sib
                12178, //Rehau Delight
                12178, //Rehau Brillant
                12178    //Darrio/Wintech

            ]
        ]
    ]

];
/*
 0 - Montblanc Eco
 1 - Montblanc Nord
 2 - Rehau Blitz
 3 - Rehau Sib
 4 - Rehau Delight
 5 - Rehau Brillant
 6 - Darrio/Wintech
 7 - Provedal С-640
 */


function showDebug() {
    console.group("Dump");
    console.log("Tab index: %d", curTabIndex);
    console.log("curTabCount: %d", curTabCount);
    console.dir(windowData);
    console.dir(windowsInfo);
    console.groupEnd();
}

function wSlide(val) {
    windowData[curTabIndex][0] = val;
    CalculateEvent();
}
function hSlide(val) {
    windowData[curTabIndex][1] = val;
    CalculateEvent();
}
function setCurWid(val) {
    windowData[curTabIndex][2] = parseInt(val);
    console.log("Windows id: %d", windowData[curTabIndex][2]);
    CalculateEvent();
}
function setCurFirm(val) {
    windowData[curTabIndex][3] = parseInt(val);
    if(windowData[curTabIndex][3] > 6){ windowData[curTabIndex][3] = 0; }
    console.log("Firm id: %d", windowData[curTabIndex][3]);
    $('.content div.window.active .w-90.fr img').attr('src', '/wp-content/themes/daisho/images/calc_profile/'+ImagesFirmProfiles[parseInt(val)]);
    CalculateEvent();
}
function setCurTabIndex(val) {
    curTabIndex = val;
    CalculateEvent();
}

function getCalcTotalPrice(){
    var totalPrice = 0;
    var cprice = 0;

    for (var i = 0; i <= curTabCount; i++) {
        cprice = getWindowPrice(i);
        totalPrice = totalPrice + cprice;
        windowData[i][4] =cprice;
    }
    return totalPrice;
}
function CalculateEvent() {
    var totalPrice = 0;
    var cprice = 0;

    for (var i = 0; i <= curTabCount; i++) {
        var cprice = getWindowPrice(i);
        totalPrice = totalPrice + cprice;
    }
    cprice = getWindowPrice(curTabIndex);
    $(htmlPriceWindow).html(cprice);
    $(htmlTotalPrice).html(totalPrice + " p.");
    $(htmlShampus).html(Math.ceil(totalPrice/700));
    $(htmlShampusw).html('примерно '+Math.ceil(cprice/700)+' бутылок шампанского');
}
function getWindowPrice(tInd) {
    var res = 0;

    /** параметры текущего окна */
    var cur_window = windowData[tInd];
    /** id текущего окна */
    var cwid = cur_window[2];
    /** параметры о текущеем окне из статики */
    var cur_data = windowsInfo[cwid];

    //console.dir(cur_data);
    var count_wininfo = windowsInfo[cwid].length - 1;


    //console.log("getWindowPrice cwid: %d w: %d h: %d Table: %d", cwid, windowData[tInd][0], windowData[tInd][1], tInd);
    for (var wid = 0; wid <= count_wininfo; wid++) {
        var cw = windowsInfo[cwid][wid][0];
        var ch = windowsInfo[cwid][wid][1];
        var ch1 = -1;
        var cw1 = -1;
        var wid1 = wid + 1;
        // console.log("STEP: "+wid);
        if (wid1 <= count_wininfo) {
            ch1 = windowsInfo[cwid][wid1][0];
            cw1 = windowsInfo[cwid][wid1][1];

            //console.log(" found +1 wind");
        }

        if (cur_window[0] <= cw && cur_window[1] <= ch) {
            //console.log(" found step 1: "+wid);
            return cur_data[wid][2][cur_window[3]];
        } else if ((cur_data[wid][0] > cw && cur_data[wid][1] > ch ) && ( cur_data[wid][0] <= cw1 && cur_data[wid][1] < ch1 )) {
            //console.log(" found step 2: "+wid);
            return cur_data[wid][2][cur_window[3]];
        } else if (ch1 == -1 || cw1 == -1) {
            //console.log(" found step 3: "+wid);
            return cur_data[wid][2][cur_window[3]];
        } else {
            //console.log(" continue w: %d, h: %d array index: %d",cur_data[wid][0],cur_data[wid][1],wid);
        }


    }
    console.log("DATA NOT FOUND FOR: %d, w: %d, h: %d", tInd, cur_window[0], cur_window[1]);
    return 0.1;
}
