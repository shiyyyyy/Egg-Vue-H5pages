<template>
    <Layout >
        <div id="goodsClass">
            <h3 class="title f-54">商城分类</h3>
            <div class="leftBox" id="lb">
                <ul class="typeList" @click="change">
                    <li :id="item.id" v-for="item in resultInfo.category_list" :key="item.id">
                        <i :id="item.id" :class="resultInfo.activity==item.id?'display':''"></i>
                        <span :id="item.id" :class="resultInfo.activity==item.id?'check':'f-26'">{{item.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="rightBox" :style="{height: rBheight+'px'}">
                <div :class="resultInfo.children_list==null||resultInfo.children_list.length==0?'subTypeBox isnoList':'subTypeBox'">
                    <ul v-if="resultInfo.children_list!=null&&resultInfo.children_list.length>0" class="subTypeList">
                        <li v-for="(item,index) in resultInfo.children_list" @click="item.type==0?'':goTo(item.id)" :key="index"
                            class="subTypeItem">
                            <div :class="item.type==0?'bgNone':''" v-lazy:background-image="item.thumb"></div>
                            <!-- <div><img v-if="item.thumb" style="height:71px;width:71px;border:none;" :src="item.thumb" :class="item.type==0?'bgNone':''" alt=""></div> -->
                            <span class="f-22" style="font-weight: 400">{{item.name}}</span>
                        </li>
                    </ul>
                    <div v-else class="noneList" style="height: 100%">
                        <div class="noneBox">
                            <img width="135" src="./img/noCommodity.png" alt="">
                            <div class="f-32">该分类的商品正在备货中</div>
                            <p class="f-28">看看其他分类吧~</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script type="text/babel">
    require("./css/category.less")

    export default {
        data() {
            return {
                rBheight: 0,   //获取左边栏目的高度
                isShow:false,
            }
        },
        created() {
           
        },
        mounted() {
            $(".leftBox").height($(window).height() - 68);
             this.$nextTick(
                function () {
                    this.rBheight = $(".leftBox").outerHeight();
                }
            );
        },
        updated(){
            if(this.resultInfo.children_list!=null&&this.resultInfo.children_list.length>0){
                if(window.screen.width < 340){
                    $(".bgNone").parent().remove()
                }

            }
        },
        methods: {
            change(e) {
                var that = this;
                that.resultInfo.activity = e.target.getAttribute("id");
                $(".rightBox").attr("style","opacity:0;height:"+that.rBheight+"px")
                const param = {
                    url: '/classification/getCategory',
                    id: that.resultInfo.activity
                }
                try {
                    that.$http.postRequest(param).then(function (result) {
                        $(".subTypeItem>div").attr("style",'background-image:"./img/ydkdbg.png; ');
                        that.resultInfo.children_list = result.children_list;
                        $(".rightBox").attr("style","opacity:1;height:"+that.rBheight+"px")  
                    })
                } catch (e) {
                    console.log(e)
                }

            },
            goTo(id) {
                if (this.mobileType == 'Android') {
                    window.installment.jumpUrl(this.pageUrlHead + '/classification/goodsList' + '?Id=' + id, 'normal')
                } else {
                    window.webkit.messageHandlers.installment.postMessage({
                        type: 'jumpUrl',
                        url: this.pageUrlHead + '/classification/goodsList' + '?Id=' + id,
                        page: 'normal'
                    });
                }
            }
        }
    };
</script>

