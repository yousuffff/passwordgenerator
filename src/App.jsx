import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolAllowed, setSymbolAllowed] = useState(false);
  const [capitalAlphaAllowed, setCapitalAlphaAllowed] = useState(true);
  const [smallAlphaAllowed, setSmallAlphaAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const [copy, setCopy] = useState("Copy");

  const pwsdRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "";

    let symbol = "!@#$%^&*()~`<>?/";
    let number = "0123456789";
    let capital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let small = "abcdefghijklmnopqrstuvwxyz";

    if (capitalAlphaAllowed) str += capital;
    if (smallAlphaAllowed) str += small;
    if (numberAllowed) str += number;
    if (symbolAllowed) str += symbol;

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [
    length,
    symbolAllowed,
    numberAllowed,
    capitalAlphaAllowed,
    smallAlphaAllowed,
  ]);

  const copyToClipboard = useCallback(() => {
    pwsdRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
    setCopy("Copy");
  }, [
    length,
    symbolAllowed,
    numberAllowed,
    capitalAlphaAllowed,
    smallAlphaAllowed,
  ]);

  return (
    <>
      <div className="w-6/12 h-auto m-auto p-3">
        <h1 className="text-white text-5xl text-center">Password Generator</h1>
        <div className="w-full bg-gray-500">
          <div className="grid grid-flow-col place-content-center">
            <input
              type="text"
              name=""
              id=""
              value={password}
              placeholder="Password"
              readOnly
              className="p-2 m-2 rounded-lg focus:border-black"
              ref={pwsdRef}
            />
            <button
              className="text-white hover:underline"
              onClick={() => {
                setCopy("Copied");
                copyToClipboard();
              }}
            >
              {copy}
            </button>
          </div>
          <div className="flex justify-around bg-slate-400">
            <input
              type="range"
              name=""
              id=""
              min={6}
              max={20}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-9/12"
            />
            <label className="text-white">Lenght {length}</label>
          </div>
          <div className="flex flex-col">
            <input
              type="checkbox"
              name=""
              id=""
              defaultChecked={capitalAlphaAllowed}
              onClick={() => setCapitalAlphaAllowed((prev) => !prev)}
            />
            <label htmlFor="" className="text-white">
              Capital Alphabets
            </label>
            <input
              type="checkbox"
              name=""
              id=""
              defaultChecked={smallAlphaAllowed}
              onClick={() => setSmallAlphaAllowed((prev) => !prev)}
            />
            <label htmlFor="" className="text-white">
              Small Alphabets
            </label>
            <input
              type="checkbox"
              name=""
              id=""
              defaultChecked={numberAllowed}
              onClick={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="" className="text-white">
              Number
            </label>
            <input
              type="checkbox"
              name="symbol"
              id=""
              defaultChecked={symbolAllowed}
              onClick={() => setSymbolAllowed((prev) => !prev)}
            />
            <label htmlFor="" name="symbol" className="text-white">
              Symbol
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
