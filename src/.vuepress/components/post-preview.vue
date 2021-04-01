<template>
    <article class="br2 ba dark-gray b--black-10 mv5 mw15">
        <div id="heading-post" class="pa2 ph3-ns pb3-ns">
            <a v-bind:href="url" target="_blank" class="post-title f6 lh-copy measure mt2 mid-gray">
                {{ title }}
                <img v-bind:src="image" class="db w-100 br2 br--top" v-bind:alt="imageAlt">
            </a>
        </div>
    </article>
</template>
<script>
export default {
    name: 'post-preview',
    data() {
        return {

        }
    },
    props: {
        image: {
            type: String
        },
        imageAlt: {
            type: String
        },
        tag: {
            type: String
        },
        title: {
            type: String
        },
        url: {
            type: String
        }
    }
}
</script>

<style scoped>
@import 'https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css';
@import 'https://fonts.googleapis.com/css?family=Montserrat';

.post-title {
    text-transform: capitalize;
    font-size: 1.5em;
    color: #fff;
}

#heading-post {
    text-align: center;
    /* background: linear-gradient(to left, #190a0a, #b32734); */
    background: linear-gradient(to left, #777, #333);
    font-family: 'Montserrat', sans-serif;
}

div > a.post-title.f6.lh-copy.measure.mt2.mid-gray {
    text-decoration: none;
}

img {
    max-height: 300px !important;
    border-radius: 0%;
}

</style>
