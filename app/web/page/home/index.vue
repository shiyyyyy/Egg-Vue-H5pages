<template>
  <Layout title="商城" isNeedSwiper="true">
    <div>
      <div id="home">
        <div class="indexTitle f-54">商城</div>
        <!-- 回到顶部 -->
        <img v-show="isTop" src="./img/ico_top.png" width="48" @click="goTop" class="goTop" alt="">
        <!--banner轮播-->
        <div v-if="resultInfo.banner_list!=null&&resultInfo.banner_list.length>0" class="banner">
          <div  v-if="resultInfo.banner_list.length>1" class="swiper-container boxbg" id="swiper-banner">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="item in resultInfo.banner_list" :key="item.id">
                <img
                  :src="item.thumb"
                  width="100%"
                  :name="item.url"
                  :id="item.url_type"
                  :title="item.name"
                />
              </div>
            </div>

            <div class="swiper-pagination" slot="pagination" v-if="resultInfo.banner_list.length>1"></div>
          </div>
          <img v-if="resultInfo.banner_list.length==1" class="oneBanner" :src="resultInfo.banner_list[0].thumb" @click="goBanner(resultInfo.banner_list[0].url,resultInfo.banner_list[0].url_type)" :name="resultInfo.banner_list[0].url" :title="resultInfo.banner_list[0].name"   alt="">

        </div>
        <!-- 五个分类入口 -->
        <div class="home-nav">
          <div v-for="item in resultInfo.category_list" :key="item.name"  @click="goTo('/classification/goodsList','normal',item.id)" class="f-24 c-666666">
            <div  v-lazy:background-image="item.icon" class="perType">
            </div>

            <div>{{item.name}}</div>
          </div>
          <div @click="goTo('/classification/category','category')" class="f-24 c-666666">
            <div  v-lazy:background-image="more" class="goodsClass">
            </div>

            <div>更多</div>
          </div>
        </div>
        <!-- 活动入口 -->
        <div v-if="resultInfo.activity_list!=null" class="activityBox" style="padding-left: 14px;padding-right: 14px;">
          <div v-lazy:background-image="item.thumb" @click="goBanner(item.url)" :name="item.name" v-for="(item, index)  in resultInfo.activity_list" :key="index">
          </div>
          <p v-if="resultInfo.activity_list.length>2" class="line"></p>
          <h3 class="clear"></h3>
        </div>
        <!-- 热卖单品 -->
        <div v-if="resultInfo.hot_goods_list!=null&&resultInfo.hot_goods_list.length!=0" class="sellingItem">
          <h3 class="title f-38">热卖单品</h3>
          <div  class="swiper-container" id="hotSwiperItems">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                style="width:40%; margin-right:10px;"
                v-for="(item, index) in resultInfo.hot_goods_list"
                :key="index"
                :id="item.id"
                @click="goTo('/classification/goodsDetail','detail',item.id)"
              >
              <div style="height: 130px;background:;background:rgba(250,250,250,1);border-radius:3px;margin-bottom: 10px;">
                <img
                  class="sellImg"
                  :src="item.thumb"
                />
                </div>
                <p style="height:34px;" class="f-26 sellName">{{item.name}}</p>
                <p class="f-26 sellPrice">¥{{item.price}}</p>
                <p class="c-666666 sellInfo">
                    <span style="margin-top: 3px;font-size: 13px;margin-right: 1px">¥</span><span class="f-30" style="margin-right: 1px">{{item.min_money}}</span>
                  <i class="f-26" style="margin-top: 2px">×</i>
                  <b class="f-26" style="margin-top: 2px">{{item.max_cycle}}期</b>
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- 专区 -->
        <div v-if="resultInfo.special_list!=null" style="padding-left: 14px;padding-right: 14px;">
             <div  v-for="(item,index) in resultInfo.special_list" :key="item.id" class="regionItem">
          <div class="titleBox">
            <h3 class="title f-38">{{item.name}}</h3>
            <i @click="goTo('/classification/district','district',item.id)" :id="item.id" class="seeMore f-26">
              查看更多
              <img src="./img/more.png" width="6" alt />
            </i>
          </div>
          <div v-if="item.banner_data!=null" v-lazy:background-image="item.banner_data.thumb" :id="item.banner_data.id" @click="goTo('/classification/district','district',item.banner_data.id)" class="regionLongImg">
          </div>
         <div v-if="item.thumb_list!=null" class="activityBox">
          <div v-lazy:background-image="items.thumb" @click="goTo('/classification/district','district',items.id)" :id="items.id" :name="items.name" v-for="items in item.thumb_list" :key="items.id">
          </div>
          <p v-if="item.thumb_list.length>2" class="line"></p>
          <h3 class="clear"></h3>
        </div>
          <div :id="'scroll'+index"  class="productList">
            <div @click="goTo('/classification/goodsDetail','detail',items.id)" :key="items.id" v-for="items in item.goods_list">
              <span class="productListBox">
                <div v-lazy:background-image="items.thumb"></div>
                <p style="height:34px;" class="f-26 sellName">{{items.name}}</p>
                <p class="f-26 sellPrice">¥{{items.price}}</p>
                <p style="margin:0;" class="c-666666 sellInfo">
                  <span class="f-30">¥{{items.min_money}}</span>
                   <i class="f-26">×</i>
                  <b class="f-26">{{items.max_cycle}}期</b>
                </p>
              </span>
            </div>
          </div>
        </div>
        </div>

        <!-- 落底 -->
      <div class="grid-box" style="font-size: 1.5rem">
        <div class="item"></div>
        <img class="item" src="./img/left.png" style="height: 2px;width: 33px;margin-top: 24px">
        <div class="item text">我是有底线哒～</div>
        <img class="item" src="./img/right.png" style="height: 2px;width: 33px;margin-top: 24px">
        <div class="item"></div>
      </div>
      </div>
    </div>
  </Layout>
