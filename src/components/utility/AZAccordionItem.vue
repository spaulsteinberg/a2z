<template>
    <div class="accordion-item">
        <h2 class="accordion-header" :id="headerId">
            <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="forTarget"
                aria-expanded="false"
            >{{title}}</button>
        </h2>
        <div
            :id="forId"
            class="accordion-collapse collapse"
            :aria-labelledby="headerId"
            :data-bs-parent="parent"
        >
            <div class="accordion-body">
                <slot name="body"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AZAccordionItem',
    props: {
        title: String,
        parent: {
            type: String,
            required: true
        },
        headerId: {
            type: String,
            required: true
        },
        forTarget: {
            type: String,
            required: true
        },
        forId: {
            type: String,
            required: true
        }
    },
    setup() {}
}
</script>


<style scoped>
</style>