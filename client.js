Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);
Vue.component('v-rectangle', Vue2Leaflet.Rectangle);
Vue.component('v-image-overlay', Vue2Leaflet.ImageOverlay);
// import Dropdown from './Dropdown.vue'


var socket = io();
// var imgChunks =[];

var canvas = document.createElement('canvas')
var ctx = canvas.getContext('2d');



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
        // dropdown() {
        //     // console.log(this.$refs.myDropdown);
        //     this.$refs.myDropdown.classList.toggle('show');
        // }
    },

    created() {
        // console.log(this.files)
        // socket.on('files', function(files) {
            // var result = Object.keys(files).map(function(key) {
            //     // console.log(files[key]);
            //     return files[key];
            // });
            // for (var i = 0; i < result[0].length; i++) {
            //     this.files.push(result[0][i]);
            // };

        //     console.log(this.files.length)
        //     // console.log(this.files);
        // }.bind(this));
        
        socket.on("image", function(image, temp) {
            // console.log(image.buffer);
            // console.log(temp)
            // console.log(image.buffer)
            // var result = Object.keys(file).map(function(key) {
            //     // console.log(files[key]);
            //     return file[key];
            // });
            // for (var i = 0; i < result[0].length; i++) {
            //     this.files.push(result[0][i]);
            // };
            // console.log(files)
            // console.log(image)
            if (image) {
              var img = 'data:image/jpeg;base64,' + image.buffer;
            //   this.imageUrl = img;
              this.imgurls.push(img);
              this.filename = temp;
            //   console.log(this.filename)

              this.hash = {name: this.filename, bs64: this.imgurls};
              console.log(this.hash);

            //   console.log(this.filename)


            //   console.log(temp)
            //   console.log(this.imgurls)

            
            //   this.files.push(file_name);
            //   console.log(this.imageUrl);
            //   console.log(this.hash)
              console.log('image served');
            }

        }.bind(this));

        //  console.log(this.files.length)
        
        // console.log(this.hash)
    },
});