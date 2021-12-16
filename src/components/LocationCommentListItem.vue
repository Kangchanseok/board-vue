<template >
  <div>
    <!-- 수정누르면 템플릿 보였다 안보였다하게 -->
    <template v-if="disappear">
    <div class="comment-list-item" >
      <div class="comment-list-item-name" >
        <div>{{name}}</div>
        <div>{{commentObj.regdate}}</div>
      </div>
      <div class="comment-list-item-context">{{commentObj.context}}</div>
      <div class="comment-list-item-button">

        <b-button size="sm"  class="btn1" variant="outline-success" 
        @click="dbId == storeId ? modifyCoData() : notCorrectMsg()">수정</b-button>
        <b-button size="sm" class="btn2" variant="outline-danger"
        @click="dbId == storeId ? deleteCoData(): notCorrectMsg()">삭제</b-button>
        <!-- <b-button variant="info" @click="subCommentToggle">대댓글 달기</b-button> -->
      </div>
    </div>

    <!-- 대댓글 기능 안넣을거 같아서 주석처리 -->
    <!-- <template v-if="subCommentCreateToggle">
      <CommentCreate
        :isSubComment="true"
        :commentNo="commentObj.comment_no"
        :reloadSubComments="reloadSubComments"
        :subCommentToggle="subCommentToggle"
      />
    </template> -->
   
    <!-- <template v-if="subCommentList.length > 0">
      <div
        class="comment-list-item-subcomment-list"
        :key="item.subcomment_no"
        v-for="item in subCommentList"
      >
        <div class="comment-list-item-name">
          <div>{{item.user_name}}</div>
          <div>{{item.regdate}}</div>
        </div>
        <div class="comment-list-item-context">{{item.context}}</div>
        <div class="comment-list-item-button">
          <b-button variant="info">수정</b-button>
          <b-button variant="info"  @click="deleteScData">삭제</b-button>
        </div>
      </div>
    </template> -->

    </template>

    <template v-if="!disappear">
      <div class="comment-create">
    <b-input-group :prepend="name" class="mt-3">
      <b-form-textarea
        id="textarea"
        v-model="context"
        rows="3"
        max-rows="6"
      >{{context}}</b-form-textarea>
      <b-input-group-append>
        <b-button class="writeBtn" variant="outline-primary" @click="[modifyCoData(),modifyCoData2()]">수정하기</b-button>
        <b-button class="writeBtn" variant="outline-danger" @click="cancleModify" >취소</b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
    </template>
  </div>
</template>

<script>
import data from "@/data";
import LocationCommentCreate from "./LocationCommentCreate";
import {findSubComment, deleteLocationComment, deleteSubComment, modifyLocationComment, addLocationComment} from '../service';

export default {
  name: "LocationCommentListItem",
  props: {
    commentObj: Object
  },
  components: {
    LocationCommentCreate    
  },
 
  // async created(){
  //   const ret = await findSubComment({comment_no});
  //   this.subCommentList = ret.data;
  // },
  data() {  
    return {
      // name: data.User.filter(
      //   item => item.user_no === this.commentObj.user_no
      // )[0].name,
      name: this.$store.state.account.user.username,
      subCommentList: [],
      subCommentCreateToggle: false,
      modifyCreateToggle: false,
      disappear: true,
      context:`${this.commentObj.context}`,
      dbId: `${this.commentObj.user_id}`,
      storeId: `${this.$store.state.account.user.userId}`
    };
  },
  methods: {
    notCorrectMsg(){
       alert('권한이 존재하지 않습니다.')
     },
    // subCommentToggle() {
    //   this.subCommentCreateToggle = !this.subCommentCreateToggle;
    // },
    // async reloadSubComments() {
    //   const ret = await findSubComment({comment_no: this.commentObj.comment_no});
    //   this.subCommentList = ret.data;
    // },
    async deleteCoData(){
      alert('댓글을 삭제합니다');
      await deleteLocationComment({comment_no: this.commentObj.comment_no})
      this.$router.go(this.$router.currentRoute);
    },

     modifyCoData(){
      this.disappear = !this.disappear;
    },

    async modifyCoData2(){
        await modifyLocationComment({
        context: this.context , 
        comment_no: Number(this.commentObj.comment_no)
    }) 
    this.$router.go(this.$router.currentRoute);
    },
    cancleModify(){
      this.$router.go(this.$router.currentRoute);
    }
    //   async deleteScData(){
    //   await deleteSubComment({subcomment_no: this.subcomment_no})
    //   this.$router.push({
    //     path: `/board/free`
    //   })
    // }
  }
};
</script>
<style scoped>
.comment-list-item {
  display: flex;
  justify-content:space-between;
  padding-bottom: 1em;
  
  
}
.comment-list-item-name {
  display: flex;
  flex-direction:column ;
  justify-content: center;
  align-items: center;
  border: 0.5px solid black;
  padding: 1em;
  height: 125px;
  text-align: center;
  width: 130px;
  
}
.comment-list-item-context {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50em;
  border: 0.5px solid black;
  height: 125px;
  
}
.comment-list-item-button {
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.5px solid black;
  padding: 0.5em;
  height: 125px;
  padding-bottom: 1px;
  writing-mode: horizontal-tb;
}
.btn {
  margin-bottom: 1em;
}
.comment-list-item-subcomment-list {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1em;
  margin-left: 10em;
}
.btn1, .btn2 {
  height: 40px;
  font-size: 10px;
  writing-mode: horizontal-tb;

}
</style>