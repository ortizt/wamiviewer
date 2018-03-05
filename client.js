Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);
Vue.component('v-rectangle', Vue2Leaflet.Rectangle);
Vue.component('v-image-overlay', Vue2Leaflet.ImageOverlay);
// Vue.component('multiselect', Multiselect);
// Vue.component('multiselect', VueMultiselect.Multiselect)
// import Multiselect from './Dropdown.vue'




var socket = io();

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
        zoomnew: null,
        bounds: [[32, -130], [13, -100]],
        imageUrl: '',
        imgurls: [],
        options: {
            opacity: .5,
        },
        filename: [],
        hash: [],
        value: '',
    },

    methods: {
        adjustMap() {
            this.zoom = this.zoomnew;
            this.center = [this.xcoord, this.ycoord];
            this.zoomnew = null;
            this.xcoord = null;
            this.ycoord = null;
        },
        selectImage() {
            for (var i = 0; i < this.filename; i++){
                if (this.value === this.hash.name[i]) {
                    this.imageUrl = this.hash.bs64[i];
                }
            }
        },
    },

    created() {
      
        socket.on("image", function(image, temp) {
            if (image) {
              var img = 'data:image/jpeg;base64,' + image.buffer;
              this.imgurls.push(img);
              this.filename = temp;
              this.hash = {name: this.filename, bs64: this.imgurls};
              console.log('image served');
            }
        }.bind(this));
    },
});