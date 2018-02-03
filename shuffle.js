const shuffle = list => {
  let temporaryValue, randomIndex
  let currentIndex = list.length

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    temporaryValue = list[currentIndex]
    list[currentIndex] = list[randomIndex]
    list[randomIndex] = temporaryValue
  }

  return list
}

export default shuffle
