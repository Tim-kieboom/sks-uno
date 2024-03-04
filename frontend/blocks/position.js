function getCurserOverElementPosition(event, element)
{
    rect = element.getBoundingClientRect();

    const deltaX = Math.abs(event.clientX - rect.left);
    const deltaY = Math.abs(event.clientY - rect.top);
    
    const delta = {x: deltaX, y: deltaY};
    
    if(isOverBlock(delta, rect))
    {
        console.log("blockOver");
        const overBlockPosistion = {x: rect.left, y: rect.top};
        return overBlockPosistion; 
    }

    return null;
}

function getGroupOverCurser(event)
{
    for(let i = 0; i < getAmountGroup(); i++)
    {
        const group = getGroup(i);
        const intersectPosition = getCurserOverElementPosition(event, group);

        if(intersectPosition !== null)
            return group;
    }

    return null;
}

function isOverBlock(delta, rect)
{
    return (delta.x <= rect.width && delta.y <= rect.height);
}

function getBlockPostition(event)
{
    return position = 
    {
        x: event.clientX - event.target.offsetLeft,
        y: event.clientY - event.target.offsetTop
    };
}

function setElementAtPosition(element, position)
{
    element.style.position = 'absolute';
    element.style.left = position.x + 'px';
    element.style.top = position.y + 'px';
}

function removePosition(element)
{
    element.style.position = '';
    element.style.left = '';
    element.style.top = '';
}