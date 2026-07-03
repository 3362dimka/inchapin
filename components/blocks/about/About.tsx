import LogoShort from "@/components/icons/LogoShort";
import Underline from "@/components/icons/Underline";
import { Title } from "@/components/ui/title/Title";
import { Text } from "@/components/ui/text/Text";
import Image from "next/image";
import { Video } from "@/components/ui/video/Video";
import styles from "./About.module.scss";
import { HOME } from "@/data/home";

export function About() {
  return (
    <div className={styles.aboutBlock}>
      <div className={styles.aboutleft}>
        <Title tag="h2" className={`${styles.aboutTitle} color-accent`}>
          {HOME.about.title}
        </Title>
        <div className={styles.imgCnt}>
          <Image
            className={styles.img}
            src="/images/about.webp"
            width={733}
            height={900}
            alt="О проекте INCHAPIN"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzMzIiBoZWlnaHQ9IjkwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNzMzIiBoZWlnaHQ9IjkwMCIgZmlsbD0iI2UwZTBlMCIvPjwvc3ZnPg=="
          />
          <div className={styles.logoShortCnt}>
            <LogoShort className={styles.logoShort} />
          </div>
        </div>
      </div>
      <div className={styles.aboutRight}>
        <div className={styles.aboutAccent}>
          <Underline color="var(--color-accent)" className={styles.Underline} />
          <Text
            tag="p"
            size="lg"
            dangerouslySetInnerHTML={{ __html: HOME.about.text1 }}
          ></Text>
        </div>
        <Text
          tag="p"
          size="sm"
          dangerouslySetInnerHTML={{ __html: HOME.about.text2 }}
        ></Text>
        <Video />
      </div>
    </div>
  );
}
