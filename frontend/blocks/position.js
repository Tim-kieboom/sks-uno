function getCurserOverElementPosition(event, element)
{
    rect = element.getBoundingClientRect();

    const deltaX = Math.abs(event.clientX - rect.left);
    const deltaY = Math.abs(event.clientY - rect.top);
    
    const delta = {x: deltaX, y: deltaY};
    
    if(isOverBlock(delta, rect))
    {
        console.log("blockOver");
        overBlockPosistion = {x: rect.left, y: rect.top};
        return overBlockPosistion; 
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