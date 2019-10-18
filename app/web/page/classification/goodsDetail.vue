<template>
  <Layout title="商品详情" isNeedSwiper="true" isNeedBig="true">
    <!-- <div style="height: 44px;background-color: #fff;width: 100%"></div> -->
    <div id="goodsDetail">
      <!--banner轮播-->
      <div class="banner">
        <div
          v-if="resultInfo.thumb_list.length>0"
          class="swiper-container boxbg"
          id="swiper-banner"
        >
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in resultInfo.thumb_list" :key="item.id">
              <img :src="item" width="100%" />
            </div>
          </div>

          <div class="swiper-pagination" slot="pagination"></div>
        </div>
        <!-- <img v-if="resultInfo.thumb_list.length==1" @click="largeImg" :src="resultInfo.thumb" alt=""> -->
        <!-- <div v-if="resultInfo.thumb_list.length==1" class="swiper-pagination swiper-pagination-fraction"><span class="swiper-pagination-current">1</span> / <span class="swiper-pagination-total">1</span></div> -->
        <div
          v-if="resultInfo.thumb_list.length==0"
          style="height:100%;width:100%;background-color:rgba(250,250,250,1);"
        ></div>
      </div>
      <!-- 商品名称 -->
      <div class="sellName f-30">{{resultInfo.name}}</div>
      <!-- 商品价格及分期 -->
      <div class="priceBox">
        <div class="lowPrice">
          <div class="f-34">¥</div>
          <div class="f-50">{{intager}}</div>
          <div class="f-34">{{decimals}}</div>
        </div>
        <div @click="alertEvent(2)" class="date">
          <div class="f-26">¥</div>
          <div class="f-30">{{min_money}}</div>
          <div class="f-26">×{{max_cycle}}期</div>
          <img src="./img/ico_detailMore.png" width="6" alt />
        </div>
      </div>
      <!-- 说明 -->
      <div v-html="resultInfo.desc" class="tips f-24"></div>
      <!-- 选择 -->
      <div class="check">
        <div class="col-xs-2 f-28">{{checkText}}</div>
        <div
          @click="resultInfo.total_count!=0&&resultInfo.status==1?alertEvent(1):''"
          class="col-xs-8 f-28"
        >{{prizeName1}}{{prizeName2}}</div>
        <div
          @click="resultInfo.total_count!=0&&resultInfo.status==1?alertEvent(1):''"
          class="col-xs-2"
        >
          <img src="./img/ico_check.png" alt />
        </div>
      </div>
      <!-- 地址 -->
      <div class="address">
        <div class="col-xs-2 f-28">送至</div>
        <div class="col-xs-8 f-28" @click="showAddress">{{address}}</div>
        <div class="col-xs-2" @click="showAddress">
          <img src="./img/ico_check.png" alt />
        </div>
      </div>
      <div class="gray"></div>
      <!-- 商品介绍 -->
      <div class="goodsTitle f-26">
        <img src="./img/ico_sp.png" width="12" alt />商品介绍
      </div>
      <div onClick="return false;" class="detailImg">
        <div v-html="content"></div>
      </div>

      <!-- 浮框 -->
      <div class="fixBox">
        <div @click="contactServer">
          <img src="./img/ico_kf.png" width="18" alt />
          <p class="f-20">联系客服</p>
        </div>
        <div
          v-if="resultInfo.total_count!=0&&resultInfo.status==1"
          @click="alertEvent(1)"
          class="f-30"
        >立即购买</div>
        <div v-if="resultInfo.status==0" class="f-30 noGoods">已下架</div>
        <div
          onClick="return false;"
          v-if="resultInfo.total_count==0&&resultInfo.status==1"
          class="f-30 noGoods"
        >售罄</div>
      </div>
      <!-- 查看大图 -->
      <!-- <div v-if="isLargeBg" class="largeBg"></div> -->
      <div v-show="isModal" :class="isLargeBg?'largeModal':'largeModal visibility'">
        <div @click="closeEvent(4)" style="width:100%;height:100%;position:fixed;"></div>
        <div v-if="bannerlist.length>0" class="swiper-container boxbg" id="modal-banner">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in bannerlist" :key="item.id">
              <img :src="item" width="100%" />
            </div>
          </div>

          <div class="swiper-pagination" slot="pagination" @click="closeEvent(4)"></div>
        </div>
        <!-- <img v-if="bannerlist.length==1" class="perImg" :src="resultInfo.thumb" alt=""> -->
      </div>
      <div v-show="isShowBg" class="orderBg"></div>
      <!-- 下单 -->
      <!-- <div v-show="isOrder" class="orderBox"> -->
      <div class="orderBox">
        <div style="position:relative;height:100%;">
          <img src="./img/ico_close.png" @click="closeEvent(1)" class="closeOrderBox" alt />
          <div class="infoBox">
            <div>
              <div>
                <img :src="resultInfo.s_thumb" alt />
              </div>
            </div>
            <div class="info">
              <div>
                <span class="f-30">¥</span>
                <span class="f-42">{{intager}}</span>
                <span class="f-30">{{decimals}}</span>
              </div>
              <div class="f-26">月供：¥{{min_money}}起</div>
              <div class="f-24">库存：{{count}}件</div>
            </div>
          </div>
          <div class="attrBox">
            <div class="checkRadio">
              <h5 class="orderTitle f-26">{{prizeList1.name}}</h5>
              <div class="radios">
                <div
                  :id="items.id"
                  @click="chose(items.id,1,items.name)"
                  v-for="items in prizeList1.child"
                  :key="items.id"
                  :class="activity1==items.id?'checked f-26':'f-26'"
                >{{items.name}}</div>
                <h3 class="clear"></h3>
              </div>
            </div>
            <div v-if="prizeList2!=''" class="checkRadio">
              <h5 class="orderTitle f-26">{{prizeList2.name}}</h5>
              <div class="radios">
                <div
                  :id="items.id"
                  @click="chose(items.id,2,items.name)"
                  v-for="items in prizeList2.child"
                  :key="items.id"
                  :class="activity2==items.id?'checked f-26':'f-26'"
                >{{items.name}}</div>
                <h3 class="clear"></h3>
              </div>
            </div>
            <div class="countBox">
              <h5 class="orderTitle f-26">数量</h5>
              <div class="f-26 count">
                <div @click="minus">
                  <img width="12" :src="isMnus?minusIcon2:minusIcon1" alt />
                </div>
                <div>
                  <input
                    @blur="blurNum"
                    maxlength="3"
                    pattern="^[0-9]*[1-9][0-9]*$"
                    class="countNum"
                    v-model="num"
                    type="tel"
                  />
                </div>
                <div @click="add">
                  <img width="12" src="./img/ico_add.png" alt />
                </div>
              </div>
            </div>
          </div>

          <div class="btnBox">
            <div v-if="count!=0" @click="placeOrder" class="f-30">立即下单</div>
            <div v-if="count==0" class="f-30 noGoods">立即下单</div>
          </div>
        </div>
      </div>
      <!-- 月供 -->
      <div v-show="isPay" class="moneyPayBox">
        <div class="f-30 title">
          月供测算
          <div @click="closeEvent(2)" class="return">
            <img src="./img/ico_return.png" height="13" alt />
          </div>
        </div>
        <div class="num">
          <span class="f-30">¥</span>
          <span class="f-60">{{min_money}}</span>
          <span class="f-36">×</span>
          <span class="f-38">{{max_cycle}}</span>
          <span class="f-32">期</span>
          <!-- <img @click="alertEvent(3)" src="./img/ico_tip.png" width="17" alt=""> -->
          <h3 class="clear"></h3>
        </div>
        <div class="line"></div>
        <div class="stageTitle f-26">分期数</div>
        <div class="radioBox">
          <div
            @click="cycleEvent(item)"
            v-for="item in resultInfo.cycle_list"
            :key="item"
            :class="max_cycle==item?'checked f-26':'f-26'"
          >{{item}}期</div>
        </div>
      </div>
      <!-- 月供 详情-->
      <div v-show="isPayDetail" class="moneyPayDetail">
        <img @click="closeEvent(3)" src="./img/ico_return.png" class="return" alt />
        <div class="f-30 title">月供详情</div>
        <div class="subTitle f-28">合计需还</div>
        <div class="num">
          <span class="f-46">¥</span>
          <span class="f-72">{{total_price}}</span>
        </div>
        <div class="line"></div>
        <div class="list">
          <div>
            <div class="f-28 col-xs-3">本金</div>
            <div class="f-28 col-xs-9">¥{{fund}}</div>
          </div>
          <div>
            <div class="f-28 col-xs-3">利息</div>
            <div class="f-28 col-xs-9">¥{{interest}}</div>
          </div>
          <div>
            <div class="f-28 col-xs-3">月利率</div>
            <div class="f-28 col-xs-9">{{rate}}</div>
          </div>
          <div>
            <div class="f-28 col-xs-3">期数</div>
            <div class="f-28 col-xs-9">{{max_cycle}}期</div>
          </div>
          <div>
            <div class="f-28 col-xs-3">月供</div>
            <div class="f-28 col-xs-9">¥{{min_money}}</div>
          </div>
        </div>
        <div class="subLine"></div>
        <div class="tip f-24">具体以账单金额为准</div>
      </div>
      <div v-show="isLoading" :class="[{cycleLoading:isCycleLoading},'loadingBox']">
        <img
          src="./img/ico_loading.png"
          width="40"
          height="40"
          :class="[{loadingImg:isLoading}]"
          alt
        />
      </div>
      <div class="white"></div>
    </div>
  </Layout>
