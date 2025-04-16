import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>QuickRef</title>
      </Head>
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
        <h1 className="text-3xl font-bold">Welcome to Cheat{}Doc</h1>
        <p className="mt-2 text-lg">Your personal code cheat sheet app 🔥</p>
      </main>
    </>
  );
}
