// src/components/FarmingTips.jsx
import React, { useEffect, useState } from "react";
import {
  FaTint,
  FaBroom,
  FaLeaf,
  FaHeadphones,
  FaYoutube,
  FaStar,
  FaRegStar,
  FaHandsHelping,
  FaWater,
  FaSeedling,
  FaShoppingCart,
  FaExternalLinkAlt,
  FaIndustry,
} from "react-icons/fa";
import { GiCow } from "react-icons/gi";

/* ------------ Tips data ------------- */

const tips = [
  {
    id: "feeding",
    title: "Feeding & Nutrition",
    summary:
      "Balanced ration → healthy cows, regular calving and good-quality milk.",
    video: "https://youtu.be/G__UCVGABDs?si=o1I-0sRW7l6SFwv3",
    extraVideos: [
      {
        label: "Feeding high-yielding dairy cows (demo)",
        url: "https://www.youtube.com/watch?v=-IhLVq44Lhw",
      },
    ],
    products: [
      {
        label: "Manual/portable chaff cutter (search)",
        url: "https://www.amazon.in/s?k=dairy+chaff+cutter",
      },
      {
        label: "Cattle concentrate feed (search)",
        url: "https://www.amazon.in/s?k=dairy+cattle+concentrate+feed",
      },
      {
        label: "Mineral mixture & salt lick (search)",
        url: "https://www.amazon.in/s?k=cattle+mineral+mixture+salt+lick",
      },
    ],
    bullets: [
      "Always offer a mix of green fodder, dry fodder and concentrate every day.",
      "Include mineral mixture and common salt daily; keep a salt lick in the shed.",
      "For a 400–450 kg cow: about 25–30 kg green fodder + 4–6 kg dry fodder per day.",
      "Give roughly 1 kg concentrate for maintenance + ≈0.4 kg per litre of milk.",
      "Change ration gradually over 7–10 days and monitor body condition score.",
    ],
    icon: <FaSeedling />,
  },
  {
    id: "water",
    title: "Water Management",
    summary: "Clean, cool water is the cheapest feed and most ignored resource.",
    video: "https://youtu.be/YAcPEiJbnfA?si=i2Bl7jv01L0oxicS",
    extraVideos: [],
    products: [
      {
        label: "Automatic water bowls for cattle (search)",
        url: "https://www.amazon.in/s?k=automatic+water+bowls+cattle",
      },
      {
        label: "Plastic water trough / drum (search)",
        url: "https://www.amazon.in/s?k=plastic+water+trough+for+animals",
      },
    ],
    bullets: [
      "A lactating cow often needs 40–70 litres of water per day.",
      "Provide free-choice clean water, or at least 3–4 chances per day to drink.",
      "Scrub water troughs daily; remove algae, feed, dung and urine.",
      "Provide shade over troughs and allow cows to drink after milking and grazing.",
    ],
    icon: <FaTint />,
  },
  {
    id: "cleanliness",
    title: "Shed Cleanliness & Hygiene",
    summary:
      "Clean shed → fewer diseases (mastitis, foot problems) and better milk quality.",
    video: "https://youtu.be/OaNKFTHGJIg?si=5t4mPy023wZCWgiZ",
    extraVideos: [
      {
        label: "Clean milk production – NDDB film",
        url: "https://www.youtube.com/watch?v=4PJ_0G3YXeA",
      },
    ],
    products: [
      {
        label: "Rubber cow mats (search)",
        url: "https://www.flipkart.com/q/cow-mat",
      },
      {
        label: "Disinfectant for animal sheds (search)",
        url: "https://www.amazon.in/s?k=disinfectant+for+animal+shed",
      },
      {
        label: "Power sprayer / pressure pump (search)",
        url: "https://www.amazon.in/s?k=power+sprayer+for+farm",
      },
    ],
    bullets: [
      "Remove dung and urine 2–3 times a day from cubicles, alleys and feeding area.",
      "Keep bedding dry; replace wet material around udder area immediately.",
      "Maintain good drainage; avoid standing water near resting or feeding places.",
      "Clean feed troughs daily; remove old feed before offering fresh feed.",
      "Control flies and mosquitoes using good waste management and safe insecticides.",
    ],
    icon: <FaBroom />,
  },
  {
    id: "comfort",
    title: "Cow Comfort & Handling",
    summary: "Comfortable, calm cows eat more, ruminate more and give more milk.",
    video: "https://youtu.be/SGZ5kKXv65k?si=hW9CfLdimRPLMRmV",
    extraVideos: [
      {
        label: "Cow comfort – housing & mats (search)",
        url: "https://www.youtube.com/results?search_query=cow+comfort+rubber+mat",
      },
    ],
    products: [
      {
        label: "Cow comfort rubber mats (search)",
        url: "https://behtarzindagi.in/products/categoryproductlist/Cow-Mat/",
      },
      {
        label: "Cattle grooming / cow brush (search)",
        url: "https://www.amazon.in/s?k=cow+grooming+brush",
      },
    ],
    bullets: [
      "Provide enough open and covered space per cow with good shade and ventilation.",
      "Use nonslippery flooring with gentle slope for drainage.",
      "Handle cows calmly; avoid shouting and hitting.",
      "Trim hooves every 4–6 months and keep walking areas dry and clean.",
      "Observe cows for limping, swelling or reduced feed intake.",
    ],
    icon: <GiCow />,
  },
  {
    id: "dung",
    title: "Dung to Compost & Biogas",
    summary: "Convert dung and urine into compost, biogas and fertile fields.",
    video: "https://youtu.be/uEKOc4mOIAg?si=skWn0JUHxA5nH_jx",
    extraVideos: [
      {
        label: "Small biogas plant for home/farm (search)",
        url: "https://www.youtube.com/results?search_query=small+biogas+plant+for+home",
      },
    ],
    products: [
      {
        label: "Compost bins / tanks (search)",
        url: "https://www.amazon.in/s?k=compost+bin+for+home",
      },
      {
        label: "Biogas plant kits (search)",
        url: "https://www.amazon.in/s?k=biogas+plant+for+home",
      },
      {
        label: "Cow urine Ark plant (info)",
        url: "https://nkdairyequipments.com/cows-urine-ark-plant/",
      },
    ],
    bullets: [
      "Treat dung and urine as valuable resources, not waste.",
      "Mix dung with crop residues and dry leaves to prepare compost heaps or pits.",
      "Keep the heap moist like a squeezed sponge; turn every 15 days.",
      "Compost is ready in about 40–60 days when dark, crumbly and earthy smelling.",
      "Use biogas slurry or compost as organic fertilizer to reduce chemical use.",
    ],
    icon: <FaLeaf />,
  },
  {
    id: "clean-milk",
    title: "Clean Milking Practices",
    summary:
      "Proper milking routine reduces mastitis and improves milk price and shelf life.",
    video: "https://youtu.be/q6DSQG0xM8w?si=L1A3Dlu5LiogoedW",
    extraVideos: [
      {
        label: "On-farm clean milk production – training video",
        url: "https://www.youtube.com/watch?v=neJh-CflIKo",
      },
      {
        label: "Mastitis & clean milking demo",
        url: "https://youtu.be/eLKScfjYhac?si=RtZj5C22HnQEFrZ2",
      },
    ],
    products: [
      {
        label: "Stainless-steel milk cans/buckets (search)",
        url: "https://www.amazon.in/s?k=stainless+steel+milk+can",
      },
      {
        label: "Milk strainers / filter cloth (search)",
        url: "https://www.amazon.in/s?k=milk+filter+cloth",
      },
      {
        label: "Teat dip cup & solution (search)",
        url: "https://www.amazon.in/s?k=teat+dip+cup",
      },
    ],
    bullets: [
      "Wash hands with soap and clean water before milking.",
      "Wash teats and lower udder with lukewarm water and a clean cloth, then dry well.",
      "Pre-strip 2–3 streams from each quarter into a strip cup to check for clots or watery milk.",
      "Milk at fixed times every day with full-hand milking, without long breaks.",
      "Dip each teat in teat dip immediately after milking; filter and cool milk quickly.",
    ],
    icon: <FaHandsHelping />,
  },
  {
    id: "machinery",
    title: "Dairy Machinery & Value Addition",
    summary:
      "Simple processing machines help you make paneer, curd, ghee and other products.",
    video: "https://youtu.be/JEMHrEyDoGI?si=YvWUzqkbh5pH0aX0",
    extraVideos: [
      {
        label: "Milk processing / plant layout demo",
        url: "https://youtu.be/SGZ5kKXv65k?si=hW9CfLdimRPLMRmV",
      },
      {
        label: "Dairy value addition process demo",
        url: "https://youtu.be/OaNKFTHGJIg?si=5t4mPy023wZCWgiZ",
      },
    ],
    products: [
      {
        label: "Different types of dairy processing machinery (article)",
        url: "https://www.ancoequipment.com/post/different-types-of-dairy-processing-machinery-used-in-dairy-farms",
      },
      {
        label: "Cow urine Ark plant (equipment details)",
        url: "https://nkdairyequipments.com/cows-urine-ark-plant/",
      },
      {
        label: "Paneer press (equipment details)",
        url: "https://nkdairyequipments.com/paneer-press/",
      },
      {
        label: "Dairymate – product catalogue (PDF)",
        url: "https://www.dairymate.in/assets/dairymate---products-catalog.pdf?utm_source=chatgpt.com",
      },
      {
        label: "Modern Machines – milk processing equipment",
        url: "https://www.modernmachines.co.in/-milk-processing-equipment-8?utm_source=chatgpt.com",
      },
    ],
    bullets: [
      "Start with small-capacity equipment that suits your daily milk volume.",
      "Prefer stainless-steel, food-grade machinery with service support.",
      "Always follow proper cleaning and sanitization (CIP) procedures.",
      "Focus on a few products like paneer, curd or ghee and build a regular market.",
      "Check training videos or supplier demos before investing in bigger plants.",
    ],
    icon: <FaIndustry />,
  },
];

