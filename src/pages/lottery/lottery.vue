<template>
    <div>
        <table>
            <tr>
                <td :class="{active:index==1}"></td>
                <td :class="{active:index==2}"></td>
                <td :class="{active:index==3}"></td>
            </tr>
            <tr>
                <td :class="{active:index==8}"></td>
                <td class="btn" @click="draw"></td>
                <td :class="{active:index==4}"></td>
            </tr>
            <tr>
                <td :class="{active:index==7}"></td>
                <td :class="{active:index==6}"></td>
                <td :class="{active:index==5}"></td>
            </tr>
        </table>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            index: -1,
            prize: 6,
            speed: 50,
            cycle: 80,
            times: 0,
            click: true
        }
    },
    computed: {
        ...mapGetters({
            turn: 'getLotteryStatus',

        })
    },
    mounted() {
    },
    methods: {
        draw() {
            if (!this.turn) {
                return;
            } else {
                this.$store.dispatch('SET_LOTTERY_STATUS', false);
                this.$_api.post({
                    ext: 'http://haokur.com/cross/test',
                    data: '8',
                    code: 2
                })
                    .then(res => {
                        this.prize = res.data;
                    })
                    .catch(err => {
                        console.log('请求错误')
                        throw '错误'
                    })
                    .finally(() => {
                        // console.log('请求完成')
                        // this.$_showtip('请求完成')
                    })
                this.roll();

            }
        },
        roll() {
            setTimeout(() => {
                this.times++;
                if (this.times > this.cycle + 8 && this.prize == this.index) {
                    this.$store.dispatch('SET_LOTTERY_STATUS', true);
                    alert('你中奖啦');
                    this.times = 0;
                    this.speed = 50;
                    return;
                } else if (this.times == this.cycle) {
                    this.speed += 100;
                } else if (this.times > 120) {
                    this.index = -1;
                    this.times = 0;
                    this.speed = 50;
                    alert('网络异常请稍候再试');
                    this.$store.dispatch('SET_LOTTERY_STATUS',true)
                    return;
                }
                this.luck();
                this.roll()
            }, this.speed);

        },
        luck() {
            this.index++;
            if (this.index > 8) {
                this.index = 1;
            }
        }
    }
}
</script>
<style src="./lottery.scss" lang="scss" scoped="scoped">

</style>


