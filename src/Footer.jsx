import React,{useState,useEffect} from 'react'

//mst
import {observer,Observer} from 'mobx-react'
import {store} from './store/MobxStateTree'


const Footer =observer(()=> {
    console.log('Footer Render')

    //React Hooks
    const[count,setCount] = useState(0)

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
      },[count]);
 

    return (
        <div>
            {count}
            <button onClick={()=>setCount(count+1)}>Count++</button>

            {/* This is example of using hook in obsevable wrapped function component 
            But Component will rerender as the counter hook is updated to prevent that make another fcomponent and wrap observable around that
            */}

                    <div>{store.ddd.sort(function() {
        return .5 - Math.random();
        }).map((x,k)=><div key={k}>{x.id} — {x.name}</div>)}</div>


        </div>
    )
}
)

export default (Footer)