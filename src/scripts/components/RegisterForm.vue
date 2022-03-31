<template>
    <div>
    <portal to="announcement">
        <div v-if="locked" class="tw-bg-ifit-blue tw-font-sans tw-px-4 tw-py-6">
            <p class="tw-max-w-4xl tw-text-center tw-mx-auto tw-font-semibold tw-text-white">This form is now locked as the event is almost here! Please email 
                <a class="tw-underline" href="maito:retreats@ifit.com" target="_blank">retreats@ifit.com</a>
                 for questions or issues.</p>
        </div>
    </portal>

    <form @submit.prevent="submitAthlete" v-if="loaded && !submitted">
        <h3 class="tw-border-t tw-uppercase tw-mb-6 tw-border-ifit-blue tw-text-base tw-font-semibold tw-text-ifit-blue tw-mt-8">
            <span v-bind:style="{
                fontSize: '1.1em',
                position: 'relative',
                bottom: '2px'
            }" class="tw--translate-y-1/2 tw-bg-white tw-inline-block tw-pr-4 tw-transform">Athlete Information</span>
        </h3>

        <!-- First/Last Name -->

        <div class="tw-flex tw-flex-col md:tw-flex-row tw--mx-2">
            <div class="tw-px-2 tw-flex-1 tw-mb-5">
                <input :disabled="locked" v-model="athlete.first_name" type="text" class="tw-px-4 tw-py-4 tw-font-semibold tw-border-2 tw-rounded-lg focus:tw-border-ifit-blue tw-outline-none focus:tw-outline-none focus-visible:shadow-none tw-w-full tw-text-2xl" placeholder="First Name">
                <p v-if="errors['answers.first_name']" class="tw-my-2 tw-text-sm tw-text-xl tw-font-sans tw-font-semibold tw-text-red-500">{{ errors['answers.first_name'][0] }}</p>
            </div>
            <div class="tw-px-2 tw-flex-1 tw-mb-5">
                <input :disabled="locked" v-model="athlete.last_name" type="text" class="tw-px-4 tw-py-4 tw-font-semibold tw-border-2 tw-rounded-lg focus:tw-border-ifit-blue tw-outline-none focus:tw-outline-none focus-visible:shadow-none tw-w-full tw-text-2xl" placeholder="Last Name">
                <p v-if="errors['answers.last_name']" class="tw-my-2 tw-text-sm tw-text-xl tw-font-sans tw-font-semibold tw-text-red-500">{{ errors['answers.last_name'][0] }}</p>
            </div>
        </div>

        <!-- Email/Phone -->

        <div class="tw-flex tw-flex-col md:tw-flex-row tw--mx-2">
            <div class="tw-px-2 tw-flex-1 tw-mb-5">
                <input :disabled="locked" v-model="athlete.email" type="email" class="tw-px-4 tw-py-4 tw-font-semibold tw-border-2 tw-rounded-lg focus:tw-border-ifit-blue tw-outline-none focus:tw-outline-none focus-visible:shadow-none tw-w-full tw-text-2xl" placeholder="Email">
                <p v-if="errors['answers.email']" class="tw-my-2 tw-text-sm tw-text-xl tw-font-sans tw-font-semibold tw-text-red-500">{{ errors['answers.email'][0] }}</p>
            </div>
            <div class="tw-px-2 tw-flex-1 tw-mb-5">
                <input :disabled="locked" v-model="athlete.phone" type="tel" class="tw-px-4 tw-py-4 tw-font-semibold tw-border-2 tw-rounded-lg focus:tw-border-ifit-blue tw-outline-none focus:tw-outline-none focus-visible:shadow-none tw-w-full tw-text-2xl" placeholder="Phone">
                <!-- <p v-if="errors['answers.phone']" class="tw-my-2 tw-text-sm tw-text-xl tw-font-sans tw-font-semibold tw-text-red-500">{{ errors['answers.phone'][0] }}</p> -->
                <p v-if="errors['answers.phone']" class="tw-my-2 tw-text-sm tw-text-xl tw-font-sans tw-font-semibold tw-text-red-500">Please provide a valid phone number.</p>
            </div>
        </div>

        <!-- Date of Birth/Gender -->

        <div class="tw-flex tw-flex-col md:tw-flex-row tw--mx-2">
            <div class="tw-px-2 tw-flex-1 tw-mb-5">
                <input :disabled="locked" v-model="athlete.date_of_birth" type="date" class="tw-px-4 tw-py-4 tw-font-semibold tw-border-2 tw-rounded-lg focus:tw-border-ifit-blue tw-outline-none focus:tw-outline-none focus-visible:shadow-none tw-w-full tw-text-2xl" placeholder="MM/DD/YYYY">
                <!-- <p v-if="errors['answers.date_of_birth']" class="tw-my-2 tw-text-sm tw-text-xl tw-font-sans tw-font-semibold tw-text-red-500" v-html="errors['answers.date_of_birth'][0]"></p> -->
                <p v-if="errors['answers.date_of_birth']" class="tw-my-2 tw-text-sm tw-text-xl tw-font-sans tw-font-semibold tw-text-red-500">Please provide a valid birth date.</p>
            </div>
            <div class="tw-px-2 tw-flex-1 tw-mb-5">
                <select :disabled="locked" v-model="athlete.gender" class="tw-h-full tw-px-4 tw-py-4 tw-font-semibold tw-border-2 tw-rounded-lg focus:tw-border-ifit-blue tw-outline-none focus:tw-outline-none focus-visible:shadow-none tw-w-full tw-text-2xl">
                    <option value="" disabled>-- Gender --</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <!-- <p v-if="errors['answers.gender']" class="tw-my-2 tw-text-sm tw-text-xl tw-font-sans tw-font-semibold tw-text-red-500">{{ errors['answers.gender'][0] }}</p> -->
                <p v-if="errors['answers.gender']" class="tw-my-2 tw-text-sm tw-text-xl tw-font-sans tw-font-semibold tw-text-red-500">Please select a gender.</p>
            </div>
        </div>

        <!-- Shirt Size -->

        <h3 class="tw-border-t tw-uppercase tw-mb-6 tw-border-ifit-blue tw-text-base tw-font-semibold tw-text-ifit-blue tw-mt-8">
            <span v-bind:style="{
                fontSize: '1.1em',
                position: 'relative',
                bottom: '2px'
            }" class="tw--translate-y-1/2 tw-bg-white tw-inline-block tw-pr-4 tw-transform">Shirt Size</span>
        </h3>

        <div class="tw-border-2 tw-rounded-lg tw-px-4 tw-flex tw-flex-col md:tw-flex-row tw-w-full tw-py-2 tw-mb-5" v-for="(type, i) in shirt_types" :key="i"
        v-bind:class="{
            'tw-border-gray-700': athlete.shirt.type == type.toLowerCase() && !locked
            }"
        >
            <label class="tw-text-xl font-sans tw-text-gray-400 tw-inline-flex tw-items-center tw-mb-0 tw-font-semibold tw-w-1/4" v-bind:class="{ 'tw-text-gray-700': athlete.shirt.type == type.toLowerCase() }">
                <span class="tw-border tw-border-gray-600 tw-rounded-full tw-w-4 tw-h-4 tw-inline-block tw-mr-2 tw-flex-shrink-0" v-bind:class="{ 'tw-bg-ifit-blue tw-border-white': athlete.shirt.type == type.toLowerCase() }"></span>
                {{ type }}
            </label>
            <div class="tw-mt-2 md:tw-mt-0 tw-pb-2 md:tw-pb-0 tw-flex tw-flex-1 tw-justify-between md:tw-ml-20 tw-leading-none">
                    <span
                    v-for="(size, j) in shirt_sizes[type]" :key="j"
                    @click="setShirtSize(type, size)"
                    v-bind:class="{
                        'tw-bg-ifit-blue tw-border-ifit-blue tw-text-white': (athlete.shirt.size == size.toLowerCase() && athlete.shirt.type == type.toLowerCase()), 
                    }"
                    class="tw-leading-none tw-cursor-pointer tw-w-12 tw-h-12 tw-inline-flex tw-justify-center tw-items-center tw-rounded-full tw-border tw-font-semibold tw-text-lg rounded-radio-option"
                    >{{size}}</span>

            </div>
        </div>

        <p v-if="errors['answers.shirt.type'] || errors['answers.shirt.size']" class="tw-my-2 tw-text-sm tw-text-xl tw-font-sans tw-font-semibold tw-text-red-500">
            Please select a size and gender for your shirt.
        </p>

        <!-- Additional Tickets -->

        <template v-if="this.athletes.length > 1 && !this.confirmed">

            <h3 class="tw-border-t tw-uppercase tw-mb-6 tw-border-ifit-blue tw-text-base tw-font-semibold tw-text-ifit-blue tw-mt-8">
                <span v-bind:style="{
                    fontSize: '1.1em',
                    position: 'relative',
                    bottom: '2px'
                }" class="tw--translate-y-1/2 tw-bg-white tw-inline-block tw-pr-4 tw-transform">Email your additional tickets here</span>
            </h3>

            <p class="tw-my-4 tw-gray-700 tw-font-semibold tw-text-xl">
                Here you can define the additional people for your other tickets, and you can also group them per room. 
            </p>

            <div class="tw-flex tw-flex-wrap tw-flex-col md:tw-flex-row tw--mx-2 tw-mb-4" v-for="(att, k) in athletes" :key="'athlete-' + k" :class="{ 'tw-hidden': (k == 0) }">
                <div class="tw-px-2 tw-flex-1">
                    <label class="tw-text-xl tw-text-ifit-blue tw-inline-block tw-ml-1" for="">First Name</label>
                    <input v-if="k != 0" :disabled="locked" v-model="att.first_name" type="text" class="tw-px-4 tw-py-4 tw-font-semibold tw-border-2 tw-rounded-lg focus:tw-border-ifit-blue tw-outline-none focus:tw-outline-none focus-visible:shadow-none tw-w-full tw-text-2xl" placeholder="First Name">
                    <input v-else readonly :disabled="locked" v-model="athlete.first_name" type="text" class="tw-px-4 tw-py-4 tw-font-semibold tw-border-2 tw-rounded-lg focus:tw-border-ifit-blue tw-outline-none focus:tw-outline-none focus-visible:shadow-none tw-w-full tw-text-2xl" placeholder="First Name">
                </div>
                <div class="tw-px-2 tw-flex-1">
                    <label class="tw-text-xl tw-text-ifit-blue tw-inline-block tw-ml-1" for="">Last Name</label>
                    <input v-if="k != 0" :disabled="locked" v-model="att.last_name" type="text" class="tw-px-4 tw-py-4 tw-font-semibold tw-border-2 tw-rounded-lg focus:tw-border-ifit-blue tw-outline-none focus:tw-outline-none focus-visible:shadow-none tw-w-full tw-text-2xl" placeholder="Last Name">
                    <input v-else readonly :disabled="locked" v-model="athlete.last_name" type="text" class="tw-px-4 tw-py-4 tw-font-semibold tw-border-2 tw-rounded-lg focus:tw-border-ifit-blue tw-outline-none focus:tw-outline-none focus-visible:shadow-none tw-w-full tw-text-2xl" placeholder="Last Name">
                </div>
                <div class="tw-px-2 tw-flex-1">
                    <label class="tw-text-xl tw-text-ifit-blue tw-inline-block tw-ml-1" for="">Email</label>
                    <input v-if="k != 0" :disabled="locked" v-model="att.email" type="email" class="tw-px-4 tw-py-4 tw-font-semibold tw-border-2 tw-rounded-lg focus:tw-border-ifit-blue tw-outline-none focus:tw-outline-none focus-visible:shadow-none tw-w-full tw-text-2xl" placeholder="Email">
                    <input v-else readonly :disabled="locked" v-model="athlete.email" type="email" class="tw-px-4 tw-py-4 tw-font-semibold tw-border-2 tw-rounded-lg focus:tw-border-ifit-blue tw-outline-none focus:tw-outline-none focus-visible:shadow-none tw-w-full tw-text-2xl" placeholder="Email">
                </div>
            </div>

            <p v-if="errors['answers.athletes']" class="tw-my-2 tw-text-sm tw-text-xl tw-font-sans tw-font-semibold tw-text-red-500">{{ errors['answers.athletes'][0] }}</p>

        </template>

        <!-- Terms and Conditions -->

        <div class="tw-text-right" v-if="!this.confirmed">
            <label>
                <input type="checkbox" name="terms" v-model="terms">
                <span class="tw-font-sans tw-text-2xl">I accept <a class="tw-text-ifit-blue tw-underline" target="_blank" href="https://cdn.shopify.com/s/files/1/0602/0094/3867/files/iFit_Adventures_Terms_Conditions_Waiver.pdf?v=1645627218">Terms & Conditions</a></span>
            </label>
            <p v-if="errors['terms']" class="tw-my-2 tw-text-sm tw-text-xl tw-font-sans tw-font-semibold tw-text-red-500">You must accept terms and Conditions</p>
        </div>

        <div v-if="!locked" class="tw-text-right tw-mt-10">
            <button :disabled="locked" type="submit" class="tw-font-semibold tw-rounded-lg tw-bg-ifit-green tw-font-semibold tw-px-20 tw-py-5 tw-uppercase tw-inline-block tw-text-xl">Submit</button>
            <p v-if="Object.keys(errors).length > 0" class="tw-my-2 tw-text-sm tw-text-xl tw-font-sans tw-font-semibold tw-text-red-500">There are some form errors. Please fix them and submit again.</p>
        </div>
    </form>

    <div v-if="submitted">
        <p v-if="!confirmed" class="tw-border tw-border-ifit-blue tw-p-6 tw-mt-4 tw-text-ifit-blue tw-text-2xl lg:tw-text-4xl tw-text-center tw-font-semibold tw-font-tofino">Thank you for registering!</p>
        <p v-else class="tw-border tw-border-ifit-blue tw-p-6 tw-mt-4 tw-text-ifit-blue tw-text-2xl lg:tw-text-4xl tw-text-center tw-font-semibold tw-font-tofino">Your registration has been updated!</p>
    </div>

    </div>
