import React from 'react'

import './css/list.css'

export default (ItemComponent, items) => {
    return class List extends React.Component {
        render() {
            return <div className={'list'}>
                {
                    items.map(item =>
                        <ItemComponent key={item._id} id={item._id} {...item} />
                    )
                }
            </div>
        };
    }
}