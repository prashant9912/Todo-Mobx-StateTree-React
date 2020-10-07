
import React, { Component,useContext } from 'react'
import styled, { css } from "styled-components";

//MobX
import {store} from './store/MobxStateTree'
import { observer } from "mobx-react";
import {values} from 'mobx'



const Bar = styled.div`
width:120%;
background-color:#646464;
height:20px;
position:relative;
left:-10px;
top:-10px;
padding:10px;
color:white;
`



 class Nab extends Component {

    render() {
        const theme = this.context
        console.log(theme)
        console.log('Nav Render')
        return (
            <Bar>
              {store.pendingCount} pending, {store.completedCount} completed
            </Bar>
        )
    }
}
export default observer(Nab)