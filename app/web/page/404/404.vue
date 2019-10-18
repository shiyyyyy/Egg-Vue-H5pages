<template>
    <Layout :title="title">
        <div  style=" margin-top: 99px;text-align: center"> <img src="./img/404_1.png" width="152"/></div>
        <div  style="font-size: 15px;text-align: center;margin-top: 24px;color: #9a9a9a">哎呀，找不到页面了</div>
        <div style="width:281px;height:40px;background:rgba(54,90,247,1);
        box-shadow:0px 5px 15px 0px rgba(84,93,255,0.3);
        border-radius:23px;
        margin: 0 auto;
        margin-top: 60px;
        text-align: center;
        line-height: 40px;
        color: #ffffff;
        font-size: 15px;"
             @click="goBack">返回上一页</div>

    </Layout >
</template>

<script>
  export default {
    name: '404',
    data(){
      title:this.title!=undefined?this.title:''
    },
    mounted(){
      if(this.resultInfo.resultInfo.status!=undefined){
        if(this.resultInfo.resultInfo.status == 'L00001'){
          if(this.resultInfo.mobileType=='Android'){
            window.installment.delUser(this.resultInfo.resultInfo.msg)
          }else{
            window.webkit.messageHandlers.installment.postMessage({type:'delUser',msg:this.resultInfo.resultInfo.msg});
          }
        }
      }
    },
      methods:{
          goBack(){
            if(this.mobileType=='Android'){
              window.installment.errorback()
            }else{
              window.webkit.messageHandlers.installment.postMessage({type:'errorback'})
            }
              // window.location.href="/"
          },
      }
  }
</script>

<style scoped>

</style>