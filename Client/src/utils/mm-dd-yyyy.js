export default function convertTypeDate(date) {
  if (!date) {
    date = new Date()
  }
  const yyyy = date.getFullYear()
  let mm = date.getMonth() + 1 // Months start at 0!
  let dd = date.getDate()

  if (dd < 10) dd = '0' + dd
  if (mm < 10) mm = '0' + mm

  return mm + '/' + dd + '/' + yyyy
}
