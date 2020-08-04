import React ,{Component} from 'react'
import HomeBar from '../../component/HomeBar/HomeBar';
import QuickSearch from '../../component/QuickSearchBar/QuickSearch';




class Home  extends Component{



      componentDidMount() {
        window.localStorage.setItem("area", null);
        window.localStorage.setItem("city", null);
                        }
         
    
    render(){
        return(
          <div >
            <HomeBar  />
            <QuickSearch  />
          </div>
        )
    }
}
export default Home;