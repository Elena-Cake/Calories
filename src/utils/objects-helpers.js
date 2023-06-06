export const updateObjectInArray = (items, objPropName, desiredItemValue, newObjProps) => {
    return items.map(item => {
        if (item[objPropName] === desiredItemValue) {
            return { ...item, ...newObjProps }
        }
        return item
    })
}