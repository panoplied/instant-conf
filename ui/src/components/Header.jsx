// components
import ThemeToggle from '../components/ThemeToggle';

export default function Header() {
  return (
    <div className="
      flex
      flex-row
      w-full
      p-4
      mb-4
      bg-stone-50
      dark:bg-stone-900
      border-b
      border-stone-300
      dark:border-stone-700"
    >

      <h1 className="text-2xl font-bold flex-auto">
        Instant Conf
      </h1>

      <div className="flex-initial">
        <ThemeToggle />
      </div>

    </div>
  );
}
