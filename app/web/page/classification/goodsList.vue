<template>
    <Layout style="background-color: #ffffff;width: 100%;height: 100%" :title="result.category_name">
        <div id="scrollBox">
            <mt-loadmore v-if="result.goods_list.length !== 0" :bottom-method="loadBottom1" ref="loadmore1" :auto-fill="false" :bottom-all-loaded="allLoaded">
            <div v-for="item in result.goods_list" class="commodity" :key="item.id"  @click="goTo('/classification/goodsDetail','detail',item.id)">
                <!--{{item.img}}-->
                <div class="commodityLeft" v-lazy:background-image="item.thumb">
                </div>
                <div class="commodityRight">
                    <p class="f-28 commodityName">{{item.name}}</p>
                    <div class="commodityRightDown">
                        <p class="f-26">￥{{item.price}}</p>
                        <span class="f-26">￥</span><span class="f-32">{{item.min_money}}</span><span class="f-26">x{{item.max_cycle}}期</span>
                    </div>
                </div>
                <!--<div class="line"></div>-->
            </div>
           
        </mt-loadmore>
         <div style="height: 110px;width: 100%" v-if="result.goods_list.length === 0"></div>
            <div class="noCommodity" v-if="result.goods_list.length === 0">
                <img src="./img/noCommodity.png" width="155" height="155">
                <p class="f-30">该分类的商品正在备货中</p>
                <p class="f-26">看看其他分类吧~</p>
            </div>
        <div class="grid-box" style="font-size: 1.5rem" v-if="slogan">
            <div class="item"></div>
            <img class="item" src="./img/left.png" style="height: 2px;width: 33px;margin-top: 24px">
            <div class="item text">没有更多商品了</div>
            <img class="item" src="./img/right.png" style="height: 2px;width: 33px;margin-top: 24px">
            <div class="item"></div>
        </div>
        </div>
    </Layout>
</template>

<script>
    require('./css/goodsList.css')
    import 'mint-ui/lib/style.css';
    import { Loadmore } from 'mint-ui';
    export default {
        name: "goodsList",
        computed: {
            
        },
        components:{
            'mt-loadmore':Loadmore
        },
        data(){
          return{
              allLoaded:false,
              slogan:false,
              page:1,
              // noCommodity:require('./img/noCommodity.png'),
          }
        },
        mounted() {
            if((this.result.goods_count <= 10) && (this.result.goods_count !== 0)){
                this.allLoaded = true
                this.slogan = true
            }
        },
        methods:{
            //交互
            goTo(url,type,id) {
                // 商品分类跳转
                if(this.mobileType=='Android'){
                    window.installment.jumpUrl(this.pageUrlHead+url+'?Id='+id,type)
                }else{
                    window.webkit.messageHandlers.installment.postMessage({type:'jumpUrl',url:this.pageUrlHead+url+'?Id='+id,page:type});
                }
            },

            loadBottom1: function () {
                const that = this;
                // if(that.mobileType=='Android'){
                //     window.installment.showLoading('1')
                // }else{
                //     window.webkit.messageHandlers.installment.postMessage({type:'showLoading',flag:'1'})
                // }
                that.page++;
                const params = {
                    page: that.page,
                    Id:that.c_id,
                    url: '/classification/getGoodsList'
                };
                that.$http.postRequest(params).then((response) => {
                    // if(that.mobileType=='Android'){
                    //     window.installment.showLoading('0')
                    // }else{
                    //     window.webkit.messageHandlers.installment.postMessage({type:'showLoading',flag:'0'})
                    // }
                    let oldlist = that.result.goods_list;
                    that.result.goods_list = oldlist.concat(response.result.goods_list);
                    if (response.result.goods_count === that.result.goods_list.length) {
                        that.slogan = true;
                        that.allLoaded = true;
                    } else {
                        that.allLoaded = false;
                    }
                    that.$refs.loadmore1.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
                })
            },
        }
    }
</script>

<style scoped>
    /*/deep/image[lazy=loading] {*/
        /*width: 30px;*/
        /*height: 30px;*/
        /*border: none;*/
    /*}*/
</style>