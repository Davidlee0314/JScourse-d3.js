<template>
    <div class="section3">
        <h3>Section 3</h3>
        <h5>- Practice scaleLinear funciton and scaleBand</h5>
        <div id="chart318"></div>
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

            //3-19
        }
    },
    created(){
        this.createSVG()
    }
}
</script>

<style lang="stylus">
@import '../style/section.styl'

</style>