/* ------------ Main component ------------- */

export default function FarmingTips() {
  const [importantIds, setImportantIds] = useState(() => {
    try {
      const saved = localStorage.getItem("df_important_tips");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hhmm = now.toTimeString().slice(0, 5);
      const reminderTime = localStorage.getItem("df_tip_reminder_time");
      if (reminderTime && reminderTime === hhmm && importantIds.length > 0) {
        alert(
          "Reminder: Please check your important farming tips and look after your cows."
        );
      }
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [importantIds]);

  const toggleImportant = (id) => {
    setImportantIds((prev) => {
      let next;
      if (prev.includes(id)) {
        next = prev.filter((x) => x !== id);
      } else {
        next = [...prev, id];
      }
      localStorage.setItem("df_important_tips", JSON.stringify(next));
      return next;
    });
  };

  const setReminderTime = (e) => {
    const val = e.target.value;
    if (!val) {
      localStorage.removeItem("df_tip_reminder_time");
    } else {
      localStorage.setItem("df_tip_reminder_time", val);
    }
  };

  const speakTip = (tip) => {
    if (!("speechSynthesis" in window)) {
      alert("Voice output not supported in this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const text =
      tip.title + ". " + tip.summary + ". " + tip.bullets.join(". ") + ".";
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-IN";
    window.speechSynthesis.speak(utter);
  };

  return (
    <div style={page}>
      {/* Header */}
      <div style={headerRow}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <GiCow style={{ fontSize: 26, color: "#2e7d32" }} />
          <h1 style={title}>Farming Tips & Learning</h1>
        </div>
        <FaWater style={{ fontSize: 22, color: "#2e7d32" }} />
      </div>

      <p style={subtitle}>
        Practical guidance for daily dairy work – feeding, water, hygiene,
        clean milk and machinery.
      </p>

      {/* Important + reminder strip */}
      <div style={topStrip}>
        <div style={{ fontSize: 13 }}>
          <strong>★ Important tips:</strong>{" "}
          {importantIds.length === 0
            ? "Tap the star on a card to mark it important."
            : importantIds
                .map((id) => tips.find((t) => t.id === id)?.title)
                .filter(Boolean)
                .join(", ")}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12 }}>Daily reminder time:</span>
          <input
            type="time"
            onChange={setReminderTime}
            defaultValue={localStorage.getItem("df_tip_reminder_time") || ""}
            style={timeInput}
          />
        </div>
      </div>

      {/* Tips grid */}
      <div style={grid}>
        {tips.map((tip) => {
          const isImportant = importantIds.includes(tip.id);
          return (
            <div key={tip.id} style={card}>
              {/* Icon & title */}
              <div style={cardHeader}>
                <div style={iconCircle}>{tip.icon}</div>
                <div style={{ flex: 1 }}>
                  <h2 style={cardTitle}>{tip.title}</h2>
                  <p style={summary}>{tip.summary}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleImportant(tip.id)}
                  style={starBtn}
                  title={
                    isImportant ? "Remove from important" : "Mark as important"
                  }
                >
                  {isImportant ? (
                    <FaStar style={{ color: "#ffb300" }} />
                  ) : (
                    <FaRegStar style={{ color: "#b0bec5" }} />
                  )}
                </button>
              </div>

              {/* Bullet list */}
              <ul style={bulletList}>
                {tip.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>

              {/* Products */}
              {tip.products && tip.products.length > 0 && (
                <div style={productBlock}>
                  <div style={productTitle}>Useful products / resources</div>
                  <div style={productLinksRow}>
                    {tip.products.map((p) => (
                      <a
                        key={p.url}
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        style={productLinkBtn}
                      >
                        {p.url.includes("youtube.com") ||
                        p.url.includes("youtu.be") ? (
                          <FaYoutube style={{ marginRight: 6 }} />
                        ) : (
                          <FaShoppingCart style={{ marginRight: 6 }} />
                        )}
                        <span style={{ whiteSpace: "nowrap" }}>{p.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Video + voice + extra videos */}
              <div style={cardFooter}>
                <a
                  href={tip.video}
                  target="_blank"
                  rel="noreferrer"
                  style={iconButtonLink}
                >
                  <FaYoutube style={{ marginRight: 6 }} />
                  Main demo video
                </a>
                <button
                  type="button"
                  onClick={() => speakTip(tip)}
                  style={iconButton}
                >
                  <FaHeadphones style={{ marginRight: 6 }} />
                  Listen
                </button>
              </div>

              {tip.extraVideos && tip.extraVideos.length > 0 && (
                <div style={extraVideosBlock}>
                  <span style={extraVideosLabel}>More demos / trainings:</span>
                  <div style={extraVideosRow}>
                    {tip.extraVideos.map((v) => (
                      <a
                        key={v.url}
                        href={v.url}
                        target="_blank"
                        rel="noreferrer"
                        style={extraVideoLink}
                      >
                        <FaExternalLinkAlt style={{ marginRight: 4 }} />
                        {v.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Feed helper */}
      <FeedHelper />

      {/* Extra learning resources */}
      <MoreLearning />
    </div>
  );
}

/* ------------ Feed helper ------------- */

function FeedHelper() {
  const [bodyWeight, setBodyWeight] = useState("");
  const [milkYield, setMilkYield] = useState("");
  const [stage, setStage] = useState("lactating");

  const weight = Number(bodyWeight) || 0;
  const milk = Number(milkYield) || 0;

  const greenFodderKg = weight ? (weight * 0.1).toFixed(1) : "0.0";
  const dryFodderKg = weight ? (weight * 0.015).toFixed(1) : "0.0";
  const concentrateKg =
    stage === "dry"
      ? (weight * 0.01).toFixed(1)
      : (milk * 0.4).toFixed(1); // simple thumb rule

  return (
    <div style={helperCard}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <GiCow style={{ fontSize: 22, color: "#2e7d32" }} />
        <h2 style={helperTitle}>Feed Suggestion Helper</h2>
      </div>
      <p style={helperSub}>
        This is only a simple guideline. Always confirm with a local vet or
        nutritionist.
      </p>

      <div style={helperGrid}>
        <div style={field}>
          <label style={label}>Cow body weight (kg)</label>
          <input
            type="number"
            value={bodyWeight}
            onChange={(e) => setBodyWeight(e.target.value)}
            style={input}
            placeholder="Example: 350"
          />
        </div>
        <div style={field}>
          <label style={label}>Milk yield (L/day)</label>
          <input
            type="number"
            value={milkYield}
            onChange={(e) => setMilkYield(e.target.value)}
            style={input}
            placeholder="Example: 10"
          />
        </div>
        <div style={field}>
          <label style={label}>Stage</label>
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            style={input}
          >
            <option value="lactating">Lactating (giving milk)</option>
            <option value="dry">Dry period</option>
            <option value="pregnant">Pregnant (late)</option>
          </select>
        </div>
      </div>

      <div style={resultRow}>
        <ResultChip label="Green fodder" value={`${greenFodderKg} kg/day`} />
        <ResultChip label="Dry fodder" value={`${dryFodderKg} kg/day`} />
        <ResultChip label="Concentrate" value={`${concentrateKg} kg/day`} />
      </div>
    </div>
  );
}

function ResultChip({ label, value }) {
  return (
    <div style={resultChip}>
      <span style={{ fontSize: 11, color: "#6d4c41" }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 600, color: "#2e7d32" }}>
        {value}
      </span>
    </div>
  );
}

/* ------------ Extra learning section ------------- */

function MoreLearning() {
  return (
    <div style={moreLearningCard}>
      <h2 style={moreLearningTitle}>More Learning Resources</h2>
      <p style={moreLearningSub}>
        These links are just examples. Choose videos and sites you trust and
        understand best.
      </p>
      <div style={moreLearningGrid}>
        <a
          href="https://www.youtube.com/c/NationalDairyDevelopmentBoard/videos"
          target="_blank"
          rel="noreferrer"
          style={moreLearningItem}
        >
          <FaYoutube style={{ fontSize: 20, marginBottom: 6 }} />
          <div style={moreLearningItemTitle}>NDDB – Dairy Videos</div>
          <div style={moreLearningItemText}>
            Training videos on clean milk, feeding, housing and more.
          </div>
        </a>

        <a
          href="https://nianp.res.in/video-gallery"
          target="_blank"
          rel="noreferrer"
          style={moreLearningItem}
        >
          <FaLeaf style={{ fontSize: 20, marginBottom: 6 }} />
          <div style={moreLearningItemTitle}>ICAR – Fodder & Nutrition</div>
          <div style={moreLearningItemText}>
            Videos and info on fodder, nutrition and animal health.
          </div>
        </a>

        <a
          href="https://www.youtube.com/results?search_query=kvk+dairy+management"
          target="_blank"
          rel="noreferrer"
          style={moreLearningItem}
        >
          <FaHeadphones style={{ fontSize: 20, marginBottom: 6 }} />
          <div style={moreLearningItemTitle}>KVK / Kisan Trainings</div>
          <div style={moreLearningItemText}>
            Farmer-friendly trainings in local languages on dairy farming.
          </div>
        </a>
      </div>
    </div>
  );
}

/* ------------ Styles ------------- */

const page = {
  maxWidth: 1000,
  margin: "0 auto",
  padding: 16,
  fontFamily: "Poppins, system-ui, sans-serif",
  backgroundColor: "#f5f5f5",
};

const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
};

const title = {
  fontSize: 20,
  color: "#263238",
  margin: 0,
};

const subtitle = {
  color: "#607d8b",
  fontSize: 13,
  marginBottom: 16,
};

const topStrip = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
  padding: 10,
  borderRadius: 8,
  background: "#fff",
  border: "1px solid #e0e0e0",
  fontSize: 13,
  marginBottom: 16,
};

const timeInput = {
  padding: "4px 6px",
  borderRadius: 4,
  border: "1px solid #b0bec5",
  fontSize: 12,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 12,
};

const card = {
  background: "#ffffff",
  borderRadius: 10,
  padding: 12,
  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.06)",
  border: "1px solid #e0e0e0",
  display: "flex",
  flexDirection: "column",
  gap: 6,
};

const cardHeader = {
  display: "flex",
  alignItems: "center",
  gap: 10,
};

const iconCircle = {
  width: 38,
  height: 38,
  borderRadius: "50%",
  background: "#e8f5e9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20,
  color: "#2e7d32",
};

const cardTitle = {
  fontSize: 15,
  color: "#263238",
  margin: 0,
};

const summary = {
  fontSize: 12,
  color: "#607d8b",
  margin: 0,
};

const starBtn = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: 18,
};

const bulletList = {
  fontSize: 13,
  color: "#37474f",
  paddingLeft: 18,
  margin: "6px 0 10px",
};

const cardFooter = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8,
};

const iconButtonLink = {
  display: "inline-flex",
  alignItems: "center",
  padding: "6px 10px",
  borderRadius: 4,
  border: "1px solid #ef9a9a",
  fontSize: 12,
  textDecoration: "none",
  background: "#ffebee",
  color: "#c62828",
  fontWeight: 500,
};

const iconButton = {
  display: "inline-flex",
  alignItems: "center",
  padding: "6px 10px",
  borderRadius: 4,
  border: "1px solid #81c784",
  fontSize: 12,
  background: "#e8f5e9",
  color: "#2e7d32",
  fontWeight: 500,
  cursor: "pointer",
};

/* products inside card */

const productBlock = {
  marginTop: 4,
  marginBottom: 4,
};

const productTitle = {
  fontSize: 11,
  fontWeight: 600,
  color: "#607d8b",
  marginBottom: 4,
};

const productLinksRow = {
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
};

const productLinkBtn = {
  display: "inline-flex",
  alignItems: "center",
  padding: "4px 8px",
  borderRadius: 999,
  border: "1px solid #cfd8dc",
  fontSize: 11,
  background: "#ffffff",
  color: "#455a64",
  textDecoration: "none",
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

/* extra videos */

const extraVideosBlock = {
  marginTop: 4,
};

const extraVideosLabel = {
  fontSize: 11,
  color: "#607d8b",
};

const extraVideosRow = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  marginTop: 4,
};

const extraVideoLink = {
  display: "inline-flex",
  alignItems: "center",
  fontSize: 11,
  color: "#1e88e5",
  textDecoration: "none",
};

/* helper */

const helperCard = {
  marginTop: 20,
  background: "#ffffff",
  borderRadius: 10,
  padding: 12,
  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.06)",
  border: "1px solid #e0e0e0",
};

const helperTitle = {
  fontSize: 16,
  color: "#263238",
  margin: 0,
};

const helperSub = {
  fontSize: 12,
  color: "#607d8b",
  marginTop: 4,
  marginBottom: 10,
};

const helperGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 10,
  marginBottom: 10,
};

const field = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const label = {
  fontSize: 12,
  fontWeight: 600,
  color: "#455a64",
};

const input = {
  padding: "8px 10px",
  borderRadius: 4,
  border: "1px solid #b0bec5",
  fontSize: 13,
  background: "#ffffff",
};

const resultRow = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const resultChip = {
  background: "#e8f5e9",
  borderRadius: 999,
  padding: "6px 12px",
  border: "1px solid #c5e1a5",
};

/* more learning */

const moreLearningCard = {
  marginTop: 20,
  marginBottom: 10,
  background: "#ffffff",
  borderRadius: 10,
  padding: 12,
  border: "1px solid #e0e0e0",
  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.06)",
};

const moreLearningTitle = {
  fontSize: 16,
  color: "#263238",
  margin: 0,
};

const moreLearningSub = {
  fontSize: 12,
  color: "#607d8b",
  marginTop: 4,
  marginBottom: 10,
};

const moreLearningGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 10,
};

const moreLearningItem = {
  padding: 10,
  borderRadius: 8,
  background: "#f5f5f5",
  textDecoration: "none",
  color: "#263238",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

const moreLearningItemTitle = {
  fontSize: 13,
  fontWeight: 600,
  marginBottom: 4,
};

const moreLearningItemText = {
  fontSize: 11,
  color: "#546e7a",
};
