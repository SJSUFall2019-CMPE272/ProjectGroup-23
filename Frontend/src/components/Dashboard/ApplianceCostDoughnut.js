import React from 'react';
import {Doughnut} from 'react-chartjs-2';

class ApplianceCostDoughNut extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            data:{}
        }
    }
    componentWillMount()
    {
        //let scheduleInfo=JSON.parse(localStorage.getItem('scheduleInfo'))
        console.log('Will Mount ApplianceCostDoughnut',this.props.scheduleInfo)
        let appInfo=this.props.scheduleInfo['appliance info']
        let appNames=[],appCosts=[],bc=[]
        for(let appliance in appInfo)
        {
            appNames.push(appliance)
            appCosts.push(appInfo[appliance]['Cost Incurred'])
            let c= "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
            bc.push(c)
        }
        this.setState({
            data:{
                labels:appNames,
                datasets:[{
                    data:appCosts,
                    backgroundColor:bc,
                    hoverBackgroundColor:bc
                }]
            }
        })
    }
    render(){
        return(
            <div>
                <h2>Appliance Cost Distribution</h2>
                <Doughnut data={this.state.data} 
                        width={100}
                        height={20}
                        options={{ maintainAspectRatio: true }}
                />
            </div>
        )
    }
}

export default ApplianceCostDoughNut