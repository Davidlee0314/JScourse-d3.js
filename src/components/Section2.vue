<template>
    <div class="section2">
        <h3>Section 2</h3>
        <div id="chart211">
            <h5>- Initiate svg canvas and draw a shape</h5>
            <svg id="chart211-1" width="400" height="60"></svg>
            <svg id="chart211-2" width="400" height="60"></svg>
        </div>
        <div id="chart213">
            <h5>- Drawing with self-defined data</h5>
        </div>
        <div id="chart214">
            <h5>- Drawing with file data</h5>
        </div>
    </div>
</template>

<script>
import * as d3 from 'd3'

export default{
    data(){
        return {

        }
    },
    methods: {
        createSvg(){
            //2-11
            d3.select('#chart211-1')
               .append('rect')
                    .attr('x', 25)
                    .attr('y', 0)
                    .attr('width', 150)
                    .attr('height', 60)
                    .attr('fill', 'blue')
            d3.select('#chart211-2')
               .append('circle')
                    .attr('cx', 25)
                    .attr('cy', 20)
                    .attr('r', 20)
                    .attr('fill', 'red')

            //2-13
            var data213 = [25, 20, 10, 12, 15]
            var svg213 = d3.select('#chart213').append('svg')
                .attr('width', 400)
                .attr('height', 60)
            var circles213 = svg213.selectAll('circle').data(data213)
            circles213.enter().append('circle')
                .attr('cx', (d, i) => {
                    return i * 50 + + 25
                })
                .attr('cy', 25)
                .attr('r', d => {
                    return d
                })
                .attr('fill', 'blue')

            //2-14
            d3.csv('/data/ages.csv').then(data => {
                data.forEach(el => {
                    el.age = +el.age
                })
                console.log(data)
                
                var svg214 = d3.select('#chart214').append('svg')
                    .attr('width', 400)
                    .attr('height', 60)
                var circles214 = svg214.selectAll('circle').data(data)
                circles214.enter().append('circle')
                    .attr('cx', (d, i) => {
                        return i * 50 + + 25
                    })
                    .attr('cy', 25)
                    .attr('r', d => {
                        return d.age
                    })
                    .attr('fill', d => {
                        return (d.name === 'Tom') ? 'red' : 'blue'
                    })
            })
        }
    },
    mounted(){
        this.createSvg()
    }
}

</script>
<style lang="stylus">
h3
    margin 90px 0px 20px 0px  
h5
    text-align left
    padding 20px 0px 10px 20px
</style>