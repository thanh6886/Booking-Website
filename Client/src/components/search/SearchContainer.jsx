import styles from './SearchContainer.module.css'
import SearchList from './SearchList'
import SearchPopup from './SearchPopup'

function SearchContainer() {
  return (
  <div className={styles.wrap}>
    <div className={styles.container}>
      <div className={styles.left}>
        <SearchPopup/>
      </div>
      <div className={styles.right}>
        <SearchList />
      </div>
    </div>
  </div>
  )
}

export default SearchContainer