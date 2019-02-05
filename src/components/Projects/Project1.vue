<template>
    <div class="project1">
        <b-navbar :style="{ backgroundColor: '#dbdbdb', top: '-5px'}">
            <b-navbar-brand>
                <img src="../../img/starbreaklogo.png" class="d-inline-block align-top logo">
            </b-navbar-brand>
            <h4>Project 1</h4>
        </b-navbar>
        <div :style="{marginTop: '40px'}" class="project1-chart"></div>
    </div>
</template>

<script>
import * as d3 from 'd3'

export default {
    methods: {
        createChart(){
            d3.json('/data/revenues.json').then(data => {
                var months = []
                data.forEach(d => {
                    months.push(d.month)
                    d.revenue = +d.revenue
                })
                const picWidth = 550, picHeight = 350
                const margin = {top: 10, right: 10, bottom: 100, left: 100}
                const width = picWidth - margin.left - margin.right
                const height = picHeight - margin.top - margin.bottom
                const g = d3.select('.project1-chart').append('svg')
                    .attr('width', picWidth)
                    .attr('height', picHeight)
                    .append('g')
                    .attr('transform', `translate(${margin.left}, ${margin.top})`)
                
                const x = d3.scaleBand()
                    .domain(months)
                    .range([0, width])
                const y = d3.scaleLinear()
                    .domain([0, d3.max(data, d => {
                        return d.revenue
                    })])
                    .range([height, 0])
                g.selectAll('rect').data(data).enter()
                    .append('rect')
                    .attr('x', d => {
                        return x(d.month) + 5
                    })
                    .attr('y', d => {
                        return y(d.revenue)
                    })
                    .attr('width', 50)
                    .attr('height', d => {
                        return height - y(d.revenue)
                    })
                    .attr('fill', 'grey')

                const xAixsCall = d3.axisBottom(x)
                g.append('g').call(xAixsCall)
                    .attr('transform', `translate(0,${height})`)               
                const yAxisCall = d3.axisLeft(y)
                    .tickFormat(num => {
                        return '$' + num
                    })
                g.append('g').call(yAxisCall)
                g.append('text').text('Month')
                    // .attr({
                    //     'text-anchor': 'middle',
                    //     'transform': `translate(${width / 2}, ${height})`
                    // })
                    .attr('text-anchor', 'middle')
                    .attr('transform', `translate(${width / 2 }, ${height + 50})`)
                    .attr('font-size', '25px')
                g.append('text').text('Revenue')
                    .attr('font-size', '25px')
                    .attr('text-anchor', 'middle')
                    .attr('transform', 'rotate(-90)')
                    .attr('x', `${- height / 2}`)
                    .attr('y', `${- 60}`)
                    

            }).catch(e => {
                console.log(e)
            })
        }
    },
    created(){
        this.createChart()
    }
}
</script>

<style lang="stylus">
@import '../../style/section.styl'
.logo
    width 70px
    height 50px
h4
    position absolute
    transform translate(70px, 2px)
</style>