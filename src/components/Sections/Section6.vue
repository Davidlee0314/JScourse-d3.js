<template>
    <div class="section6">
        <h3>Section 6</h3>
        <h5>- Practice adding tooltip </h5>
        <div class="chart652"></div>
    </div>
</template>

<script>
import * as d3 from 'd3'
import "d3-selection-multi"
import d3Tip from 'd3-tip'
d3.tip = d3Tip

export default {
    data(){
        return{
            project2data: undefined,
            chart: {
                width: undefined,
                height: undefined,
                g: undefined,
                x: undefined,
                y: undefined,
                r: undefined,
                margin: {top: 10, left: 100, bottom: 100, right: 10}
            }
        }
    },
    methods: {
        drawChart(i){
            //filter the data 
            var tmp = this.project2data[i].countries.filter(el => {
                return el.income !== null && el.population !== null && el.population !== '0' && el.life_exp !== null
            })
            //add the axis text
            this.chart.g.append('text').text('GDP Per Capita')
                .attrs({
                    transform: `translate(${this.chart.width / 2 - 20},${this.chart.height + 10})`,
                    'text-anchor': 'middle',
                    'font-size': '25px'
                })
            this.chart.g.append('text').text('Life Expectancy (Years)')
                .attrs({
                    transform: 'rotate(-90)',
                    x: - this.chart.height / 2 + 50,
                    'text-anchor': 'middle',
                    'font-size': '25px',
                    y: -50
                })
            //tooltip
            var tip = d3.tip()
                .attr('class', 'tooltip')
                .style('background', 'rgba(10,10,10,0.8)')
                .style('border-radius', '10px')
                .style('padding', '10px')
                .html(d => {
                    return `<strong style="color:white">Country:  </strong><span style="color:red; font-weight:bold">${d.country}</span><br>
                            <strong style="color:white">Continent:  </strong><span style="color:red; font-weight:bold">${d.continent}</span><br>
                            <strong style="color:white">Life Expectancy:  </strong><span style="color:red; font-weight:bold">${d.life_exp}</span><br>
                            <strong style="color:white">GDP Per Capita:  </strong><span style="color:red; font-weight:bold">${d.income}</span><br>
                            <strong style="color:white">Population:  </strong><span style="color:red; font-weight:bold">${d.population}</span><br>`
                })
            this.chart.g.call(tip)

            //draw the chart's circles
            var color = {
                            asia: '#66c2a5',
                            europe: '#fc8d62',
                            americas: '#8da0cb',
                            africa: '#e78ac3'
                        }
            this.chart.x = d3.scaleLog()
                .domain([300, d3.max(tmp, d => d.income)])
                .range([0, this.chart.width - 50])
            this.chart.y = d3.scaleLinear()
                .domain([20, d3.max(tmp, d => d.life_exp)])
                .range([this.chart.height - 50, 0])
            this.chart.r = d3.scaleLinear(d3.min(this.project2data[i].countries, d => d.population))
                .domain([d3.min(tmp, d => d.population ), 
                    d3.max(tmp, d => d.population)])
                .range([10, 20])
            this.chart.g.selectAll('circle').data(tmp).enter()
                .append('circle')
                .on("mouseover", tip.show)
                .on("mouseout", tip.hide)
                .attrs({
                    'cx': d => this.chart.x(d.income),
                    'cy': d => this.chart.y(d.life_exp),
                    'r': d => {
                        if(d.income === null || d.life_exp === null){
                            return 0
                        }else{
                            return this.chart.r(d.population)
                        }},
                    'fill': d => {
                        return color[d.continent]
                    }
                })

            //draw the axes
            let xAxiscall = d3.axisBottom(this.chart.x)
                .ticks(3)
                .tickValues([400, 4000, 40000])
                .tickFormat(el => '$' + el)
            let yAxiscall = d3.axisLeft(this.chart.y)
                .tickValues([10, 20, 30, 40, 50, 60, 70, 80, 90])
            
            this.chart.g.append('g').call(xAxiscall)
                .attrs({
                    transform: `translate(0,${this.chart.height - 50})`,
                    'font-size': '15px'
                })
            this.chart.g.append('g').call(yAxiscall)
                .attrs({
                    'font-size': '15px'
                })

            //add the legend
            let continent = ['europe', 'asia', 'africa', 'americas'],
                legend = this.chart.g.append('g')
                    .attr('transform', `translate(${this.chart.width - 130}, ${this.chart.height - 220})`)
            continent.forEach((el, i) => {
                legend.append('g')
                    .attrs({
                        transform: `translate(0,${i * 20})`,
                        'font-size': '20px',
                        fill: '#777777'
                    })
                    .append('text').text(el)
                    .style('text-transform', 'capitalize')
                legend.append('rect')
                    .attrs({
                        width: 15,
                        height: 15,
                        fill: color[el],
                        transform: `translate(-20,${i * 20 - 15})`
                    })  
            })
            this.chart.g.append('text').text(this.project2data[i].year)
                .attrs({
                    transform: `translate(${this.chart.width - 170},${this.chart.height - 80})`,
                    'font-size': '60px',
                    fill: '#aeaeaf',
                    class: 'year'
                })
        },
        readData(){
            d3.json('/data/project2data.json').then(data => {
                this.project2data = JSON.parse(JSON.stringify(data))
                this.createSVG()
                this.drawChart(0)
            }).catch(e => {
                console.log(e)
            })
        },
        createSVG(){
            this.chart.width = 800 - this.chart.margin.left - this.chart.margin.right
            this.chart.height = 600 - this.chart.margin.top - this.chart.margin.bottom
            this.chart.g = d3.select('.chart652').append('svg')
                .attrs({
                    'width': 800,
                    'height': 600
                })
                .append('g')
                .attrs({
                    'transform': `translate(${this.chart.margin.left},${this.chart.margin.top})`,
                })
        },
    },
    created(){
        this.readData()
    }  
}
</script>

<style lang="stylus" scoped>
@import '../../style/section.styl'
</style>