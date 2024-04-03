import React from 'react';
import outline from 'react-outline'
import store from '../store/index.jsx'

let styles = {
    base : {
      title:{ 
            backgroundColor: "red" 
        }
    }
}
styles = outline(styles);

const Title = styles.title`div`

export default ()=>{
    const { foo } = store();
    return <Title>{ foo.name }</Title>
};