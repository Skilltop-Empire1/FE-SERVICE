import styles from './SelectOptions.module.css'

function SelectOptions({ data, selectedOption, setSelectedOption }) {
  return (
    <select
      onChange={(e) => setSelectedOption(e.target.value)}
      value={selectedOption}
      className={styles.selectOption}
    >
      {data?.map((arr, index) => (
        <option key={index} value={arr}>
          {arr}
        </option>
      ))}
    </select>
  )
}

export default SelectOptions
