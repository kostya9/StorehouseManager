function valueInRange(value, edgeFirst, edgeSecond) {
    const rangeMin = Math.min(edgeFirst, edgeSecond)
    const rangeMax = Math.max(edgeFirst, edgeSecond)
    return (value >= rangeMin) && (value <= rangeMax)
}

function areAreasCollided(firstAreaStartingPosition, firstAreaEndingPosition, secondAreaStartingPosition, secondAreaEndingPosition) {
    const x_overlap_start = valueInRange(firstAreaStartingPosition.x, secondAreaStartingPosition.x, secondAreaEndingPosition.x) || valueInRange(secondAreaStartingPosition.x, firstAreaStartingPosition.x, firstAreaEndingPosition.x)

    const x_overlap_end = valueInRange(firstAreaEndingPosition.x, secondAreaStartingPosition.x, secondAreaEndingPosition.x) || valueInRange(secondAreaEndingPosition.x, firstAreaStartingPosition.x, firstAreaEndingPosition.x)

    const x_overlap = x_overlap_end || x_overlap_start;

    const y_overlap_start = valueInRange(firstAreaStartingPosition.y, secondAreaStartingPosition.y, secondAreaEndingPosition.y) || valueInRange(secondAreaStartingPosition.y, firstAreaStartingPosition.y, firstAreaEndingPosition.y)

    const y_overlap_end = valueInRange(firstAreaEndingPosition.y, secondAreaStartingPosition.y, secondAreaEndingPosition.y) || valueInRange(secondAreaEndingPosition.y, firstAreaStartingPosition.y, firstAreaEndingPosition.y)

    const y_overlap = y_overlap_start || y_overlap_end;

    return x_overlap && y_overlap;
}

export default class CollisionDetector {
  static isCollision(state, newMousePosition, areas) {
      if (areas == undefined)
          return false;
      for (const area of areas) {
          if (areAreasCollided(state.currentDrawFigure.position, newMousePosition, area.position, {
              x: area.position.x + area.width,
              y: area.position.y + area.height
          }))
              return true;
          }
      return false;
  }


}
