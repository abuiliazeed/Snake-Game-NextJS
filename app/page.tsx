import SnakeGame from "@/components/snake-game";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <SnakeGame />
    </main>
  );
}