<template>
  <div class="gallery" style="width: 25rem" >
    <div class="gallery-panel" 
         v-for="location in locations" :key="location.loca_no" 
         >
          <div class="contents">
            <!--  v-if="location.loca_no != ''" -->
          <img class="test" :src= "location.picture1"
           height="320"
           width="350"
          @click="goDetail(location.loca_no, location.title)">

          <!-- 좋아요 버튼 -->
          <button class="like"  v-on:click="like(location)"> 
        <svg class="heart"  id="heart" xmlns="http://www.w3.org/2000/svg" 
            width="20"  viewBox="0 0 32 31"><title>heart</title><g  stroke-width="2">
            <path id="heart" d="M10.55 2.31a8.07 8.07 0 0 0-8.07 8.08c0 3.15 2.16 5.66 4.28 7.61 3.35 3.44 6.46 7.37 9.59 11.08 
            2.92-3.86 5.48-7.41 8.91-11.36 1.72-2.24 4.71-4.18 4.7-7.33a8.07 8.07 0 0 0-0.79-3.49l0.02-0.06-0.05-0.01a8.07 8.07 0 0 0-12.85-2.26l-0.12 0.02a8.07 8.07 0 0 0-5.62-2.28z" 
            stroke-linecap="round" stroke-linejoin="round" :style="location.liked === true ? {'fill': 'red'} : null"></path></g></svg>
        <span></span>
          </button>

          <h3 class="test-loc-title" @click="goDetail(location.loca_no, location.title)">{{location.title}}</h3>
          <p class="test-test" @click="goDetail(location.loca_no, location.title)">{{ location.hash_name }}</p>

           
      </div>
    </div>
    <infinite-loading @infinite="infiniteHandler" spinner="bubbles">
      <h1 slot="no-more" style="color:rgb(102,102,102); font-size: 20px; margin: 150px; padding: 25px 0px;">No More Data :)</h1>
      <h1 slot="no-results" style="color:rgb(102,102,102); font-size: 14px; padding: 10px 0px;">결과가 없어용 ㅠㅠ</h1>
    </infinite-loading>
  </div>  
</template>

<script>
import {updateheart, deleteheart, selectheart} from '../service';
import EventBus from './EventBus'
import InfiniteLoading from 'vue-infinite-loading'
import axios from 'axios';
const api = "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/find/location_list";


