(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=".snow-wrap[data-v-8db57eba] { position: fixed; left: 0; top: 0; z-index: 9999; pointer-events: none; height: 100%; width: 100%; } .snow-wrap.events-all[data-v-8db57eba] { pointer-events: all; } .snow-wrap.hide[data-v-8db57eba] { opacity: 0; -webkit-transition: opacity 1s; transition: opacity 1s; } .snow-wrap canvans[data-v-8db57eba] { display: block; height: 100%; width: 100%; } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();







var component = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.myShow)?_c('div',{ref:"wrap",staticClass:"snow-wrap",class:{'events-all':_vm.interaction, 'hide':_vm.toHide}},[_vm._l((_vm.images),function(img,index){return _c('img',{key:index,staticClass:"lis_flake",staticStyle:{"display":"none"},attrs:{"src":img}})}),_vm._v(" "),_c('canvas',{ref:"canvas",attrs:{"width":"100%","height":"100%"}})],2):_vm._e()},staticRenderFns: [],_scopeId: 'data-v-8db57eba',
    name: 'let-it-snow',
    data: function data () {
        return {
            flakes: [],
            canvas: null,
            ctx: null,
            flakeCount: this.count,
            mX: -100,
            mY: -100,
            imageItems: [],
            imageNum: [],
            myShow: false,
            toHide: false,
            reqId: null
        }
    },
    props: {
        speed: {
            type: Number,
            default: 0
        },
        interaction: {
            type: Boolean,
            default: false
        },
        size: {
            type: Number,
            default: 2
        },
        count: {
            type: Number,
            default: 200
        },
        opacity: {
            type: Number,
            default: 0
        },
        color: {
            type: String,
            default: "#ffffff"
        },
        windPower: {
            type: Number,
            default: 0
        },
        images: {
            type: Array,
            default: function () { return []; }
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        show: function (newShow, oldShow) {
            var this$1 = this;

            console.log(newShow, oldShow);
            if (newShow) {
                this.myShow = true;
                this.toHide = false;

                this.$nextTick( function () {
                    this$1.init();
                });
            } else {
                this.toHide = true;

                setTimeout( function () {
                    this$1.myShow = false;
                }, 1100);
            }
        }
    },
    mounted: function mounted() {
        var this$1 = this;

        var requestAnimationFrame = window.requestAnimationFrame ||
        function(callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
        window.requestAnimationFrame = requestAnimationFrame;

        var cancelAnimationFrame = window.cancelAnimationFrame ||
        function(id) {
            window.clearTimeout(id);
        };
        window.cancelAnimationFrame = cancelAnimationFrame;

        window.onresize = function () {
            if(this$1.resizeTO) { clearTimeout(this$1.resizeTO); }
            this$1.resizeTO = setTimeout(function () {
                this$1.init();
            }, 200);
        };

    },
    methods: {

        IsImageOk: function(img) {
            // During the onload event, IE correctly identifies any images that
            // weren’t downloaded as not complete. Others should too. Gecko-based
            // browsers act like NS4 in that they report this incorrectly.
            if (!img.complete) {
                return false;
            }

            // However, they do have two very useful properties: naturalWidth and
            // naturalHeight. These give the true size of the image. If it failed
            // to load, either of these should be zero.
            if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) {
                return false;
            }

            // No other way of checking: assume it’s ok.
            return true;
        },
        snow: function() {
            var this$1 = this;

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            for (var i = 0; i < this.flakeCount; i++) {
                var flake = this$1.flakes[i],
                    x = this$1.mX,
                    y = this$1.mY,
                    minDist = 100,
                    x2 = flake.x,
                    y2 = flake.y;

                var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y));

                if (dist < minDist) {
                    var force = minDist / (dist * dist),
                        xcomp = (x - x2) / dist,
                        ycomp = (y - y2) / dist,
                        deltaV = force / 2;

                    flake.velX -= deltaV * xcomp;
                    flake.velY -= deltaV * ycomp;

                } else {
                    flake.velX *= .98;
                    if (flake.velY <= flake.speed) {
                        flake.velY = flake.speed;
                    }

                    switch (this$1.windPower) {
                        case false:
                            flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
                        break;

                        case 0:
                            flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
                        break;

                        default:
                            flake.velX += 0.01 + (this$1.windPower/100);
                    }
                }

                var s = this$1.color;
                var patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
                var matches = patt.exec(s);
                var rgb = parseInt(matches[1], 16)+","+parseInt(matches[2], 16)+","+parseInt(matches[3], 16);

                flake.y += flake.velY;
                flake.x += flake.velX;

                if (flake.y >= this$1.canvas.height || flake.y <= 0) {
                    this$1.reset(flake);
                }

                if (flake.x >= this$1.canvas.width || flake.x <= 0) {
                    this$1.reset(flake);
                }
                if (this$1.images.length == 0) {
                    this$1.ctx.fillStyle = "rgba(" + rgb + "," + flake.opacity + ")";
                    this$1.ctx.beginPath();
                    this$1.ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
                    this$1.ctx.fill();
                } else {
                    var imgItem = this$1.imageItems[ i%this$1.imageNum ];

                    if (this$1.IsImageOk(imgItem)) {
                        this$1.ctx.drawImage(imgItem, flake.x, flake.y, flake.size * 2, flake.size * 2 );
                    }
                }

            }
            this.reqId = requestAnimationFrame(this.snow);
        },
        reset: function(flake) {
            if (this.windPower == false || this.windPower == 0) {
                flake.x = Math.floor(Math.random() * this.canvas.width);
                flake.y = 0;
            } else {
                if (this.windPower > 0) {
                    var xarray = Array(Math.floor(Math.random() * this.canvas.width),0);
                    var yarray = Array(0, Math.floor(Math.random() * this.canvas.height));
                    var allarray = Array(xarray, yarray);
                    var selected_array = allarray[Math.floor(Math.random()*allarray.length)];

                    flake.x = selected_array[0];
                    flake.y = selected_array[1];
                } else {
                    var xarray = Array(Math.floor(Math.random() * this.canvas.width),0);
                    var yarray = Array(this.canvas.width, Math.floor(Math.random() * this.canvas.height));
                    var allarray = Array(xarray, yarray);
                    var selected_array = allarray[Math.floor(Math.random()*allarray.length)];

                    flake.x = selected_array[0];
                    flake.y = selected_array[1];
                }
                
            }

            flake.size = (Math.random() * 3) + this.size;
            flake.speed = (Math.random() * 1) + this.speed;
            flake.velY = flake.speed;
            flake.velX = 0;
            flake.opacity = (Math.random() * 0.5) + this.opacity;            
        },
        init: function() {
            var this$1 = this;

            if (this.reqId) { cancelAnimationFrame(this.reqId); }
            
            this.canvas = this.$refs.canvas;
            this.ctx = this.canvas.getContext("2d");

            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;

            if (this.interaction == true) {
                var actionFuncName = 'ontouchstart' in document.documentElement ? "touchmove" : "mousemove";
                this.canvas.addEventListener(actionFuncName, function (e) {
                    if (actionFuncName == "touchmove") {
                        this$1.mX = e.touches[0].clientX;
                        this$1.mY = e.touches[0].clientY;
                    } else {
                        this$1.mX = e.clientX;
                        this$1.mY = e.clientY;
                    }
                });
            }

            for (var i = 0; i < this.flakeCount; i++) {
                var x = Math.floor(Math.random() * this$1.canvas.width),
                    y = Math.floor(Math.random() * this$1.canvas.height),
                    size = (Math.random() * 3)  + this$1.size,
                    speed = (Math.random() * 1) + this$1.speed,
                    opacity = (Math.random() * 0.5) + this$1.opacity;

                this$1.flakes.push({
                    speed: speed,
                    velY: speed,
                    velX: 0,
                    x: x,
                    y: y,
                    size: size,
                    stepSize: (Math.random()) / 30,
                    step: 0,
                    angle: 180,
                    opacity: opacity
                });
            }

            var imageList = document.querySelectorAll(".lis_flake");
            for(i=0; i < imageList.length; i++) {
                this$1.imageItems.push(imageList[i]);
            }
            this.imageNum = imageList.length;

            this.snow();            
        }
    }

}

// Import vue component

// install function executed by Vue.use()
// export function install(Vue) {
// 	if (install.installed) return;
// 	install.installed = true;
// 	Vue.component(component.name, component);
// }


component.install = function(Vue) {
	if (component.installed) { return; }
	component.installed = true;
    Vue.component(component.name, component);
};

// Create module definition for Vue.use()
// const plugin = {
// 	install,
// };

// To auto-install when vue is found
var GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	// GlobalVue.use(plugin);
	GlobalVue.use(component);
}

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default component;
