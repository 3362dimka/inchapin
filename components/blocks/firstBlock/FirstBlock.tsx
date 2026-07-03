import CompanySVG from "@/components/icons/CompanySVG";
import { Title } from "@/components/ui/title/Title";
import Image from "next/image";
import styles from "./FirstBlock.module.scss";
import { HOME } from "@/data/home";

export function FirstBlock() {
  return (
    <div className={styles.firstBlock}>
      <picture className={`${styles.firstBlockPic} fadeInUp`}>
        <source media="(min-width: 768px)" srcSet="/images/hero-pc.webp" />
        <Image
          className={`${styles.firstBlockImg}`}
          src="/images/hero-mob.webp"
          width={640}
          height={626}
          preload={true}
          alt="hero"
          quality={90}
          loading="eager"
          sizes="(max-width: 767px) 100vw, 1760px"
        />
      </picture>
      <div className={styles.firstBlockContent}>
        <Title
          tag="h1"
          className={`${styles.firstBlockContentTitle} color-accent fadeInUp delay2`}
        >
          {HOME.hero.title}
        </Title>
        <CompanySVG
          className={`${styles.firstBlockContentLogo} fadeInUp delay3`}
          color="var(--color-black)"
        />
      </div>
    </div>
  );
}
