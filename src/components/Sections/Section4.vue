<template>
    <div class="section4">
        <h3>Section 4</h3>
        <div class="442">
            <h5>- Practicing d3 update data</h5>
            <div class="chart442"></div>
            <h5>Enter New Data</h5>
            <div class="input-group ml-5 mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Month</span>
                </div>
                <select class="custom-select" v-model="monthInput">
                    <option value="default" selected>Choose...</option>
                    <option v-for="(val, index) in monthPreset" :key="index" :value="monthPreset[index]">{{ monthPreset[index] }}</option>
                </select>
            </div>
            <div class="input-group ml-5">
                <div class="input-group-prepend">
                    <span class="input-group-text">Revenue</span>
                </div>
                <input @keyup.enter="addData" v-model="revenueInput" type="text" class="form-control" placeholder="Enter number...">
            </div>
            <button @click="addData" class="btn btn-danger">Add</button>
            <button @click="readData('update')" class="btn btn-info">Reset</button>
        </div>
        <div class="row">
            <div class="col-6">
                <div class="data">
                    <div class="dataIndividual" v-for="(obj, key) in revenueData" :key="key">
                        <p><b>{{ obj.month }}</b></p>
                        <p class="money">${{ numFormat(obj.revenue) }}</p>
                    </div>
                </div>
            </div>
            <div id="chart442" class="col-6"></div>
        </div>
    </div>
</template>

<script>
import * as d3 from 'd3'

