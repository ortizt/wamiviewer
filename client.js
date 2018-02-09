Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);

var app = new Vue({
    el: '#app',
    
    data: {
        zoom:6,
        center:[34, -106],
        url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        id: 'satellite',
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

    }
});
