// aiRules.js
// Simple rule-based "AI" for dairy farm help

function normalize(text) {
  return (text || "").toLowerCase();
}

/* ---------------- CHAT RULES ---------------- */

const chatRules = [
  {
    keywords: ["hello", "hi", "hey", "namaste"],
    reply:
      "Hello! 👋 I am your dairy assistant. You can ask me about cattle health, feed, milk production, hygiene or breeding.",
  },
  {
    keywords: ["milk", "production", "increase", "improve"],
    reply:
      "- Give balanced ration (good green + dry fodder + concentrates)\n" +
      "- Provide clean water all the time\n" +
      "- Keep shed clean and stress-free\n" +
      "- Deworm regularly and check for diseases\n" +
      "- Avoid sudden change in feed",
  },
  {
    keywords: ["feed", "ration", "fodder"],
    reply:
      "- 60–70% green fodder, 30–40% dry fodder is good\n" +
      "- Add mineral mixture and salt\n" +
      "- Give concentrates based on milk yield (about 1kg per 2–2.5L milk)\n" +
      "- Avoid spoiled or moldy feed",
  },
  {
    keywords: ["mastitis", "udder", "clots", "flakes"],
    reply:
      "- Mastitis is infection of the udder\n" +
      "- Signs: hot, swollen udder, pain, clots/flakes in milk\n" +
      "- Wash udder before and after milking\n" +
      "- Use separate towel for each cow\n" +
      "- Contact veterinarian quickly for proper treatment",
  },
  {
    keywords: ["heat", "estrus", "oestrus", "breeding", "ai timing"],
    reply:
      "- Heat signs: restlessness, mounting others, clear mucus discharge\n" +
      "- Best time for AI: about 12–18 hours after heat starts\n" +
      "- Maintain proper body condition score (not too thin/fat)",
  },
  {
    keywords: ["clean", "hygiene", "sanitation", "shed"],
    reply:
      "- Remove dung frequently and keep floor dry\n" +
      "- Provide dry bedding\n" +
      "- Clean water troughs daily\n" +
      "- Wash milking utensils properly\n" +
      "- Good hygiene reduces mastitis and other diseases",
  },
  {
    keywords: ["thank", "thanks"],
    reply: "You’re welcome! 😊 Let me know if you have any more doubts.",
  },
];

function scoreRule(text, rule) {
  const t = normalize(text);
  let score = 0;
  for (const k of rule.keywords) {
    if (t.includes(k)) score++;
  }
  return score;
}

function getChatReply(message) {
  let bestRule = null;
  let bestScore = 0;

  for (const rule of chatRules) {
    const s = scoreRule(message, rule);
    if (s > bestScore) {
      bestScore = s;
      bestRule = rule;
    }
  }

  if (!bestRule || bestScore === 0) {
    return (
      "I am not fully sure about this question.\n" +
      "You can ask me about:\n" +
      "- Milk production\n" +
      "- Feeding and fodder\n" +
      "- Heat detection and breeding\n" +
      "- Mastitis and udder health\n" +
      "- Shed hygiene and management"
    );
  }

  return bestRule.reply;
}

/* ---------------- DISEASE RULES ---------------- */

const diseaseRules = [
  {
    name: "Mastitis",
    keywords: [
      "swollen udder",
      "swollen quarter",
      "clots",
      "flakes",
      "blood in milk",
      "hot udder",
      "pain in udder",
    ],
    advice:
      "- Likely mastitis (inflammation of udder)\n" +
      "- Keep udder clean and dry\n" +
      "- Strip first few streams of milk separately\n" +
      "- Apply warm compress and gentle massage\n" +
      "- Contact veterinarian for antibiotics and proper treatment quickly",
  },
  {
    name: "Foot and Mouth Disease (FMD)",
    keywords: [
      "blisters mouth",
      "mouth lesion",
      "salivation",
      "drooling",
      "lameness",
      "blisters feet",
    ],
    advice:
      "- Possible Foot and Mouth Disease (FMD)\n" +
      "- Very contagious viral disease\n" +
      "- Isolate affected animals immediately\n" +
      "- Provide soft feed and plenty of water\n" +
      "- Inform veterinarian and follow vaccination schedule",
  },
  {
    name: "Bloat",
    keywords: ["swollen left side", "bloat", "difficulty breathing", "stomach distended"],
    advice:
      "- Signs suggest bloat (gas in rumen)\n" +
      "- Do not let the animal lie down\n" +
      "- Call veterinarian immediately\n" +
      "- Avoid sudden change to lush legume pasture in future\n" +
      "- Provide anti-bloat mixture as advised by vet",
  },
  {
    name: "Tick-borne diseases / Blood parasites",
    keywords: ["ticks", "high fever", "pale eye", "weakness", "reduced milk"],
    advice:
      "- Could be tick-borne disease (like babesiosis/theileriosis)\n" +
      "- Check body for ticks and remove them\n" +
      "- Consult veterinarian for blood test and treatment\n" +
      "- Follow regular tick control (spray or pour-on) as advised",
  },
];

