<template>
    <Layout style="background-color: #F6F6F6;width: 100%;height: 100%" :title="result.name">
        <!--<div class="swiper-container">-->
            <!--<div class="swiper-wrapper">-->
                <!--<div class="swiper-slide" v-for="(item,index) in result1" :key="index">-->
                    <!--<img :src="item.img" width="100%" height="177" :data-url="item.url" :name="item.url"/>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="swiper-pagination" v-if="result1.length > 1"></div>-->
        <!--</div>-->
        <div id="scrollBox">
            <div v-lazy:background-image="result.thumb" class="banner"></div>

        <mt-loadmore  :bottom-method="loadBottom1" ref="loadmore1" :auto-fill="false" :bottom-all-loaded="allLoaded">
            <ul class="commodityList">
                <li v-for="item in result.goods_list" class="commodity" :key="item.id" @click="goTo('/classification/goodsDetail','detail',item.id)">
                    <div v-lazy:background-image="item.thumb" class="bg"></div>
                    <div class="commodityDown">
                        <p style="height:38px;" class="f-26">{{item.name}}</p>
                        <p class="f-26"><span style="margin-top: 1px">￥</span>{{item.price}}</p>
                        <span style="font-size: 13px;margin-top: 2px;">￥</span><span class="f-30" style="margin-right: 1px">{{item.min_money}}</span><span class="f-26">x{{item.max_cycle}}期</span>
                    </div>
                </li>
            </ul>
        </mt-loadmore>
        <!--<slogan v-if="slogan" style="margin-top: 30px"></slogan>-->
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
    require('./css/district.css')
    import 'mint-ui/lib/style.css';
    import { Loadmore } from 'mint-ui';
    export default {
        name: "district",
        data(){
          return{
              allLoaded:false,
              slogan:false,
              page:1,
          }
        },
        components:{
            'mt-loadmore':Loadmore
        },
        mounted() {
            // this.initSwiper();
            if((this.result.goods_count <= 10) && (this.result.goods_count !== 0)){
                this.allLoaded = true
                this.slogan = true
            }
        },
        methods:{
            //交互
            goTo(url,type,id) {
                // 商品分类跳转
                // window.location.href = url
                if(this.mobileType=='Android'){
                    window.installment.jumpUrl(this.pageUrlHead+url+'?Id='+id,type)
                }else{
                    window.webkit.messageHandlers.installment.postMessage({type:'jumpUrl',url:this.pageUrlHead+url+'?Id='+id,page:type});
                }
            },


            initSwiper() {
                var that = this;
                if (that.result.length <= 1) {
                    const bannerSwiper1 = new Swiper(".swiper-container", {
                        allowSlideNext: false,
                        allowSlidePrev: false,
                        on: {
                            click: function(e) {
                                // window.location.href=e.target.name;
                            }
                        },
                        pagination: {
                            el: ".swiper-pagination"
                        }
                    });
                } else {
                    const bannerSwiper = new Swiper(".swiper-container", {
                        loop: true,
                        autoplay: {
                            delay: 6000,
                            disableOnInteraction: false
                        },
                        on: {
                            click: function(e) {
                                // window.location.href=e.target.name;
                            }
                        },
                        pagination: {
                            el: '.swiper-pagination',
                        },
                    });
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
                    Id:that.s_id,
                    url: '/classification/getDistrict'
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

</style>