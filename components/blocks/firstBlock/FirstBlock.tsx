import CompanySVG from "@/components/icons/CompanySVG";
import { Title } from "@/components/ui/title/Title";
import Image from "next/image";
import styles from "./FirstBlock.module.scss";
import { HOME } from "@/data/home";

export function FirstBlock() {
  return (
    <div className={styles.firstBlock}>
      <picture className={`${styles.firstBlockPic} fadeInUp`}>
        <source media="(max-width: 767px)" srcSet="/images/hero-mob.jpg" />
        <Image
          className={`${styles.firstBlockImg}`}
          src="/images/hero-pc.jpg"
          width={1760}
          height={600}
          alt="hero"
          loading="eager"
          sizes="(max-width: 767px) 100vw, 1760px"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc2MCIgaGVpZ2h0PSI2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE3NjAiIGhlaWdodD0iNjAwIiBmaWxsPSIjZTBlMGUwIi8+PC9zdmc+"
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
