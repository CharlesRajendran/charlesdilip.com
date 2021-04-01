<template>
    <span class="badge badge-pill" :class="'color-' + rating" :title="title">
        {{name}}    
    </span>
</template>
<script>
export default {
    props: {
        name: '',
        rating: '',
        title: ''
    }    
}
</script>
<style scoped>
    span {
        display: inline-block;
        margin: 1rem 0.5rem;
    }

    .badge-pill {
        padding-right: .6em;
        padding-left: .6em;
        border-radius: 10rem;
    }

    .badge {
        display: inline-block;
        padding: .25em .4em;
        font-size: 1.3rem;
        font-weight: 700;
        line-height: 1;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: .25rem;
        /* background: #333; */
        color: white;
        transition: color .15s ease-in-out, background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }

    .color-b {
        background-color: #1DE9B6;
    }

    .color-a {
        background-color: #00BFA5;
    }

    .color-aa {
        background-color: #00897B;
    }

    .color-g {
        background-color: #00695C;
    }

    .color-vg {
        background-color: #004D40;
    }


</style>
