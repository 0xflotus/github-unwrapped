import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Player } from "@remotion/player";
import { Stars } from "../remotion/Stars";
import Download from "../src/components/Download";
import { useRouter } from "next/router";

export default function User() {
  const router = useRouter();
  const username = ([] as string[]).concat(router.query.user)[0];
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {username ? (
        <>
          <Player
            component={Stars}
            compositionHeight={1080}
            compositionWidth={1080}
            durationInFrames={300}
            fps={30}
            style={{
              width: 540,
              height: 540,
            }}
            controls
            inputProps={{
              username,
            }}
          ></Player>
          <Download username={username}></Download>
        </>
      ) : null}
    </div>
  );
}
