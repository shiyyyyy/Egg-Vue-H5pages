<template>
    <Layout>
        <div class="f-30">我是test</div>
        {{ result.a }}
    </Layout>
</template>

<script>
    export default {
        name: "test",
        mounted() {
            console.info(this.result.b);  //js 接值
        }
    }
</script>

<style scoped>

</style>