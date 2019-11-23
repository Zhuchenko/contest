import React from 'react'
import ItemWithCheckBox from "../common/ItemWithCheckBox";

export default (props) => <ItemWithCheckBox {...props} path={'/users/'} name={props.lastName + props.name}/>