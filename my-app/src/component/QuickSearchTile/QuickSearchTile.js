import React, {Component} from 'react';
import './QuickSearchTile.css';
import { withRouter } from 'react-router-dom';


class QuickSearchTile extends Component {


    handleClick=(id,heading)=>{
        const city=window.localStorage.getItem('city');
        const area=window.localStorage.getItem('area');
        const meal=id;
        const meal_name=heading;
        const sort=1;
        const cuisine=null;
        const cost1=null;
        const cost2=null;

          this.props.history.push(`/searchPage?location_id=${area}&city_id=${city}&meal=${meal}&meal_name=${meal_name}&sort=${sort}&cuisine=${cuisine}&cost1=${cost1}&cost2=${cost2}`)
      
    
    }

    render() {
        const {id, banner, heading, content}=this.props;
        return <div id={id}  onClick={()=>this.handleClick(id,heading)}>
          <div className="container-fluid quick-search-tile-container">
          <div className='col-sm-6'>
                <img src={banner} ></img>
            </div>
            <div  className='col-sm-6'>
                  <div className="Breakfast"> {heading}</div>
                  <div className='contentLetter'>{content}</div>
            </div>
          </div>
        
        </div>
    }
}

export default withRouter(QuickSearchTile);
