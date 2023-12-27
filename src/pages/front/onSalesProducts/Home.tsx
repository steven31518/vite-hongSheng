import { Display } from "./Display";
import { CouponForm } from "../check/CouponForm";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Section from "@/components/Section";

const categorys = ["熱門商品", "主打", "水果多", "food"];


export default function Home() {
  return (
    <div className="grid grid-rows-6 grid-flow-col gap-2 py-4">
      <div className="container grid grid-cols-12 gap-4">
        <div className="col-span-9 flex items-end justify-center">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <img
              className="aspect-video shadow-lg
              hover:brightness-75 transition-all duration-500 ease-in-out"
              src="https://images.unsplash.com/photo-1550520293-d34b3f2e116d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </AspectRatio>
        </div>
        <div className="col-span-3 grid grid-row-2 gap-4">
          <Section title="本月活動" className="p-2">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium, unde. Laudantium quasi magnam voluptatem quam quo
              expedita. Rem impedit quam nisi natus eveniet quae culpa. Aliquid
              laudantium incidunt exercitationem voluptates?
            </p>
          </Section>
          <Section
            title="您有優惠卷嗎?"
            className="bg-muted flex flex-col justify-center items-center"
          >
            <CouponForm />
          </Section>
        </div>
      </div>
      {categorys.map((category) => {
        return <Display key={category} category={category} />;
      })}
    </div>
  );
}
