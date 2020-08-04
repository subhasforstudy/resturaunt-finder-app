import React ,{Component} from 'react'
import QuickSearchTile from '../QuickSearchTile/QuickSearchTile';
import './QuickSearch.css'
import axios from 'axios';


class QuickSearch extends Component{
    constructor(){
        super();
        this.state = {
            mealtype: []
        }
    }
    componentDidMount(){

        
        axios("http://localhost:8000/mealtype").then(res=>
        this.setState({mealtype:res.data.data})
     ).catch(err=>console.log(err))

    }
    
    render(){
      
        return<div className="container-fluid quick-search-container">
               <div className="quick-search-heading  row">Quick Searches</div>
               <div className="quick-search-subheading row">Discover restaurants by type of meal</div>
               <div className="row">
               {this.state.mealtype.map((item)=>{ 
                   return<div className="col-sm-4">
                       <QuickSearchTile id={item.mealtype} heading={item.name} banner={item.banner} content={item.content} />
                       </div>
               })}
               </div>
         
        </div>
    }
}
export default QuickSearch;