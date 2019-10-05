export default (classes) => {
    let classNames = '';

    for (let item in classes){
        if(classes[item]){
            classNames += item + ' ';
        }
    }

    return classNames;
}

