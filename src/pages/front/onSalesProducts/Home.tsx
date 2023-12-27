import { Display } from "./Display";
const categorys = ["熱門商品", "主打", "paper", "food"];

export default function Home() {
  return (
    <div className="grid grid-rows-4 grid-flow-col gap-4">
      {categorys.map((category) => {
        return <Display key={category} category={category} />;
      })}
    </div>
  );
}
