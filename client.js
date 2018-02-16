Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);
// import Dropdown from './Dropdown.vue'


var socket = io();
var imgChunks =[];

var ctx = document.getElementById('canvas').getContext('2d');

var app = new Vue({
    el: '#app',
    
    data: {
        zoom:6,
        center:[34, -106],
        url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        marker: L.latLng(47.218938, -1.553772),
        xcoord: null,
        ycoord: null,
        zoomnew: null
    },

    methods: {
        adjustMap() {
            this.zoom = this.zoomnew;
            this.center = [this.xcoord, this.ycoord];
            this.zoomnew = null;
            this.xcoord = null;
            this.ycoord = null;
        }
    },

    created() {
        socket.on("image", function(image, buffer) {
            if (image) {
              var img = new Image();
              img.onload = function(){ // make sure img loads before drawing to canvas.
                ctx.drawImage(img, 0, 0);
              }
              img.src = 'data:image/jpeg;base64,' + image.buffer;
            }
        });

        // socket.on('img-chunk' function(chunk) {
        //     var img = document.getElementById('img-stream2');
        //     imgChunks.push(chunk);
        //     img.setAttribute('src', 'data:imag/jpeg;base64,' + window.btoa(imgChunks));
        // });
    }
});