</template>

<style lang="scss">

input:focus-visible {
    box-shadow: none !important;
}

.register__form {
    input[disabled], select[disabled] {
        background: transparent !important; 
        border: 1px solid #333 !important; 
        color: #999; 
    }
}

select {
    max-height: 46px;
}

.rounded-radio-option {
    padding-top: 1px;
}

.extended-rounded-radio-button {
    border-radius: 15px !important;
    width: 5em !important;
    text-align: center;
}
</style>


<script>
import store from '../store'; 

export default {

    data() {
        return {
            admin: false, 
            shirt_types: ['Unisex'],
            shirt_sizes: {
                'Unisex': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            },
            signature: null, 
            errors: {},
            loaded: false, 
            submitted: false,
            confirmed: false, 
            quantity: null, 
            athlete: {
                'first_name': '',
                'last_name': '',
                'email': '',
                'phone': '',
                'date_of_birth': '',
                'gender': '', 
                'shirt': {
                    type: 'unisex',
                    size: '',
                },
                'pants': {
                    type: 'male',
                    size: '34',
                },
            },
            locked: false,
            athletes: [],
            terms: false
        }
    },

    mounted() {
        this.signature = (new URLSearchParams(window.location.search)).get('signature'); 
        this.getInformation(); 
    }, 
    
    created() {
        window.addEventListener('beforeunload', (event) => {
            const message = 'your profile is not complete. Are you sure you want to finish it later?'; 

            if ( !this.submitted && !this.locked ) {
                event.preventDefault(); 
                event.returnValue = message; 
                return message;
            }

            return '';
        });
    },

    methods: {
        getBirthDateAsYmd() {
            // Gets a proper size for source date (as Shopify may send extra date as time, which we don't want)
            const date = this.athlete.date_of_birth.substring(0, 'MM/DD/YYYY'.length);

            // Converts M/D/Y to Y-M-D
            let parsed = null;
            if (parsed = /(\d\d)\/(\d\d)\/(\d\d\d\d)/.exec(date)) {
                return `${parsed[3]}-${parsed[1]}-${parsed[2]}`;
            }
            return date;
        },

        getBirthDateAsMdy() {
            // Gets a proper size for source date (as Shopify may send extra date as time, which we don't want)
            const date = this.athlete.date_of_birth.substring(0, 'YYYY-MM-DD'.length);

            // Converts Y-M-D to M/D/Y
            let parsed = null;
            if (parsed = /(\d\d\d\d)-(\d\d)-(\d\d)/.exec(date)) {
                this.athlete.date_of_birth = `${parsed[2]}/${parsed[3]}/${parsed[1]}`;
            }
            return date;
        },

        getInformation() {
            
            axios.get(window.api_url + 'tickets/confirmation?signature=' + this.signature).then( response => {

                // If the event is locked we don't allow updates. 
                this.locked = response.data.event.locked || false; 
                this.admin = response.data.admin;  

                console.log('GOT DATA', response.data)

                if( response.data.answers ) {
                    this.athlete = {
                        ...this.athlete,
                        ...response.data.answers
                    };
                } else {
                    this.athlete = {
                        ...this.athlete, 
                        ...response.data.athlete
                    }
                }

                // Sets date to Y-M-D format
                this.athlete.date_of_birth = this.getBirthDateAsYmd();

                this.athlete.extra = this.athlete.extra || {};

                this.quantity = response.data.event.quantity; 
                this.confirmed = response.data.ticket_confirmed; 

                // If the quantity is greater than 1, we add the slots to reorganize tickets 
                // on different rooms. 
                this.athletes.push({
                    'room': 1, 
                    'first_name': this.athlete.first_name, 
                    'last_name': this.athlete.last_name, 
                    'email': this.athlete.email
                });

                if (this.quantity && this.quantity > 1 ) {
                    for(let i = 0; i < (this.quantity - 1); i++ ) {
                        this.athletes.push({'room': i+2, 'first_name': '', 'last_name': '', 'email': ''}); 
                    }
                }

                this.loaded = true; 
                store.event = response.data.event; 
            
            }).catch( error => {
                console.log ( error ); 
            }); 
        }, 

        // it basically checks if a room contains two or more people. Then it 
        // is restricted. 
        isRoomFilled(number) {
            return this.athletes.filter( a => a.room == number ).length >= 2; 
        }, 

        submitAthlete() {

            // just a failsafe. 
            if ( this.locked ) return false; 

            // Copies the current athlete data, updates DoB to proper format
            const athlete = this.athlete;
            athlete.date_of_birth = this.getBirthDateAsMdy();

            // Any athletes fixes should happen here
            const extraAthletes = this.athletes.map((extraAthlete, idx) => {
                // Fixes first athlete's info to main athlete
                if (idx == 0) {
                    extraAthlete.first_name = athlete.first_name;
                    extraAthlete.last_name = athlete.last_name;
                    extraAthlete.email = athlete.email;
                }

                // Fixes null emails
                if (!extraAthlete.email) extraAthlete.email = athlete.email;

                // Done
                return extraAthlete;
            });

            this.errors = {}; // Cleaning up error messages. 
            let params = {
                signature: this.signature, 
                answers: JSON.parse(JSON.stringify(athlete)), //We do this to clone the responses. 
                athletes: ( extraAthletes.length > 0 ) ? this.groupAthletes(extraAthletes) : []
            }; 

            if (!this.verifyDate()) {
                this.errors = {
                    'answers.date_of_birth': [
                        'Attendees must be 16 or older. Please contact <a href="mailto:retreats@ifit.com">retreats@ifit.com</a> for more information.'
                    ]
                }; 
                return false;
            }

            if (!this.verifyAthletes()) {
                this.errors = {
                    'answers.athletes': [
                        'You must complete all information for all your tickets.'
                    ]
                }; 
                return false;
            }

            if (!this.verifyAirline(this.errors)) {
                return false;
            }

            if (!this.terms && !this.confirmed) {
                this.errors = {
                    'terms': [
                        'You must accept terms and conditions.'
                    ]
                }; 
                return false;
            }

            axios.post(window.api_url + 'tickets/confirmation', params).then( response => {
                this.submitted = true; 
                window.scrollTo(0,0);
            }).catch( error => {
                if ( error.response.status == 422 ) {
                    this.errors = error.response.data.errors;
                }
            }) 
        }, 

        setShirtSize(type, size) {
            if ( this.locked ) return false; 

            this.athlete.shirt.type = type.toLowerCase(); 
            this.athlete.shirt.size = size.toLowerCase(); 
        }, 

        setShoeSize(size) {
            if ( this.locked ) return false; 

            this.athlete.extra.shoe_size = size.toLowerCase(); 
        }, 

        // setPantsSize(type, size) {
        //     if ( this.locked ) return false; 

        //     this.athlete.pants.type = type.toLowerCase(); 
        //     this.athlete.pants.size = size.toLowerCase(); 
        // }, 

        setLeftRightHanded(type) {
            if ( this.locked ) return false; 

            this.athlete.extra.primary_hand = type.toLowerCase();
        }, 

        setAlcohol(type) {
            if ( this.locked ) return false; 

            this.athlete.extra.alcohol = type.toLowerCase();
        }, 

        verifyDate() {
            let minimumDate = moment(store.event.date).subtract(16, 'years'); 
            let selectedDate = moment(this.athlete.date_of_birth); 

            return !selectedDate.isAfter(minimumDate); 
        }, 

        // This basically verifies that all fields have been completed. 
        verifyAthletes() {
            return this.athletes.filter( athlete => {
                return !Object.values(athlete).includes(''); 
            }).length == this.athletes.length; 
        }, 

        verifyAirline(errors) {
            if (this.athlete.extra.airline_purchased === 'yes') {
                if (
                    0 == this.athlete.extra.airline_name.length
                    || 0 == this.athlete.extra.airline_flight.length
                    || 0 == this.athlete.extra.airline_arrival_airport.length
                    || 0 == this.athlete.extra.airline_arrival_time.length
                ) {
                    if (0 == this.athlete.extra.airline_name.length) errors['answers.extra.airline_name'] = ['Please supply an airline name.'];
                    if (0 == this.athlete.extra.airline_flight.length) errors['answers.extra.airline_flight'] = ['Please supply a flight.'];
                    if (0 == this.athlete.extra.airline_arrival_airport.length) errors['answers.extra.airline_arrival_airport'] = ['Please supply an arrival airport.'];
                    if (0 == this.athlete.extra.airline_arrival_time.length) errors['answers.extra.airline_arrival_time'] = ['Please supply an arrival time.'];

                    return false;
                }
            }
            return true;
        },

        
        groupAthletes() {
            let grouped = []; 

            // Getting unique list of rooms. 
            let rooms = this.athletes.map ( athlete => athlete.room )
                .filter(( value, index, self ) => self.indexOf(value) === index ); 

            rooms.forEach( room => {
                grouped.push(
                    this.athletes.filter (athlete => athlete.room == room )
                ); 
            }); 

            return grouped; 
        }

    }, 


    computed: {
        event() {
            return store.event;  
        }
    }


}
</script>