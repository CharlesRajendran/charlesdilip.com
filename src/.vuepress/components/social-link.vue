<template>
    <div>
        <a target="_blank" v-bind:href="link" class="btn" v-bind:class="'btn-' + color" v-bind:title="title">
            <i v-bind:class="icon"></i>
        </a>
    </div>
</template>

<script>
export default {
    props: {
        icon: '',
        link: '',
        color: '',
        title: ''
    }
}
</script>
<style scoped>
    div {
        display: inline-block;
        width: 18%;
    }

    div > a {
        font-size: 3rem;
        width: 100%;
    }

    a {
        border-radius: 0%;
    }

    @media screen and (max-width: 500px) {
        div {
            width: 100%;
            margin: 1em auto;
        }
    }
</style>

