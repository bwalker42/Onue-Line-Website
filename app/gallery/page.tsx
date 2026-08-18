import { PageHero } from "../components/PageHero";
import { ships } from "../data";

export default function Page() {
  return <>
    <PageHero kicker="FLEET GALLERY" title="Life at sea, beautifully framed.">A first look at the ships and seascapes shaping the Onue Line experience.</PageHero>
    <section className="content gallery">
      {ships.map((ship, index) => <figure className={index === 0 ? "widePhoto" : ""} key={ship.slug}>
        <img src={ship.image} alt={`${ship.name} sailing at sea`} />
        <figcaption>{ship.name} · {ship.tagline}</figcaption>
      </figure>)}
    </section>
  </>;
}
