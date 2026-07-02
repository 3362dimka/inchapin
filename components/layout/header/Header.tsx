import styles from "./Header.module.scss";
import Logo from "../../icons/logo/Logo";
import { Animate, Button } from "@/components/ui/button/Button";
import { Select } from "@/components/ui/select/Select";
import { BurgerMenu } from "@/components/ui/burgerMenu/BurgerMenu";
import Link from "next/link";
import PhoneIcon from "@/components/icons/PhoneIcon";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`${styles.headerCnt} conteiner`}>
        <div className={styles.headerBlock}>
          <div className={styles.headerBlockBlockMb}>
            <BurgerMenu>Меню</BurgerMenu>
            <Button
              as="link"
              variant="icon"
              size="md"
              href="tel:+74955272121"
              className={styles.headerPhoneMob}
            >
              <PhoneIcon />
            </Button>
          </div>

          <Select
            className={styles.headerSelect}
            ariaLabel="Выбрать квартиру"
            options={[
              { value: "1", label: "Первый", href: "/apartment-1" },
              { value: "2", label: "Второй", href: "/apartment-2" },
            ]}
            placeholder="Выбрать квартиру"
          />
        </div>
        <Link href="/" className={styles.logoLink}>
          <Logo className={styles.logo} />
        </Link>
        <div className={styles.headerBlock}>
          <Button
            as="link"
            variant="link"
            size="md"
            href="tel:+74955272121"
            className={styles.headerPhonePC}
          >
            <Animate>+7 495 527 21 21</Animate>
          </Button>
          <Button
            as="link"
            variant="ghost"
            size="sm"
            href="/form"
            className={`${styles.headerFormBtn} color-accent`}
          >
            <Animate>Заказать звонок</Animate>
          </Button>
        </div>
      </div>
    </header>
  );
}
