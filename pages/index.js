import Head from "next/head";
import Sidebar from "../components/SideBar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Whatsapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
    </div>
  );
}
