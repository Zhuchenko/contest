import React from 'react'

import './css/list.css'

export default (ItemComponent, items) => {
    return class List extends React.Component {
        render() {
            return <div className={'list'}>
                {
                    items.map(item =>
                        <ItemComponent key={item.id} id={item.id} {...item} {...this.props} />
                    )
                }
            </div>
        };
    }
}