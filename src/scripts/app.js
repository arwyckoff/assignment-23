import $ from 'jquery';
import React from "react";
import ReactDOM from "react-dom"

//

const ProfileList = React.createClass({

  _renderAllCongress: function(data){
    let mapFunc = data.map(function(dataObj){

      return <SingleProfile singleObj={dataObj} />
    })
    return mapFunc
  },

  render: function(){
    console.log(this.props)
    return(

      <div>
        {this._renderAllCongress(this.props.congressAPIProp)}
      </div>
    )
  }
})

const SingleProfile = React.createClass({

render: function(){
  // console.log('waht')
  // console.log(this.props.singleObj, 'single props')

  let congressList = this.props.singleObj
  if(congressList.website === "null"){
    congressList.website = "undefined"
  }
    return (
        <div className="profile">
        <h2>{congressList.first_name} {congressList.last_name}</h2>
        <h1>{congressList.title}--{congressList.party}--{congressList.state}</h1>
        <ul>
        <li>email: {congressList.oc_email}</li>
        <li>website: {congressList.website}</li>
        <li>facebook: {congressList.facebook_id}</li>
        <li>twitter: {congressList.twitter}</li>
        </ul>
        <h4>End of term: {congressList.term_end}</h4>
        </div>
    )


  }

})


$.getJSON("https://congress.api.sunlightfoundation.com/legislators?callback=?").then(function(serverRes){
  ReactDOM.render(<ProfileList congressAPIProp ={serverRes.results}/>,document.querySelector('#app-container'));
})
