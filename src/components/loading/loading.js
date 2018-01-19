import React,{Component} from "react";


export default class Loading extends Component{



	render(){

		let style = {
			top : 50+'%',
			position: 'absolute',
			width : 100+'%',
            textAlign : 'center'
		}

		return (<span style={style}><svg className="lds-message" width="30px" height="30px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><g transform="translate(25 50)">
<circle cx="0" cy="0" r="10" fill="#919191" transform="scale(0.999991 0.999991)">
  <animateTransform attributeName="transform" type="scale" begin="-0.3666666666666667s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1.1s" repeatCount="indefinite"></animateTransform>
</circle>
</g><g transform="translate(50 50)">
<circle cx="0" cy="0" r="10" fill="#919191" transform="scale(0.728933 0.728933)">
  <animateTransform attributeName="transform" type="scale" begin="-0.18333333333333335s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1.1s" repeatCount="indefinite"></animateTransform>
</circle>
</g><g transform="translate(75 50)">
<circle cx="0" cy="0" r="10" fill="#919191" transform="scale(0.266673 0.266673)">
  <animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1.1s" repeatCount="indefinite"></animateTransform>
</circle>
</g></svg>
		</span>);

	}



}