function getDiseaseAdvice(symptomsText) {
  const t = normalize(symptomsText);
  if (!t) {
    return {
      name: "Unknown",
      confidence: 0,
      advice: "Please enter some visible symptoms. Example: swollen udder, clots in milk.",
    };
  }

  let bestRule = null;
  let bestScore = 0;

  for (const rule of diseaseRules) {
    let s = 0;
    for (const k of rule.keywords) {
      if (t.includes(k)) s++;
    }
    if (s > bestScore) {
      bestScore = s;
      bestRule = rule;
    }
  }

  if (!bestRule || bestScore === 0) {
    return {
      name: "Unclear / Unknown",
      confidence: 0.2,
      advice:
        "I cannot match these symptoms clearly. Please contact a veterinarian for proper diagnosis.",
    };
  }

  const confidence = Math.min(0.2 + bestScore * 0.15, 0.95);

  return {
    name: bestRule.name,
    confidence,
    advice: bestRule.advice,
  };
}

/* ---------------- FEED ADVICE RULES ---------------- */

function getFeedAdvice({ milkYield, stage, bodyScore }) {
  const yieldNum = Number(milkYield) || 0;
  const st = (stage || "mid").toLowerCase();
  const body = (bodyScore || "normal").toLowerCase();

  let green = "60–70% of total dry matter";
  let dry = "30–40% of total dry matter";
  let conc = "0–2 kg/day";
  const notes = [];

  if (yieldNum <= 5) {
    conc = "1–2 kg/day";
    notes.push("Low milk yield: small amount of concentrate is enough.");
  } else if (yieldNum <= 10) {
    conc = "3–4 kg/day (about 1kg per 2–2.5L milk).";
    notes.push("Moderate yield: adjust concentrate with production.");
  } else {
    conc = "5–7 kg/day split into 2–3 feedings.";
    notes.push("High yield: provide good quality concentrates with bypass protein.");
  }

  if (st === "early") {
    notes.push("Early lactation: cow needs more energy, avoid sudden feed changes.");
  } else if (st === "late") {
    notes.push("Late lactation: avoid over-conditioning, control concentrate.");
  } else if (st === "dry") {
    notes.push("Dry period: mostly good quality roughage, minimal concentrates.");
  } else if (st === "pregnant") {
    notes.push("Pregnant: last 2 months need extra minerals and balanced ration.");
  }

  if (body === "thin") {
    notes.push("Body condition low: gradually increase concentrates and good quality fodder.");
  } else if (body === "fat") {
    notes.push("Over-fat cow: reduce concentrates slightly and improve exercise.");
  } else {
    notes.push("Body condition normal: maintain current ration and observe weight.");
  }

  notes.push("Always provide clean drinking water and mineral mixture + salt block.");

  return {
    green,
    dry,
    conc,
    notes: notes.join("\n- "),
  };
}

/* ------------- IMAGE + SYMPTOM HELPER ------------- */

function getImageDiseaseAdvice(symptomsText) {
  // For now we mostly use text symptoms + pretend to also look at image.
  const base = getDiseaseAdvice(symptomsText);
  return {
    name: base.name,
    confidence: base.confidence,
    advice:
      "Based on the symptoms you described and the image you uploaded:\n" +
      base.advice +
      "\n\nNote: This system does not fully analyze the image like a deep learning model. Always consult a veterinarian.",
  };
}

module.exports = {
  getChatReply,
  getDiseaseAdvice,
  getFeedAdvice,
  getImageDiseaseAdvice,
};
