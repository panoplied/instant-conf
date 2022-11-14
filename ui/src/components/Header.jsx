import ThemeToggle from '../components/ThemeToggle';
import { useConfig } from '../hooks/useConfig';

export default function Header() {
  const { error, isPending } = useConfig();

  return (
    <>
      <div className="flex flex-row p-6 w-full">

        <h1 className="text-2xl font-bold flex-auto">
          Instant Conf
        </h1>

        {(!isPending && !error) && (
          <button className="
            flex-initial
            mx-6
            px-4
          ">
            + Add Namespace
          </button>
        )}

        <div className="flex-initial">
          <ThemeToggle />
        </div>

      </div>
    </>
  );
}
