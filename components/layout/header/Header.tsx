import styles from "./Header.module.scss";
import Logo from "../../icons/logo/Logo";
import { Animate, Button } from "@/components/ui/button/Button";
import { HeaderSelect } from "./HeaderSelect";
import { BurgerMenu } from "@/components/ui/burgerMenu/BurgerMenu";
import Link from "next/link";
import PhoneIcon from "@/components/icons/PhoneIcon";
import { CONTACTS } from "@/data/contacts";
import { UI } from "@/data/ui";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`${styles.headerCnt} container`}>
        <div className={styles.headerBlock}>
          <div className={styles.headerBlockBlockMb}>
            <BurgerMenu>{UI.menu.burgerLabel}</BurgerMenu>
            <Button
              as="link"
              variant="icon"
              size="md"
              href={CONTACTS.phoneLink}
              className={styles.headerPhoneMob}
              aria-label="Phone"
            >
              <PhoneIcon />
            </Button>
          </div>

          <HeaderSelect className={styles.headerSelect} />
        </div>
        <Link href="/" className={styles.logoLink} aria-label="Logo">
          <Logo className={styles.logo} />
        </Link>
        <div className={styles.headerBlock}>
          <Button
            as="link"
            variant="link"
            size="md"
            href={CONTACTS.phoneLink}
            className={styles.headerPhonePC}
          >
            <Animate>{CONTACTS.phoneFormatted}</Animate>
          </Button>
          <Button
            as="link"
            variant="ghost"
            size="sm"
            href="/form"
            className={styles.headerFormBtn}
          >
            <Animate>{UI.header.ctaButton}</Animate>
          </Button>
        </div>
      </div>
    </header>
  );
}
