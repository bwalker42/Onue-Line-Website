"use client";

import Link from "next/link";
import { useState } from "react";
import { cruises } from "../data";

const cabins = [{ name: "Interior", price: 50 }, { name: "Oceanview", price: 250 }, { name: "Suite", price: 500 }];

export function BookingWizard() {
  const [step, setStep] = useState(1);
  const [cruise, setCruise] = useState(0);
  const [cabin, setCabin] = useState(1);
  const [guests, setGuests] = useState(2);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [dining, setDining] = useState("6:00 PM · Early");
  const total = cabins[cabin].price * guests;
  const contactComplete = Boolean(first.trim() && last.trim() && email.trim());

  function createBooking() {
    sessionStorage.setItem("onue-demo-booking", JSON.stringify({
      reference: `OLC-${Date.now().toString(36).slice(-6).toUpperCase()}`,
      name: `${first.trim()} ${last.trim()}`,
      email: email.trim(),
      guests,
      voyage: cruises[cruise].name,
      ship: cruises[cruise].ship,
      cabin: cabins[cabin].name,
      dining: dining.split(" · ")[0],
    }));
    setStep(5);
  }

  return <section className="bookingShell">
    <ol className="stepper">{["Voyage", "Cabin", "Guests", "Review"].map((label, index) => <li className={step >= index + 1 ? "active" : ""} key={label}><span>{index + 1}</span>{label}</li>)}</ol>
    <div className="bookingLayout">
      <div className="bookingMain">
        {step === 1 && <><p className="eyebrow dark">STEP 1 OF 4</p><h2>Choose your voyage</h2><div className="choiceGrid">{cruises.map((item, index) => <button type="button" className={`choice ${cruise === index ? "selected" : ""}`} onClick={() => setCruise(index)} key={item.name}><small>{item.nights} NIGHTS · {item.ship}</small><strong>{item.name}</strong><span>{item.route}</span><b>From ${item.from}</b></button>)}</div></>}
        {step === 2 && <><p className="eyebrow dark">STEP 2 OF 4</p><h2>Select your cabin</h2><div className="choiceGrid">{cabins.map((item, index) => <button type="button" className={`choice ${cabin === index ? "selected" : ""}`} onClick={() => setCabin(index)} key={item.name}><small>CABIN CATEGORY</small><strong>{item.name}</strong><span>Designed as your comfortable retreat at sea.</span><b>${item.price} per guest</b></button>)}</div></>}
        {step === 3 && <><p className="eyebrow dark">STEP 3 OF 4</p><h2>Who is sailing?</h2><div className="passengerForm">
          <label>Guests<select value={guests} onChange={event => setGuests(Number(event.target.value))}>{[1, 2, 3, 4].map(number => <option key={number} value={number}>{number} guest{number > 1 ? "s" : ""}</option>)}</select></label>
          <label>First name<input required autoComplete="given-name" value={first} onChange={event => setFirst(event.target.value)} placeholder="First name" /></label>
          <label>Last name<input required autoComplete="family-name" value={last} onChange={event => setLast(event.target.value)} placeholder="Last name" /></label>
          <label>Email<input required type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="guest@example.com" /></label>
          <label>Dining time<select value={dining} onChange={event => setDining(event.target.value)}><option>6:00 PM · Early</option><option>8:00 PM · Late</option><option>Open seating</option></select></label>
          <label>Accessibility<select><option>None</option><option>Step-free cabin</option><option>Hearing assistance</option></select></label>
        </div><p className="demoNotice">Your details stay in this browser tab and are used only for the demo boarding pass.</p></>}
        {step === 4 && <><p className="eyebrow dark">STEP 4 OF 4</p><h2>Review your voyage</h2><div className="reviewCard">
          <div><small>VOYAGE</small><strong>{cruises[cruise].name}</strong><span>{cruises[cruise].nights} nights aboard {cruises[cruise].ship}</span></div>
          <div><small>LEAD GUEST</small><strong>{first.trim()} {last.trim()}</strong><span>{email.trim()} · {guests} guest{guests > 1 ? "s" : ""}</span></div>
          <div><small>CABIN</small><strong>{cabins[cabin].name}</strong><span>${cabins[cabin].price} per guest · {dining}</span></div>
          <div><small>DEMO TOTAL</small><strong>${total}</strong><span>Taxes and port fees not included</span></div>
        </div><p className="demoNotice">Demonstration only. No reservation or payment is processed.</p></>}
        {step === 5 && <div className="confirmed"><span>✓</span><p className="eyebrow dark">DEMONSTRATION RESERVATION</p><h2>You’re ready for the horizon, {first.trim()}.</h2><p>Your guest details are ready on your boarding pass.</p><Link className="btn" href="/booking/boarding-pass">View boarding pass</Link></div>}
        <div className="wizardActions">{step > 1 && step < 5 && <button type="button" className="backButton" onClick={() => setStep(step - 1)}>← Back</button>}{step < 3 && <button type="button" className="btn" onClick={() => setStep(step + 1)}>Continue</button>}{step === 3 && <button type="button" className="btn" disabled={!contactComplete} onClick={() => setStep(4)}>Continue</button>}{step === 4 && <button type="button" className="btn" onClick={createBooking}>Create demo booking</button>}</div>
      </div>
      {step < 5 && <aside className="tripSummary"><p className="eyebrow dark">YOUR SELECTION</p><h3>{cruises[cruise].name}</h3><p>{cruises[cruise].ship} · {cruises[cruise].nights} nights</p><hr /><p><span>Cabin</span><b>{cabins[cabin].name}</b></p><p><span>Guests</span><b>{guests}</b></p><hr /><p><span>Demo total</span><b>${total}</b></p></aside>}
    </div>
  </section>;
}
