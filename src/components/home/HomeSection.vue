<template>
  <section :id="sectionId">
    <div :class="[align === 'start' ? 'start-img' : 'end-img', 'photo-class', 'text-white', 'global-home-padding']">
      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {
    name: 'HomeSection',
    props: {
        sectionId: {
            type: String,
            required: true,
        },
        align: {
            type: String,
            required: false,
            default: "start"
        }
    },
}
</script>

<style scoped>
.content {
  width: 100%;
}

.global-home-padding {
  padding: 0 3rem;
  font-size: 1.25rem;
}

.start-img {
  background-image: url("../../assets/tickets.jpg");
  align-items: flex-start;
}

.end-img {
  background-image: url("../../assets/skyscaper-highway123.jpeg");
  align-items: flex-end;
}

@media screen and (min-width: 500px) {
  .content {
    width: 50%;
  }
}

.photo-class {
  min-height: 300px;
  width: 100%;
  height: auto;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media screen and (min-width: 768px) {
  .photo-class {
    min-height: 500px;
  }
}


@media screen and (min-width: 992px) {
  .photo-class {
    min-height: 700px;
  }
}
</style>