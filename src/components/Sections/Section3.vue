<template>
    <div class="section3">
        <h3>Section 3</h3>
        <div id="chart318">
            <h5>- Practice scaleLinear funciton and scaleBand</h5>
        </div>
        <div id="chart324">
            <h5>- Grouping, Margin, and Adding axes</h5>
        </div>
    </div>
</template>

<script>
import * as d3 from 'd3'

export default {
    methods: {
        createSVG(){

            //3-18
            d3.json('/data/buildings.json').then(data => {
                var svg318 = d3.select('#chart318').append('svg')
                    .attr('width', 400)
                    .attr('height', 400)

                var names318 = data.map(el => {
                    return el.name
                })

                data.forEach(el => {
                    el.height = +el.height
                })
                
                var x318 = d3.scaleBand()
                    .domain(names318)
                    .range([0, 400])
                    .paddingInner(0.1)
                    .paddingOuter(2)

                var y318 = d3.scaleLinear()
                    .domain([0, d3.max(data, d => {
                        return d.height
                    })])
                    .range([0, 300])
                svg318.selectAll('rect')
                    .data(data).enter()
                    .append('rect')
                    .attr('x', d => {
                        return x318(d.name)
                    })
                    .attr('y', 0)
                    .attr('width', 25)
                    .attr('height', d => {
                        return y318(d.height)
                    })
                    .attr('fill', 'grey')
            }).catch(e => {
                console.log(e)
            })

            //3-24
            d3.json('/data/buildings.json').then(data => {
                data.forEach(d => {
                    d.height = +d.height
                })
                const names324 = data.map(d => {
                    return d.name
                })
                const margin324 = { left: 100, top: 10, right: 10, bottom: 100}
                const width324 = 400 - margin324.left - margin324.right
                const height324 = 400 - margin324.top - margin324.bottom
                const g324 = d3.select('#chart324').append('svg')
                    .attr('width', 400)
                    .attr('height', 450)
                    .append('g')
                    .attr('transform', `translate(${margin324.left}, ${margin324.top})`)
                const x324 = d3.scaleBand()
                    .domain(names324)
                    .range([0, width324])
                const y324 = d3.scaleLinear()
                    .domain([0, d3.max(data, d => {
                        return d.height
                    })])
                    .range([height324, 0])
                g324.selectAll('rect').data(data).enter()
                    .append('rect')
                    .attr('x', d => {
                        return x324(d.name)
                    })
                    .attr('y', d => {
                        return y324(d.height)
                    })
                    .attr('height', d => {
                        return height324 - y324(d.height)
                    })
                    .attr('fill', 'pink')
                    .attr('width', 25)
                    .attr('transform', 'translate(15, 0)')

                const xAxisCall = d3.axisBottom(x324)
                g324.append('g')
                    .attr('transform', `translate(0, ${height324})`)
                    .call(xAxisCall)
                    .selectAll('text')
                        .attr('transform', 'rotate(-40)')
                        .attr('y', 10)
                        .attr('x', -5)
                        .attr('text-anchor', 'end')
                const yAxisCall = d3.axisLeft(y324)
                    .ticks(8)
                    .tickFormat(el => {
                        return el + 'm'
                    })
                g324.append('g')
                    .call(yAxisCall)

                //labels
                g324.append('text')
                    .attr('x', width324 / 2)
                    .attr('y', height324 + 120)
                    .attr('text-anchor', 'middle')
                    .text('The world\'s tallest buildings')
                g324.append('text')
                    .attr('x', - (height324 / 2))
                    .attr('y', -60)
                    .attr('transform', 'rotate(-90)') 
                    .attr('text-anchor', 'middle')
                    .text('Height (m)')               
            }).catch(e => {
                console.log(e)
            })
        }
    },
    created(){
        this.createSVG()
    }
}
</script>

<style lang="stylus">
@import '../../style/section.styl'

</style>