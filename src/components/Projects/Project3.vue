<template>
    <div class="project3">
        <b-navbar :style="{ backgroundColor: '#dbdbdb', top: '-5px'}">
            <b-navbar-brand>
                <img src="../../img/coinslogo.png" class="d-inline-block align-top logo">
            </b-navbar-brand>
            <h4>Project 3</h4>
        </b-navbar>
        <div class="row">
            <div class="col-md-4">
                <select class="custom-select" v-model="coinTypeInput">
                    <option value="default" selected>Choose...</option>
                    <option v-for="ct in coinType" selected>Choose...</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
import * as d3 from 'd3'
import "d3-selection-multi"
import d3Tip from 'd3-tip'
d3.tip = d3Tip

export default {
    data(){
        return {
            p3Data: undefined,
            chart: {
                width: undefined,
                height: undefined,
                g: undefined,
                x: undefined,
                y: undefined,
                margin: {top: 10, left: 100, bottom: 100, right: 10}
            },
            coinType: [],
            coinTypeInput: 'bitcoin',
            numType: [],
            numTypeInput: '24h_vol'
        }
    },
    methods: {
        readData(){
            d3.json('/data/coin.json').then(data => {
                //clone data obj
                this.p3Data = JSON.parse(JSON.stringify(data))

                //get coin and num type
                for(let key in this.p3Data){
                    this.coinType.push(key)
                }
                for(let key in this.p3Data['bitcoin']){
                    if(key !== 'date'){
                        this.numType.push(key)
                    }
                }

            }).catch(e => {
                console.log(e)
            })
        }
    },
    created(){
        this.readData()
    }
}
</script>

<style lang="stylus" scoped>
@import '../../style/section.styl'
.logo
    width 60px
</style>