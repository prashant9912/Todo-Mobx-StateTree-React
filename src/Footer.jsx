import React from 'react'

import {observer} from 'mobx-react'
import {store} from './MobxStateTree'


const Footer =()=> {
    console.log('Footer Render')
    return (
        <div>
            {store.ddd.map((x,k)=><div key={k}>{x.id} — {x.name}</div>)}

        </div>
    )
}
export default observer(Footer)