</template>
<script type="text/babel">
require("./css/index.less");
export default {
  data() {
    return {
      isTop:false,
      more:require('./img/ico_most.png')
    };
  },
  computed: {},
  mounted() {
    console.info(this.pageUrlHead)
    this.initSwiper();
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    goBanner(url,type){
      // banner 跳转 分内网 外网 活动跳转
      var titleType = '';
      var obj = [
        {//专区
          url:"/classification/district",
          name:"district"
        },
        {//商城分类
          url:"/classification/category",
          name:"category"
        },
        {//商品列表
          url:"/classification/goodsList",
          name:"normal"
        },
        {//详情
          url:"/classification/goodsDetail",
          name:"detail"
        },
      ];
      for(let i = 0;i <obj.length;i++){
        if(url.indexOf(obj[i].url) != -1){
          titleType = obj[i].name;
        }
      }
       if(this.mobileType=='Android'){
         if(titleType == ''){
            window.installment.jumpUrl(url,titleType)
         }else{
            window.installment.jumpUrl(this.pageUrlHead+url,titleType)
         }
      }else{
        if(titleType == ''){
          window.webkit.messageHandlers.installment.postMessage({type:'jumpUrl',url:url,page:titleType})
        }else{
          window.webkit.messageHandlers.installment.postMessage({type:'jumpUrl',url:this.pageUrlHead+url,page:titleType})
        }
     }
    },
    goTo(url,type,id) {
      // 商品分类跳转 商品详情 专区
      if(this.mobileType=='Android'){
        window.installment.jumpUrl(this.pageUrlHead+url+'?Id='+id,type)
      }else{
        window.webkit.messageHandlers.installment.postMessage({type:'jumpUrl',url:this.pageUrlHead+url+'?Id='+id,page:type});
      }
    },
    goTop(){
      // 回到顶部
      window.pageYOffset = document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
    handleScroll () {
        if(this.resultInfo.special_list.length !== 0){
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop >= document.getElementById("scroll0").offsetTop){
                this.isTop = true;
            }else{
                this.isTop = false;
            }
        }
    },
    initSwiper() {
      var that = this;
      // banner
      if (that.resultInfo.banner_list.length > 1) {
        const bannerSwiper = new Swiper("#swiper-banner", {
          loop: true,
          autoplay: {
            delay: 4000,
            disableOnInteraction: false
          },
          on: {
            click: function(e) {
              that.goBanner(e.target.name,e.target.id);
            }
          },
          pagination: {
            el: ".swiper-pagination"
          }
        });
      }
      // 热卖单品
      const hotSwiper = new Swiper("#hotSwiperItems", {
        pagination: ".swiper-pagination",
        paginationClickable: true,
        spaceBetween: 2,
        slidesOffsetAfter: 0,
        slidesOffsetBefore: 0,
        slidesPerView: 'auto',
        freeMode: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
    }
  }
};
</script>

