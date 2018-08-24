<template>
    <div ref="wrap" class="snow-wrap" :class="{'events-all':interaction, 'hide':toHide}" v-if="myShow">
        <img v-for="(img, index) in images" :key="index" :src="img" style="display: none" class="lis_flake">
        <canvas ref="canvas" width="100%" height="100%" ></canvas>
    </div>
</template>

<script>
export default {
    name: 'let-it-snow',
    data () {
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
            default: () => []
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        show: function (newShow, oldShow) {
            console.log(newShow, oldShow)
            if (newShow) {
                this.myShow = true;
                this.toHide = false;

                this.$nextTick( () => {
                    this.init();
                })
            } else {
                this.toHide = true;

                setTimeout( () => {
                    this.myShow = false;
                }, 1100)
            }
        }
    },
    mounted() {
        var requestAnimationFrame = window.requestAnimationFrame ||
        function(callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
        window.requestAnimationFrame = requestAnimationFrame;

        var cancelAnimationFrame = window.cancelAnimationFrame ||
        function(id) {
            window.clearTimeout(id);
        }
        window.cancelAnimationFrame = cancelAnimationFrame;

        window.onresize = () => {
            if(this.resizeTO) clearTimeout(this.resizeTO);
            this.resizeTO = setTimeout(() => {
                this.init();
            }, 200);
        }

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
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            for (var i = 0; i < this.flakeCount; i++) {
                var flake = this.flakes[i],
                    x = this.mX,
                    y = this.mY,
                    minDist = 100,
                    x2 = flake.x,
                    y2 = flake.y;

                var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
                    dx = x2 - x,
                    dy = y2 - y;

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
                        flake.velY = flake.speed
                    }

                    switch (this.windPower) {
                        case false:
                            flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
                        break;

                        case 0:
                            flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
                        break;

                        default:
                            flake.velX += 0.01 + (this.windPower/100);
                    }
                }

                var s = this.color;
                var patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
                var matches = patt.exec(s);
                var rgb = parseInt(matches[1], 16)+","+parseInt(matches[2], 16)+","+parseInt(matches[3], 16);

                flake.y += flake.velY;
                flake.x += flake.velX;

                if (flake.y >= this.canvas.height || flake.y <= 0) {
                    this.reset(flake);
                }

                if (flake.x >= this.canvas.width || flake.x <= 0) {
                    this.reset(flake);
                }
                if (this.images.length == 0) {
                    this.ctx.fillStyle = "rgba(" + rgb + "," + flake.opacity + ")"
                    this.ctx.beginPath();
                    this.ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
                    this.ctx.fill();
                } else {
                    var imgItem = this.imageItems[ i%this.imageNum ];

                    if (this.IsImageOk(imgItem)) {
                        this.ctx.drawImage(imgItem, flake.x, flake.y, flake.size * 2, flake.size * 2 );
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
                    var yarray = Array(0, Math.floor(Math.random() * this.canvas.height))
                    var allarray = Array(xarray, yarray)
                    var selected_array = allarray[Math.floor(Math.random()*allarray.length)];

                    flake.x = selected_array[0];
                    flake.y = selected_array[1];
                } else {
                    var xarray = Array(Math.floor(Math.random() * this.canvas.width),0);
                    var yarray = Array(this.canvas.width, Math.floor(Math.random() * this.canvas.height))
                    var allarray = Array(xarray, yarray)
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
            if (this.reqId) cancelAnimationFrame(this.reqId);
            
            this.canvas = this.$refs.canvas;
            this.ctx = this.canvas.getContext("2d");

            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;

            if (this.interaction == true) {
                var actionFuncName = 'ontouchstart' in document.documentElement ? "touchmove" : "mousemove";
                this.canvas.addEventListener(actionFuncName, (e) => {
                    if (actionFuncName == "touchmove") {
                        this.mX = e.touches[0].clientX;
                        this.mY = e.touches[0].clientY;
                    } else {
                        this.mX = e.clientX;
                        this.mY = e.clientY;
                    }
                });
            }

            for (var i = 0; i < this.flakeCount; i++) {
                var x = Math.floor(Math.random() * this.canvas.width),
                    y = Math.floor(Math.random() * this.canvas.height),
                    size = (Math.random() * 3)  + this.size,
                    speed = (Math.random() * 1) + this.speed,
                    opacity = (Math.random() * 0.5) + this.opacity;

                this.flakes.push({
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
                this.imageItems.push(imageList[i]);
            }
            this.imageNum = imageList.length;

            this.snow();            
        }
    }

}
</script>

<style lang="scss" scoped>
    .snow-wrap {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 9999;
        pointer-events: none;

        height: 100%;
        width: 100%;

        &.events-all {
            pointer-events: all;
        }

        &.hide {
            opacity: 0;
            -webkit-transition: opacity 1s;
            transition: opacity 1s;            
        }

        canvans {
            display: block;
            height: 100%;
            width: 100%;  
        }
    }
</style>


