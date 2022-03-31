<template>
    <div class="tw-bg-white tw-px-12 tw-py-16" v-if="event">
        <p v-if="event.order" class="tw-mb-4 tw-uppercase tw-text-ifit-blue tw-text-2xl tw-font-semibold">Order Confirmation: {{ event.order }}</p>

        <p class="tw-mb-4">
            <span class="tw-font-semibold tw-text-2xl">Location</span><br>
            <span class="tw-text-4xl tw-font-semibold">{{ event.location }}</span>
        </p>

        <p>
            <span class="tw-font-semibold tw-text-2xl">Event Date</span><br>
            <span class="tw-text-4xl tw-font-semibold">{{ formatDate(event.date) }}</span>
        </p>

        <!-- <p>
            <span class="tw-font-semibold tw-text-lg tw-uppercase">Entry Type</span><br>
            <span class="tw-text-4xl tw-font-semibold">{{ event.ticket_type }}</span>
        </p> -->
    </div>
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