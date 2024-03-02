function getCssVariable(htmlID)
{
  return '--'+ htmlID +'-color';
}

function getRGBA_fromHtmlID(htmlID)
{
  const cssVariable = getCssVariable(htmlID);
  return parseRGBA_Color(rgbValue);
}

function getRGBA_FromCss(cssVariable) 
{
    const cssColorValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariable);

    const tempElement = document.createElement('div');
    tempElement.style.color = cssColorValue;

    document.body.appendChild(tempElement);
    const rgbValue = getComputedStyle(tempElement).color;
    document.body.removeChild(tempElement);

    return parseRGBA_Color(rgbValue);
}

function parseRGBA_Color(cssColor)
{
  const match = cssColor.match(/rgba?\((\d+), (\d+), (\d+)(?:, [\d.]+)?\)/);

  if (match) 
  {
    const A = (isNaN(match[4])) ? 1 : match[4];

    return RGBA =
    {
      R: parseInt(match[1], 10),
      G: parseInt(match[2], 10),
      B: parseInt(match[3], 10),
      A: A,
    };
  }
  return null;
}

function setColor(cssVariable, rgba, transparency = null)
{
  const A = (transparency != null) ? transparency : rgba.A; 

  document.documentElement.style.setProperty(cssVariable, "rgba("+ rgba.R +", "+ rgba.G +", "+ rgba.B +", "+ A +")");
}

function setTransparency(cssVariable, transparency)
{
  const rgba = getRGBA_FromCss(cssVariable);
  console.log(rgba);
  document.documentElement.style.setProperty(cssVariable, "rgba("+ rgba.R +", "+ rgba.G +", "+ rgba.B +", "+ transparency +")");
}