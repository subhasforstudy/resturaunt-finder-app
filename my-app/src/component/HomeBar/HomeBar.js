import React ,{Component} from 'react'
import axios from 'axios';
import './HomeBar.css'
import { withRouter } from "react-router-dom";



class HomeBar extends Component{
    constructor(){
        super();
        this.state={
            resturauntlist:[],
            citylist:[]
    
        }
    }

    componentDidMount() {
        axios("http://localhost:8000/citylist").then(res=>
           this.setState({citylist:res.data.data})
        ).catch(err=>console.log(err))


    }
  
    handleLocationChange = (event) => {
        const obj=JSON.parse(event.target.value);
         const area = obj.location_id;
         const city = obj.city_id;
         window.localStorage.setItem('area', area);
         window.localStorage.setItem('city', city);



         axios(`http://localhost:8000/resturauntlist?city=${city}&area=${area}`).then(res=>
         this.setState({resturauntlist:res.data.data})
      ).catch(err=>console.log(err))
 
    }

    checkinglocation=()=>{
        const city=window.localStorage.getItem('city');
        if(city==="null"){
            alert("Please choose your location first")
        }
    }
  
    resturauntSelect=(event)=>{

       
        const obj=JSON.parse(event.target.value);
        this.props.history.push(`/detailsPage/?restaurant=${obj._id}`);
        
    }

       
    
    
    render(){
        const{citylist}=this.state;
        const{resturauntlist}=this.state;
        
        
        return(<div className='Upper-container container-fluid'>
        <div className='logo row'>e!</div>
        <div className='row'><div className='Upper-heading'>Find the best restaurants, cafe's and bars</div></div>

        <div className='row'>
            <div className='col-sm-6 col-md-8'>

            <select className="search-location" onChange={this.handleLocationChange}>
                                <option className="location-label"> Choose Your Location</option>
                                {citylist.map((item) => {
                                    return <option value={JSON.stringify(item)}>{item.name}</option>
                                })}
                            </select>
                         </div>
            <div className='col-sm-6 col-md-4'>
            <select className="search-location" onClick={this.checkinglocation} onChange={this.resturauntSelect}>
            <option className="location-label"> Select Your Restaurant:</option>
                               { resturauntlist.map((item) => {
                                    return <option value={JSON.stringify(item)} >{item.name}</option>
                                })}
                            </select>


            </div>
            </div>



           </div> 
        )
    }
}
export default  withRouter(HomeBar);