import styles from './styles.module.css';

export default function PageHeader({ icon }) {
  if (!icon) return null;
  return (
    <div className={styles.wrap}>
      <img src={icon} alt="" className={styles.icon} />
    </div>
  );
}
