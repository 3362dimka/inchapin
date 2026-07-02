import LogoShort from "@/components/icons/LogoShort";
import Underline from "@/components/icons/Underline";
import { Title } from "@/components/ui/title/Title";
import { Text } from "@/components/ui/text/Text";
import Image from "next/image";
import { Video } from "@/components/ui/video/Video";
import styles from "./About.module.scss";

export function About() {
  return (
    <div className={styles.aboutBlock}>
      <div className={styles.aboutleft}>
        <Title tag="h2" className={`${styles.aboutTitle} color-accent`}>
          О проекте
        </Title>
        <div className={styles.imgCnt}>
          <Image
            className={styles.img}
            src="/images/about.jpg"
            width={733}
            height={900}
            alt="about"
          />
          <div className={styles.logoShortCnt}>
            <LogoShort className={styles.logoShort} />
          </div>
        </div>
      </div>
      <div className={styles.aboutRight}>
        <div className={styles.aboutAccent}>
          <Underline color="var(--color-accent)" className={styles.Underline} />
          <Text tag="p" size="lg">
            Уютное и безопасное пространство для счастливой,{" "}
            <span className="color-accent">спокойной и размеренной жизни</span>
          </Text>
        </div>
        <Text tag="p" size="sm">
          <span className="color-accent">
            Квартиры от 65 до 356 м² с чистовой отделкой,
          </span>{" "}
          балконами, лоджиями и террасами в собственной закрытой охраняемой
          территории.
        </Text>
        <Video />
      </div>
    </div>
  );
}
