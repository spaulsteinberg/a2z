import { toRefs, reactive } from 'vue';
import { useRouter } from 'vue-router';

const useChangeCredentials = () => {
    const submitState = reactive({
        loading: false,
        success: "",
        error: "",
    });
    const router = useRouter()

    const handleBackToAccounts = () => {
        router.push('/profile/account')
    }
    return { ...toRefs(submitState), handleBackToAccounts }
}

export default useChangeCredentials