</template>

<script>
require("./css/goodsDetail.less");
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      isShowBg: false, //蒙版
      isOrder: false, //选择弹框
      isPay: false, //月供弹框
      isPayDetail: false, //月供详情弹框
      num: 1, //计步器初始值
      minusIcon1: require("./img/ico_minus1.png"), //计步器减号图片
      minusIcon2: require("./img/ico_minus2.png"), //计步器减号图片
      isMnus: false, //计步器减号判断
      isModal: false, //查看大图判断
      isLargeBg: false, //控制大图显示
      bannerlist: [],
      Id: "", //商品ID
      initName1: "", //选择属性初始值
      initName2: "", //选择属性初始值
      prizeList1: "", //属性列表1
      prizeList2: "", //属性列表2
      activity1: 0, //属性选择1
      activity2: 0, //属性选择2
      prizeName: "", //属性选择名称
      prizeName1: "", //属性选择名称1
      prizeName2: "", //属性选择名称2
      oncePrizeName1: "", //暂存属性选择名称1
      oncePrizeName2: "", //暂存属性选择名称2
      selectedFlag: false, //属性选择完成标志
      prize: 0, //价格
      intager: "0", //价格整数部分
      decimals: ".00", //价格小数部分
      count: 0, //库存
      checkText: "选择",
      addressId: "",
      address: "添加收货地址", //送货地址
      min_money: "0", //月供分期金额
      max_cycle: "0", //月供分期
      total_count: "0", //总库存
      total_price: "", // 合计还款
      fund: "", //本金
      interest: "", //利息
      rate: "", //月利率
      defaultSlide: 0, //默认显示slide
      bannerSwiper: "", //第一个swiper
      s_bannerSwiper: "", //查看大图swiper
      scrollTop: "", //界面滚动高度
      clickStop: false, // 点击月供分期拦截
      clickStops: false, // 点击属性拦截
      content: "", //商品介绍
      isLoading: false, //loading
      isCycleLoading: false //月供分期loading设置
    };
  },
  mounted() {
    var that = this;
    this.initData();
    this.initSwiper();
    this.$nextTick(function() {
      that.getGoodsContent();
    });

    // app 交互公共方法 接收来自app的方法调用
    window["appMethods"] = data => {
      this[data.method](data.param);
    };
  },
  watch: {
    num: "watchEvent"
  },
  methods: {
    getGoodsContent() {
      var that = this;
      const param = {
        url: "/classification/getGoodsContent",
        g_id: that.resultInfo.id.toString()
      };
      console.log(param);
      that.$http.postRequest(param).then(function(result) {
        console.log(result);
        that.content = result.content;
      });
    },
    blurNum() {
      if (this.num == "") {
        this.num = 1;
      }
      $("html,body").animate(
        {
          scrollTop: $("#goodsDetail").offset().top
        },
        0
      );
    },
    initData() {
      // if(this.resultInfo.status == 0){
      //   console.log("asdadasddddddddd")
      //   const option = JSON.stringify(this.$options.data());
      //   Object.assign(this.$data, JSON.parse(option))
      // }
      let data = this.resultInfo;
      console.log(data.status);
      if (data.order != "" && data.status == 0) {
        if (this.mobileType == "Android") {
          window.installment.detailToast("商品已经下架了，看看其他商品吧");
        } else {
          window.webkit.messageHandlers.installment.postMessage({
            type: "detailToast",
            value: "商品已经下架了，看看其他商品吧"
          });
        }
      }
      this.Id = data.id;
      this.max_cycle = data.max_cycle;
      this.min_money = data.min_money;
      this.bannerlist = data.thumb_list;
      const prizeList = data.attr_list;
      if (prizeList.length == 1) {
        this.prizeList1 = prizeList[0];
        this.prizeName1 = this.prizeList1.name;
      } else {
        this.prizeList1 = prizeList[0];
        this.prizeList2 = prizeList[1];
        this.prizeName1 = this.prizeList1.name;
        this.prizeName2 = "，" + this.prizeList2.name;
      }
      this.initName1 = this.prizeName1; //已下架 选择初始值
      this.initName2 = this.prizeName2; //已下架 选择初始值
      const prize = data.price;
      if (prize != undefined) {
        this.intager = prize.split(".")[0];
        if (prize.indexOf(".") != -1) {
          this.decimals = "." + prize.split(".")[1];
        }
        // this.count = data.AttrData.count;
      }
      this.count = data.total_count; //设置库存为总库存
      if (
        data.address_province != undefined &&
        data.address_city != undefined &&
        data.address_area != undefined &&
        data.address_address != undefined &&
        data.address_province != "" &&
        data.address_city != "" &&
        data.address_area != "" &&
        data.address_address != ""
      ) {
        this.address =
          data.address_province +
          data.address_city +
          data.address_area +
          data.address_address;
      }
      this.addressId = data.address_id;
    },
    watchEvent() {
      //商品数量输入框监听事件
      //  this.num = this.num)
      const reg = /^[0-9]*[1-9][0-9]*$/;
      if (!reg.test(this.num)) {
        this.num = "";

        if (this.count == 0) {
          this.num = 1;
        }
      }
      if (this.num > 999) {
        this.num = 999;
      }
      if (this.num == 0 || this.num == 1) {
        this.isMnus = false;
      } else {
        this.isMnus = true;
      }
    },
    cycleEvent(id) {
      // 月供分期选择
      this.clickStop = true;
      this.postRequest(id);
    },
    contactServer() {
      // 联系客服
      if (this.mobileType == "Android") {
        window.installment.contactService();
      } else {
        window.webkit.messageHandlers.installment.postMessage({
          type: "contactService"
        });
      }
    },
    algorithms(num) {
      // 数字补0
      let value = num.toString();
      if (value.indexOf(".") != -1) {
        let int = value.split(".")[0];
        let dec = value.split(".")[1];
        if (dec.length == 1) {
          dec += "0";
        }
        value = int + "." + dec;
      } else {
        value += ".00";
      }
      return value;
    },
    placeOrder() {
      // 立即下单
      var flag = false;

      if (Number(this.num) > Number(this.count)) {
        Toast({
          message: "超过可购买的最大数量",
          position: "bottom",
          duration: 1000
        });
        // this.num = this.count;
        return false;
      }
      if (this.resultInfo.attr_list.length == 1) {
        if (this.activity1 != 0) {
          flag = true;
        } else {
          Toast({
            message: "请选择商品属性",
            position: "bottom",
            duration: 1000
          });
        }
      } else {
        if (this.activity1 != 0 && this.activity2 != 0) {
          flag = true;
        } else {
          Toast({
            message: "请选择商品属性",
            position: "bottom",
            duration: 1000
          });
        }
      }
      if (flag) {
        const price = this.intager + this.decimals;
        const price_num = price.replace(/\,/g, "");
        let total_num = this.algorithms(
          new Big(Number(price_num))
            .times(Number(this.num))
            .times(10000)
            .round(2)
            .div(10000)
            .round(2)
        );
        let order_num = this.algorithms(
          new Big(Number(total_num))
            .plus(Number(this.resultInfo.fee))
            .times(10000)
            .round(2)
            .div(10000)
            .round(2)
        );
        const as_name = this.prizeName2.replace(/，/g, "");
        var param = JSON.stringify({
          g_id: this.Id.toString(), //商品ID
          addressId: this.addressId != null ? this.addressId.toString() : "", //地址ID
          address: this.address != "添加收货地址" ? this.address : "", //地址
          thumb: this.resultInfo.s_thumb, //缩略图
          name: this.resultInfo.name, //商品名称
          num: Number(this.num).toString(), //选择商品数量
          price: price, //商品单价含千分符
          price_num: price_num, //商品单价不含千分符
          min_money: this.min_money, //月供分期金额
          max_cycle: this.max_cycle, //月供分期
          af_id: this.activity1.toString(), //属性1ID
          as_id: this.activity2.toString(), //属性2ID
          af_name: this.prizeName1, //属性1名称
          as_name: as_name, //属性2名称
          count: this.count, //库存
          fee: this.resultInfo.fee == "0.00" ? "免邮" : this.resultInfo.fee, //运费
          total_num: total_num, //商品总额
          order_num: order_num //订单总额
        });
        console.log(param);
        if (this.mobileType == "Android") {
          window.installment.createOrder(param, "order");
        } else {
          window.webkit.messageHandlers.installment.postMessage({
            type: "createOrder",
            value: param,
            type: "order"
          });
        }
      }
    },
    postRequest(id, enter) {
      // 与PHP交互
      var that = this;
      const param = {
        url: "/classification/getGoodsPrice",
        af_id: that.activity1.toString(),
        as_id: that.activity2.toString(),
        g_id: that.Id.toString(),
        cycle: id ? id : that.max_cycle
      };
      that.isLoading = true;
      if (enter != undefined) {
        that.isCycleLoading = false;
      } else {
        that.isCycleLoading = true;
      }
      // if(enter != undefined){

      // }else{
      //   if(that.mobileType=='Android'){
      //     window.installment.showLoading('1')
      //   }else{
      //     window.webkit.messageHandlers.installment.postMessage({type:'showLoading',flag:'1'})
      //   }
      // }

      that.$http.postRequest(param).then(function(result) {
        // console.log(enter)
        that.isLoading = false;
        if (enter != undefined) {
          that.isCycleLoading = false;
        } else {
          that.isCycleLoading = true;
        }
        if (result.fund != undefined) {
          const prize = result.fund;
          that.intager = prize.split(".")[0];
          if (prize.indexOf(".") != -1) {
            that.decimals = "." + prize.split(".")[1];
          } else {
            that.decimals = ".00";
          }
        }

        that.count = result.count ? result.count : "0";
        if (Number(that.num) > Number(that.count)) {
          that.num = that.count;
          if (that.num == 0 || that.num == 1) {
            that.isMnus = false;
            that.num = 1;
          }
        }
        that.min_money = result.min_money ? result.min_money : that.min_money;
        that.max_cycle = result.cycle ? result.cycle : that.max_cycle;
        that.total_price = result.price ? result.price : that.total_price;
        that.fund = result.fund ? result.fund : that.fund;
        that.interest = result.interest ? result.interest : that.interest;
        // that.rate = result.rate*100+"%";
        that.rate = result.rate ? result.rate : that.rate;
        that.clickStop = false;
        that.clickStops = false;
        if (id != undefined) {
          that.max_cycle = id;
        }
        that.resultInfo.status = result.active;
        // if(result.active == 0){
        //    that.initData();
        // }
      });
    },
    chose(id, type, name) {
      // 属性选择判断 走不走接口
      var that = this;
      if (!that.clickStops) {
        that.selectedFlag = false;
        switch (type) {
          case 1:
            this.activity1 = id;
            this.oncePrizeName1 = name;
            break;
          case 2:
            this.activity2 = id;
            this.oncePrizeName2 = "，" + name;
            break;
        }

        let flag = false;
        if (that.resultInfo.attr_list.length == 1) {
          flag = true;
        } else {
          if (that.activity1 != 0 && that.activity2 != 0) {
            flag = true;
          }
        }
        if (flag) {
          this.prizeName1 = this.oncePrizeName1;
          this.prizeName2 = this.oncePrizeName2;
          that.checkText = "已选";
          that.clickStops = true;
          that.selectedFlag = true;
          that.postRequest(null, 1);
        }
      }
    },
    alertEvent(type) {
      //开启弹框
      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      this.scrollTop = scrollTop;
      // if(this.mobileType=='Android'){
      //  window.installment.isRefresh(0)
      // }else{
      //   window.webkit.messageHandlers.installment.postMessage({type:'isRefresh',value:'0'})
      // }
      switch (type) {
        case 1:
          // 选择
          $("#main").css({
            position: "fixed",
            left: "0",
            top: -this.scrollTop
          });
          var flag = true;
          if (this.resultInfo.member_status != undefined) {
            if (this.resultInfo.member_status == 0) {
              flag = false;
            }
          }
          if (flag) {
            this.isShowBg = true;
            this.isOrder = true;
            $(".orderBox").attr("style", "bottom:0;");
          } else {
            if (this.mobileType == "Android") {
              window.installment.detailToast(this.resultInfo.msg_buy);
            } else {
              window.webkit.messageHandlers.installment.postMessage({
                type: "detailToast",
                value: this.resultInfo.msg_buy
              });
            }
          }

          break;
        case 2:
          // 月供
          $("#main").css({
            position: "fixed",
            left: "0",
            top: -this.scrollTop
          });
          this.isShowBg = true;
          this.isPay = true;
          // this.postRequest();
          break;
        case 3:
          // 月供详情
          // this.isPay = false;
          // this.isPayDetail = true;

          var param = JSON.stringify({
            price: this.total_price, //合计
            fund: this.fund, //本金
            interest: this.interest, //利息
            min_money: this.min_money, //月供
            rate: this.rate, //月利率
            count: this.count, //库存
            cycle: this.max_cycle //期数
          });
          console.log(param);
          if (this.mobileType == "Android") {
            window.installment.monthPay(param); // 0 隐藏头 1 显示头
          } else {
            window.webkit.messageHandlers.installment.postMessage({
              type: "monthPay",
              value: param
            });
          }
          break;
      }
    },
    closeEvent(type) {
      //关闭弹框
      this.isShowBg = false;
      $("#main").attr("style", "height: 100%; width: 100%;");
      document.body.scrollTop = document.documentElement.scrollTop = this.scrollTop;
      // if(this.mobileType=='Android'){
      // window.installment.isRefresh(1)
      // }else{
      //   window.webkit.messageHandlers.installment.postMessage({type:'isRefresh',value:'1'})
      // }
      this.isLoading = false;
      this.isCycleLoading = false;
      switch (type) {
        case 1:
          // 选择
          if (!this.selectedFlag) {
            this.activity1 = 0;
            this.activity2 = 0;
          }
          this.isOrder = false;
          $(".orderBox").attr("style", "bottom: -480px;");
          break;
        case 2:
          // 月供
          this.isPay = false;
          break;
        case 3:
          // 月供详情
          this.isPayDetail = false;
          this.isPay = true;
          this.isShowBg = true;
          break;
        case 4:
          // 大图
          this.isModal = false;
          this.isLargeBg = false;
          this.bannerSwiper.slideTo(this.defaultSlide, 0, false);
          if (this.mobileType == "Android") {
            window.installment.showHead(1); // 0 隐藏头 1 显示头
          } else {
            window.webkit.messageHandlers.installment.postMessage({
              type: "showHead",
              flag: "1"
            });
          }
          break;
      }
    },
    closeLageImg() {
      // 关闭大图交互
      // 大图
      $("#main").attr("style", "height: 100%; width: 100%;");
      document.body.scrollTop = document.documentElement.scrollTop = this.scrollTop;
      this.isModal = false;
      this.isLargeBg = false;
      this.bannerSwiper.slideTo(this.defaultSlide, 0, false);
      if (this.mobileType == "Android") {
        window.installment.showHead(1); // 0 隐藏头 1 显示头
      } else {
        window.webkit.messageHandlers.installment.postMessage({
          type: "showHead",
          flag: "1"
        });
      }
    },
    minus() {
      // 计步器减
      if (this.num == 1) {
        this.isMnus = false;
        return false;
      }
      this.num--;
      this.isMnus = true;
    },
    add() {
      // 计步器加
      if (this.count != 0) {
        if (Number(this.num) >= Number(this.count)) {
          Toast({
            message: "库存不足",
            position: "bottom",
            duration: 1000
          });
          // return false;
          // this.num = this.count;
        } else {
          this.num++;
          this.isMnus = true;
        }
      } else {
        Toast({
          message: "库存不足",
          position: "bottom",
          duration: 1000
        });
      }
    },
    // 查看大图
    largeImg() {
      var that = this;
      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      this.scrollTop = scrollTop;
      if (this.mobileType == "Android") {
        window.installment.showBigpic(1);
        window.installment.showHead(0); // 0 隐藏头 1 显示头
        that.isModal = true;
        if (that.bannerlist.length > 1) {
          setTimeout(function() {
            that.s_bannerSwiper = new Swiper("#modal-banner", {
              preventInteractionOnTransition: true,
              initialSlide: that.defaultSlide,
              on: {
                // tap:function(){
                //   that.closeLageImg();
                // },
                slideChange: function() {
                  that.defaultSlide = this.activeIndex;
                },
                slideChangeTransitionEnd: function() {
                  that.isLargeBg = true;
                  $(".largeModal").click(function() {
                    that.closeLageImg();
                  });
                },
                slideChangeTransitionStart: function() {
                  that.isLargeBg = true;
                  $(".largeModal").off("click");
                  $("#modal-banner").off("click");
                }
              },
              pagination: {
                el: ".swiper-pagination",
                type: "fraction"
              }
            });
            $("#modal-banner").click(function() {
              that.closeLageImg();
            });
            if (that.defaultSlide == 0) {
              that.isLargeBg = true;
            }
          }, 100);
        } else {
          setTimeout(function() {
            that.s_bannerSwiper = new Swiper("#modal-banner", {
              preventInteractionOnTransition: true,
              initialSlide: that.defaultSlide,
              resistanceRatio: 0,
              on: {
                tap: function() {
                  that.closeLageImg();
                },
                slideChange: function() {
                  that.defaultSlide = this.activeIndex;
                },
                slideChangeTransitionEnd: function() {
                  that.isLargeBg = true;
                  $(".largeModal").click(function() {
                    that.closeLageImg();
                  });
                },
                slideChangeTransitionStart: function() {
                  that.isLargeBg = true;
                  $(".largeModal").off("click");
                }
              },
              pagination: {
                el: ".swiper-pagination",
                type: "fraction"
              }
            });
            if (that.defaultSlide == 0) {
              that.isLargeBg = true;
            }
          }, 100);
        }
      } else {
        window.webkit.messageHandlers.installment.postMessage({
          type: "showHead",
          flag: "0"
        });
        that.isModal = true;
        if (that.bannerlist.length > 1) {
          setTimeout(function() {
            that.s_bannerSwiper = new Swiper("#modal-banner", {
              preventInteractionOnTransition: true,
              initialSlide: that.defaultSlide,
              on: {
                slideChange: function() {
                  that.defaultSlide = this.activeIndex;
                },
                slideChangeTransitionEnd: function() {
                  that.isLargeBg = true;
                  $(".largeModal").click(function() {
                    that.closeLageImg();
                  });
                },
                slideChangeTransitionStart: function() {
                  that.isLargeBg = true;
                  $(".largeModal").off("click");
                  $("#modal-banner").off("click");
                }
              },
              pagination: {
                el: ".swiper-pagination",
                type: "fraction"
              }
            });
            $("#modal-banner").click(function() {
              that.closeLageImg();
            });
            if (that.defaultSlide == 0) {
              that.isLargeBg = true;
            }
          }, 100);
        } else {
          setTimeout(function() {
            that.s_bannerSwiper = new Swiper("#modal-banner", {
              preventInteractionOnTransition: true,
              initialSlide: that.defaultSlide,
              resistanceRatio: 0,
              on: {
                tap: function() {
                  that.closeLageImg();
                },
                slideChange: function() {
                  that.defaultSlide = this.activeIndex;
                },
                slideChangeTransitionEnd: function() {
                  that.isLargeBg = true;
                  $(".largeModal").click(function() {
                    that.closeLageImg();
                  });
                },
                slideChangeTransitionStart: function() {
                  that.isLargeBg = true;
                  $(".largeModal").off("click");
                }
              },
              pagination: {
                el: ".swiper-pagination",
                type: "fraction"
              }
            });
            if (that.defaultSlide == 0) {
              that.isLargeBg = true;
            }
          }, 100);
        }
      }
    },
    //banner
    initSwiper() {
      var that = this;
      // banner
      if (that.resultInfo.thumb_list.length > 1) {
        that.bannerSwiper = new Swiper("#swiper-banner", {
          preventInteractionOnTransition: true,
          on: {
            click: function(e) {
              that.largeImg();
            },
            slideChange: function() {
              that.defaultSlide = this.activeIndex;
            }
          },
          pagination: {
            el: ".swiper-pagination",
            type: "fraction"
          }
        });
      } else {
        that.bannerSwiper = new Swiper("#swiper-banner", {
          preventInteractionOnTransition: true,
          resistanceRatio: 0,
          on: {
            click: function(e) {
              that.largeImg();
            },
            slideChange: function() {
              that.defaultSlide = this.activeIndex;
            }
          },
          pagination: {
            el: ".swiper-pagination",
            type: "fraction"
          }
        });
      }
    },
    showAddress() {
      var flag = true;
      if (this.resultInfo.member_status != undefined) {
        if (this.resultInfo.member_status == 0) {
          flag = false;
        }
      }
      if (flag) {
        let adressId =
          this.resultInfo.address_id != null &&
          this.resultInfo.address_id != undefined
            ? this.resultInfo.address_id
            : "";
        if (this.mobileType == "Android") {
          window.installment.showAddress(adressId);
        } else {
          window.webkit.messageHandlers.installment.postMessage({
            type: "showAddress",
            addressId: adressId + ""
          });
        }
      } else {
        if (this.mobileType == "Android") {
          window.installment.detailToast(this.resultInfo.msg_address);
        } else {
          window.webkit.messageHandlers.installment.postMessage({
            type: "detailToast",
            value: this.resultInfo.msg_address
          });
        }
      }
    },
    changeAddress(data) {
      this.address = data.addressName;
    }
  }
};
</script>

