
/**
 * COMPANY_KB: The authoritative data source for Real Stone & Granite Corp.
 * Used for UI text, AI grounding context, and professional specifications.
 */
export const COMPANY_KB = {
  identity: {
    name: "Real Stone & Granite Corp",
    established: 1993,
    motto: "Excellence in Stone",
    mission: "Crafting distinguished architectural surfaces since 1993.",
  },
  sourcing: {
    origin: "Our founder personally selects unique materials from the historic quarries of Italy, Spain, Greece, and Brazil.",
    standards: "Direct extraction oversight ensures the structural integrity and aesthetic exclusivity our clients demand.",
  },
  materials: {
    natural: [
      {
        type: "Granite",
        description: "A resilient and enduring choice, celebrated for its unique character and strength in sophisticated spaces.",
        attributes: ["Durable", "Unique Patterns", "Heat Resistant"],
      },
      {
        type: "Marble",
        description: "The definition of timeless elegance, offering unique veining and a smooth, classic texture for discerning projects.",
        attributes: ["Elegant", "Veined", "Classic"],
      },
      {
        type: "Quartzite",
        description: "A masterful blend of natural strength and refined beauty, mirroring the aesthetic of marble with superior hardness.",
        attributes: ["High Strength", "Marble-like Aesthetic", "Hardened"],
      },
    ],
    engineered: [
      {
        type: "Quartz",
        description: "Expertly composed stone, offering a nonporous and consistent finish for effortless daily elegance.",
        brands: ["Caesarstone", "Cambria"],
        attributes: ["Nonporous", "Maintenance Free", "Consistent"],
      },
      {
        type: "Dekton",
        description: "A sophisticated ultra-compact surface, meticulously engineered for absolute resistance to the elements.",
        attributes: ["UV Resistant", "Scratch Resistant", "Ultra-Compact"],
      },
      {
        type: "Porcelain",
        description: "A sleek, contemporary surface offering exceptional durability and a lightweight architectural profile.",
        attributes: ["Lightweight", "Large Format", "Durable"],
      },
    ],
    exotic: [
      {
        type: "Onyx",
        description: "A breathtaking, translucent material used to create dramatic, backlit features that define a room's atmosphere.",
        attributes: ["Translucent", "Vibrant", "Ornamental"],
      },
      {
        type: "Semiprecious",
        description: "Gemstone-quality surfaces such as Amethyst and Agate, hand-assembled for the ultimate statement in luxury.",
        attributes: ["Rare", "Jewel-Toned", "Bespoke"],
      },
      {
        type: "Rare Finds",
        description: "One-of-a-kind stone blocks sourced from exclusive quarries, accessible by private appointment.",
        attributes: ["Exclusive", "Limited Run", "Statement"],
      }
    ]
  },
  servicePillars: [
    {
      id: "01",
      title: "Master Fabrication",
      description: "Precision cutting via advanced 5-axis systems, guided by a master's touch.",
      icon: "Fabrication"
    },
    {
      id: "02",
      title: "Digital Artistry",
      description: "Photorealistic visualization and virtual layouts for complete design confidence.",
      icon: "Design"
    },
    {
      id: "03",
      title: "Bespoke Inlay",
      description: "Intricate mosaic assembly and hand-finished details for one-of-a-kind features.",
      icon: "Artistic"
    },
    {
      id: "04",
      title: "Private Installation",
      description: "Discreet, white-glove site management and fitting by our most senior masons.",
      icon: "Safety"
    },
    {
      id: "05",
      title: "Architectural Cladding",
      description: "Large-scale stone systems engineered for performance and permanence.",
      icon: "Commercial"
    }
  ],
  legacy: {
    notableProjects: [
      { name: "Vietnam Wall Replica", location: "Traveling Exhibition" },
      { name: "Navy SEAL Museum Memorial", location: "Fort Pierce, FL" },
      { name: "9/11 First Responders Memorial", location: "Various Locations" }
    ],
    affiliations: [
      "Natural Stone Institute",
      "Gary Sinise Foundation"
    ],
    expertise: "Master-level craftsmanship applied to monuments of national significance.",
  },
  contact: {
    phone: "(772) 489-9964",
    status: "Operational",
  },
};
