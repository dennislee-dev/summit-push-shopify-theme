<template>
    <span v-if="event" class="tw-text-ifit-blue">{{ event.location }} on {{ formatDate(event.date) }}</span>
</template>


<script>
import store from '../store'; 
import moment from 'moment'; 

export default {
    computed: {
        event() {
            return store.event || null; 
        }
    }, 

    methods: {
        formatDate( date ) {
            return moment(date).format("MMMM Do"); 
        }
    }
}
</script>