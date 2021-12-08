<template>
  <div class="gallery" style="width: 25rem" >
    <div class="gallery-panel" 
         v-for="location in locations" :key="location.loca_no" 
         @click="goDetail(location.loca_no, location.title)"
         >
          <div class="contents">
            <!--  v-if="location.loca_no != ''" -->
          <img class="test" :src= "location.picture1"
           height="320"
           width="350">
          <h3 class="test-text">{{location.title}}</h3>
          <p>{{ location.hash_name }}</p>
      </div>
    </div>
    <infinite-loading @infinite="infiniteHandler" spinner="bubbles">
      <div slot="no-more" style="color:rgb(102,102,102); font-size: 14px; padding: 10px 0px;">No More Data :)</div>
      <div slot="no-results" style="color:rgb(102,102,102); font-size: 14px; padding: 10px 0px;">결과가 없어용 ㅠㅠ</div>
    </infinite-loading>
  </div>  
</template>

<script>
import {findLocationList, findHashName} from '../service';
import EventBus from './EventBus'
import InfiniteLoading from 'vue-infinite-loading'
import axios from 'axios';
const api = "http://127.0.0.1:3000/find/location_list";


export default {
    name: 'gallery',
    

    async created(){
      // created 초기값 지우면 무한반복은 안됨
      // 대신 지우면 null값이 들어간 요소가 하나 나옴
      // 지도나 검색창으로 이동시 기존데이터와 무한스크롤같이 나옴
      // 새로고침하면 기존 데이터 null값으로 변함
      // const ret = await findLocationList();
      // this.locations = ret.data;
      // 지도 router
        if (this.$route.query.hash_name != null) {
          this.locations = this.$route.query.hash_name
          console.log(this.locations)
          console.log(this.$route.query.hash_name)
          if(this.locations[0].hash_name == undefined){
            this.$router.push({
              path:'/detail3'
            })
          }
        } 
        
      // 해시태그 선택
      await EventBus.$on('changePage', (ret2) =>{
          this.ret2 = ret2;
          this.locations = this.ret2;
      })
      // 중복 해시태그
      await EventBus.$on('changePage3', (ret3) =>{
        console.log(ret3)
          this.locations = ret3;
      })
     
    },
         
    data() {
        return{
          locations: [
            // {
            //   loca_no:"",
            //   title: "",
            //   picture1: "",
            //   // picture2: "",
            //   // picture3: "",
            //   // picture4: "",
            //   // picture5: "",
            //   // context:"",
            //   // tag:"",
            //   hash_name:"",
            //   hash_no:''
            // }
          ],
          limit:0,
          busy:false,
          locationsitems:[]
        }
        },
        components: {
      InfiniteLoading
    },  
    mounted(){
      this.infiniteHandler()
      // this.$route.query.hash_name
    },
    
    methods:{
     async infiniteHandler($state){
        await axios.get(api ,{
          params:{
            limit:this.limit
          }
        }).then((res) => {
          setTimeout(() =>{
            const temp = []
            // if ( this.$route.query.hash_name != null){
              
            //   $state.complete();
            // }  
             if (this.busy === false ){
               
              for (let i = this.locations.length  ; i <= this.locations.length +2 ; i++){
                this.locationsitems = res.data
                if (this.locationsitems.length  === i || this.$route.query.hash_name != null|| this.ret2 != null ){
                  this.busy = true
                  break; 
                }
                temp.push(this.locationsitems[i]) 
              } 
            }
            if (this.busy === true){
              $state.complete();             
            }
            this.locations = this.locations.concat(temp)
            
            $state.loaded()
            // if(res.data.length){
            //   // console.log(res.data) // 여기에서만 돌아가는중
            //   // console.log($state.startNo)
            //   this.locations = this.locations.concat(res.data);
            //   // this.locations = this.locations.concat(...res.data);
            //   // this.locations = [...res.data]
            //   // this.limit += 3;
            //   $state.loaded();
            //   // console.log(this.locations.length)
            //   // this.$refs.InfiniteLoading.stateChanger.reset()
            // if(this.locations.length / 20 < 1){
            //     console.log(12) // 안들어옴
            //     $state.complete(); // 데이터 없으면 로딩 끝?
            //   }
            // } else {
            //   console.log(123) // 안들어옴
            //   $state.complete();
            // }
          }, 1000)
        }).catch(err => {
          console.error(err);
        });
      },

     async goDetail(loca_no, title){
      this.$router.push({
        name: 'LocationDetail',
        query: {
          loca_no: loca_no,
          title: title
        }
      // path: `/detail3/locationdetail/${loca_no}`
      
      })
      }, 
    },
};


</script>

<style >

.gallery {
    flex-wrap: wrap;
    padding: 3rem 0;
    display: grid;
    grid-template-columns:  1fr 1fr 1fr;
    margin-top: 100px;
}

.contents{
    margin: 5px;
    border: 1px solid rgb(196, 196, 196);
    cursor: pointer;
}

/* h3 {
    display: inline-block;
} */
</style>