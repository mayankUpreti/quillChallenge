import  React from 'react'

import {Line} from 'react-chartjs-2'

const Chart=({data})=>{

 return(
        <div className='chart'>
            <Line
            data={data}
          
            options={{ 
                title:{
                    display:true,
                    text:'Best Bid for ETH-USD',
                   fontSize:25
                },
                legend:{
                    display:true,
                    position:'right'
                },
                tooltips:{
                    enabled:true
                }
             }}
            />
        </div>
    )

}

export default Chart