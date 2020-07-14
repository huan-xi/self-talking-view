<template>
    <section>
        <div style="text-align: center;background-color: white">
            <img style="height: 60px;" src="logo.png">
        </div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="container">
            <div class="card">
                <img class="card-img" src="https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20191212124903.png">
                <div style="text-align: center;padding-bottom: 18px;">
                    <h2 class="title">碎碎念</h2>
                    <span>系统已发 <span style="color: #6190e8">{{dataList.length}}</span> 条碎碎念</span>
                    <div class="login">
                        <van-button v-if="!isLogin" round size="small" style="width: 80%;" type="info"
                                    @click="$router.push('/login')">
                            登入系统
                        </van-button>
                        <van-button v-else round size="small" style="width: 80%;" type="danger" @click="logout">
                            退出系统
                        </van-button>
                    </div>
                </div>

            </div>
            <div v-for=" item in dataList" @click="itemClick(item)" :key="item.id" class="card msgs">

                <div class="msg">
                    <div class="msg-header">
                        <span>{{formatTime(item.time)}}</span>
                        <!--                        <span>2020年04月13日17时44分</span>-->
                    </div>
                    <div>
                        <span>{{item.content}}</span>
                    </div>
                </div>
            </div>


        </div>
        </van-pull-refresh>
        <van-action-sheet
                v-model="show"
                :actions="actions"
                @select="onSelect"
                cancel-text="取消"
                description="修改碎碎念"
        />

        <div class="add">
            <van-button icon="plus" plain round type="primary" @click="addClick"></van-button>
        </div>

        <van-dialog v-model="showDialog"
                    :confirmButtonText="confirmText"
                    title="操作碎碎念"
                    @confirm="add"
                    show-cancel-button>
            <van-field
                    v-model="message"
                    autosize
                    rows="2"
                    show-word-limit
                    maxlength="50"
                    type="textarea"
                    placeholder="请输入内容"
            />
        </van-dialog>
    </section>
</template>

<script>
    import moment from 'moment';
    import {Toast} from 'vant';

    export default {
        name: "Index",
        data() {
            return {
                cItem: {},
                isLoading: false,
                dataList: [],
                message: '',
                show: false,
                showDialog: false,
                isLogin: true,
                isUpdate: false,
                actions: [
                    {name: '修改碎碎念'},
                    {name: '删除碎碎念', color: '#ff0000'}
                ]
            };
        },
        methods: {
            onRefresh(){
                this.message = '';
                this.service.getMessageList({}).then(res => {
                    this.dataList = res.msg
                    this.isLoading = false;
                    Toast.success("刷新成功")
                })

            },
            getInfo() {
                this.service.info().then(res => {
                    this.isLogin = (res.code === 1)
                });
            },
            addClick() {
                if (!this.isLogin) {
                    Toast.fail("请先登入系统");
                    return
                }
                this.showDialog = true;
                this.isUpdate = false
            },
            onSelect(item) {
                this.show = false;
                if (!this.isLogin) {
                    Toast.fail("请登入系统");
                    return;
                }

                if (item.name === '修改碎碎念') {
                    this.message = this.cItem.content;
                    this.showDialog = true;
                    //更新
                } else if (item.name === '删除碎碎念') {
                    this.service.deleteMessage(this.cItem.id).then(() => {
                        Toast.success("删除成功")
                        this.refresh();
                    });
                }

            },
            itemClick(item) {
                this.show = true
                this.cItem = item
                this.isUpdate = true
            },

            refresh() {
                this.message = '';
                this.service.getMessageList({}).then(res => {
                    this.dataList = res.msg
                })
            },
            logout() {
                this.$dialog.confirm({
                    title: '温馨提示',
                    message: '是否退出',
                    confirmButtonColor: "red"
                }).then(() => {
                    this.service.logout().then(() => {
                        Toast.success("退出成功");
                        this.getInfo()
                    })
                });
            },
            formatTime(time) {
                return moment(time).locale('zh-cn').format('LLL');
            },
            add() {
                if (!this.message || this.message.length === 0) {
                    Toast.fail('请输入内容');
                    return
                }
                if (!this.isUpdate) {
                    this.service.addMessage(this.message).then(() => {
                        this.refresh();
                        Toast.success('添加成功');
                    });
                } else {
                    this.service.updateMessage(this.cItem.id, this.message).then(() => {
                        this.refresh();
                        Toast.success('修改成功');
                    });
                }
            }
        },

        created() {
            this.refresh()
            this.getInfo()
        },
        computed: {
            confirmText() {
                return this.isUpdate ? "确定修改" : "确定添加";
            }
        }
    }
</script>

<style scoped>

    .add {
        position: fixed;
        bottom: 80px;
        right: 30px;
    }

    .msg-header {
        font-size: 0.875em;
        position: relative;
        display: inline-block;
        left: -5%;
        margin-bottom: 10px;
        padding: 0 10% 0 32px;
        height: 32px;
        line-height: 32px;
        border-radius: 0 3px 3px 0;
        background-color: #deeafb;
    }

    .msg {
        background-color: #f6f9fe;
        padding: 0.75em 1em;
        border: 0.01em solid #deeafb;
    }

    .msgs {
        margin-top: 10px;
        padding: 10px 10px;
    }

    .login {
        margin-top: 10px;
    }

    .title {
        font-size: 2em;
        color: rgba(50, 115, 220, 0.659);
    }

    .container {
        padding: 10px 10px;
    }

    @media screen and (max-width: 1087px) and (min-width: 769px) {
        .card {
            margin-top: 4rem;
        }
    }

    .card {
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05), 0 0 1px rgba(0, 0, 0, 0.1);
        color: #4a4a4a;
        max-width: 100%;
        position: relative;
    }

    .card .card-img {
        height: 200px;
        width: 100%;

        display: block;
        position: relative;
        overflow: hidden;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }
</style>
