export function generatePages(totalPages: number, activePage: number) {
  const pages = []

  if (activePage < 5) {
    if (totalPages <= 5) {
      for (let page = 1; page <= totalPages; page++) {
        pages.push(page)
      }
    } else {
      for (let page = 1; page <= 5; page++) {
        pages.push(page)
      }
      pages.push(0, totalPages)
    }
  } else {
    if (activePage > totalPages - 3) {
      pages.push(1, 0)

      for (let page = totalPages - 3; page <= totalPages; page++) {
        pages.push(page)
      }

      return pages
    }

    pages.push(1, 0)

    const prevPage = activePage - 1
    const nextPage = activePage + 1

    pages.push(prevPage, activePage, nextPage)
    pages.push(0, totalPages)
  }

  return pages
}

generatePages(554, 6)
