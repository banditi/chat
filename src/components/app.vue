<template>
    <p :class="$style.app">{{message}}</p>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            message: 'Hello, world! I\'m, chat...'
        };
    }
};
</script>

<style lang="postcss" module>
.app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    text-align: center
    color: #2c3e50
    margin-top: 60px
</style>
