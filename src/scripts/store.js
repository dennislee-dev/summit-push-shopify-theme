import {reactive} from 'vue'; 
/**
 * We use this small store object to prevent using something like 
 * Vuex which adds a ton of extra behavior we don't need and makes 
 * scripts heavier. 
 */
export default reactive({
    event: {}
}); 