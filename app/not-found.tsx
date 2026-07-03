import styles from "./not-found.module.scss";
import { Title } from "@/components/ui/title/Title";
import { Button } from "@/components/ui/button/Button";
import { UI } from "@/data/ui";

export default function NotFound() {
  return (
    <div className={styles.errorBlock}>
      <div className={styles.code}>{UI.notFound.code}</div>
      <Title tag="h2" className={`${styles.title} color-accent`}>
        {UI.notFound.title}
      </Title>
      <p className={styles.text}>
        {UI.notFound.description}
      </p>
      <Button
        as="link"
        href="/"
        variant="button"
        size="lg"
        className={styles.button}
      >
        {UI.notFound.button}
      </Button>
    </div>
  );
}
