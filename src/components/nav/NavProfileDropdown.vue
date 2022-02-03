<template>
    <div class="btn-group">
        <button
            type="button"
            class="btn btn-primary dropdown-toggle"
            data-bs-toggle="dropdown"
            data-bs-display="static"
            aria-expanded="false"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person-circle"
                viewBox="0 0 16 16"
            >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
            </svg>
        </button>
        <ul class="dropdown-menu dropdown-menu-lg-end">
            <li>
                <router-link to="/profile/account" class="no-decor">
                    <button class="dropdown-item" type="button">Manage Account</button>
                </router-link>
            </li>
            <li>
                <button class="dropdown-item" type="button" @click="handleLogout">Logout</button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'NavProfileDropdown',
        props: {
            handleLogout: {
                type: Function,
                required: true
            }
        },
        setup(){}
    }
</script>

<style scoped>
</style>