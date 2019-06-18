<template>
  <div class="signup common-h5-signup">
    <div class="form">
        <div class="item">
          <span class="label">称呼<small>*</small></span>
          <input placeholder="请输入称呼"
          v-model.trim="onlineForm.name"/>
        </div>


        <div class="item">
          <span class="label">电话<small>*</small></span>
          <input placeholder="请输入电话"
          v-model.trim="onlineForm.tel"/>
        </div>


        <div class="item">
          <span class="label">公司<small>*</small></span>
          <input placeholder="请输入公司"
          v-model.trim="onlineForm.comp"/>
        </div>


          <div class="item noborder">
          <span class="label">职位</span>
          <input placeholder="请输入职位"
          v-model.trim="onlineForm.work"/>
          </div>


    </div>

    <div class="mes-box">
      <p>您要咨询的内容</p>
        <textarea
                placeholder="请输入您的问题"
                v-model.trim="onlineForm.message"
                rows="10"
                >
        </textarea>
    </div>

    <span @click="submitForm()" class="btn-sub">提交内容</span>
  </div>
</template>
<script>
import { offlineCourseSignUp } from '@/api/apis';
import { validByPhone } from '@/assets/utils/validator';

export default {
  name: 'signup',
  data() {
    return {
      name: 'signup',
      labelPosition: 'left',
      onlineForm: { // 在线报名表单
        name: '',
        tel: '',
        comp: '',
        work: '',
        message: '',
      },
      courseId: '',
      isCanSub: true,

    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.courseId = this.$route.query.cid;
    },
    submitForm() {
      // 收藏 如果未登录  提示去登陆
      if (!this.token) {
        this.confirmLogin();
        return;
      }
      if (!this.onlineForm.name) {
        this.$message('请输入称呼');
        return;
      }
      if (this.onlineForm.name.length < 2 || this.onlineForm.name.length > 4) {
        this.$message('姓名长度请控制在2~4个字内');
        return;
      }
      if (!this.onlineForm.tel) {
        this.$message('请输入电话');
        return;
      }
      if (!validByPhone(this.onlineForm.tel)) {
        this.$message('电话号码格式不对');
        return;
      }
      if (!this.onlineForm.comp) {
        this.$message('请输入公司');
        return;
      }
      if (this.onlineForm.comp.length > 50) {
        this.$message('公司名称过长，请控制在50字内');
        return;
      }
      if (this.onlineForm.work.length > 10) {
        this.$message('职位名字过长，请控制在10字内');
        return;
      }

      if (this.onlineForm.message
        && (this.onlineForm.message.length < 2
          || this.onlineForm.message.length > 50)) {
        this.$message('咨询内容请控制在2-50字以内');
        return;
      }
      if (this.isCanSub) {
        this.isCanSub = false;
      } else {
        return;
      }
      this.offlineCourseSignUpFn();
    },
    offlineCourseSignUpFn() {
      // 线上课在线报名提交表单
      let params = {
        company: this.onlineForm.comp,
        offlineCourseId: this.courseId,
        name: this.onlineForm.name,
        phone: this.onlineForm.tel,
        job: this.onlineForm.work,
        content: this.onlineForm.message,
      };
      offlineCourseSignUp(params).then((res) => {
        this.isCanSub = true;
        if (res.data.code === '0000') {
          // this.detailData = res.data.data
          this.$router.replace({ path: '/success' });
        } else {
          this.$message('报名失败，请稍后再试');
        }
      }).catch((err) => {
        this.isCanSub = true;
        console.log(err);
        this.$message('报名失败，请稍后再试');
      });
    },
  },
};
</script>
<style>
  .common-h5-signup .el-form-item{
    margin-bottom: 0;
  }
</style>
<style lang="less" scoped>
  .form{
    display: block;
    box-sizing:border-box;
    padding-left: 15px;
    border-bottom: 1px solid #d4d4d4;
    font-size: 14px;
    color: #444444;
    letter-spacing: -0.68px;
    text-align: center;
    line-height: 20px;
  }
  .form .item{
    border-bottom: 1px solid #d4d4d4;
    height: 40px;
    line-height: 40px;
    padding-left: 60px;
    position: relative;
    box-sizing:border-box;
    input{
      height: 32px;
      line-height: 32px;
      width: 100%;
      padding: 0 15px;
      outline:none;
      background:transparent;
      border:none;
      outline:medium;
      &::-webkit-input-placeholder{
        color: rgb(196,196,207);
      }
    }


  }
  .form .item.noborder{
    border-color: #fff;
  }
  .item .label{
    position: absolute;
    left: 0;
    top: 0px;
    height: 20px;
      small{
          color:red;
      }
  }
  .mes-box{
    display: block;
    width: 100%;
    height: 207px;
    text-align: left;
    box-sizing:border-box;
    padding: 30px 15px 15px 15px;
    margin: 10px 0;
    position: relative;
    textarea{
      width: 100%;
      padding: 5px 15px;
      border: 1px solid #C0C4CC;
      border-radius: 4px;
      background-color: #F7F7F7;
      box-sizing: border-box;

      outline:none;
      outline:medium;
      &::-webkit-input-placeholder{
        color: rgb(196,196,207);
      }
    }
  }
  .mes-box p{
    position: absolute;
    top: 0;
    left: 15px;
    font-size: 14px;
  }
</style>
