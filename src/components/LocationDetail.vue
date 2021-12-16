<template>
  <div class="test">
    <div>
      <div class="test-title">
          <h1>{{title}}</h1>
          <p>{{context1}}</p>
      </div>

<div class="line"></div>
        <div class="contents-Detail" >
            <img v-if="picture2!=''"
            class="test"
            :src= "picture2"
            height="500"
            width="600"
            />
            <div>{{context2}}</div>
            <img v-if="picture3!=''"
            class="test"
            :src= "picture3"
            height="500"
            width="600"
            />
            <div>{{context3}}</div>
            <img v-if="picture4!=''"
            class="test"
            :src= "picture4"
            height="500"
            width="600"
            />
            <div>{{context4}}</div>
            <img v-if="picture5!=''"
            class="test"
            :src= "picture5"
            height="500"
            width="600"
            />
            <div>{{context5}}</div>
            <img v-if="picture6!=''" 
            class="test"
            :src= "picture6"
            height="500"
            width="600"
            />
            <div>{{context6}}</div>
        </div>
        <div>
    <naver-maps
      :height="height"
      :width="width"
      :mapOptions="mapOptions"
      :initLayers="initLayers"
      v-if="this.mapOptions.lat != 0"
      @load="onLoad">
      <naver-info-window
        class="info-window"
        @load="onWindowLoad"
        :isOpen="info"
        :marker="marker">
        <div class="info-window-container">
            <!-- 마크 안에 정보 들어가는 곳 -->
            <!-- 데이터가 null값인것도 생각해서 꾸며주기 ㅎㅎ.. -->
          <h1>{{mapdata.map_name}}</h1>
          <h2>{{mapdata.map_address}}</h2>
          <p>{{mapdata.map_tel}}</p>
          <p>{{mapdata.map_page}}</p>
          <p>{{mapdata.map_time}}</p>
        </div>
      </naver-info-window>
      <naver-marker :lat="this.mapOptions.lat" :lng="this.mapOptions.lng" @click="onMarkerClicked" @load="onMarkerLoaded"/>
      <naver-ground-overlay
        :bounds="{south:36.7,north:36.9,west:126.5,east:127.5}"/>
    </naver-maps>
    <!-- 얘도 이쁘게 바꿔야함 -->
    <p>마크 클릭시 자세한정보가 나옵니다</p>
  </div>

    <div style="border: 3px solid black; padding: 100px; margin-top: 20px;
    margin-left:100px; margin-right:100px; ">{{context7}}</div>
    <br/>
    <br/>
    <div class="line"></div>

    <div class="content-detail-comment">
        <LocationCommentList :locaNo="locaNo"/>
      </div>
     </div>
  </div>
</template>

<script>
import Backtotop from '@/components/BackToTop.vue';
import {findLocation, findMap} from '../service';
import LocationCommentList from './LocationCommentList';

export default {
    name: 'LocationDetail',
    components:{
        Backtotop,
        LocationCommentList
    },
    // async beforecreate() {
    //     const ret2 = await findMap({title : this.$route.query.title})
    //     // 넣어야할 데이터들
    //     this.mapdata = ret2.data[0]
    //     console.log(this.mapOptions.lat)
    //     this.mapOptions.lat = Number(ret2.data[0].lat)
    //     this.mapOptions.lng = Number(ret2.data[0].lng)
    //     console.log(Number(ret2.data[0].lat))
    // },
    async created(){
        const ret2 = await findMap({title : this.$route.query.title})
        // 넣어야할 데이터들
        this.mapdata = ret2.data[0]
        this.mapOptions.lat = Number(ret2.data[0].lat)
        this.mapOptions.lng = Number(ret2.data[0].lng)
        console.log(Number(ret2.data[0].lat))
    //   const ret = await findLocation({loca_no: Number(this.$route.params.locaNo)})
      const ret = await findLocation({loca_no: Number(this.$route.query.loca_no)})
      const {data} = ret;
      this.title = data.title;
      this.picture1 = data.picture1;
      this.picture2 = data.picture2;
      this.picture3 = data.picture3;
      this.picture4 = data.picture4;
      this.picture5 = data.picture5;
      this.context1 = data.context1;
      this.context2 = data.context2;
      this.context3 = data.context3;
      this.context4 = data.context4;
      this.context5 = data.context5;
      this.picture6 = data.picture6;
      this.context6 = data.context6;
      this.context7 = data.context7;
      this.tag = data.tag;
    //   var title = this.$route.query.title
        
    },
    data(){
      const locaNo = Number(this.$route.query.loca_no);
        return{
            width: 700,
        height: 700,
        info: false,
        marker: null,
        count: 1,
        map: null,
        isCTT: false,
        mapOptions: {
          lat: 0,
          lng: 0,
          zoom: 17,
          zoomControl: true,
          zoomControlOptions: {position: 'TOP_RIGHT'},
          mapTypeControl: true,
        },
        initLayers: ['BACKGROUND', 'BACKGROUND_DETAIL', 'POI_KOREAN', 'TRANSIT', 'ENGLISH', 'CHINESE', 'JAPANESE'],
          locaNo: locaNo,
          title: '',
          picture1: "",
          picture2:'',
          picture3:'',
          picture4:'',
          picture5:'',
          context1: '',
          context2:'',
          context3:'',
          context4:'',
          context5:'',
          picture6:'',
          context6:'',
          context7:'',
          tag:'',
          mapdata:[]
        };
    },
    // created(){
    //   findLocationDetailList().then(response => this.data2 = response.data);
    // },
    computed: {
      markclick() {
        return this.mapdata;
      }
    },
    mounted(){
        setInterval(() => this.count++, 1000);
    },
    methods: {
      onLoad(vue){
        this.map = vue;
        console.log(this.mapOptions.lng)
      },
      onWindowLoad(that) {
      },
      onMarkerClicked(event) {
        this.info = !this.info;
      },
      onMarkerLoaded(vue) {
        this.marker = vue.marker;
      }
    },
  };
</script>

<style scoped>
/* 글씨 */
.info-window-container {
    padding: 10px;
    width: 300px;
    height: 100px;
  }
  /* 하얀색 박스 */
.info-window { 
    width: 500px;
    height: 100px;
}
.test-title h1 {
    padding-top: 100px;
}

.test-title p {
    padding-bottom: 70px;   
}

.contents3 h2{
    padding: 100px;
    padding-bottom: 20px;
}

.test-taglist{
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    padding: 0;
    z-index: 1;
    display: block;
    padding-bottom: 10px;
    left: 380px;
}

.test-taglist ul{
    padding: 15px 0 0 15px;
    list-style: none;
}

.test-taglist ul li {
    float: left;
    width: auto;
    padding: 5px;
}

.test-taglist ul li a:hover {
    color: #ffffff;
    background-color: #7bc4c4;
}

.test-taglist ul li a span{
    display: inline-block;
    height: 38px;
    line-height: 38px;
    padding: 0 20px;
}

.test-taglist ul li a {
    display: inline-block;
    overflow: hidden;
    background: #fff;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    color: #777;
    border: 1px solid #d8d7d7;
    border-radius: 7px;  
}

a:link{
    text-decoration: none;
}

.line{
    width: 100%;
    height: 2px;
    background:rgb(187, 187, 187);
    padding-bottom: 2px;
    margin-bottom: 10px;
}
.content-detail-comment {
  border: 1px solid black;
  margin-top: 1rem;
  padding: 2rem;
  margin-left: 100px;
  margin-right: 100px;
}


</style>