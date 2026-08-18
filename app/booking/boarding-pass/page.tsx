"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Booking = { reference: string; name: string; email: string; guests: number; voyage: string; ship: string; cabin: string; dining: string };
const fallback: Booking = { reference: "OLC-DEMO", name: "Guest Passenger", email: "Complete a booking to add contact details", guests: 1, voyage: "Your selected voyage", ship: "Onue Line", cabin: "To be assigned", dining: "To be selected" };
const shipCodes: Record<string, string> = { Goldentanic: "GLD", Silvertanic: "SLV", Diamondtanic: "DIA", Rubytanic: "RBY", "Bronze Tannic": "BRZ", "Mega Titanic": "MGT", "Mega Britannic": "MGB", "Bulltannic 3.0": "BL3", "Bulltannic 4.0": "BL4", "Emerald Tanic": "EMR" };

export default function Page() {
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("onue-demo-booking");
    if (!stored) return setBooking(fallback);
    try { setBooking({ ...fallback, ...JSON.parse(stored) }); }
    catch { setBooking(fallback); }
  }, []);

  if (!booking) return <section className="passPage"><p>Preparing your boarding pass…</p></section>;
  const code = shipCodes[booking.ship] ?? "ONL";
  const details = [["SAILING", booking.voyage], ["SHIP", booking.ship], ["GUESTS", String(booking.guests)], ["BOARDING", "12:30 PM"], ["CABIN", booking.cabin], ["DINING", booking.dining], ["CONTACT", booking.email], ["REFERENCE", booking.reference]];

  return <section className="passPage">
    <div className="passToolbar"><Link href="/booking">← Back to booking</Link><button type="button" onClick={() => window.print()}>Print boarding pass</button></div>
    <article className="boardingPass">
      <header className="passHead"><div><small>ONUE LINE CRUISES</small><h1>Boarding Pass</h1></div><b>OL</b></header>
      <div className="passBody"><small>PASSENGER</small><h2>{booking.name}</h2><p>Booking reference <strong>{booking.reference}</strong></p>
        <section className="passRoute"><div><small>FROM</small><strong>SEA</strong><span>Embarkation port</span></div><i>→</i><div><small>SHIP</small><strong>{code}</strong><span>{booking.ship}</span></div></section>
        <div className="passDetails">{details.map(([label, value]) => <p key={label}><small>{label}</small><strong>{value}</strong></p>)}</div>
      </div>
      <aside className="passStub"><small>BOARDING GROUP</small><strong>GOLD</strong><div className="qr">OL<br />{code}</div><span>{booking.reference}</span></aside>
    </article>
    <div className="boardingNotes"><h2>Before you board</h2><p>This boarding pass is a demonstration and is not valid for travel. Guest details are stored only for this browser tab.</p></div>
  </section>;
}
