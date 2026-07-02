import styles from "./not-found.module.scss";
import { Title } from "@/components/ui/title/Title";
import { Button } from "@/components/ui/button/Button";

export default function NotFound() {
  return (
    <div className={styles.errorBlock}>
      <div className={styles.code}>404</div>
      <Title tag="h2" className={`${styles.title} color-accent`}>
        Страница не найдена
      </Title>
      <p className={styles.text}>
        Похоже, такой страницы не существует или она была перемещена.
      </p>
      <Button
        as="link"
        href="/"
        variant="button"
        size="lg"
        className={styles.button}
      >
        На главную
      </Button>
    </div>
  );
}
