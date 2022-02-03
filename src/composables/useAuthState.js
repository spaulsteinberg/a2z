import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const useAuthState = (_email = '', _password = '') => {
    const store = useStore()
    const router = useRouter() 
    const email = ref(_email);
    const password = ref(_password);
    const loading = ref(false);
    const error = ref(null);
    const noMargin = ref(false)

    return { store, router, email, password, error, loading, noMargin }
}

export default useAuthState