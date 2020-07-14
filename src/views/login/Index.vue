<template>
    <section>
        <van-nav-bar
                title="登入系统"
                left-text=""
                @click-left="$router.go(-1)"
                left-arrow
        />
        <bm_login :base-config="myConfig"
                  @parent_login="login"
        >
            <!-----------------------可以自定义内容放在header中(以下为示例)--------------------------->
            <template v-slot:header>
                <div style="display: flex;flex-direction: row;justify-content: space-around;align-items: center">
                    <h2>登入碎碎念系统</h2>
                </div>
            </template>
        </bm_login>
    </section>
</template>

<script>
    import {Toast} from 'vant';

    export default {
        name: "Index",
        data() {
            return {
                myConfig: {
                    forgetPwd_register_protocol: true,
                    //为false时，下面三项设置为true无效
                    forgetPassword: false,
                    register: false,
                    protocol: true,
                    quickLogin: false,
                    otherLoginWays: false
                }
            }
        },
        methods: {
            login(input_info) {
                //登录
                this.service.login(input_info.username, input_info.password).then(res => {
                    if (res.code === 1) {
                        Toast.success("登入成功！")
                        this.$router.push("/")
                    } else {
                        Toast.fail("登入失败,用户名或密码错误！")
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
