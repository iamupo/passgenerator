import { useState, useCallback, useEffect, useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charaAllowed, setCharaAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charaAllowed) str += "!@#$%^&*()_+-=";

    for (let i = 0; i < length; i++) {
      pass += str[Math.floor(Math.random() * str.length)];
    }

    setPassword(pass);
  }, [length, charaAllowed, numberAllowed]);

  const copyPasswordtoClipboard = useCallback(
    (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(password);
      passwordRef.current.select();
      document.execCommand("copy");
      toast.success("Password copied successfully!");  // Toast notification on success
    },
    [password]
  );

  const openGithubRepo = () => {
    window.open("https://github.com/upovibe/passgenerator", "_blank");
  };

  useEffect(() => {
    generatePassword();
  }, [length, charaAllowed, numberAllowed, generatePassword]);

  return (
    <div>
      <main className="bg-gray-900 flex h-screen items-center justify-center overflow-auto p-3 w-full">
        <div className="bg-gray-800 flex flex-col gap-4 h-auto justify-self-center p-3 place-items-center rounded-lg shadow-xl w-auto overflow-auto">
          <h1 className="capitalize font-semibold text-2xl text-center text-white ">
            Password Generator
          </h1>
          <form
            className="flex flex-col gap-5 h-auto p-2 place-items-center w-auto"
            data-pg-collapsed
          >
            <div className="flex w-full">
              <input
                className="bg-gray-100 font-medium outline-none overflow-auto p-3 rounded-l-lg text-gray-800 text-lg text-opacity-90 w-full"
                type="text"
                placeholder="Password"
                name="Password"
                value={password}
                readOnly
                ref={passwordRef}
              />
              <button
                onClick={copyPasswordtoClipboard}
                className="bg-blue-700 font-semibold lowercase px-6 py-3 rounded-r-lg text-center text-white w-auto"
              >
                Copy
              </button>
            </div>
            <div className="flex flex-wrap gap-5 items-center place-content-center">
              <div className="flex gap-2 items-center justify-center">
                <input
                  type="range"
                  name="Length"
                  min={6}
                  max={21}
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="cursor-pointer"
                  id=""
                />
                <label
                  htmlFor="length"
                  className="capitalize font-semibold text-yellow-600"
                >
                  Length: {length}
                </label>
              </div>
              <div className="flex gap-2 items-center justify-center">
                <input
                  type="checkbox"
                  name="character"
                  defaultChecked={charaAllowed}
                  onChange={() => {
                    setCharaAllowed((prev) => !prev);
                  }}
                />
                <label
                  htmlFor="character"
                  className="capitalize font-semibold text-yellow-600"
                >
                  Characters
                </label>
              </div>
              <div className="flex gap-2 items-center justify-center">
                <input
                  type="checkbox"
                  name="number"
                  defaultChecked={numberAllowed}
                  onChange={() => {
                    setNumberAllowed((prev) => !prev);
                  }}
                />
                <label
                  htmlFor="number"
                  className="capitalize font-semibold text-yellow-600"
                >
                  Numbers
                </label>
              </div>
            </div>
          </form>

          {/* GitHub Button */}
          <button
            onClick={openGithubRepo}
            className="bg-green-600 font-semibold lowercase px-6 py-3 rounded-lg text-center text-white w-auto mt-4"
          >
            View on GitHub
          </button>
        </div>
      </main>

      <Toaster /> {/* This will render the toast container */}
    </div>
  );
}

export default App;