export default {
    name: 'gallery',
    

    async created(){
      if ( this.$store.state.account.user!= null){
      var user = this.$store.state.account.user.userId
      var test = await selectheart({user})
      this.test = test.data
      }
      // created 초기값 지우면 무한반복은 안됨
      // 대신 지우면 null값이 들어간 요소가 하나 나옴
      // 지도나 검색창으로 이동시 기존데이터와 무한스크롤같이 나옴
      // 새로고침하면 기존 데이터 null값으로 변함
      // const ret = await findLocationList();
      // this.locations = ret.data;
      // 지도 router
        if (this.$route.query.hash_name != null) {
          this.locations = this.$route.query.hash_name
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
          this.locations = ret3;
      })
     
    },
         
    data() {
        return{
          test: [],
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
      this.$route.query.hash_name
    },
    
    methods:{
      async like(event){
        // console.log(event) // location정보 가져옴
        // console.log(event.loca_no)
        // console.log(event.liked)
        if (this.$store.state.account.user.userId != null) {
          var user = this.$store.state.account.user.userId
          var title = event.title
          for (let x =0; x < this.locations.length; x++) {
            if (this.locations[x].loca_no == event.loca_no) { // 클릭된 loca_no이랑 같은것이 전체중에 있다면
              var clickliked = event.liked // event.liked의 상태를 넣어줌
            // console.log(clickliked)
        if(clickliked == false){ // clickliked가 false인 경우
          // db테이블에 liked와 like_color, liektotal 컬럼 추가
          for (let z = 0; z < this.locations.length; z++) {
            if (this.locations[z].loca_no == event.loca_no) {
              this.locations[z].like_color = 'rgb(255, 54, 54)'
              this.locations[z].liked = true
              // console.log(this.locations[z].like_color)
              console.log(123214123)
              await updateheart({user, title}) // 해당 loca_no를 updateheart
            }
          }
        }else{ // clickliked가 true인 상태일경우
          for (let t = 0; t < this.locations.length; t++) {
            if (this.locations[t].loca_no == event.loca_no) {
              console.log('asdawee')
              this.locations[t].like_color = ''
              this.locations[t].liked = false
              // console.log(this.locations[t].like_color)
              await deleteheart({user, title}) // db에서 삭제
            }
          }
          // this.like_color = '',
          // this.liked = false
          // await deleteheart(user, title) // db에서 삭제
          }
          }
          }
          var user = this.$store.state.account.user.userId
        var test2 = await selectheart({user})
        console.log(test2)
        console.log(this.locations)
        console.log(this.locationsitems)
        if (test2.length > this.test.length) {
          if (this.test != []) {
            for (let y = 0; y < this.locations.length; y++) {
              for (let r = 0; r < test2.length; r++) {
                if (this.locations[y].title == test2.data[r].title) {
                  this.locations[y].liked = true
                  this.locations[y].like_color = 'red'
                }
            }
            }
          }
        }
        }
        else {
          alert('로그인 이후 좋아요 클릭이 가능합니다.')
        }
        // console.log(this.locationsitems)
        // console.log(this.locations)
      },
      // 무한 스크롤 
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
                // 인피니트로딩 될때 좋아요 표시 --> 유저가 누른
                
                for (let k=0; k < this.test.length; k++) {
                  if (this.locationsitems[i].title == this.test[k].title) {
                    // console.log(this.test[k])
                    if (this.test[k].user_id == this.$store.state.account.user.userId) {
                      this.locationsitems[i].liked = true
                      this.locationsitems[i].like_color = 'red'
                    }
                  }
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
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap'); 
* {
  font-family: 'Nanum Gothic', sans-serif;
 
  
}
.heart{
  transition:all .1s ease;
  stroke:#ff3636;
  fill:none;
  margin-right:10px;
}
button:active .heart{
  transform:scale(0.9)
}
.like a,
button {
  color: rgba(0,0,0,0.7);
}
button {
  margin:0;
  background: none;
  font: inherit;
  padding: 0.8em 1em;
  display:flex;
  align-items:center;
  transition:0.1s ease;
  border: 0;
  float: right;
}

.gallery {
    flex-wrap: wrap;
    padding: 3rem 0;
    display: grid;
    grid-template-columns:  1fr 1fr 1fr;
    margin-top: 30px;
    padding-left: 120px;
}
.contents{
    margin: 5px;
    border: 1px solid rgb(196, 196, 196);
    cursor: pointer;
    border-radius: 4px;
}
.contents:hover{
    /* border-radius: 4px; */
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 15%);
    content: "";
    top: -4px;
    position: relative;
}
.test-loc-name{
    color: #848c94;
    font-size: 15px;
    max-width: 100%;
    overflow: hidden;
    margin: 0;
    text-align: left;
    padding: 10px 0 0 10px;
}
.test-loc-title{
    color: #000000;
    font-size: 25px;
    max-width: 80%;
    overflow: hidden;
    margin: 0;
    text-align: left;
    padding: 10px 0 10px 10px;
  
}
.test-test{
    color: #858585;
    font-size: 12px;
    max-width: 100%;
    overflow: hidden;
    margin: 0;
    text-align: left;
    padding: 0 0 10px 10px;
  
}
@media (min-width: 1801px) and (max-width: 2649px){ 
.gallery {
    display: grid;
    grid-template-columns:  1fr 1fr 1fr 1fr;
    padding-left: 60px;
}
}

@media (max-width: 1800px){ 
.gallery {
    display: grid;
    grid-template-columns:  1fr 1fr 1fr ;
    padding-left: 90px;
}
}
</style>