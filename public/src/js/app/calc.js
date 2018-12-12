if($('#calc').length) {
    var vm;
    $.ajax({
        url: "/calc_data",
        type: "GET"
    }).done(function(json) {
        vm = new Vue({
            el: '#calc',
            data: {
                title: "Калькулятор",
                windows: [],
                current_window: null,
                calcSumma: 0,
                materials: json.materials
            },
            methods: {
                addNewWindow: function () {
                    this.windows.push({
                        title: 'Новое окна',
                        price: 0,
                        material: 0,
                        brand: 0,
                        model: 0,
                        glazing: 0,
                        type: 0,
                        x: 1000,
                        y: 1000
                    })
                    Vue.set(this, 'current_window', this.windows.length-1)
                    Vue.nextTick(function () {
                        $('.scrollbar-outer').scrollTop(9999)
                        vm.calc()
                    })                    
                },
                useWindow: function (index) {
                    Vue.set(this, 'current_window', index)
                },
                removeWindow: function (index) {
                    if (index < this.current_window) {
                        Vue.set(this, 'current_window', (this.current_window-1))
                        Vue.delete(this.windows, index)
                    } else if (index == this.current_window) {
                        if (this.windows[(this.current_window-1)]) {
                            Vue.set(this, 'current_window', (this.current_window-1))
                            Vue.delete(this.windows, index)
                        } else if (this.windows[(this.current_window+1)]) {
                            Vue.delete(this.windows, index)
                        } else {
                            Vue.set(this, 'current_window', null)
                            Vue.delete(this.windows, index)
                        }
                    } else if (index > this.current_window) {
                        Vue.delete(this.windows, index)
                    }
                },
                resetBrand: function () {
                    Vue.set(this.windows[this.current_window], 'brand', 0)
                    this.resetModel()
                },
                resetModel: function () {
                    Vue.set(this.windows[this.current_window], 'model', 0)
                    this.resetGlazing()
                },
                resetGlazing: function () {
                    Vue.set(this.windows[this.current_window], 'glazing', 0)
                    this.resetType()
                },
                resetType: function () {
                    Vue.set(this.windows[this.current_window], 'type', 0)
                    this.calc()
                },
                useType: function (index) {
                    Vue.set(this.windows[this.current_window], 'type', index)
                    this.calc()
                },
                calc: function () {
                    var materials = this.materials[this.windows[this.current_window].material]
                    var brands = (materials.brands && materials.brands[this.windows[this.current_window].brand]) ? materials.brands[this.windows[this.current_window].brand] : false
                    var models = (brands.models && brands.models[this.windows[this.current_window].model]) ? brands.models[this.windows[this.current_window].model] : false
                    var glazings = (models.glazings && models.glazings[this.windows[this.current_window].glazing]) ? models.glazings[this.windows[this.current_window].glazing] : false
                    var types = (glazings.types && glazings.types[this.windows[this.current_window].type]) ? glazings.types[this.windows[this.current_window].type] : false
                    var price = (types.price) ? types.price : false
                    if (price) {
                        var res = calculator (this.windows[this.current_window].x, this.windows[this.current_window].y, price)
                        Vue.set(this.windows[this.current_window], 'price', res.price)
                    } else {
                        Vue.set(this.windows[this.current_window], 'price', 0)
                    }
                }
            }
        })
    })
}

function calculator (user_x, user_y, shape) {

	var resp = {}
		resp.minX = (shape[1][0] < shape[2][0] ? shape[1][0] : shape[2][0])
		resp.maxX = (shape[3][0] > shape[4][0] ? shape[3][0] : shape[4][0])
		resp.minY = (shape[1][1] < shape[4][1] ? shape[1][1] : shape[4][1])
		resp.maxY = (shape[2][1] > shape[3][1] ? shape[2][1] : shape[3][1])

	var tri = getTriangle(shape, [user_x, user_y])
		resp.price = Math.ceil(TriangleIterpolate(tri, [user_x, user_y]) * 1)
        // resp.price = Math.ceil(TriangleIterpolate(tri, [user_x, user_y]) * 1.2305)
    return resp;
	
	// $('.calc_result').html(resp.price)
}

function getTriangle (shape, point) {
    var max = shape.length - 1;
    for (var i = 1; i < max; i++) {
        if (isInTriangle([shape[0], shape[i+1], shape[i]], point)) {
            return [shape[0], shape[i+1],shape[i]]
        }
    }
    if (isInTriangle([shape[0], shape[1], shape[4]], point)) {
        return [shape[0], shape[1], shape[4]]
    }
}

function isInTriangle(triangle, point) {
    var x1 = triangle[0][0]
    var y1 = triangle[0][1]
    var x2 = triangle[1][0]
    var y2 = triangle[1][1]
    var x3 = triangle[2][0]
    var y3 = triangle[2][1]
    var tx = point[0]
    var ty = point[1]

    var a = (tx-x1)*(y1-y2)-(ty-y1)*(x1-x2);
    var b = (tx-x2)*(y2-y3)-(ty-y2)*(x2-x3);
    var c = (tx-x3)*(y3-y1)-(ty-y3)*(x3-x1);

    if (a >=0 && b >=0 && c >= 0)
        return true
    return false
}

function TriangleIterpolate (triangle, point) {
    var x1 = triangle[0][0]
    var y1 = triangle[0][1]
    var z1 = triangle[0][2]
    var x2 = triangle[1][0]
    var y2 = triangle[1][1]
    var z2 = triangle[1][2]
    var x3 = triangle[2][0]
    var y3 = triangle[2][1]
    var z3 = triangle[2][2]
    var x = point[0]
    var y = point[1]

    var d  = Math.abs (getDet3( [[x1, x2, x3], [y1, y2, y3]] ))
    var d1 = Math.abs (getDet3( [[x, x2, x3], [y, y2, y3]] ))
    var d2 = Math.abs (getDet3( [[x1, x, x3], [y1, y, y3]] ))
    var a = d1/d;
    var b = d2/d;
    var g = 1-a-b;
    
    return ( a*z1 + b*z2 + g*z3 );
}

function getDet3(matrix){
    var a21 = matrix[0][0]
    var a22 = matrix[0][1]
    var a23 = matrix[0][2]
    var a31 = matrix[1][0]
    var a32 = matrix[1][1]
    var a33 = matrix[1][2]
    return ( (a22*a33-a23*a32)-(a21*a33-a23*a31)+(a21*a32-a22*a31) )
} 