export default {
    data(){
        return{
            revenueData: undefined,
            months: [],
            monthPreset: ["January","February","March","April","May","June","July",
            "August","September","October","November","December"],
            monthInput: '',
            revenueInput: '',
            chart: {
                g: undefined,
                width: undefined,
                height: undefined,
                x: undefined, 
                y: undefined,
                margin: {
                    top: 10, left: 70, bottom: 50, right: 10
                }
            }
        }
    },
    methods: {
        numFormat(num){
            let str = num.toString(),
                loop = Math.floor(str.length / 3),
                end = str.length
            for(var i = 1; i <= loop; i++){
                let index = end - 3 * i
                str = str.slice(0, index) + ',' + str.slice(index, end + i - 1)
            }
            return str
        },
        addData(){
            if(isNaN(parseInt(this.revenueInput))){
                alert('Enter valid number')
            }else{
                let haveMonth = false
                this.revenueData.forEach(el => {
                    if(el.month === this.monthInput){
                        el.revenue = parseInt(this.revenueInput)
                        haveMonth = true
                    }
                })
                if(!haveMonth){
                    var tmp = {}
                    tmp['month'] = this.monthInput
                    tmp['revenue'] = parseInt(this.revenueInput)
                    this.revenueData.push(tmp)
                    
                    var vm = this
                    this.revenueData.sort((a, b)=> {
                        let aIndex = 0, bIndex = 0
                        vm.monthPreset.forEach((el , i) => {
                            if(el === a.month){
                                aIndex = i
                            }else if(el === b.month){
                                bIndex = i
                            }
                        })
                        return aIndex - bIndex  
                    })
                }
                this.revenueInput = ''
                this.monthInput = 'default'
            }
            this.drawSVG('update')
        },
        readData(type){
            d3.json('/data/revenues.json').then(data => {
                this.months.length = 0
                data.forEach(d => {
                    d.revenue = +d.revenue
                    this.months.push(d.month)
                })
                this.revenueData = JSON.parse(JSON.stringify(data))
                if(type === 'create'){
                    this.initSVG()
                }else{
                    d3.selectAll('rect').remove()
                }
                this.drawSVG(type)
            }).catch(e => {
                console.log(e)
            })
        },
        drawSVG(type){
            if(type === 'create'){         
                this.chart.x = d3.scaleBand()
                    .domain(this.revenueData.map(el => { return el.month }))
                    .range([0, this.chart.width])
                this.chart.y = d3.scaleLinear()
                    .domain([0, d3.max(this.revenueData, el => { return el.revenue })])
                    .range([this.chart.height, 0])
                this.chart.g.selectAll('rect').data(this.revenueData).enter()
                    .append('rect')
                    .attr('x', d => { return this.chart.x(d.month) + this.chart.x.bandwidth() / 2 - 12.5})
                    .attr('y', d => { return this.chart.y(d.revenue) })
                    .attr('fill', 'orange')
                    .attr('width', 25)
                    .attr('height', d => { return this.chart.height - this.chart.y(d.revenue) })
                this.axisSVG()
                this.chart.g.append('text').text('Revenue')
                    .attr('transform', 'rotate(-90)')
                    .attr('text-anchor', 'middle')
                    .attr('x', - ( this.chart.height / 2 ))
                    .attr('y', - 50)
                this.chart.g.append('text').text('Month')
                    .attr('transform', `translate(${this.chart.width / 2}, ${this.chart.height + 35})`)
                    .attr('text-anchor', 'middle')
            }else if(type === 'update'){
                this.chart.x.domain(this.revenueData.map(el => { return el.month }))
                this.chart.y.domain([0, d3.max(this.revenueData, el => { return el.revenue })])
                d3.selectAll('.axis').remove()
                this.axisSVG()

                var t = d3.transition().duration(500)

                //Join new data
                var rects = this.chart.g.selectAll('rect').data(this.revenueData)

                //Delete data
                this.chart.g.exit().remove()

                //Updata data
                rects.attr('fill', 'orange')
                    .attr('width', 25)
                    .transition(t)
                        .attr('x', d => { return this.chart.x(d.month)  + this.chart.x.bandwidth() / 2 - 12.5})
                        .attr('y', d => { return this.chart.y(d.revenue) })
                        .attr('height', d => { return this.chart.height - this.chart.y(d.revenue) })
                
                //New data added
                rects.enter().append('rect')
                    .attr('x', d => { return this.chart.x(d.month)  + this.chart.x.bandwidth() / 2 - 12.5 })
                    .attr('fill', 'orange')
                    .attr('width', 25)
                    .attr('y', this.chart.height)
                    .transition(t)
                        .attr('y', d => { return this.chart.y(d.revenue) })
                        .attr('height', d => { return this.chart.height - this.chart.y(d.revenue) })

            }
        },
        axisSVG(){
            let xAxisCall = d3.axisBottom(this.chart.x)
            let yAxisCall = d3.axisLeft(this.chart.y)
            this.chart.g.append('g').call(xAxisCall)
                .attr('transform', `translate(0,${this.chart.height})`)
                .attr('class', 'axis')
            this.chart.g.append('g').call(yAxisCall)
                .attr('class', 'axis')
        },
        initSVG(){
            const CHART_WIDTH = 500,
                CHART_HEIGHT = 300
            this.chart.g = d3.select('#chart442').append('svg')
                .attr('width', CHART_WIDTH)
                .attr('height', CHART_HEIGHT)
                .append('g')
                .attr('transform', `translate(${this.chart.margin.left}, ${this.chart.margin.top})`)
            this.chart.width = CHART_WIDTH - this.chart.margin.right - this.chart.margin.left
            this.chart.height = CHART_HEIGHT - this.chart.margin.top - this.chart.margin.bottom
        }
    },
    created(){
        this.readData('create')    
    }
}
</script>

<style lang="stylus" scoped>
@import '../../style/section.styl'
.input-group
    width 80%
.btn-danger, .btn-info
    margin 10px
.row  
    width 100%
.col-6
    padding 15px 15px 15px 25px
.data 
    border 3px dashed black
.dataIndividual
    background-color #efefef
    border-radius 10px
    display inline-block 
    width 30%
    padding 15px 10px 
    margin 5px 
    p 
        display inline-block
        margin 3px
        font-size 13px
    .money
        color #fc5353 
</style>
