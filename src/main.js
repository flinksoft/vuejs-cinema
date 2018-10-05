import Vue from 'vue';
import './style.scss'

import VueResource from 'vue-resource'
Vue.use(VueResource);

// Make moment available globally on the Vue object
import moment from 'moment-timezone'
moment.tz.setDefault("UTC")
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment }});

import { checkFilter, setDay } from './util/bus'

Vue.config.devtools = true;

const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus }});

import VueRouter from 'vue-router'
Vue.use(VueRouter);

import routes from './util/routes'
const router = new VueRouter({ routes });

import Tooltip from './util/tooltip'
Vue.use(Tooltip);

new Vue({
    el: '#app',
    data: {
        genre: [],
        time: [],
        movies: [],
        moment,
        day: moment(),
        bus
    },
    methods: {
    },
    created() {
        this.$http.get('/api').then(response => {
            this.movies = response.data;
            console.log(response.data);
        })

        this.$bus.$on('check-filter', checkFilter.bind(this));
        this.$bus.$on('set-day', setDay.bind(this));
    },
    router
});

