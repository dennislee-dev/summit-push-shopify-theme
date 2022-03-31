import {createApp} from 'vue'; 
import RegisterForm from './components/RegisterForm.vue'; 
import EventDate from './components/EventDate.vue';
import OrderSummary from './components/OrderSummary.vue'; 
import moment from 'moment-timezone'; 
import Maska from 'maska'; 

moment.tz.setDefault('UTC');

window.axios = require('axios'); 
window.moment = require('moment'); 

createApp(RegisterForm).use(Maska).mount('#register-form'); 
createApp(EventDate).mount('#event-date'); 
createApp(OrderSummary).mount('#order-summary'); 